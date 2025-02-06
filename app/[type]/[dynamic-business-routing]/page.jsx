import Listing from "@/components/business-listing/listing";
import { GlobalContextProvider } from '@/context/context';

export default function profile(params) {
    console.log("params of type and business", params);
    return (
        <GlobalContextProvider>
            <h1>Ye to chl pada</h1>
        </GlobalContextProvider>
    )
}