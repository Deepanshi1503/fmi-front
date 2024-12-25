import React, { useState, useEffect } from "react";
import axios from "axios";

const ListingForm = ({ data, setData, title }) => {
  const [lookingForOptions, setLookingForOptions] = useState([]);
  const [timeFrameOptions, setTimeFrameOptions] = useState([]);
  const [formData, setFormData] = useState({
    lookingFor: "",
    reason: "",
    preferredTimeframe: "",
  });

  const {lookingFor, reason, preferredTimeframe} = formData;

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

  const [error, setError] = useState("");

  // Fetch the enum options for 'purpose_of_listing_business'
  useEffect(() => {
    const fetchEnumOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/content-type-builder/content-types/api::business.business"
        );

        const enumOptions =
          response.data?.data?.schema?.attributes || {};

        const lookingForEnum =
          enumOptions?.purpose_of_listing_business?.enum || [];
        const timeframeEnum =
          enumOptions?.preferred_timeframe_for_action?.enum.map((item) =>
            item
              .replace(/^"|"$/g, "") // Removes double quotes
              .replace(/\s*-\s*/g, " - ") // Ensures proper formatting around dashes
          ) || [];

        setLookingForOptions(lookingForEnum);
        setTimeFrameOptions(timeframeEnum);
      } catch (err) {
        console.error("Error fetching enum options:", err);
        setError("Failed to load options.");
      }
    };

    fetchEnumOptions();
  }, []);

  return (
    <div className="form-container mx-auto px-4 w-full">
      <form className="space-y-4">
        {/* "What are you looking to do?" Radio Buttons */}
        <div className="form-group mb-4">
          <label htmlFor="lookingFor" className="block mb-3 text-[16px] text-left font-medium">
            What are you looking to do?*
          </label>
          <div className="flex space-x-12">
            {lookingForOptions.map((option) => (
              <div key={option} className="">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="lookingFor"
                    value={option}
                    checked={formData.lookingFor === option}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2 text-gray-700 whitespace-nowrap">{option}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* "Reason for Selling or Raising Funds" */}
        <div className="form-group mb-4">
          <label htmlFor="reason" className="block mb-3 text-[16px] text-left font-medium">
            Reason for Selling or Raising Funds
          </label>
          <textarea
            name="reason"
            id="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Provide a brief explanation"
            required
          />
        </div>

        {/* "Preferred Timeframe for Action" Dropdown */}
        <div className="form-group">
          <label htmlFor="preferredTimeframe" className="block mb-3 text-[16px] text-left font-medium">
            Preferred Timeframe for Action*
          </label>
          <div className="select-wrapper">
            <select
              name="preferredTimeframe"
              id="preferredTimeframe"
              value={formData.preferredTimeframe}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#cccccc]"
            >
              <option value="">Select a timeframe</option>
              {/* Add hardcoded or dynamically fetched options here */}
              {timeFrameOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ListingForm;
