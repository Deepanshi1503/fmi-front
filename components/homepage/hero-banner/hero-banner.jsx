import React from 'react'
import Bannercounter from './banner-counter'

export default function Herobanner() {
    return (
        <section className='herobanner-main'>
            <div className='herobanner-wrap'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-7'>
                            <h1>Expand your business<br /> with global investors</h1>
                            <p>Tap into an extensive network of investors, both local and global, ready to support your vision. Our platform simplifies fundrasing by connecting yout with the right partners to drive success.</p>
                            <Bannercounter />
                        </div>
                        <figure><img className='img-fluid' alt='banner-man-woman-image' src='images/banner-man-woman-image.png' /></figure>
                    </div>
                </div>
            </div>
        </section >
    )
}
