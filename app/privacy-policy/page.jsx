"use clients"
import React from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import PrivacyPolicy from '@/components/privacy-policy/privacy-policy'

export default function page() {
    return (
        <div>
            <Header />

            <PrivacyPolicy />

            <Footer />
        </div>
    )
}
