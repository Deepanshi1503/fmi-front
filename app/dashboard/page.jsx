"use client"
import Image from 'next/image'
import Header from '@/components/profile-creation/header'
import Dashboard from '@/components/dashboard/dash'
import Footer from '@/components/profile-creation/footer'

export default function profile() {
    return (
        <>
            <Header/>
            <Dashboard/>
            <Footer/>
        </>
    )
}