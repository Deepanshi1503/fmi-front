"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Heading() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex justify-between items-center mt-12">
      {/* Title Section */}
      <h1 className="text-[48px] font-semibold">Welcome To Dashboard</h1>

      {/* Dropdown Section */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 bg-[#E5E7EB] px-4 py-2 rounded-lg hover:bg-[#E5E8EB]"
        >
          <span>All listings</span>
          {/* Optional: Add an icon for the dropdown */}
          <ChevronDown/>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 w-auto bg-[#E5E7EB] text-black rounded-md whitespace-nowrap">
            <ul>
              <li className="px-4 py-2 hover:bg-[#f0f0f0] cursor-pointer">All listing</li>
              <li className="px-4 py-2 hover:bg-[#f0f0f0] cursor-pointer">Fintech Business</li>
              <li className="px-4 py-2 hover:bg-[#f0f0f0] cursor-pointer">Health Care Business</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
