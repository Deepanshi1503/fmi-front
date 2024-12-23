"use client";
import React, { useState } from "react";

const KeyFeaturesUSPs = ({ data, setData }) => {
  const [formData, setFormData] = useState({
    keyFeatures: "",
    technologyUsed: "",
    awards: "",
  });

  const statusOptions = ["Prototype", "MVP", "Launched", "Scaling"];

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
        {/* Key Features/USPs */}
        <div className="form-group mb-4">
          <label htmlFor="keyFeatures" className="block mb-3 text-[16px] text-left font-medium">
            Key Features/USPs*
          </label>
          <textarea
            name="keyFeatures"
            id="keyFeatures"
            value={formData.keyFeatures}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="List the unique features that set the product/service apart from competitors"
            required
          />
        </div>

        {/* Technology/Framework Used */}
        <div className="form-group mb-4">
          <label htmlFor="technologyUsed" className="block mb-3 text-[16px] text-left font-medium">
            Technology/Framework Used
          </label>
          <input
            type="text"
            name="technologyUsed"
            id="technologyUsed"
            value={formData.technologyUsed}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Details about the technology stack or methods used"
          />
        </div>

        {/* Awards or Recognitions */}
        <div className="form-group mb-4">
          <label htmlFor="awards" className="block mb-3 text-[16px] text-left font-medium">
            Awards or Recognitions
          </label>
          <textarea
            name="awards"
            id="awards"
            value={formData.awards}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Any accolades or recognitions the product/service has received"
          />
        </div>
      </form>
    </div>
  );
};

export default KeyFeaturesUSPs;