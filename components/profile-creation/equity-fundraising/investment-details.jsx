"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const InvestmentRequired = ({ onCompletion }) => {
  const [formData, setFormData] = useState({
    investorRole: "",
    typeOfFunding: "",
    valuation: "",
    fundingAsk: "",
    fundsAllocation: [],
  });

  const [newFundAllocation, setNewFundAllocation] = useState({
    areaOfConcern: "",
    percentageAllocated: "",
  });

  useEffect(() => {
    const isCompleted =
      formData.investorRole &&
      formData.typeOfFunding &&
      formData.valuation &&
      formData.fundingAsk &&
      formData.fundsAllocation.length > 0;
    onCompletion(isCompleted);
  }, [formData]);

  const [investorRoleOptions, setInvestorRoleOptions] = useState([]);
  const [fundingTypeOptions, setFundingTypeOptions] = useState([]);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewFundAllocationChange = (e) => {
    const { name, value } = e.target;
    setNewFundAllocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFundAllocation = () => {
    if (newFundAllocation.areaOfConcern && newFundAllocation.percentageAllocated) {
      setFormData((prev) => ({
        ...prev,
        fundsAllocation: [...prev.fundsAllocation, newFundAllocation],
      }));
      setNewFundAllocation({ areaOfConcern: "", percentageAllocated: "" });
    }
  };

  const handleRemoveFundAllocation = (index) => {
    setFormData((prev) => ({
      ...prev,
      fundsAllocation: prev.fundsAllocation.filter((_, i) => i !== index),
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

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/content-type-builder/components/form.investor-business-listing-detail`
        );

        const schemaAttributes = response.data?.data?.schema?.attributes || {};

        const investorOption =
          schemaAttributes?.investor_role?.enum.map((option) =>
            option.replace(/^"|"$/g, "") // Removes double quotes if present
          ) || [];

        const typeOptions =
          schemaAttributes?.type_of_funding?.enum.map((option) =>
            option.replace(/^"|"$/g, "") // Removes double quotes if present
          ) || [];

        setInvestorRoleOptions(investorOption);
        setFundingTypeOptions(typeOptions);
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };

    fetchOptions();
  }, []);

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

        {/* Funding Ask */}
        <div className="form-group mb-4">
          <label htmlFor="fundingAsk" className="block mb-3 text-[16px] text-left font-medium">
            Funding Ask*
          </label>
          <input
            type="number"
            name="fundingAsk"
            id="fundingAsk"
            value={formData.fundingAsk}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Enter Funding Ask"
          />
        </div>

        {/* Funds Allocation */}
        <div className="form-group mb-4">
          <label className="block mb-3 text-[16px] text-left font-medium">
            Funds Allocation*
          </label>
          {formData?.fundsAllocation?.map((allocation, index) => (
            <div key={index} className="flex items-center mb-2">
              <span className="flex-1">{allocation.areaOfConcern}</span>
              <span className="flex-1">{allocation.percentageAllocated}%</span>
              <button
                type="button"
                className="text-red-500 ml-4"
                onClick={() => handleRemoveFundAllocation(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex items-center space-x-4 mt-2">
            <input
              type="text"
              name="areaOfConcern"
              value={newFundAllocation.areaOfConcern}
              onChange={handleNewFundAllocationChange}
              placeholder="Area of Concern"
              className="w-1/2 p-3 border rounded-lg"
            />
            <input
              type="number"
              name="percentageAllocated"
              value={newFundAllocation.percentageAllocated}
              onChange={handleNewFundAllocationChange}
              placeholder="Percentage Allocated"
              className="w-1/2 p-3 border rounded-lg"
            />
            <button
              type="button"
              onClick={handleAddFundAllocation}
              className="p-3 bg-blue-500 text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvestmentRequired;
