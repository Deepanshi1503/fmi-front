import NotFound from "./not-found";
import Header2 from "@/components/business-listing/header2";
import HeadingBox from "./_components/heading-box"
import Footer from "@/components/footer";
import SectionTracker from "./_components/section-tracker"

const InvestorDetailPage = async ({ params }) => {
    const { investorDetailPage } = params;
    const id = investorDetailPage.split("-")[0];

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/investors/${id}?populate=logo,city,country,founder_team_detail.image,investment_details`, {
        cache: 'no-store',
    });
    const { data: business } = await res.json();
    console.log("business data",business);

    if (!res.ok || !business) {
        return <NotFound/>;
    }

    const scrollToSection = (id) => {
        if (sections.current[id]) {
            sections.current[id].scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div>
            <Header2/>
            <HeadingBox
                image={business.attributes.logo?.data?.attributes?.url}
                title={business.attributes.company_name}
                location={business.attributes.headquarters}
                city={business.attributes.city?.data.attributes.name}
                country={business.attributes.country?.data.attributes.name}
                investor_type={business.attributes.preferred_investment_type}
                funding_type={business.attributes.investor_type}
            />
            <SectionTracker business={business}/>
            <Footer/>
        </div>
    );
};

export default InvestorDetailPage;
