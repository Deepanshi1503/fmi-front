import InvestorListing from "./_components/listing";
import BusinessListing from "@/components/business-listing/listing"
import { GlobalContextProvider } from '@/context/context';
import Link from "next/link";

export default function profile({ params, searchParams }) {
    const slugArray = params.dynamicPart || []; 
    const slugString = slugArray.join("/");

    const isInvestor = slugString.includes("investors");
    const isBusiness = slugString.includes("businesses");

    console.log("Slug Data:", slugArray);
    console.log("Detected Type:", isInvestor ? "Investor" : isBusiness ? "Business" : "Unknown");
    
    return (
        <GlobalContextProvider>
            {isInvestor ? (
                <InvestorListing searchParamsData={searchParams} slugData={slugArray} />
            ) : isBusiness ? (
                <BusinessListing searchParamsData={searchParams} slugData={params} />
            ) : (
                <div className="flex flex-col items-center justify-center h-screen text-center px-4">
                    <h1 className="text-5xl font-bold text-gray-800">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-600 mt-2">Page Not Found</h2>
                    <p className="text-gray-500 mt-2">
                        Oops! The page you are looking for doesn’t exist or has been moved.
                    </p>
                    <Link href="/" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition">
                        Go to Home
                    </Link>
                </div>
            )}
        </GlobalContextProvider>
    )
}