"use client";
import React, { useState } from "react";

const RevenueModel = ({ data, setData }) => {
  const [formData, setFormData] = useState({
    revenueModel: "",
    pricingStrategy: "",
    salesChannels: "",
    retentionStrategy: "",
  });

  const revenueOptions = ["Subscription", "One-time Sale", "Licensing", "Freemium"];

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

        {/* Pricing Strategy */}
        <div className="form-group mb-4">
          <label htmlFor="pricingStrategy" className="block mb-3 text-[16px] text-left font-medium">
            Pricing Strategy
          </label>
          <textarea
            name="pricingStrategy"
            id="pricingStrategy"
            value={formData.pricingStrategy}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Details about pricing tiers, discounts, or bundling strategies"
          />
        </div>

        {/* Sales Channels */}
        <div className="form-group mb-4">
          <label htmlFor="salesChannels" className="block mb-3 text-[16px] text-left font-medium">
            Sales Channels
          </label>
          <textarea
            name="salesChannels"
            id="salesChannels"
            value={formData.salesChannels}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="How is the product/service sold? E.g., Online, Retail, Direct Sales"
          />
        </div>

        {/* Retention Strategy */}
        <div className="form-group mb-4">
          <label htmlFor="retentionStrategy" className="block mb-3 text-[16px] text-left font-medium">
            Retention Strategy
          </label>
          <textarea
            name="retentionStrategy"
            id="retentionStrategy"
            value={formData.retentionStrategy}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Plans or features designed to retain customers, such as loyalty programs or continuous updates"
          />
        </div>
      </form>
    </div>
  );
};

export default RevenueModel;