"use client";
import React, { useState } from "react";

const TargetMarketForm = ({ data, setData }) => {
  const [formData, setFormData] = useState({
    targetMarketDescription: "",
    customerSegments: "",
    geographicReach: "",
    customerNeeds: "",
  });

  const customerSegmentOptions = ["B2B", "B2C", "B2G", "D2C"];

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
        {/* Target Market Description */}
        <div className="form-group mb-4">
          <label htmlFor="targetMarketDescription" className="block mb-3 text-[16px] text-left font-medium">
            Target Market Description*
          </label>
          <textarea
            name="targetMarketDescription"
            id="targetMarketDescription"
            value={formData.targetMarketDescription}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Who is your product/service intended for? Include details like age group, demographics, and industries."
            required
          />
        </div>

        {/* Customer Segments */}
        <div className="form-group mb-4">
          <label htmlFor="customerSegments" className="block mb-3 text-[16px] text-left font-medium">
            Customer Segments*
          </label>
          <div className="select-wrapper relative">
            <select
              name="customerSegments"
              id="customerSegments"
              value={formData.customerSegments}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select an option</option>
              {customerSegmentOptions.map((segment) => (
                <option key={segment} value={segment}>
                  {segment}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Geographic Reach */}
        <div className="form-group mb-4">
          <label htmlFor="geographicReach" className="block mb-3 text-[16px] text-left font-medium">
            Geographic Reach
          </label>
          <input
            type="text"
            name="geographicReach"
            id="geographicReach"
            value={formData.geographicReach}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Regions or countries where the product/service is available"
          />
        </div>

        {/* Customer Needs/Use Cases */}
        <div className="form-group mb-4">
          <label htmlFor="customerNeeds" className="block mb-3 text-[16px] text-left font-medium">
            Customer Needs/Use Cases
          </label>
          <textarea
            name="customerNeeds"
            id="customerNeeds"
            value={formData.customerNeeds}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="What specific customer needs or use cases does the product/service address?"
          />
        </div>
      </form>
    </div>
  );
};

export default TargetMarketForm;
