import React from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import RefundPolicy from '../../components/refund-policy/refund-policy'

export default function page() {
    return (
        <div>

            {/* header */}
            <Header />

            {/* refund policy */}
            <RefundPolicy />

            {/* footer */}
            <Footer />

        </div>
    )
}
