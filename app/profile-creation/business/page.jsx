"use client"
import Image from 'next/image'
import Header from '@/components/profile-creation/header'
import ProfileStep from '@/components/profile-creation/steps'
import Footer from '@/components/profile-creation/footer'
import { GlobalContextProvider } from '@/context/context'

export default function profile() {
    return (
        <GlobalContextProvider>
            <Header/>
            <ProfileStep/>
            <Footer/>
        </GlobalContextProvider>
    )
}