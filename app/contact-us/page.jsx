"use client"
import React from 'react'
import Header from '@/components/header'
import ContactHeader from '@/components/contact-us/ContactHeader'
import ContactFormBlock from '@/components/contact-us/contactFormBlock'

export default function page() {
    return (
        <div>

            {/* navigation */}
            <Header />

            {/* contact header */}
            <ContactHeader />

            {/* contact form section */}
            <ContactFormBlock />


        </div>
    )
}
