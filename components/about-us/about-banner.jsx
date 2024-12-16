import React from 'react'
import Link from 'next/link'

export default function AboutUsBanner() {
    return (

        <section className='herobanner-main inner-banner-main'>
            <div className='herobanner-wrap'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-7'>
                            <div className='inner-banner-left-block'>
                                <h1>About Find MY Investor</h1>
                                <p>Find my investor is a cutting-edge platform designed to simplify and amplify fundrasing opportunities for business and connect them with the right investors. whether you're seeking Equity Funding, Debt Funding, Startup Financing, or industry   </p>
                                <p>Our mission is to be the dynamic bridge that connects visionary fundraisers with forward-thinking investors, fastering opportunities for mutual growth.</p>

                                <Link className="view-all-btn getstarted-btn" href="#">Get started now <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlSpace="preserve"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                >
                                    <g fill="#fff">
                                        <path
                                            d="M7.146 16.217a.75.75 0 0 1 0-1.061l8.5-8.5a.75.75 0 1 1 1.061 1.06l-8.5 8.5a.75.75 0 0 1-1.06 0z"
                                            data-original="#000000"
                                        ></path>
                                        <path
                                            d="M6.427 7.186a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0v-8.25h-8.25a.75.75 0 0 1-.75-.75"
                                            data-original="#000000"
                                        ></path>
                                    </g>
                                </svg></Link>
                            </div>
                        </div>
                        <figure><img className='img-fluid' alt='woman-banner-image.png' src='images/woman-banner-image.png' /></figure>
                    </div>
                </div>
            </div>
        </section >

    )
}
