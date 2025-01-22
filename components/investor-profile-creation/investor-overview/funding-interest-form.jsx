"use client";
import React, { useState, useEffect } from "react";
import { fetchFundingInterestOptions, fetchInvestorTypeOptions } from "@/utils/validation-investor-profile-creation";

const FundingInterest = ({ onCompletion }) => {
    const [formData, setFormData] = useState({
        fundingInterest: [], // Store an array for multiple selections
        totalCommitmentAmount: "",
        investorType: "",
    });

    const [fundingInterestOptions, setFundingInterestOptions] = useState([]);
    const [investorTypeOptions, setInvestorTypeOptions] = useState([]);

    useEffect(() => {
        const isCompleted =
            formData.fundingInterest.length > 0 &&
            formData.totalCommitmentAmount &&
            formData.investorType;
        onCompletion(isCompleted);
    }, [formData]);

    // Handle form data change
    const handleChange = (selectedOption) => {
        setFormData((prev) => {
            let updatedFundingInterest = [...prev.fundingInterest];
            const index = updatedFundingInterest.findIndex(
                (interest) => interest.id === selectedOption.id
            );

            if (index !== -1) {
                // Remove the interest if it is already selected
                updatedFundingInterest.splice(index, 1);
            } else {
                // Add the new interest
                updatedFundingInterest.push(selectedOption);
            }

            return {
                ...prev,
                fundingInterest: updatedFundingInterest,
            };
        });
    };

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("combineInvestorInfo")) || {};
        const mergedData = { ...formData, ...savedData };
        setFormData(mergedData);
    }, []);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("combineInvestorInfo")) || {};
        const updatedData = { ...savedData, ...formData };
        localStorage.setItem("combineInvestorInfo", JSON.stringify(updatedData));
    }, [formData]);

    // Fetch options for Funding Interest and Investor Type
    useEffect(() => {
        const fetchOptions = async () => {
            const fundingInterestData = await fetchFundingInterestOptions();
            setFundingInterestOptions(fundingInterestData);

            const investorTypeData = await fetchInvestorTypeOptions();
            setInvestorTypeOptions(investorTypeData.option2.investor_type.enum);
        };

        fetchOptions();
    }, []);

    return (
        <div className="form-container mx-auto px-4 w-full">
            <form className="space-y-6">
                {/* Funding Interest */}
                <div className="form-group mb-4">
                    <label htmlFor="fundingInterest" className="block mb-3 text-[16px] text-left font-medium">
                        Funding Interest*
                    </label>
                    <div
                        className="w-full border rounded-lg p-3 max-h-48 overflow-y-auto custom-scrollbar"
                        style={{ maxHeight: "200px" }} // You can adjust the height as needed
                    >
                        {fundingInterestOptions.map((interest) => (
                            <button
                                type="button"
                                key={interest.id}
                                className={`block w-full p-2 mb-2 text-left focus:outline-none focus:ring-0 rounded-lg ${formData.fundingInterest.some(
                                    (selected) => selected.id === interest.id
                                )
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100"
                                    }`}
                                onClick={() => handleChange({ id: interest.id, name: interest.attributes.name })}
                            >
                                {interest.attributes.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Total Commitment Amount */}
                <div className="form-group mb-4">
                    <label
                        htmlFor="totalCommitmentAmount"
                        className="block mb-3 text-[16px] text-left font-medium"
                    >
                        Total Commitment Amount (₹ Cr)*
                    </label>
                    <input
                        type="number"
                        name="totalCommitmentAmount"
                        id="totalCommitmentAmount"
                        value={formData.totalCommitmentAmount}
                        onChange={(e) => setFormData({ ...formData, totalCommitmentAmount: e.target.value })}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter Total Commitment Amount"
                    />
                </div>

                {/* Investor Type */}
                <div className="form-group mb-4">
                    <label htmlFor="investorType" className="block mb-3 text-[16px] text-left font-medium">
                        Investor Type*
                    </label>
                    <select
                        name="investorType"
                        id="investorType"
                        value={formData.investorType}
                        onChange={(e) => setFormData({ ...formData, investorType: e.target.value })}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">Select Investor Type</option>
                        {investorTypeOptions.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    );
};

export default FundingInterest;
