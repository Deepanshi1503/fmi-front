"use client";

import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const FounderForm = () => {
  const [formData, setFormData] = useState({
    profileImage: "",
    name: "",
    role: "",
    education: "",
    professionalBackground: "",
    linkedinProfile: "",
  });
  const [founders, setFounders] = useState([]); // List to store founders' data
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup visibility state
  const [editingIndex, setEditingIndex] = useState(null); // Track the founder being edited

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCoFounder = () => {
    // Validate inputs
    if (!formData.name || !formData.role || !formData.education || !formData.linkedinProfile) {
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
    setFormData({
      profileImage: "",
      name: "",
      role: "",
      education: "",
      professionalBackground: "",
      linkedinProfile: "",
    });

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
    <div className="xl:mx-12 relative">
      {/* Co-founders List */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {founders.map((founder, index) => (
          <div
            key={index}
            className="rounded-lg shadow-md p-4 border-2 border-[#18181833] flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full border-2 border-[#18181833] overflow-hidden mb-4">
              {founder.profileImage ? (
                <img
                  src={founder.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                  <span className="text-white text-2xl">A</span>
                </div>
              )}
            </div>
            <h3 className="font-semibold text-lg text-[#404D61]">{founder.name}</h3>
            <h3 className="text-sm text-gray-500">{founder.role}</h3>
            <h3 className="text-sm text-gray-500">{founder.education}</h3>
            <a
              href={founder.linkedinProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A66C2] text-sm"
            >
              LinkedIn
            </a>

            {/* Edit and Delete Buttons */}
            <div className="mt-2 flex space-x-4">
              <button
                onClick={() => handleEdit(index)}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg inline-flex items-center justify-center"
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

      {/* Add Co-founder Button (Moved below cards) */}
      <button
        type="button"
        onClick={() => setIsPopupOpen(true)}
        className={`${founders.length > 0 ? "mt-8" : ""} px-4 font-medium py-2 bg-[#0B66C3] text-white rounded-[16px] text-[12px] 2xl:text-[18px]`}
      >
        + Add a co-founder
      </button>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl p-6">
            <h2 className="text-[20px] font-semibold text-[#404D61] mb-4">
              {editingIndex !== null ? "Edit Co-founder Details" : "Add Co-founder Details"}
            </h2>
            <form className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Image */}
              <div>
                <label htmlFor="profileImage" className="block mt-4 text-left text-[#404D61] font-medium text-[18px]">
                  Profile Image
                </label>
                <input
                  id="profileImage"
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                />
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-left text-[#404D61] font-medium text-[18px]">
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

              {/* Role/Designation */}
              <div>
                <label htmlFor="role" className="block text-left text-[#404D61] font-medium text-[18px]">
                  Role/Designation
                </label>
                <input
                  id="role"
                  type="text"
                  placeholder="Role/Designation"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                />
              </div>

              {/* Education */}
              <div>
                <label htmlFor="education" className="block text-left text-[#404D61] font-medium text-[18px]">
                  Education
                </label>
                <input
                  id="education"
                  type="text"
                  placeholder="Education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                />
              </div>

              {/* Professional Background (Expandable) */}
              <div>
                <label htmlFor="professionalBackground" className="block text-left text-[#404D61] font-medium text-[18px]">
                  Professional Background
                </label>
                <textarea
                  id="professionalBackground"
                  placeholder="Professional Background"
                  value={formData.professionalBackground}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                  rows={2}
                />
              </div>

              {/* LinkedIn Profile */}
              <div>
                <label htmlFor="linkedinProfile" className="block text-left text-[#404D61] font-medium text-[18px]">
                  LinkedIn Profile URL
                </label>
                <input
                  id="linkedinProfile"
                  type="url"
                  placeholder="LinkedIn Profile"
                  value={formData.linkedinProfile}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                />
              </div>
            </form>

            {/* Popup Buttons */}
            <div className="flex justify-end space-x-4 mt-4">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default FounderForm;
