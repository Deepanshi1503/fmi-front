"use client"
import React from 'react'
import AboutUsBanner from '@/components/about-us/about-banner'
import Header from '@/components/header'
import HomeLogoSlder from '@/components/homepage/home-logo-slder'

export default function page() {
    return (

        <div className=''>
            {/* navigation */}
            < Header />


            {/* about banner */}
            < AboutUsBanner />

            {/* home logo slider */}
            <HomeLogoSlder />

        </div>

    )
}
