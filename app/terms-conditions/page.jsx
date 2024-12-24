"use clients"
import React from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import TermsConditions from '@/components/terms-conditions/terms-conditions'

export default function page() {
    return (
        <div>
            <Header />

            <TermsConditions />

            <Footer />
        </div>
    )
}
