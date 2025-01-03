"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

const RevenueModel = ({ onCompletion }) => {
  const [formData, setFormData] = useState({
    revenueModel: "",
  });

  useEffect(() => {
    const isCompleted =
      formData.revenueModel ;
    onCompletion(isCompleted);
  }, [formData]);

  const [revenueOptions, setRevenueOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/content-type-builder/content-types/api::business.business"
        );

        const schemaAttributes = response.data?.data?.schema?.attributes || {};

        // Fetch 'Status' options
        const typeOptions =
          schemaAttributes?.revenue_model?.enum.map((option) =>
            option.replace(/^"|"$/g, "") // Removes double quotes
          ) || [];

        setRevenueOptions(typeOptions);
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

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("combineInfo")) || {};
    const mergedData = { ...formData, ...savedData };
    setFormData(mergedData);
  }, []);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("combineInfo")) || {};
    const updatedData = { ...savedData, ...formData };
    localStorage.setItem("combineInfo", JSON.stringify(updatedData));
  }, [formData]);

  return (
    <div className="form-container mx-auto px-4 w-full">
      <form className="space-y-4">
        {/* Revenue Model */}
        <div className="form-group mb-4">
          <label htmlFor="revenueModel" className="block mb-3 text-[16px] text-left font-medium">
            Revenue Model*
          </label>
          <div className="select-wrapper relative">
            <select
              name="revenueModel"
              id="revenueModel"
              value={formData.revenueModel}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select an option</option>
              {revenueOptions.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RevenueModel;