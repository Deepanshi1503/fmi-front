"use client"
import React from 'react'
import ContactForm from './contactForm'
export default function ContactFormBlock() {
    return (
        <div>
            <section className='padding-140 pt-0'>
                <div className='container'>
                    <div className='flex justify-center'>
                        <div className='xl:w-3/4 sm:w-full relative overflow-hidden'>
                            <div className='bg-[#f4faff] xl:p-16 p-7 rounded-[14px]'>
                                <div className="hidden lg:block absolute w-72 h-72 bg-gradient-to-br from-[#DDEAFC] to-[#4D8FD7] rounded-full -top-[120px] -right-[120px] opacity-40"></div>
                                <h2 className='text-[32px]'>Work inquiries</h2>
                                <p className='text-[16px] leading-normal lg:mb-8'>Complete the form or email us your inquiry, and we’ll get back to you shortly.</p>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
