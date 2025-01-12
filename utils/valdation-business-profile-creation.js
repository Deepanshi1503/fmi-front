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


export const mapPreferredTimeframe = (timeframe) => {
    const timeframeMap = {
        "Immediate": "\"Immediate\"",
        "1 - 3 months": "\"1 - 3 months\"",
        "3 - 6 months": "\"3 - 6 months\"",
        "6 - 12 months": "\"6 - 12 months\"",
    };
    return timeframeMap[timeframe] || null;
};


export const mapNumberOfEmployees = (employees) => {
    const employeeMap = {
        "1 - 10": "\"1 - 10\"",
        "11 - 50": "\"11 - 50\"",
        "51 - 200": "\"51 - 200\"",
        "201 - 500": "\"201 - 500\"",
        "501 - 1000": "\"501 + \"",
    };
    return employeeMap[employees] || null;
};


export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


export const syncBusinessData = async (businessData, founderData, teamData, advisorData, profileProgress) => {
    const businessId = localStorage.getItem("businessId");

    if (!businessId) {
        if (!businessData.companyName || !businessData.professionalEmail || !businessData.phoneNumber) {
            console.error("Missing required fields: Company Name, Email, or Phone Number");
            return;
        }
    }

    // Map data to backend schema
    const payload = {
        data: {
            title: businessData.companyName || "",
            slug: (businessData.companyName ? businessData.companyName.toLowerCase().replace(/\s+/g, '-') : '') + '-title',
            purpose_of_listing_business: businessData.lookingFor || null,
            reason_for_selling_fundraise: businessData.reason || null,
            company_name: businessData.companyName,
            website_url: businessData.website || null,
            stage_of_company: businessData.companyStage || null,
            type_of_company: businessData.companyType || null,
            description_about_company: businessData.description || null,
            company_mission: businessData.mission || null,
            company_vision: businessData.vision || null,
            remote_onsite_workforce_ration: businessData.workforceRatio || null,
            diversity_information: businessData.diversityInfo || null,
            headquarters: businessData.headquarters || null,
            country: businessData.country || null,
            state: businessData.state || null,
            geographical_presence: businessData.geographicalPresence || null,
            current_geography: businessData.currentGeography || null,
            parent_company: businessData.parentCompany || null,
            professional_emailid: businessData.professionalEmail || null,
            phone_number: businessData.phoneNumber || null,
            linkedin_id: businessData.linkedInId || null,
            year_of_incorporation: parseInt(businessData.yearOfIncorporation) || null,
            youtube_url: businessData.youtubeUrl || null,
            product_services_detail: await Promise.all(
                (businessData.productServiceData || [])?.map(async (product) => {
                    return {
                        product_name: product.productName || null,
                        product_description: product.productDescription || null,
                        revenue_model: product.revenueModel || null,
                        current_status: product.currentStatus || null,
                    };
                })
            ),
            preferred_timeframe_for_action: mapPreferredTimeframe(businessData.preferredTimeframe) || null,
            workforce_range: mapNumberOfEmployees(businessData.numberOfEmployees) || null,
            pitch_deck: businessData.pitchDeck?.fileId || null,  // Use the URL of the pitch deck
            company_profile: businessData.companyProfile?.fileId || null,
            founder_detail: await Promise.all(
                (founderData || [])?.map(async (founder) => {
                    return {
                        name: founder.name || null,
                        role: founder.role || null,
                        background: founder.professionalBackground || null,
                        linkedin_profile: founder.linkedinProfile || null,
                        education: founder.education || null,
                        image: founder.profileImage ? await uploadImage(founder.profileImage) : null,
                    };
                })
            ),
            team_details: await Promise.all(
                (teamData || [])?.map(async (member) => {
                    return {
                        name: member.name || null,
                        role: member.role || null,
                        background: member.professionalBackground || null,
                        linkedin_profile: member.linkedinProfile || null,
                        education: member.education || null,
                        image: member.profileImage ? await uploadImage(member.profileImage) : null,
                    };
                })
            ),
            board_member_advisor__detail: await Promise.all(
                (advisorData || [])?.map(async (advisor) => {
                    return {
                        name: advisor.name || null,
                        role: advisor.role || null,
                        background: advisor.professionalBackground || null,
                        linkedin_profile: advisor.linkedinProfile || null,
                        education: advisor.education || null,
                        image: advisor.profileImage ? await uploadImage(advisor.profileImage) : null,
                    };
                })
            ),
            market_opportunity_size: businessData.marketOpportunity || null,
            competitor_analysis: businessData.competitorAnalysis || null,
            global_market_share: (businessData.competitiveAnalysis?.globalMarketSize || []).map((item) => ({
                country: item.country || null,
                currency: item.currency || null,
                amount: item.amount || null,
            })) || [],
            current_market_share: businessData.competitiveAnalysis?.currentMarketShare.map((item) => ({
                country: item.country || null,
                share_percentage: item.share || null,
                value: item.value || null,
            })) || [],
            why_are_you_different: businessData.competitiveAnalysis?.descriptions.whyDifferent || null,
            why_you_why_now: businessData.competitiveAnalysis?.descriptions.whyNow || null,
            fundraising_status: businessData.fundraisingStatus?.fundraisingStatus.map((item) => ({
                current_status: item.lender || null,
                amount: item.amount || null,
            })) || [],
            total_fundraised: businessData.fundraisingStatus?.totalFundsRaised || null,
            fundraise_business_details: businessData.investorRole
                ? {
                    investor_role: businessData.investorRole || null,
                    type_of_funding: businessData.typeOfFunding || null,
                    valuation: businessData.valuation || null,
                    funds_allocation: businessData.fundsAllocation || null,
                }
                : null,
            sale_business_details: businessData.saleValuation
                ? {
                    valuation: businessData.saleValuation || null,
                    ownership_stake_offered: businessData.ownershipStake || null,
                    sale_price: businessData.salePrice || null,
                    reason_for_sale: businessData.reasonForSale || null,
                }
                : null,
            financial_model_details: (businessData.yearData || []).map((item) => ({
                year: item.year || null,
                total_revenue: item.totalRevenue || null,
                total_profit_loss: item.totalProfitLoss || null,
                quarter_details: item.quarters.map((quarter) => ({
                    revenue: parseInt(quarter.revenue) || 0,
                    profit_loss: parseInt(quarter.profitLoss) || 0,
                })) || [],
            })) || [],
            step_progress: profileProgress
                ? {
                    company_overview_progress: profileProgress?.companyOverview?.progress || 0,
                    product_services_progress: profileProgress?.productServices?.progress || 0,
                    founder_team_progress: profileProgress?.founderTeam?.progress || 0,
                    market_competition_progress: profileProgress?.marketCompetition?.progress || 0,
                    financial_progress: profileProgress?.financial?.progress || 0,
                    equity_fundraising_progress: profileProgress?.equitySell?.progress || 0,
                }
                : null,
        }
    };

    if (!isValidEmail(businessData.professionalEmail) && !businessId) {
        console.error("Invalid email format:", businessData.professionalEmail);
        return;
    }

    try {
        if (businessId) {
            await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/businesses/${businessId}`, payload);
            console.log("Business updated successfully.");
        } else {
            // Create new business
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/businesses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const responseData = await response.json();
            console.log(responseData);
            if (responseData && responseData.data && responseData.data.id) {
                console.log("Business created successfully:", responseData.data.id);
                localStorage.setItem("businessId", responseData.data.id);
            }
        }
    } catch (error) {
        console.error("Error syncing business data:", error);
    }
};