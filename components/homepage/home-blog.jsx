"use client"
import Link from 'next/link'
import React from 'react'

export default function HomeBlog() {
    return (
        <section className="blog_section padding-140">
            <div className="container">
                <div class="looking-investment-heading-block">
                    <h2>The Latest Insights</h2>
                    <Link class="view-all-btn" href="#">View all
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
                        </svg>
                    </Link>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12 col-xl-4">
                        <div className="single-post wow fadeInUp" data-wow-delay="0.2s">
                            <div className="blog-image">
                                <Link href="#" className="post-img">
                                    <img className='img-fluid' src="images/blog-image-1.jpg" alt="Blog Image" />
                                </Link>
                            </div>

                            <div className="blog-info">
                                <h4><Link href="#">Discover companies with search and AI powered recommendations</Link></h4>                                    <h5>2 min read
                                    <Link href="#"><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlSpace="preserve"
                                        width="40"
                                        height="40"
                                        viewBox="0 0 24 24"
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
                                    </svg></Link></h5>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 col-xl-4 res-blog-margin">
                        <div className="single-post wow fadeInUp" data-wow-delay="0.3s">
                            <div className="blog-image">
                                <a href="#" className="post-img">
                                    <img className='img-fluid' src="images/blog-image-1.jpg" alt="Blog Image" />
                                </a>
                            </div>

                            <div class="blog-info">
                                <h4><Link href="#">Discover companies with search and AI powered recommendations</Link></h4>                                    <h5>2 min read
                                    <Link href="#"><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlSpace="preserve"
                                        width="40"
                                        height="40"
                                        viewBox="0 0 24 24"
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
                                    </svg></Link></h5>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 col-xl-4">
                        <div className="single-post wow fadeInUp" data-wow-delay="0.4s">
                            <div className="blog-image">
                                <Link href="#" className="post-img">
                                    <img className='img-fluid' src="images/blog-image-1.jpg" alt="Blog Image" />
                                </Link>
                            </div>

                            <div className="blog-info">
                                <h4><Link href="#">Discover companies with search and AI powered recommendations</Link></h4>
                                <h5>2 min read
                                    <Link href="#"><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlSpace="preserve"
                                        width="40"
                                        height="40"
                                        viewBox="0 0 24 24"
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
                                    </svg></Link></h5>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
