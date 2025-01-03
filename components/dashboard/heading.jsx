"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import axios from "axios";

export default function Heading() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("All listings");

  const dropdownRef = useRef(null);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Fetch business data from backend
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userId"));
        if (!userId) return;

        const response = await axios.get(
          `http://localhost:1337/api/businesses?filters[user][id][$eq]=${userId}`
        );
        setBusinesses(response.data.data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };

    fetchBusinesses();
  }, []);

  // Handle dropdown selection
  const handleSelect = (business) => {
    console.log(business)
    setSelectedBusiness(business ? business.attributes.company_name : "All listings");
    setDropdownOpen(false);
    // onFilter(business); // Notify parent to filter content
  };

   // Close the dropdown if a click happens outside of it
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center mt-12">
      {/* Title Section */}
      <h1 className="text-[48px] font-semibold">Welcome To Dashboard</h1>

      {/* Dropdown Section */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-300"
        >
          <span className="text-sm font-medium">{selectedBusiness}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg z-10 w-48">
            <ul className="divide-y divide-gray-100">
              <li
                className="px-4 py-2 text-[16px] font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(null)}
              >
                All listings
              </li>
              {businesses.map((business) => (
                <li
                  key={business.id}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(business)}
                >
                  {business.attributes.company_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
