import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/context";
import axios from "axios";

const ListingForm = ({ data, setData, title }) => {
  const [lookingForOptions, setLookingForOptions] = useState([]); // Options for 'What are you looking to do?'
  const [timeframeOptions, setTimeframeOptions] = useState([]); // Options for 'Preferred Timeframe'
  const [formData, setFormData] = useState({
    lookingFor: "",
    reason: "",
    preferredTimeframe: "",
  });

  const [error, setError] = useState("");

  // Fetch options from the backend
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch "What are you looking to do?" options (type enum)
        const lookingForResponse = await axios.get("/api/businesses");
        const lookingForData = lookingForResponse.data.map(item => item.type); // Extract type values

        // Fetch "Preferred Timeframe" options (time_frame_for_action enum)
        const timeframeResponse = await axios.get("/api/businesses");
        const timeframeData = timeframeResponse.data.map(item => item.time_frame_for_action); // Extract timeframe values

        setLookingForOptions(lookingForData);
        setTimeframeOptions(timeframeData);
      } catch (err) {
        console.error("Error fetching options:", err);
        setError("Failed to load options.");
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

  // // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!formData.lookingFor || !formData.preferredTimeframe || !formData.reason) {
  //     setError("Please fill all required fields.");
  //     return;
  //   }

  //   // Add the new form data to the list
  //   setData([...data, formData]);

  //   // Clear the form after submission
  //   setFormData({
  //     lookingFor: "",
  //     reason: "",
  //     preferredTimeframe: "",
  //   });
  //   setError(""); // Clear error
  // };

  return (
    <div className="form-container mx-auto px-4 w-full">

      {/* {error && <div className="text-red-500 text-center mb-4">{error}</div>} */}

      <form className="space-y-4">
        {/* "What are you looking to do?" Dropdown */}
        <div className="form-group mb-4">
          <label htmlFor="lookingFor" className="block mb-3 text-[16px] text-left font-medium">
            What are you looking to do?*
          </label>
          <div className="select-wrapper">
            <select
              name="lookingFor"
              id="lookingFor"
              value={formData.lookingFor}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#cccccc]"
            >o
              <option value="">Select an option</option>
              {lookingForOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
              {timeframeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
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
      </form >
    </div >
  );
};

export default ListingForm;
