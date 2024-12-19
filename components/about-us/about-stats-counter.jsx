"use client"
import React from 'react'
import CountUp from 'react-countup';

export default function AboutStatsCounter() {
    return (
        <section className='about-status-section padding2'>
            <div className='container'>
                <divl className="about-stats-wrap">
                    <div className='counter-block-main'>
                        <div className='counter-box'>
                            <span>
                                <CountUp end={35} />k
                            </span>
                            <p>million+ funds raised</p>
                        </div>

                        <div className='counter-box'>
                            <span>
                                <CountUp end={3000} separator="" />+
                            </span>
                            <p>global angel investors</p>
                        </div>

                    </div>

                    <div className='stats-middle-women-image-block'>
                        <img className='img-fluid' alt='about stats women img' src='/images/all-img/about-stats-women-img.png' />

                    </div>

                    <div className='counter-block-main'>
                        <div className='counter-box'>
                            <span>
                                $<CountUp end={200} /><sub>mn+</sub>
                            </span>
                            <p>million+ funds raised</p>
                        </div>

                        <div className='counter-box'>
                            <span>
                                <CountUp end={3000} separator="" />+
                            </span>
                            <p>global angel investors</p>
                        </div>

                    </div>
                </divl>

            </div>
        </section >
    )
}
