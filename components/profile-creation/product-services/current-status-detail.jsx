"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrentStatusForm = ({ data, setData }) => {
  const [formData, setFormData] = useState({
    currentStatus: "",
  });

  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/content-type-builder/content-types/api::business.business"
        );

        const schemaAttributes = response.data?.data?.schema?.attributes || {};

        // Fetch 'Status' options
        const typeOptions =
          schemaAttributes?.current_status?.enum.map((option) =>
            option.replace(/^"|"$/g, "") // Removes double quotes
          ) || [];

        setStatusOptions(typeOptions);
      } catch (err) {
        console.error("Error fetching company options:", err);
        // setError("Failed to load company options.");
      }
    };

    fetchOptions();
  }, []);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="form-container mx-auto px-4 w-full">
      <form className="space-y-4">
        {/* Current Status */}
        <div className="form-group mb-4">
          <label htmlFor="currentStatus" className="block mb-3 text-[16px] text-left font-medium">
            Current Status*
          </label>
          <div className="select-wrapper relative">
            <select
              name="currentStatus"
              id="currentStatus"
              value={formData.currentStatus}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select an option</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CurrentStatusForm;