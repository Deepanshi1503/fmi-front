"use client"
import React from 'react'
import AboutUsBanner from '@/components/about-us/about-banner'
import Header from '@/components/header'
import HomeLogoSlder from '@/components/homepage/home-logo-slder'
import LeftImageWithContent from '@/components/about-us/left-image-with-content'
import RightImageWithContent from '@/components/about-us/right-image-with-content'
import OurCoreServices from '@/components/about-us/our-core-services'
import AboutStatsCounter from '@/components/about-us/about-stats-counter'
import Footer from '@/components/footer'


export default function page() {
    return (

        <div className=''>
            {/* navigation */}
            < Header />


            {/* about banner */}
            < AboutUsBanner />

            {/* home logo slider */}
            <HomeLogoSlder />

            {/* left image content */}
            <LeftImageWithContent />

            {/* right image content */}
            <RightImageWithContent />

            {/* left image content */}
            <LeftImageWithContent />

            {/* core services */}
            <OurCoreServices />

            {/* stats */}
            <AboutStatsCounter />

            {/* footer */}
            <Footer />

        </div>

    )
}
