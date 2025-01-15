import { fetchBusinessById } from "@/utils/api";
import { GlobalContextProvider } from "@/context/context";
import Detail from "@/components/business-detail/detail";

export default async function BusinessDetail({ params }) {
    const { id } = params;

    if (!id) {
        return <div>Invalid Business ID</div>;
    }

    try {
        const business = await fetchBusinessById(id);

        if (!business || !business.data) {
            return <div>Business data not found.</div>;
        }

        return (
            <GlobalContextProvider>
                <Detail business={business.data.attributes} />
            </GlobalContextProvider>
        );
    } catch (error) {
        console.error("Error fetching business data:", error);
        return <div>Failed to load business data. Please try again later.</div>;
    }
}