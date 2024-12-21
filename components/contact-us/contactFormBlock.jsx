import React from 'react'
import ContactForm from '@/components/contact-us/ContactForm'

export default function ContactFormBlock() {
    return (
        <div>
            <section className='padding2 bg-[#f4faff]'>
                <div className='container'>
                    <div className='flex'>
                        <div className='w-1/4'>
                            <h2 className='text-[32px]'>Work inquiries</h2>
                            <p className='text-[16px] leading-normal'>Complete the form or email us your inquiry, and we’ll get back to you shortly.</p>
                        </div>
                        <div className='w-3/4'>
                            <ContactForm />

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
