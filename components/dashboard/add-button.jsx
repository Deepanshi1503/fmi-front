import React, { useState, useRef, useEffect } from 'react';

const AddButton = () => {
    const [showOptions, setShowOptions] = useState(false);
    const optionsMenuRef = useRef(null);

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

    return (
        <div className="fixed bottom-6 right-52">
            {/* Options Menu */}
            {showOptions && (
                <div ref={optionsMenuRef} className="absolute bottom-16 right-12 bg-white shadow-lg rounded-lg p-2 flex flex-col gap-2">
                    <button
                        className="text-black text-left py-2 px-4 rounded-md hover:bg-[#F7F6F5] whitespace-nowrap outline-none"
                        onClick={() => alert("Create Fundraise clicked")}
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