"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import "swiper/css"

export default function HomeTestimonial() {
    return (

        <section className="client-testimonial-home-main padding-140">
            <div className="container">
                <h2>Here's what our<br /> customers have to say</h2>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={50}

                    autoplay={{
                        delay: 3000,
                        pauseOnMouseEnter: true,
                    }}
                    className="serviceCasestudy-slider"
                    breakpoints={{
                        320: {
                            slidesPerView: 1.220,
                            spaceBetween: 20,
                        },

                        640: {
                            slidesPerView: 1.220,
                            spaceBetween: 30,
                        },

                        1024: {
                            slidesPerView: 1.220,
                            spaceBetween: 40,
                        },

                        1370: {
                            slidesPerView: 1.220,
                            spaceBetween: 50,
                        },
                    }}
                >
                    <SwiperSlide>
                        <div className="serviceCasestudySlider-main">
                            <div className="serviceCasestudy-left">
                                <div className="casestudy-logo">
                                    <div className="logo-bg">
                                        <img
                                            width="300"
                                            height="300"
                                            loading="lazy"
                                            src="images/testimonial-img-1.jpg" // Use dynamic image if available
                                            alt="testimonial"
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="serviceCasestudy-right">
                                <div className="casestudy-quotes">
                                    The service was absolutely impeccible. I see myself and my family visiting here much more frequently.
                                </div>

                                <div className="casestudy-author">
                                    <div class="casestudy-author-name">Sanju Samson</div>
                                    <div class="casestudy-author-position">CRM Manager at xyz</div>
                                </div>

                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="serviceCasestudySlider-main">
                            <div className="serviceCasestudy-left">
                                <div className="casestudy-logo">
                                    <div className="logo-bg">
                                        <img
                                            width="300"
                                            height="300"
                                            loading="lazy"
                                            src="images/testimonial-img-2.jpg" // Use dynamic image if available
                                            alt="testimonial"
                                            className="img-responsive"
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="serviceCasestudy-right">
                                <div className="casestudy-quotes">
                                    The service was absolutely impeccible. I see myself and my family visiting here much more frequently.
                                </div>

                                <div className="casestudy-author">
                                    <div class="casestudy-author-name">Sanju Samson</div>
                                    <div class="casestudy-author-position">CRM Manager at xyz</div>
                                </div>

                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>

    )
}
