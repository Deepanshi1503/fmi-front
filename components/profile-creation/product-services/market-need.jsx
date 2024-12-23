"use client";
import React, { useState } from "react";

const MarketNeed = ({ data, setData }) => {
  const [formData, setFormData] = useState({
    problemStatement: "",
    marketNeed: "",
    competitiveAdvantage: "",
    competitorAnalysis: "",
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
        {/* Problem Statement */}
        <div className="form-group mb-4">
          <label htmlFor="problemStatement" className="block mb-3 text-[16px] text-left font-medium">
            Problem Statement*
          </label>
          <textarea
            name="problemStatement"
            id="problemStatement"
            value={formData.problemStatement}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="What specific market problem does the product/service aim to solve?"
            required
          />
        </div>

        {/* Market Need */}
        <div className="form-group mb-4">
          <label htmlFor="marketNeed" className="block mb-3 text-[16px] text-left font-medium">
            Market Need
          </label>
          <textarea
            name="marketNeed"
            id="marketNeed"
            value={formData.marketNeed}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Why is this product/service relevant? Mention any supporting data or trends."
          />
        </div>

        {/* Competitive Advantage */}
        <div className="form-group mb-4">
          <label htmlFor="competitiveAdvantage" className="block mb-3 text-[16px] text-left font-medium">
            Competitive Advantage
          </label>
          <textarea
            name="competitiveAdvantage"
            id="competitiveAdvantage"
            value={formData.competitiveAdvantage}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="How does your solution differ from others in the market?"
          />
        </div>

        {/* Competitor Analysis */}
        <div className="form-group mb-4">
          <label htmlFor="competitorAnalysis" className="block mb-3 text-[16px] text-left font-medium">
            Competitor Analysis
          </label>
          <textarea
            name="competitorAnalysis"
            id="competitorAnalysis"
            value={formData.competitorAnalysis}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="List key competitors and compare their offerings with yours."
          />
        </div>
      </form>
    </div>
  );
};

export default MarketNeed;
