"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Header2() {
    return (
        <nav className="bg-[#0A66C2] mx-12 mt-10 rounded-t-2xl">
            <div className="container mx-auto px-12 flex items-center justify-between py-2">
                {/* Logo */}
                <div className="flex items-center justify-between">
                    <Link href="/" className="logo">
                        <Image
                            loading="lazy"
                            // className="h-auto w-auto"
                            src="/images/logo2.png"
                            alt="logo"
                            width={200}
                            height={77}
                        />
                    </Link>

                    <Link
                        href="#"
                        className="text-[22px] text-white hover:text-gray-200 transition duration-300 mr-4 mt-2"
                    >
                        Businesses
                    </Link>
                    <Link
                        href="#"
                        className="text-[22px] text-white hover:text-gray-200 transition duration-300 mt-2"
                    >
                        Investors
                    </Link>
                </div>

                {/* Hamburger Menu for Mobile */}
                <button
                    className="lg:hidden text-white focus:outline-none"
                    aria-label="Toggle navigation"
                    id="menu-toggle"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>

                {/* Navigation Links */}
                <div className="hidden mt-2 lg:flex items-center space-x-6 mr-4">
                    <Link
                        href="#"
                        className="text-[22px] text-white hover:text-gray-200 transition duration-300"
                    >
                        Contact Us
                    </Link>
                    <Link href="/signup">
                        <button className="ml-4 px-4 py-2 text-[18px] bg-white text-[#0A66C2] rounded-lg font-normal hover:bg-gray-100 transition duration-300">
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div
                id="mobile-menu"
                className="hidden lg:hidden flex flex-col bg-[#0A66C2] text-white space-y-2 px-4 pb-4"
            >
                <Link
                    href="#"
                    className="text-white hover:text-gray-200 transition duration-300"
                >
                    Businesses
                </Link>
                <Link
                    href="#"
                    className="text-white hover:text-gray-200 transition duration-300"
                >
                    Investors
                </Link>
                <Link
                    href="#"
                    className="text-white hover:text-gray-200 transition duration-300"
                >
                    Contact Us
                </Link>
                <Link href="/signup">
                    <button className="w-full px-4 py-2 bg-white text-[#0A66C2] rounded-lg font-medium hover:bg-gray-100 transition duration-300">
                        Sign In
                    </button>
                </Link>
            </div>
        </nav>
    );
}
