import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/context";
import axios from "axios";

const ContactForm = ({ data, setData, title }) => {
  const [formData, setFormData] = useState({
    professionalEmail: "",
    phoneNumber: "",
    linkedInId: "",
  });

  const [error, setError] = useState("");

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.professionalEmail || !formData.phoneNumber) {
      setError("Please fill all required fields.");
      return;
    }

    // Add the new form data to the list
    setData([...data, formData]);

    // Clear the form after submission
    setFormData({
      professionalEmail: "",
      phoneNumber: "",
      linkedInId: "",
    });
    setError(""); // Clear error
  };

  return (
    <div className="form-container mx-auto px-4 w-full">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Professional Email ID */}
        <div className="form-group mb-4">
          <label htmlFor="professionalEmail" className="block mb-3 text-[16px] text-left font-medium">
            Professional Email ID*
          </label>
          <input
            type="email"
            name="professionalEmail"
            id="professionalEmail"
            value={formData.professionalEmail}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none"
            placeholder="Enter Your Professional Email ID"
          />
        </div>

        {/* Phone Number */}
        <div className="form-group mb-4">
          <label htmlFor="phoneNumber" className="block mb-3 text-[16px] text-left font-medium">
            Phone Number*
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none"
            placeholder="Enter Your Contact Number"
          />
        </div>

        {/* LinkedIn ID */}
        <div className="form-group mb-4">
          <label htmlFor="linkedInId" className="block mb-3 text-[16px] text-left font-medium">
            LinkedIn ID
          </label>
          <input
            type="url"
            name="linkedInId"
            id="linkedInId"
            value={formData.linkedInId}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none"
            placeholder="Enter Your LinkedIn ID"
          />
        </div>

        {/* Submit Button */}
        {/* <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Save
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default ContactForm;
