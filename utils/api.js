export const fetchBusinesses = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(
            `http://localhost:1337/api/businesses?populate=business_image,pitch_deck,company_profile,product_services_detail,founder_detail.image,team_details.image,board_member_advisor_detail.image,global_market_share,current_market_share,financial_model_details.quarter_details,fundraising_status,fundraise_business_details,sale_business_details,step_progress,industry&${queryParams}`
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
