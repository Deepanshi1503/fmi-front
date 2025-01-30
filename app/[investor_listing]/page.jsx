import InvestorListing from "@/components/investor-listing/listing";
import { GlobalContextProvider } from '@/context/context';

export default function profile({ params, searchParams }) {
    const slug = params;
    console.log("slug", slug);

    return (
        <GlobalContextProvider>
            <InvestorListing searchParamsData={searchParams} slugData = {params}/>
        </GlobalContextProvider>
    )
}