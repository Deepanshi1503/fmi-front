import React from 'react'

export default function LeftImageWithContent() {
    return (
        <section className='left-image-with-content-main padding3'>
            <div className='container'>
                <div className='lg:flex md:inline-block w-full overflow-hidden rounded-[20px]'>
                    <div className='lg:w-1/2 md:w-full '><img className='img-fluid w-full h-full object-cover' alt='image' src='images/all-img/split-imge-about.jpg' /></div>
                    <div className='lg:w-1/2 md:w-full xl:p-12 sm:p-8 p-8  flex flex-column justify-center'>
                        <h2 className='mb-4 text-capitalize'>for investors</h2>
                        <ul className='gap-3 mb-0 grid'>
                            <li className='flex items-center text-[18px] gap-1'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlSpace="preserve"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    className='shrink-0'
                                >
                                    <g fill="#0a66c2">
                                        <path
                                            d="M7.146 7.146a.75.75 0 0 1 1.061 0l8.5 8.5a.75.75 0 1 1-1.06 1.061l-8.5-8.5a.75.75 0 0 1 0-1.06z"
                                            data-original="#000000"
                                        ></path>
                                        <path
                                            d="M16.177 6.427a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1 0-1.5h8.25v-8.25a.75.75 0 0 1 .75-.75"
                                            data-original="#000000"
                                        ></path>
                                    </g>
                                </svg>Explore a diverse range of business proposals.</li>
                            <li className='flex items-center text-[18px] gap-1'><svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlSpace="preserve"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                className='shrink-0'
                            >
                                <g fill="#0a66c2">
                                    <path
                                        d="M7.146 7.146a.75.75 0 0 1 1.061 0l8.5 8.5a.75.75 0 1 1-1.06 1.061l-8.5-8.5a.75.75 0 0 1 0-1.06z"
                                        data-original="#000000"
                                    ></path>
                                    <path
                                        d="M16.177 6.427a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1 0-1.5h8.25v-8.25a.75.75 0 0 1 .75-.75"
                                        data-original="#000000"
                                    ></path>
                                </g>
                            </svg>Filter opportunites by industry type, business size, funding requirements and more.</li>
                            <li className='flex items-center text-[18px] gap-1'><svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlSpace="preserve"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                className='shrink-0'
                            >
                                <g fill="#0a66c2">
                                    <path
                                        d="M7.146 7.146a.75.75 0 0 1 1.061 0l8.5 8.5a.75.75 0 1 1-1.06 1.061l-8.5-8.5a.75.75 0 0 1 0-1.06z"
                                        data-original="#000000"
                                    ></path>
                                    <path
                                        d="M16.177 6.427a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1 0-1.5h8.25v-8.25a.75.75 0 0 1 .75-.75"
                                        data-original="#000000"
                                    ></path>
                                </g>
                            </svg>Review throughly curated proposals to make informed decisions.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
