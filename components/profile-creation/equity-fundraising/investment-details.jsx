"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const InvestmentRequired = ({ data, setData }) => {
  const [formData, setFormData] = useState({
    investorRole: "",
    typeOfFunding: "",
    valuation: "",
    fundsAllocation: "",
  });

  const [investorRoleOptions, setInvestorRoleOptions] = useState([
    "Angel Investor",
    "Venture Capital",
    "Private Equity",
    "Crowdfunding",
  ]);
  const [fundingTypeOptions, setFundingTypeOptions] = useState([
    "Equity",
    "Debt",
    "Convertible Notes",
  ]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/content-type-builder/content-types/api::business.business"
        );

        const schemaAttributes = response.data?.data?.schema?.attributes || {};

        // Fetch 'Revenue Model' options
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

  return (
    <div className="form-container mx-auto px-4 w-full">
      <form className="space-y-4">

        {/* Investor Role */}
        <div className="form-group mb-4">
          <label htmlFor="investorRole" className="block mb-3 text-[16px] text-left font-medium">
            Investor Role*
          </label>
          <div className="select-wrapper relative">
            <select
              name="investorRole"
              id="investorRole"
              value={formData.investorRole}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select an option</option>
              {investorRoleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Type of Funding */}
        <div className="form-group mb-4">
          <label htmlFor="typeOfFunding" className="block mb-3 text-[16px] text-left font-medium">
            Type of Funding*
          </label>
          <div className="select-wrapper relative">
            <select
              name="typeOfFunding"
              id="typeOfFunding"
              value={formData.typeOfFunding}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select an option</option>
              {fundingTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Valuation */}
        <div className="form-group mb-4">
          <label htmlFor="valuation" className="block mb-3 text-[16px] text-left font-medium">
            Valuation*
          </label>
          <input
            type="number"
            name="valuation"
            id="valuation"
            value={formData.valuation}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Enter Valuation"
          />
        </div>

        {/* Funds Allocation */}
        <div className="form-group mb-4">
          <label htmlFor="fundsAllocation" className="block mb-3 text-[16px] text-left font-medium">
            Funds Allocation*
          </label>
          <input
            type="text"
            name="fundsAllocation"
            id="fundsAllocation"
            value={formData.fundsAllocation}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Enter Funds Allocation"
          />
        </div>
      </form>
    </div>
  );
};

export default InvestmentRequired;
