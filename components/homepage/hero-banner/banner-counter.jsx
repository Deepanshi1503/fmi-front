"use client"
import React from 'react'
import CountUp from 'react-countup';

export default function Bannercounter() {
    return (

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

            <div className='counter-box'>
                <span>
                    <CountUp end={500} />+
                </span>
                <p>active institutional investors</p>
            </div>

            <div className='counter-box'>
                <span>
                    <CountUp end={70} />+
                </span>
                <p>national & international banks</p>
            </div>


        </div>



    )
}
