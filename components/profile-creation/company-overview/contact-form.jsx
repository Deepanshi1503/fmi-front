import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/context";
import axios from "axios";

const ContactForm = ({ data, setData, title }) => {
  const [formData, setFormData] = useState({
    professionalEmail: "",
    phoneNumber: "",
    linkedInId: "",
  });

  const [errors, setErrors] = useState({});

  const { professionalEmail, phoneNumber, linkedInId } = formData;

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "phoneNumber") {
      const phoneRegex = /^[+]?[0-9]{10,15}$/;
      if (!phoneRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          phoneNumber: "Please enter a valid phone number (10-15 digits).",
        }));
      } else {
        setErrors((prev) => {
          const { phoneNumber, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  useEffect(() => {
    const formS = JSON.parse(localStorage.getItem("contact info CO"));
    if (professionalEmail === "" && phoneNumber === "" && linkedInId === "") {
      setFormData((prev) => ({ ...prev, ...formS }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contact info CO", JSON.stringify(formData));
  }, [professionalEmail, phoneNumber, linkedInId]);

  return (
    <div className="form-container mx-auto px-4 w-full">
      <form className="space-y-4">
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
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
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
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Enter Your Contact Number"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-2">{errors.phoneNumber}</p>
          )}
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
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Enter Your LinkedIn ID"
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
