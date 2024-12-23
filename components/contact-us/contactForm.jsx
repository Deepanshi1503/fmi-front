"use client"
import React from 'react'

export default function ContactForm() {
    return (
        <form className="relative z-10">
            <div className="flex flex-wrap">
                <div className="xl:w-1/3 w-full p-2">
                    <label htmlFor="first-name" className="block text-gray-700 font-medium"> First Name </label>
                    <input id="first-name" type="text" placeholder="Full Name" className="w-full p-3 rounded-md border-gray-300 bg-white-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div className="xl:w-1/3 w-full p-2">
                    <label htmlFor="last-name" className="block text-gray-700 font-medium"> Last Name </label>
                    <input id="last-name" type="text" placeholder="Last Name" className="w-full p-3 rounded-md border-gray-300 bg-white-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div className="xl:w-1/3 w-full p-2">
                    <label htmlFor="company" className="block text-gray-700 font-medium"> Company/Consultancy </label>
                    <input id="company" type="text" placeholder="Company/Consultancy" className="w-full p-3 rounded-md border-gray-300 bg-white-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div className="xl:w-1/3 w-full p-2">
                    <label htmlFor="employees" className="block text-gray-700 font-medium"> No. of Employees</label>
                    <input id="employees" type="text" placeholder="No. of Employees" className="w-full p-3 rounded-md border-gray-300 bg-white-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div className="xl:w-1/3 w-full p-2">
                    <label htmlFor="email" className="block text-gray-700 font-medium"> Email Address</label>
                    <input id="email" type="email" placeholder="Email Address" className="w-full p-3 rounded-md border-gray-300 bg-white-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div className="xl:w-1/3 w-full p-2">
                    <label htmlFor="phone" className="block text-gray-700 font-medium"> Phone Number</label>
                    <input id="phone" type="text" placeholder="Phone Number" className="w-full p-3 rounded-md border-gray-300 bg-white-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div className="xl:w-full w-full p-2">
                    <label htmlFor="message" className="block text-gray-700 font-medium"> Message</label>
                    <textarea id="message" placeholder="Message" className="resize-none w-full h-32 p-3 rounded-md border-gray-300 bg-white-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
            </div>
        </form>
    )
}
