"use client";

import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const FounderForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [founders, setFounders] = useState([]); // List to store founders' data
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup visibility state
  const [editingIndex, setEditingIndex] = useState(null); // Track the founder being edited

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

    if (editingIndex !== null) {
      // Update the founder if editing
      const updatedFounders = [...founders];
      updatedFounders[editingIndex] = formData;
      setFounders(updatedFounders);
      setEditingIndex(null);
    } else {
      // Add a new founder
      setFounders([...founders, formData]);
    }

    // Reset the form fields
    setFormData({ name: "", email: "", phone: "" });

    // Close the popup
    setIsPopupOpen(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(founders[index]);
    setIsPopupOpen(true);
  };

  const handleDelete = (index) => {
    const updatedFounders = founders.filter((_, i) => i !== index);
    setFounders(updatedFounders);
  };

  return (
    <div className="2xl:mx-12 relative">
      {/* Co-founders List */}
      <div className="space-y-4">
        {founders.map((founder, index) => (
          <div
            key={index}
            className="flex justify-between border border-[#E1E3E6] rounded-lg p-4"
          >
            <details
              className="flex-grow"
              onToggle={(e) => {
                const detailElement = e.target;
                const summary = detailElement.querySelector("summary span");
                if (summary) {
                  summary.style.whiteSpace = detailElement.open
                    ? "normal"
                    : "nowrap"; // Toggle truncation on expand
                }
              }}
            >
              <summary className="text-[#404D61] font-medium text-[18px] text-left cursor-pointer flex items-center">
                <span className="mr-4 truncate w-[50px] sm:w-auto">
                  {founder.name}
                </span>
              </summary>
              <div className="mt-2 text-sm text-left text-gray-600">
                <h5>
                  <strong>Email:</strong> {founder.email}
                </h5>
                <h5>
                  <strong>Phone:</strong> {founder.phone}
                </h5>
              </div>
            </details>
            {/* Edit and Delete Buttons */}
            <div className="flex space-x-4 h-[2rem]">
              <button
                onClick={() => handleEdit(index)}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg inline-flex items-center justify-center min-w-fit"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg inline-flex items-center justify-center"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* Add Co-founder Button */}
      <button
        type="button"
        onClick={() => setIsPopupOpen(true)}
        className={`${founders.length > 0 ? "mt-4" : ""
          } px-4 font-medium py-2 bg-[#0B66C3] text-white rounded-[16px] text-[12px] 2xl:text-[18px]`}
      >
        + Add a co-founder
      </button>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            <h2 className="text-[20px] font-semibold text-[#404D61] mb-4">
              {editingIndex !== null ? "Edit Co-founder Details" : "Add Co-founder Details"}
            </h2>
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

              {/* Popup Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsPopupOpen(false);
                    setEditingIndex(null);
                  }}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCoFounder}
                  className="px-4 py-2 bg-[#0B66C3] text-white rounded-lg"
                >
                  {editingIndex !== null ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FounderForm;
