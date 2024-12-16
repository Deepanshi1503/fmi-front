import Link from 'next/link'
import React from 'react'

export default function CTAbluebuttons() {
    return (


        <section className='cta-btn-blueboxs-block'>
            <div className='container'>
                <div className='bluebox-wrap'>
                    <Link className='bluebox-cta' href="#">
                        <img src='images/raise-funds-icon.svg' className='img-fluid' alt='' />
                        <div className='cta-right-contentbox'>
                            <span>raise funds</span>
                            <p>With Global Investor Network</p>
                        </div>
                        <img src='images/white-down-arrow.svg' className='img-fluid bluebox-whitearrow' alt='white arrow' />
                    </Link>

                    <Link className='bluebox-cta' href="#">
                        <img src='images/sell-business-icon.svg' className='img-fluid' alt='' />
                        <div className='cta-right-contentbox'>
                            <span>sell your business</span>
                            <p>Reach the right buyers for your business</p>

                        </div>
                        <img src='images/white-down-arrow.svg' className='img-fluid bluebox-whitearrow' alt='white arrow' />
                    </Link>

                    <Link className='bluebox-cta' href="#">
                        <img src='images/start-investing-icon.svg' className='img-fluid' alt='' />
                        <div className='cta-right-contentbox'>
                            <span>start investing</span>
                            <p>In startups and business</p>
                        </div>
                        <img src='images/white-down-arrow.svg' className='img-fluid bluebox-whitearrow' alt='white arrow' />
                    </Link>
                </div>
            </div>
        </section>


    )
}
