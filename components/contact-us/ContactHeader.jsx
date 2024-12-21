"use client"
import React from 'react'
import Link from 'next/link'

export default function ContactHeader() {
    return (
        <section className='contact-top-header padding2'>
            <div className='container'>
                <div className='flex lg:gap-8'>
                    <div className='lg:w-3/5 items-start flex flex-col'>
                        <h1>Have questions? We're here to help—reach out to us today</h1>
                        <p>Share a few details, and we’ll get back to you shortly.</p>
                        <Link className="view-all-btn" href="#">Send us an email <svg
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
                    <div className='lg:w-2/5'>
                        <div className='w-full h-full bg-[#f4faff] p-5'>
                            <h2 className='text-[20px] text-capitalize'>address</h2>
                            <p className='text-[16px]'>Phoenix Tower, MG Road, Bengaluru (Karnataka) 560001</p>
                            <div className='flex flex-col'>
                                <div className='flex flex-col mb-3'>
                                    <p className='mb-1 text-[16px]'>inquiries</p>
                                    <Link className='text-[#000] font-semibold text-[20px]' href="tel:+91 9958337200">(+91) 9958337200</Link>
                                </div>

                                <div className='flex flex-col'>
                                    <p className='mb-1 text-[16px]'>Ready to take the next step in your career?</p>
                                    <Link className='text-[#000] font-semibold text-[18px]' href="emailto:connect@findmyinvestor.i">connect@findmyinvestor.i</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
