import NotFound from "@/components/not-found";
import Header2 from "@/components/business-listing/header2";
import HeadingBox from "./_components/heading-box"
import Footer from "@/components/footer";
import SectionTracker from "./_components/section-tracker"

const InvestorDetailPage = async ({ params }) => {
    const [id] = params.businessDetailPage.split('-');

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/businesses/${id}?populate=business_image,pitch_deck,company_profile,product_services_detail,founder_detail.image,team_details.image,board_member_advisor_detail.image,global_market_share,current_market_share,financial_model_details.quarter_details,fundraising_status,fundraise_business_details.funds_allocation,sale_business_details,step_progress,industry`, {
        cache: 'no-store',
    });
    const { data: business } = await res.json();
    console.log("business data draaaaag",business);

    if (!res.ok || !business) {
        return <NotFound/>;
    }

    return (
        <div>
            <Header2/>
            <HeadingBox
                image={business.attributes.business_image?.data?.attributes?.url}
                title={business.attributes.company_name}
                location={business.attributes.headquarters}
                company_type={business.attributes.industry.data.attributes.name}
                funding_type={business.attributes.fundraise_business_details?.type_of_funding || "Sale"}
            />
            <SectionTracker business={business.attributes}/>
            <Footer/>
        </div>
    );
};

export default InvestorDetailPage;
