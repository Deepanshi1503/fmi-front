import InvestorListing from "./_components/listing";
import { GlobalContextProvider } from '@/context/context';

export default function profile({ params, searchParams }) {

    return (
        <GlobalContextProvider>
            <InvestorListing searchParamsData={searchParams} slugData = {params}/>
        </GlobalContextProvider>
    )
}