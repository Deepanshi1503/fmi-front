"use client";
import React, { useState } from "react";

const MarketOpportunityForm = ({ data, setData }) => {
  const [formData, setFormData] = useState({
    marketOpportunity: "",
  });

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
        {/* Market Opportunity & Size */}
        <div className="form-group">
          <textarea
            name="marketOpportunity"
            id="marketOpportunity"
            value={formData.marketOpportunity}
            onChange={handleChange}
            rows="6"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500 resize-none"
            placeholder="Provide details about the market opportunity and size"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default MarketOpportunityForm;
