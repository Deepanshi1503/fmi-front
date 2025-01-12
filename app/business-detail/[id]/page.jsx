"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchBusinessById } from "@/utils/api";
import { GlobalContextProvider } from '@/context/context';
import Detail from "@/components/business-detail/detail";

export default function BusinessDetail() {
    const [business, setBusiness] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const data = await fetchBusinessById(id);
                setBusiness(data);
            };
            fetchData();
        }
    }, [id]);

    if (!id) {
        return <div>Loading...</div>;
    }

    if (!business) {
        return <div>Loading business data...</div>;
    }

    return (
        <GlobalContextProvider>
            <Detail business={business.data.attributes} />
        </GlobalContextProvider>
    );
}
