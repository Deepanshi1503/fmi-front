"use client"
import React from 'react'
import Link from 'next/link'

export default function ContactHeader() {
    return (
        <section className='contact-top-header padding-140'>
            <div className='container'>
                <div className='xl:flex lg:gap-8'>
                    <div className='xl:w-3/5 lg:w-full items-start flex flex-col sm:mb-8 mb-8'>
                        <h1 className='mb-3 xl-mb-12'>Have questions? We're here to help—reach out to us today</h1>
                        <p>Share a few details, and we’ll get back to you shortly.</p>
                        <Link className="view-all-btn xl-mt-8 mt-3" href="#">Send us an email <svg
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
                    <div className='xl:w-2/5 lg:w-full'>
                        <div className='w-full h-full bg-[#f4faff] p-5 rounded-[14px]'>
                            <h2 className='text-[20px] text-capitalize'>address</h2>
                            <p className='text-[16px]'>Phoenix Tower, MG Road, Bengaluru (Karnataka) 560001</p>
                            <div className='flex flex-col'>
                                <div className='flex flex-col mb-3'>
                                    <p className='mb-1 text-[16px]'>inquiries</p>
                                    <Link className='text-[#000] font-semibold text-[20px]' href="tel:+91 9958337200">(+91) 9958337200</Link>
                                </div>

                                <div className='flex flex-col mb-3'>
                                    <p className='mb-0 text-[16px]'>Ready to take the next step in your career?</p>
                                    <Link className='text-[#000] font-semibold text-[18px]' href="emailto:connect@findmyinvestor.i">connect@findmyinvestor.i</Link>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='mb-1 text-[16px]'>Follow us</p>
                                    <ul className='footer-social-links'>
                                        <li><Link href="#"><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 152 152"
                                        >
                                            <g id="Layer_2" data-name="Layer 2">
                                                <g id="Color">
                                                    <g id="_04.Twitter" data-name="04.Twitter">
                                                        <circle
                                                            id="Background"
                                                            cx="76"
                                                            cy="76"
                                                            r="76"
                                                            fill="#03a9f4"
                                                        ></circle>
                                                        <path
                                                            id="Icon"
                                                            fill="#fff"
                                                            d="M125.23 45.47a42 42 0 0 1-11.63 3.19 20.06 20.06 0 0 0 8.88-11.16 40.3 40.3 0 0 1-12.8 4.89 20.18 20.18 0 0 0-34.92 13.8 21 21 0 0 0 .47 4.6 57.16 57.16 0 0 1-41.61-21.11 20.2 20.2 0 0 0 6.21 27 19.9 19.9 0 0 1-9.12-2.49v.22a20.28 20.28 0 0 0 16.17 19.82 20.1 20.1 0 0 1-5.29.66 18 18 0 0 1-3.83-.34 20.39 20.39 0 0 0 18.87 14.06 40.6 40.6 0 0 1-25 8.61 36.5 36.5 0 0 1-4.83-.28 56.8 56.8 0 0 0 31 9.06c37.15 0 57.46-30.77 57.46-57.44 0-.89 0-1.75-.07-2.61a40.2 40.2 0 0 0 10.04-10.48"
                                                        ></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg></Link></li>
                                        <li><Link href="#"><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 176 176"
                                        >
                                            <g id="Layer_2" data-name="Layer 2">
                                                <g id="_01.facebook" data-name="01.facebook">
                                                    <circle id="background" cx="88" cy="88" r="88" fill="#3a559f"></circle>
                                                    <path
                                                        id="icon"
                                                        fill="#fff"
                                                        d="m115.88 77.58-1.77 15.33a2.87 2.87 0 0 1-2.82 2.57h-16l-.08 45.45a2.05 2.05 0 0 1-2 2.07H77a2 2 0 0 1-2-2.08V95.48H63a2.87 2.87 0 0 1-2.84-2.9l-.06-15.33a2.88 2.88 0 0 1 2.84-2.92H75v-14.8C75 42.35 85.2 33 100.16 33h12.26a2.88 2.88 0 0 1 2.85 2.92v12.9a2.88 2.88 0 0 1-2.85 2.92h-7.52c-8.13 0-9.71 4-9.71 9.78v12.81h17.87a2.88 2.88 0 0 1 2.82 3.25"
                                                    ></path>
                                                </g>
                                            </g>
                                        </svg></Link></li>
                                        <li><Link href="#"><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            id="Layer_1"
                                            width="45"
                                            height="45"
                                            viewBox="0 0 512 512"
                                        >
                                            <linearGradient
                                                id="SVGID_1_"
                                                x1="84.679"
                                                x2="404.429"
                                                y1="427.321"
                                                y2="107.571"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop offset="0" stopColor="#fee411"></stop>
                                                <stop offset="0.052" stopColor="#fedb16"></stop>
                                                <stop offset="0.138" stopColor="#fec125"></stop>
                                                <stop offset="0.248" stopColor="#fe983d"></stop>
                                                <stop offset="0.376" stopColor="#fe5f5e"></stop>
                                                <stop offset="0.5" stopColor="#fe2181"></stop>
                                                <stop offset="1" stopColor="#9000dc"></stop>
                                            </linearGradient>
                                            <circle cx="256" cy="256" r="225" fill="url(#SVGID_1_)"></circle>
                                            <g fill="#fff">
                                                <path d="M303.8 131h-95.5c-42.6 0-77.2 34.6-77.2 77.2v95.5c0 42.6 34.6 77.2 77.2 77.2h95.5c42.6 0 77.2-34.6 77.2-77.2v-95.5c0-42.6-34.6-77.2-77.2-77.2m49.3 172.8c0 27.2-22.1 49.4-49.4 49.4h-95.5c-27.2 0-49.4-22.1-49.4-49.4v-95.5c0-27.2 22.1-49.4 49.4-49.4h95.5c27.2 0 49.4 22.1 49.4 49.4z"></path>
                                                <path d="M256 192.1c-35.2 0-63.9 28.7-63.9 63.9s28.7 63.9 63.9 63.9 63.9-28.7 63.9-63.9-28.7-63.9-63.9-63.9m0 102.7c-21.4 0-38.8-17.4-38.8-38.8s17.4-38.8 38.8-38.8 38.8 17.4 38.8 38.8-17.4 38.8-38.8 38.8"></path>
                                                <circle
                                                    cx="323.1"
                                                    cy="188.4"
                                                    r="10.8"
                                                    transform="rotate(-9.25 323.353 188.804)"
                                                ></circle>
                                            </g>
                                        </svg></Link></li>
                                        <li><Link href="#">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlSpace="preserve"
                                                id="Capa_1"
                                                width="40"
                                                height="40"
                                                x="0"
                                                y="0"
                                                version="1.1"
                                                viewBox="0 0 112.196 112.196"
                                            >
                                                <circle cx="56.098" cy="56.097" r="56.098" fill="#007AB9"></circle>
                                                <path
                                                    fill="#F1F2F2"
                                                    d="M89.616 60.611v23.128H76.207V62.161c0-5.418-1.936-9.118-6.791-9.118-3.705 0-5.906 2.491-6.878 4.903-.353.862-.444 2.059-.444 3.268v22.524h-13.41s.18-36.546 0-40.329h13.411v5.715c-.027.045-.065.089-.089.132h.089v-.132c1.782-2.742 4.96-6.662 12.085-6.662 8.822 0 15.436 5.764 15.436 18.149m-54.96-36.642c-4.587 0-7.588 3.011-7.588 6.967 0 3.872 2.914 6.97 7.412 6.97h.087c4.677 0 7.585-3.098 7.585-6.97-.089-3.956-2.908-6.967-7.496-6.967m-6.791 59.77H41.27v-40.33H27.865z"
                                                ></path>
                                            </svg>
                                        </Link></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
