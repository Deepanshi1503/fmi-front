// for listing //
export const fetchBusinesses = async (filters = {}, sort = "") => {
    try {
        const queryParams = new URLSearchParams();
        // Apply filters dynamically
        if (filters.search) queryParams.append("filters[company_name][$containsi]", filters.search);
        if (filters.revenue.min) queryParams.append("filters[financial_model_details.revenue][$gte]", filters.revenue.min);
        if (filters.revenue.max) queryParams.append("filters[financial_model_details.revenue][$lte]", filters.revenue.max);
        if (filters.profit.min) queryParams.append("filters[financial_model_details.profit][$gte]", filters.profit.min);
        if (filters.profit.max) queryParams.append("filters[financial_model_details.profit][$lte]", filters.profit.max);
        if (filters.valuation.min) queryParams.append("filters[financial_model_details.valuation][$gte]", filters.valuation.min);
        if (filters.valuation.max) queryParams.append("filters[financial_model_details.valuation][$lte]", filters.valuation.max);
        if (filters.funding.length) queryParams.append("filters[type_of_funding][$in]", filters.funding.join(","));
        if (filters.industry.length) queryParams.append("filters[industry][$in]", filters.industry.join(","));
        if (filters.region.length) queryParams.append("filters[country][$in]", filters.region.join(","));
        if (filters.employeeSize) queryParams.append("filters[workforce_range][$gte]", filters.employeeSize);

        // Apply sorting
        if (sort) queryParams.append("sort", sort);
        const response = await fetch(
            `http://localhost:1337/api/businesses?populate=business_image,pitch_deck,company_profile,product_services_detail,founder_detail.image,team_details.image,board_member_advisor_detail.image,global_market_share,current_market_share,financial_model_details.quarter_details,fundraising_status,fundraise_business_details,sale_business_details,step_progress,industry&${queryParams.toString()}`
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

// for dashboard //
export const fetchStats = async (userId, timeSpan = "7d", businessId = null) => {
    try {
        const queryParams = new URLSearchParams({
            userId,
            timeSpan,
            ...(businessId && { businessId }), // Add businessId only if it exists
        }).toString();

        const response = await fetch(`http://localhost:1337/api/stats?${queryParams}`);
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
        const response = await fetch(`http://localhost:1337/api/content-type-builder/components/form.investor-business-listing-detail`);
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
        const response = await fetch("http://localhost:1337/api/industries");
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
