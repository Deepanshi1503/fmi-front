import React from 'react'
import Link from 'next/link'

export default function OurCoreServices() {
    return (
        <section className='ourCoureServices padding2'>
            <div className='container'>
                <div class="looking-investment-heading-block"><h2>Our Core Services</h2><Link class="view-all-btn" href="#">View all
                    <svg
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

                <div className='service-box-main'>
                    <ul className='flex sm:flex m-0 xl:gap-6 md:gap-3 sm:gap-3 gap-3 md:flex-wrap overflow-scroll xl:overflow-hidden'>
                        <li className='group  border border-black flex p-2 rounded-[10px] md:flex-1 transform transition-transform duration-300 hover:-translate-y-[5px] sm:shrink-0 shrink-0 sm:w-2/4   w-2/4'>
                            <div className='flex flex-col w-full  bg-[#f4faff] group-hover:bg-[#0a66c2]  justify-center items-center rounded-[10px] xl:py-8 xl:px-8 text-center'>
                                <img width={80} height={80} className='img-fluid  group-hover:invert group-hover:brightness-0' src='images/all-img/fund-raise-icon.svg' alt='fund raise icon' />
                                <p className='mb-0 text-capitalize mt-3 leading-normal group-hover:text-white'>fund raising</p>
                            </div>
                        </li>

                        <li className='group  border border-black flex p-2 rounded-[10px] md:flex-1 transform transition-transform duration-300 hover:-translate-y-[5px] sm:shrink-0 shrink-0 sm:w-2/4   w-2/4'>
                            <div className='flex flex-col w-full  bg-[#f4faff] group-hover:bg-[#0a66c2] justify-center items-center rounded-[10px] xl:py-8 xl:px-8 text-center'>
                                <img width={80} height={80} className='img-fluid group-hover:invert group-hover:brightness-0' src='images/all-img/Start-ui-funding.svg' alt='Start ui funding icon' />
                                <p className='mb-0 text-capitalize mt-3 leading-normal  group-hover:text-white'>Start-uli funding</p>
                            </div>
                        </li>

                        <li className='group  border border-black flex p-2 rounded-[10px] md:flex-1 transform transition-transform duration-300 hover:-translate-y-[5px] sm:shrink-0 shrink-0 sm:w-2/4   w-2/4'>
                            <div className='flex flex-col w-full  bg-[#f4faff]  group-hover:bg-[#0a66c2] justify-center items-center rounded-[10px] xl:py-8 xl:px-8 text-center'>
                                <img width={80} height={80} className='img-fluid group-hover:invert group-hover:brightness-0' src='images/all-img/industry-funding.svg' alt='industry funding icon' />
                                <p className='mb-0  text-capitalize mt-3 leading-normal  group-hover:text-white'>industry funding</p>
                            </div>
                        </li>

                        <li className='group  border border-black flex p-2 rounded-[10px] md:flex-1 transform transition-transform duration-300 hover:-translate-y-[5px] sm:shrink-0 shrink-0 sm:w-2/4   w-2/4'>
                            <div className='flex flex-col w-full  bg-[#f4faff] group-hover:bg-[#0a66c2] justify-center items-center rounded-[10px] xl:py-8 xl:px-8 text-center'>
                                <img width={80} height={80} className='img-fluid group-hover:invert group-hover:brightness-0' src='images/all-img/Equity-investor-icon.svg' alt='Equity investor icon' />
                                <p className='mb-0 text-capitalize mt-3 leading-normal  group-hover:text-white'>livirate equity investor relations</p>
                            </div>
                        </li>

                        <li className='group  border border-black flex p-2 rounded-[10px] md:flex-1 transform transition-transform duration-300 hover:-translate-y-[5px] sm:shrink-0 shrink-0 sm:w-2/4   w-2/4'>
                            <div className='flex flex-col w-full  bg-[#f4faff] group-hover:bg-[#0a66c2] justify-center items-center rounded-[10px] xl:py-8 xl:px-8 text-center'>
                                <img width={80} height={80} className='img-fluid group-hover:invert group-hover:brightness-0' src='images/all-img/seeling-busniss-icon.svg' alt='selling busniss icon' />
                                <p className='mb-0 text-capitalize mt-3 leading-normal  group-hover:text-white'>selling business</p>
                            </div>
                        </li>

                        <li className='group  border border-black flex p-2 rounded-[10px] md:flex-1 transform transition-transform duration-300 hover:-translate-y-[5px] sm:shrink-0 shrink-0 sm:w-2/4   w-2/4'>
                            <div className='flex flex-col w-full  bg-[#f4faff] group-hover:bg-[#0a66c2] justify-center items-center rounded-[10px] xl:py-8 xl:px-8 text-center'>
                                <img width={80} height={80} className='img-fluid group-hover:invert group-hover:brightness-0' src='images/all-img/investment-opportunity-icon.svg' alt='investment opportunity icon' />
                                <p className='mb-0  text-capitalize mt-3 leading-normal  group-hover:text-white'>investment opportunities</p>
                            </div>
                        </li>


                    </ul>
                </div>
            </div >
        </section >
    )
}
