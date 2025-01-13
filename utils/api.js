import { TypeSpecimen } from '@mui/icons-material';
import axios from 'axios';

// for listing //
export const fetchBusinesses = async (filters = {}, sort = "") => {
    try {
        const queryParams = new URLSearchParams();
        // Apply filters dynamically
        if (filters.search) queryParams.append("filters[company_name][$containsi]", filters.search);
        if (filters.revenue.min) queryParams.append("filters[overall_revenue][$gte]", filters.revenue.min);
        if (filters.revenue.max) queryParams.append("filters[overall_revenue][$lte]", filters.revenue.max);
        if (filters.profit.min) queryParams.append("filters[overall_profile_loss][$gte]", filters.profit.min);
        if (filters.profit.max) queryParams.append("filters[overall_profile_loss][$lte]", filters.profit.max);
        if (filters.valuation.min) queryParams.append("filters[fundraise_business_details][valuation][$gte]", filters.valuation.min);
        if (filters.valuation.max) queryParams.append("filters[fundraise_business_details][valuation][$lte]", filters.valuation.max);
        if (filters.funding.length) {
            filters.funding.forEach(fundingType => {
                queryParams.append("filters[fundraise_business_details][type_of_funding][$in]", fundingType);
            });
        }
        if (filters.industry.length) {
            filters.industry.forEach(industryName => {
                queryParams.append("filters[industry][name][$in]", industryName);
            });
        }
        if (filters.region.length) queryParams.append("filters[country][$in]", filters.region.join(","));
        if (filters.employeeSize) queryParams.append("filters[workforce_range][$gte]", filters.employeeSize);

        // Apply sorting
        if (sort) queryParams.append("sort", sort);
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/businesses?populate=business_image,pitch_deck,company_profile,product_services_detail,founder_detail.image,team_details.image,board_member_advisor_detail.image,global_market_share,current_market_share,financial_model_details.quarter_details,fundraising_status,fundraise_business_details,sale_business_details,step_progress,industry&${queryParams.toString()}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching businesses:", error);
        return { data: [] }; // Return an empty array on error
    }
};

// detail page according to id detail page//
export const fetchBusinessById = async (id) => {
    try {
        if (!id) {
            throw new Error("Business ID is required");
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/businesses/${id}?populate=business_image,pitch_deck,company_profile,product_services_detail,founder_detail.image,team_details.image,board_member_advisor_detail.image,global_market_share,current_market_share,financial_model_details.quarter_details,fundraising_status,fundraise_business_details.funds_allocation,sale_business_details,step_progress,industry`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching business by ID:", error);
        return null;
    }
};

// fetch the business related to the user for dashboard //
// export const fetchBusinessesByUserId = async ({setBusinesses}) => {
//     try {
//         const userId = JSON.parse(localStorage.getItem("userId"));
//         if (!userId) return;

//         const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/businesses?filters[user][id][$eq]=${userId}&populate=stats,step_progress`
//         );
//         setBusinesses(response.data.data);
//     } catch (error) {
//         console.error("Error fetching businesses:", error);
//     }
// };

// for dashboard //
export const fetchStats = async (userId, timeSpan = "7d", businessId = null) => {
    try {
        const queryParams = new URLSearchParams({
            userId,
            timeSpan,
            ...(businessId && { businessId }), // Add businessId only if it exists
        }).toString();

        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/stats?${queryParams}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching stats:", error);
        return { stats: [] }; // Return an empty stats array on error
    }
};

// for the filters in the listing page //
export const fetchFundingTypeOptions = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/content-type-builder/components/form.investor-business-listing-detail`);
        const data = await response.json();
        const options = data.data.schema.attributes.type_of_funding.enum;
        return options;
    } catch (error) {
        console.error("Error fetching options:", error);
        return { options: [] }; // Return an empty stats array on error
    }
};

// for the filters in the listing page //
export const fetchIndustryOptions = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/industries`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { data } = await response.json();
        // Map the API data to extract industry names
        return data.map((item) => item.attributes.name);
    } catch (error) {
        console.error("Error fetching industry options:", error);
        return []; // Return an empty array on error
    }
};

// fetch the timeframe option and the looking for options //
export const fetchEnumOptions = async () => {
    try {
        const response = await axios.get(
            "http://localhost:1337/api/content-type-builder/content-types/api::business.business"
        );

        const enumOptions = response.data?.data?.schema?.attributes || {};

        const lookingForEnum = enumOptions?.purpose_of_listing_business?.enum || [];
        const timeframeEnum =
            enumOptions?.preferred_timeframe_for_action?.enum.map((item) =>
                item
                    .replace(/^"|"$/g, "") // Removes double quotes
                    .replace(/\s*-\s*/g, " - ") // Ensures proper formatting around dashes
            ) || [];

        return { lookingForEnum, timeframeEnum };
    } catch (error) {
        console.error("Error fetching enum options:", error);
        throw new Error("Failed to load options.");
    }
};

// fetch company type and company stage options //
export const fetchOptions = async () => {
    try {
        const response = await axios.get(
            "http://localhost:1337/api/content-type-builder/content-types/api::business.business"
        );

        const schemaAttributes = response.data?.data?.schema?.attributes || {};

        // Fetch 'Type of Company' options
        const typeOptions =
            schemaAttributes?.type_of_company?.enum.map((option) =>
                option.replace(/^"|"$/g, "") // Removes double quotes
            ) || [];

        // Fetch 'Stage of Company' options
        const stageOptions =
            schemaAttributes?.stage_of_company?.enum.map((option) =>
                option.replace(/^"|"$/g, "") // Removes double quotes
            ) || [];

        return { typeOptions, stageOptions, }
    } catch (err) {
        console.error("Error fetching company options:", err);
        setError("Failed to load company options.");
    }
};

export const fetchWorkforceRanges = async () => {
    try {
        const response = await axios.get("http://localhost:1337/api/content-type-builder/content-types/api::business.business");
        const schemaAttributes = response.data?.data?.schema?.attributes || {};

        // Fetch 'Stage of Company' options
        const workforceOptions =
            schemaAttributes?.workforce_range?.enum.map((option) =>
                option.replace(/^"|"$/g, "") // Removes double quotes
            ) || [];
        return workforceOptions;
    } catch (err) {
        console.error("Error fetching workforce range options:", err);
        setError("Failed to load workforce range options.");
    }
};