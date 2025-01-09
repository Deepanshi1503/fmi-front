import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import axios from 'axios';

const AddButton = () => {
    const [showOptions, setShowOptions] = useState(false);
    const optionsMenuRef = useRef(null);
    const router = useRouter();

    // Close the options menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target)) {
                setShowOptions(false); // Close the menu
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCreateFundraise = async () => {
        try {
            // Fetch the logged-in user's ID (from token/session)
            const userId = localStorage.getItem('userId'); // Replace with your auth mechanism
            if (!userId) {
                alert('User is not logged in!');
                return;
            }

            // Create a new business listing
            const response = await axios.post('http://localhost:1337/api/businesses', {
                data: {
                    user: userId, // Associate the business with the logged-in user
                    company_name: 'New Business', // Default values; user will edit these
                    title: 'Untitled Business',
                },
            });

            // Get the new business ID
            const businessId = response.data.data.id;

            // Save the business ID to localStorage
            localStorage.setItem('businessId', businessId);

            // Navigate to the profile creation page
            router.push('/profile-creation');
        } catch (error) {
            console.error('Error creating business listing:', error);
            alert('Failed to create a new business listing. Please try again.');
        }
    };

    return (
        <div className="fixed bottom-6 right-52">
            {/* Options Menu */}
            {showOptions && (
                <div ref={optionsMenuRef} className="absolute bottom-16 right-12 bg-white shadow-lg rounded-lg p-2 flex flex-col gap-2">
                    <button
                        className="text-black text-left py-2 px-4 rounded-md hover:bg-[#F7F6F5] whitespace-nowrap outline-none"
                        onClick={handleCreateFundraise}
                    >
                        Create Sale / Fundraise
                    </button>
                    {/* <button
                            className="text-black text-left py-2 px-4 rounded-md hover:bg-[#F7F6F5] whitespace-nowrap outline-none"
                            onClick={() => alert("Create Sale clicked")}
                        >
                            Create Sale
                        </button> */}
                    <button
                        className="text-black text-left py-2 px-4 rounded-md hover:bg-[#F7F6F5] whitespace-nowrap outline-none"
                        onClick={() => alert("Create Investor Profile clicked")}
                    >
                        Create Investor Profile
                    </button>
                </div>
            )}

            {/* Add Button */}
            <button
                className="bg-[#0B66C3] text-white w-16 h-16 rounded-full shadow-lg hover:bg-blue-600 flex items-center justify-center text-5xl outline-none"
                onClick={() => setShowOptions(!showOptions)}
            >
                +
            </button>
        </div>
    );
}

export default AddButton;