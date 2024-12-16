"use client"
import Image from 'next/image'
import Header from '@/components/profile-creation/header'
import ProfileStep from '@/components/profile-creation/steps'

export default function profile() {
    return (
        <>
            <Header/>
            <ProfileStep/>
        </>
    )
}