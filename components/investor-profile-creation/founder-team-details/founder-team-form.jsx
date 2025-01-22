"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const FounderServiceForm = ({ onCompletion }) => {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    profileImage: "",
    name: "",
    role: "",
    education: "",
    professionalBackground: "",
    linkedinProfile: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Load saved items from localStorage on mount
  useEffect(() => {
    const combineInfo = JSON.parse(localStorage.getItem("combineInvestorInfo")) || {};
    const savedItems = combineInfo.founderServiceData || [];
    setItems(Array.isArray(savedItems) ? savedItems : []);
  }, []);
  // Save items to localStorage whenever they change
  useEffect(() => {
    const combineInfo = JSON.parse(localStorage.getItem("combineInvestorInfo")) || {};
    combineInfo.founderServiceData = items; // Update only founderServiceData
    localStorage.setItem("combineInvestorInfo", JSON.stringify(combineInfo));
    if (onCompletion) {
      onCompletion(items.length > 0);
    }
  }, [items]);

  // Populate form fields when editIndex changes
  useEffect(() => {
    if (editIndex !== null) {
      const item = items[editIndex];
      setFormData(item);
      setImagePreview(item?.profileImage?.fileUrl || null);
    }
  }, [editIndex]);

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("files", file);

      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          const uploadedFile = responseData[0]; 

          const fileId = uploadedFile.id;
          const fileUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${uploadedFile.url}`;

          setFormData((prev) => ({
            ...prev,
            profileImage: { fileId, fileUrl },
          }));
        } else {
          console.error("Error uploading image:", await response.json());
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Update existing item
      const updatedItems = [...items];
      updatedItems[editIndex] = formData;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      // Add new item
      setItems((prev) => [formData, ...prev]);
    }

    setFormData({
      profileImage: "",
      name: "",
      role: "",
      education: "",
      professionalBackground: "",
      linkedinProfile: "",
    });

    setShowModal(false);
  };

  // Handle Edit
  const handleEdit = (index) => {
    setEditIndex(index);
    setShowModal(true);
  };

  // Handle Delete
  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="form-container mx-auto px-4 w-full">
      {/* Display Added Items */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Added Founders</h3>
        {items.length === 0 ? (
          <p className="text-gray-500">No founders added yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-lg rounded-lg flex flex-col justify-between items-center transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                {item.profileImage && (
                  <img
                    src={item.profileImage.fileUrl}
                    alt={`${item.name}'s Profile`}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                )}
                <div className="flex flex-col items-center text-center">
                  <h4 className="text-xl font-semibold text-[#0A66C2]">{item.name}</h4>
                  <p className="text-gray-600 mt-2">{item.role}</p>
                  <p className="text-gray-600 mt-1">{item.education}</p>
                  <p className="text-gray-600 mt-1 w-[60%] italic break-words whitespace-pre-line">{item.professionalBackground}</p>
                  <a
                    href={item.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 mt-2 underline"
                  >
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Founder Button */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full p-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 mt-6"
      >
        Add Founder
      </button>

      {/* Modal for Form */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[900px] shadow-md">
            <h3 className="text-lg font-semibold mb-6 text-center">Add Team Members Details</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-4">
              {/* Name */}
              <div className="col-span-1">
                <label className="block mb-2 text-left">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Profile Image */}
              <div className="col-span-1">
                <label className="block mb-2 text-left">Profile Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Role & Designation */}
              <div className="col-span-1">
                <label className="block mb-2 text-left">Role & Designation</label>
                <input
                  type="text"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Role & Designation"
                  required
                />
              </div>

              {/* Education */}
              <div className="col-span-1">
                <label className="block mb-2 text-left">Education</label>
                <input
                  type="text"
                  id="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Education"
                  required
                />
              </div>

              {/* LinkedIn Profile URL */}
              <div className="col-span-1">
                <label className="block mb-2 text-left">LinkedIn Profile URL</label>
                <input
                  type="url"
                  id="linkedinProfile"
                  value={formData.linkedinProfile}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  placeholder="LinkedIn Profile"
                  required
                />
              </div>

              {/* Professional Background */}
              <div className="col-span-1">
                <label className="block mb-2 text-left">Professional Background</label>
                <textarea
                  id="professionalBackground"
                  placeholder="Professional Background"
                  value={formData.professionalBackground}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                  rows={2}
                />
              </div>

              {/* Buttons */}
              <div className="col-span-2 flex justify-end space-x-4 mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-2 px-6 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {editIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>

      )}
    </div>
  );
};

export default FounderServiceForm;
