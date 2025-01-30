import { fetchInvestorBusinesses } from "@/utils/api";
import InvestorCard from "./investor-card"
import Filter from "./filter";
import Header2 from "@/components/business-listing/header2"
import HeadingBox from "./heading-box"
import Footer from "@/components/footer"
import SortOptions from "./sort-options"
import InfiniteScroll from "./infinite-scroll";

export const dynamic = 'force-dynamic';

export default async function Listing({ searchParams,searchParamsData }) {
    console.log("searchParamsData",searchParamsData);
    
    // Fetch data directly in the component for Next.js 14
    const filters = {
        search: searchParamsData?.search,
    };
    const sort = searchParamsData?.sort || "";

    if (searchParams) {
        Object.entries(searchParams).forEach(([key, value]) => {
            if (typeof value === 'string') {
                filters[key] = value;
            }
        });
    }

    const { data: initialBusinesses = [], total = 0 } = await fetchInvestorBusinesses(filters, sort, 1);

    return (
        <>
            <Header2 />
            <HeadingBox />
            <div className="flex justify-between mx-24 mt-10">
                <div className="w-[23%] px-4 py-2" style={{
                    position: "sticky",
                    top: "0",
                    alignSelf: "flex-start",
                }}>
                    <Filter />
                </div>
                <div className="w-[75%] mb-8">
                    {/* Results header section */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-[16px] text-[#181818CC] font-semibold mt-2">
                            {`(${total}) Results Found`}
                        </div>
                        <SortOptions />
                    </div>

                    {/* Render initial businesses */}
                    <div className="flex flex-col gap-y-8 mb-8">
                        {initialBusinesses.map((business) => (
                            <InvestorCard key={business.id} business={business} />
                        ))}
                    </div>

                    {/* Infinite scroll for additional pages */}
                    <InfiniteScroll
                        initialBusinesses={[]}
                        initialFilters={filters}
                        initialSort={sort}
                        startPage={2}
                    />
                </div>
            </div>
            <Footer />
        </>
    )
}