import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export default function HomeLogoSlder() {
    return (
        <section className='home-logoSlider-main'>
            <div className='container'>
                <div className=''>
                    <Swiper
                        spaceBetween={100}
                        slidesPerView={8}
                        loop={true} // Enable looping
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 0, // No delay between slides
                            disableOnInteraction: false, // Keep autoplay even after user interaction
                        }}
                        speed={5000}
                        breakpoints={{

                            320: {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },

                            640: {
                                slidesPerView: 4,
                                spaceBetween: 70,
                            },

                            1024: {
                                slidesPerView: 6,
                                spaceBetween: 50,
                            },

                            1440: {
                                slidesPerView: 8,
                                spaceBetween: 100,
                            },

                            1800: {
                                slidesPerView: 8,
                                spaceBetween: 100,
                            },
                        }}
                    >



                        <SwiperSlide><img src='images/tatari-logo.jpg' alt='tatari-logo' className='img-fluid' /></SwiperSlide>
                        <SwiperSlide><img src='images/brex-logo.jpg' alt='brex-logo' className='img-fluid' /></SwiperSlide>
                        <SwiperSlide><img src='images/assembles-logo.jpg' alt='assembles-logo' className='img-fluid' /></SwiperSlide>
                        <SwiperSlide><img src='images/tatari-logo.jpg' alt='tatari-logo' className='img-fluid' /></SwiperSlide>
                        <SwiperSlide><img src='images/brex-logo.jpg' alt='brex-logo' className='img-fluid' /></SwiperSlide>
                        <SwiperSlide><img src='images/assembles-logo.jpg' alt='assembles-logo' className='img-fluid' /></SwiperSlide>
                        <SwiperSlide><img src='images/tatari-logo.jpg' alt='tatari-logo' className='img-fluid' /></SwiperSlide>
                        <SwiperSlide><img src='images/brex-logo.jpg' alt='brex-logo' className='img-fluid' /></SwiperSlide>
                        <SwiperSlide><img src='images/assembles-logo.jpg' alt='assembles-logo' className='img-fluid' /></SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section >
    )
}
