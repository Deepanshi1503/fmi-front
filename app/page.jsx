"use client"
import Image from 'next/image'
import Header from '@/components/header'
import Herobanner from '@/components/homepage/hero-banner/hero-banner'
import CTAbluebuttons from '@/components/homepage/call-to-action-buttons'
import HomeLogoSlder from '@/components/homepage/home-logo-slder'
import LookingForInvestment from '@/components/homepage/looking-for-investment'
import LookingForInvestmentManufacture from '@/components/homepage/looking-for-investment-manufacturing'
import HomeTestimonial from '@/components/homepage/home-testimonial'
import HomeBlog from '@/components/homepage//home-blog'
import HomeExpandCards from '@/components/homepage/home-expand-hover-cards'
import Footer from '@/components/footer'
function page() {
    return (
        <div className='main-body'>


      {/* navigation */}
      <Header />




      {/* home banner */}
      <Herobanner />



      {/* CTA buttons */}
      <CTAbluebuttons />




      {/* home logo slider */}
      <HomeLogoSlder />




      {/* home card expand */}
      <HomeExpandCards />




      {/* investment IT */}
      <LookingForInvestment />




      {/* investment manufacturing */}
      <LookingForInvestmentManufacture />




      {/* client testimonial */}
      <HomeTestimonial />




      {/* home blog */}
      <HomeBlog />




      {/* footer */}
      <Footer />


    </div>
    )
}

export default page