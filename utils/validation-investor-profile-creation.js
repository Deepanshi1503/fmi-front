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

export const fetchFundingInterestOptions = async () => {
    try {
        const response = await axios.get("http://localhost:1337/api/industries");
        const options = response.data?.data || [];
        return options
    } catch (err) {
        console.error("Error fetching funding interest options:", err);
        return [];
    }
};

export const fetchInvestorTypeOptions = async () => {
    try {
        const response = await axios.get("http://localhost:1337/api/content-type-builder/content-types/api::investor.investor");
        const option2 = response.data?.data?.schema?.attributes || null;
        return { option2 };
    } catch (err) {
        console.error("Error fetching investor type options:", err);
        return [];
    }
};

export const fetchSectors = async () => {
    const fundingInterestOptions = JSON.parse(localStorage.getItem("combineInvestorInfo"));
    const fundingInterest = fundingInterestOptions.fundingInterest;

    try {
        const response = await axios.get("http://localhost:1337/api/sub-industries?populate=*");
        const options = response.data?.data || [];

        if (fundingInterest.length > 0) {
            const fundingInterestNames = fundingInterest.map(interest => interest.name);

            const filteredOptions = options.filter(option =>
                fundingInterestNames.includes(option.attributes.industry.data.attributes.name)
            );
            return filteredOptions;
        } else {
            return options;
        }
    } catch (err) {
        console.error("Error fetching funding interest options:", err);
        return [];
    }
};

export const fetchInvestorOptions = async () => {
    try {
        const response = await axios.get("http://localhost:1337/api/content-type-builder/components/form.investment-details");
        const option = response.data?.data?.schema?.attributes || null;
        return option;
    } catch (err) {
        console.error("Error fetching investor type options:", err);
        return [];
    }
};

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const syncInvestorData = async (investorData, profileProgress) => {
    const investorId = localStorage.getItem("investorId");
    const userId = localStorage.getItem("userId");

    if (!investorId) {
        if (!investorData.companyName || !investorData.professionalEmail || !investorData.phoneNumber) {
            console.error("Missing required fields: Company Name, Email, or Phone Number");
            return;
        }
    }

    // Map data to backend schema
    const payload = {
        data: {
            user: userId ? { id: parseInt(userId) } : null,
            title: investorData.companyName || "",
            slug: (investorData.companyName ? investorData.companyName.toLowerCase().replace(/\s+/g, '-') : '') + '-title',
            company_name: investorData.companyName,
            logo: investorData.companyLogo?.fileId || null,
            website_url: investorData.website,
            year_of_establishment: parseInt(investorData.yearOfEstablishment) || null,
            headquarters: investorData.headquarters,
            profile_description: investorData.profileDescription,
            availability_for_pitches: investorData.availableForPitches === 'Yes' ? true : false,
            phone_number: investorData.phoneNumber,
            professional_emailid: investorData.professionalEmail,
            linkedin_id: investorData.linkedInId,
            funding_interest: investorData.fundingInterest.map((interest) => ({
                id: interest.id,
            })),
            commitment_amount: investorData.totalCommitmentAmount || null,
            investor_type: investorData.investorType || null,
            preferred_investment_type: investorData.preferredInvestmentType || null,
            preferred_sectors_of_interests: investorData.preferredSectorOfInterest.map((interest) => ({
                id: interest.id,
            })),
            typical_investment_range: investorData.typicalInvestmentRange || null,
            preferred_stage_of_investment: investorData.preferredStageOfInvestment || null,
            geographic_focus: investorData.geographicFocus && investorData.geographicFocus.length > 0 ? investorData.geographicFocus : null,
            investment_details: await Promise.all(
                (investorData.investmentDetails || [])?.map(async (investment) => {
                    return {
                        company_name:investment.companyName||null,
                        investment_date: investment.investmentDate || null,
                        funding_amount: investment.fundingAmount || null,
                        currency: investment.currency || null,
                        funding_stage: investment.fundingStage || null,
                        funding_type: investment.fundingType || null
                    };
                })
            ),
            founder_team_detail: await Promise.all(
                (investorData.founderServiceData || [])?.map(async (founder) => {
                    return {
                        name: founder.name || null,
                        role: founder.role || null,
                        background: founder.professionalBackground || null,
                        linkedin_profile: founder.linkedinProfile || null,
                        education: founder.education || null,
                        image: founder.profileImage.fileId || null,
                    };
                })
            ),
            step_progress: profileProgress || null,
        }
    };

    console.log(payload);

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