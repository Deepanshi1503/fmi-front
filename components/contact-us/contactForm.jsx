import React from 'react'

export default function ContactForm() {
    return (
        <div>
            <form>
                <div className='flex'>
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium">
                            First Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Full Name"
                            className="w-full p-3 rounded-md border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium">
                            Last Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Last Name"
                            className="w-full p-3 rounded-md border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                </div>
            </form>
        </div>
    )
}
