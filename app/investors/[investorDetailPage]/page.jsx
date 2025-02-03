import NotFound from "./not-found";

const InvestorDetailPage = async ({ params }) => {
    const { investorDetailPage } = params;

    // Extract the ID from the slug (assuming format: id-companyname-country)
    const id = investorDetailPage.split("-")[0];

    // Fetch investor data using the extracted ID
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/investors/${id}?populate=*`, {
        cache: "no-store",
    });
    const { data: business } = await res.json();

    if (!res.ok || !business) {
        return <NotFound/>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-6">
                hi it is working 
            </div>
        </div>
    );
};

export default InvestorDetailPage;
