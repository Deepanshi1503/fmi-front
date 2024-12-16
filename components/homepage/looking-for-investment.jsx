import Link from 'next/link'
import React from 'react'

export default function LookingForInvestment() {
    return (
        <section className='looking-investment-section padding-140'>
            <div className='container'>
                <div className='looking-investment-heading-block'>
                    <h2>IT companies looking for<br /> investment</h2>
                    <Link className='view-all-btn' href="#">View all <svg
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
                <div className='investment-card-wrap'>
                    <div className='investment-card-box'>
                        <div className='investment-light-blue-box'>
                            <span className='foundyear'>founded year 2005</span>
                            <div className='investment-company-detail'>
                                <div className='investment-company-detail-left'>
                                    <h3><Link href="#">hubspot</Link></h3>
                                    <p>Cloud based CRM software for enterprises</p>

                                </div>
                                <img width={65} height={65} className='img-fluid' alt='compay logo' src='images/hubspot-logo.jpg' />
                            </div>
                            <ul className='company-services-listing'>
                                <li><Link href="#">Software products</Link></li>
                                <li><Link href="#">Inbound marketing</Link></li>
                                <li><Link href="#">Sales and customer services</Link></li>
                            </ul>
                        </div>
                        <div className='company-revenue-block'>
                            <div className='company-revenue-left'>
                                <span>$2.17 billion </span>
                                <p>cambridge (united states)</p>
                            </div>
                            <div className='company-revenue-link'><Link className='company-profile-link' href="#"><img src='images/blue-down-arrow.svg' alt='blue down arrow' className='img-fluid' /></Link></div>
                        </div>
                    </div>

                    <div className='investment-card-box'>
                        <div className='investment-light-blue-box'>
                            <span className='foundyear'>founded year 2005</span>
                            <div className='investment-company-detail'>
                                <div className='investment-company-detail-left'>
                                    <h3><Link href="#">hubspot</Link></h3>
                                    <p>Cloud based CRM software for enterprises</p>

                                </div>
                                <img width={65} height={65} className='img-fluid' alt='compay logo' src='images/hubspot-logo.jpg' />
                            </div>
                            <ul className='company-services-listing'>
                                <li><Link href="#">Software products</Link></li>
                                <li><Link href="#">Inbound marketing</Link></li>
                                <li><Link href="#">Sales and customer services</Link></li>
                            </ul>
                        </div>
                        <div className='company-revenue-block'>
                            <div className='company-revenue-left'>
                                <span>$2.17 billion </span>
                                <p>cambridge (united states)</p>
                            </div>
                            <div className='company-revenue-link'><Link className='company-profile-link' href="#"><img src='images/blue-down-arrow.svg' alt='blue down arrow' className='img-fluid' /></Link></div>
                        </div>
                    </div>

                    <div className='investment-card-box'>
                        <div className='investment-light-blue-box'>
                            <span className='foundyear'>founded year 2005</span>
                            <div className='investment-company-detail'>
                                <div className='investment-company-detail-left'>
                                    <h3><Link href="#">hubspot</Link></h3>
                                    <p>Cloud based CRM software for enterprises</p>

                                </div>
                                <img width={65} height={65} className='img-fluid' alt='compay logo' src='images/hubspot-logo.jpg' />
                            </div>
                            <ul className='company-services-listing'>
                                <li><Link href="#">Software products</Link></li>
                                <li><Link href="#">Inbound marketing</Link></li>
                                <li><Link href="#">Sales and customer services</Link></li>
                            </ul>
                        </div>
                        <div className='company-revenue-block'>
                            <div className='company-revenue-left'>
                                <span>$2.17 billion </span>
                                <p>cambridge (united states)</p>
                            </div>
                            <div className='company-revenue-link'><Link className='company-profile-link' href="#"><img src='images/blue-down-arrow.svg' alt='blue down arrow' className='img-fluid' /></Link></div>
                        </div>
                    </div>

                    <div className='investment-card-box'>
                        <div className='investment-light-blue-box'>
                            <span className='foundyear'>founded year 2005</span>
                            <div className='investment-company-detail'>
                                <div className='investment-company-detail-left'>
                                    <h3><Link href="#">hubspot</Link></h3>
                                    <p>Cloud based CRM software for enterprises</p>

                                </div>
                                <img width={65} height={65} className='img-fluid' alt='compay logo' src='images/hubspot-logo.jpg' />
                            </div>
                            <ul className='company-services-listing'>
                                <li><Link href="#">Software products</Link></li>
                                <li><Link href="#">Inbound marketing</Link></li>
                                <li><Link href="#">Sales and customer services</Link></li>
                            </ul>
                        </div>
                        <div className='company-revenue-block'>
                            <div className='company-revenue-left'>
                                <span>$2.17 billion </span>
                                <p>cambridge (united states)</p>
                            </div>
                            <div className='company-revenue-link'><Link className='company-profile-link' href="#"><img src='images/blue-down-arrow.svg' alt='blue down arrow' className='img-fluid' /></Link></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
