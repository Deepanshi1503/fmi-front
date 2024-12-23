"use client"
import React from 'react'
import Header from '@/components/header'
import ContactHeader from '@/components/contact-us/ContactHeader'
import ContactFormBlock from '@/components/contact-us/contactFormBlock'
import Footer from '@/components/footer'

export default function page() {
    return (
        <div>

            {/* navigation */}
            <Header />

            {/* contact header */}
            <ContactHeader />

            {/* contact form section */}
            <ContactFormBlock />

            {/* footer */}
            <Footer />

        </div>
    )
}
