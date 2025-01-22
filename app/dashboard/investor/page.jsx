"use client"
import Image from 'next/image'
import Header from '@/components/profile-creation/header'
import Dashboard from '@/components/investor-dashboard/dash'
import Footer from '@/components/profile-creation/footer'
import { GlobalContextProvider } from '@/context/context';

export default function profile() {
    return (
        <GlobalContextProvider>
            <Header/>
            <Dashboard/>
            <Footer/>
        </GlobalContextProvider>
    )
}