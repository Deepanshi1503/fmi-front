import { toast } from "react-toastify";
import axios from "axios";

export const validateMandatoryFields = (data, mandatoryFields, errorMessage) => {
    const missingFields = mandatoryFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
        toast.error(errorMessage || "Please fill in all required fields to proceed.", {
            position: "top-center",
        });
        return false;
    }
    return true;
};


export const base64ToBlob = (base64) => {
    const [metadata, base64String] = base64.split(",");
    const mime = metadata.match(/:(.*?);/)[1];
    const binary = atob(base64String);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mime });
};


export const uploadImage = async (imageData) => {
    const blob = base64ToBlob(imageData);
    const formData = new FormData();
    formData.append("files", blob, "profile-image.png");

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        const imageUrl = response.data[0]?.id;
        return imageUrl
    } catch (error) {
        console.error("Image upload failed:", error);
        return null;
    }
};

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


export const syncInvestorData = async (investorData, profileProgress) => {
    const investorId = localStorage.getItem("investorId");

    if (!investorId) {
        if (!investorData.companyName || !investorData.professionalEmail || !investorData.phoneNumber) {
            console.error("Missing required fields: Company Name, Email, or Phone Number");
            return;
        }
    }

    // Map data to backend schema
    const payload = {
        data: {
            title: investorData.companyName || "",
            slug: (investorData.companyName ? investorData.companyName.toLowerCase().replace(/\s+/g, '-') : '') + '-title',
            company_name: investorData.companyName,
            logo: investorData.companyLogo?.fileId || null,
            website_url: investorData.website,
            year_of_establishment: investorData.yearOfEstablishment,
            headquarters: investorData.headquarters,
            profile_description: investorData.productDescription,
            availability_for_pitches: investorData.availabilityForPitches,
            phone_number: investorData.phoneNumber,
            professional_emailid: investorData.professionalEmail,
            linkedin_id: investorData.linkedInId,
        }
    };

    if (!isValidEmail(investorData.professionalEmail) && !investorId) {
        console.error("Invalid email format:", investorData.professionalEmail);
        return;
    }

    try {
        if (investorId) {
            await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/investors/${investorId}`, payload);
            console.log("Investor updated successfully.");
        } else {
            // Create new business
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/investors`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const responseData = await response.json();
            console.log(responseData);
            if (responseData && responseData.data && responseData.data.id) {
                console.log("Investor created successfully:", responseData.data.id);
                localStorage.setItem("investorId", responseData.data.id);
            }
        }
    } catch (error) {
        console.error("Error syncing business data:", error);
    }
};