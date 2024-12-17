"use client";

import { useState } from "react";

const FounderForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [founders, setFounders] = useState([]); // List to store founders' data

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAddCoFounder = () => {
    // Validate inputs
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill out all fields before adding a co-founder.");
      return;
    }

    // Add the current data to the founders list
    setFounders([...founders, formData]);

    // Reset the form fields
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <div className="mx-12">
      <form className="space-y-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-left text-[#404D61] font-medium text-[18px]"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Founder's Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
          />
        </div>

        {/* Email Address */}
        <div>
          <label
            htmlFor="email"
            className="block text-left text-[#404D61] font-medium text-[18px]"
          >
            Email ID
          </label>
          <input
            id="email"
            type="email"
            placeholder="founder@example.com"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="block text-[#404D61] font-medium text-left text-[18px]"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="0123456789"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
          />
        </div>

        {/* Add Co-founder Button */}
        <div>
          <button
            type="button"
            onClick={handleAddCoFounder}
            className="px-4 font-medium py-2 bg-[#0B66C3] flex justify-start text-white rounded-[16px] text-[18px]"
          >
            + Add a co-founder
          </button>
        </div>
      </form>

      {/* Display Founders List */}
      {founders.length > 0 && (
        <div className="mt-8">
          <h3 className="text-[20px] font-semibold text-[#404D61] mb-4">
            Co-founders List
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {founders.map((founder, index) => (
              <li key={index} className="text-[#404D61]">
                <strong>{founder.name}</strong> - {founder.email}, {founder.phone}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FounderForm;
