"use client"
import Image from 'next/image'
import Listing from "@/components/business-listing/listing";
import { GlobalContextProvider } from '@/context/context';

export default function profile() {
    return (
        <GlobalContextProvider>
            <Listing/>
        </GlobalContextProvider>
    )
}