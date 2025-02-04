"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import currencyList from "currency-codes/data";
import { fetchInvestorOptions } from "@/utils/validation-investor-profile-creation";

const InvestmentDetailsForm = ({ onCompletion }) => {
    const [items, setItems] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({
        companyName:"",
        investmentDate: "",
        fundingAmount: "",
        fundingStage: "",
        fundingType: "",
        currency: "",
    });

    const [fundingStages, setFundingStages] = useState([]);
    const [fundingTypes, setFundingTypes] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // Manage body scroll when modal is open
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);

    // Load saved items from localStorage on mount
    useEffect(() => {
        const combineInfo = JSON.parse(localStorage.getItem("combineInvestorInfo")) || {};
        const savedItems = combineInfo.investmentDetails || [];
        setItems(Array.isArray(savedItems) ? savedItems : []);
    }, []);

    // Save items to localStorage whenever they change
    useEffect(() => {
        const combineInfo = JSON.parse(localStorage.getItem("combineInvestorInfo")) || {};
        combineInfo.investmentDetails = items;
        localStorage.setItem("combineInvestorInfo", JSON.stringify(combineInfo));
        if (onCompletion) {
            onCompletion(items.length > 0);
        }
    }, [items]);

    // Fetch funding stages and types from backend
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const investorOptions = await fetchInvestorOptions();
                setFundingStages(investorOptions.funding_stage.enum);
                setFundingTypes(investorOptions.funding_type.enum);
            } catch (error) {
                console.error("Error fetching funding stages/types:", error);
            }
        };
        fetchOptions();
    }, []);

    // Populate form fields when editIndex changes
    useEffect(() => {
        if (editIndex !== null) {
            setFormData(items[editIndex]);
        }
    }, [editIndex, items]);

    // Handle input change
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    // Handle currency dropdown change
    const handleCurrencyChange = (selectedOption) => {
        setFormData((prev) => ({ ...prev, currency: selectedOption.value }));
    };

    // Handle funding stage dropdown change
    const handleFundingStageChange = (selectedOption) => {
        setFormData((prev) => ({ ...prev, fundingStage: selectedOption.value }));
    };

    // Handle funding type dropdown change
    const handleFundingTypeChange = (selectedOption) => {
        setFormData((prev) => ({ ...prev, fundingType: selectedOption.value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editIndex !== null) {
            // Update existing item
            const updatedItems = [...items];
            updatedItems[editIndex] = formData;
            setItems(updatedItems);
            setEditIndex(null);
        } else {
            // Add new item
            setItems((prev) => [formData, ...prev]);
        }

        setFormData({
            companyName:"",
            investmentDate: "",
            fundingAmount: "",
            fundingStage: "",
            fundingType: "",
            currency: ""
        });

        setShowModal(false);
    };

    // Handle Edit
    const handleEdit = (index) => {
        setEditIndex(index);
        setShowModal(true);
    };

    // Handle Delete
    const handleDelete = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    // Currency options for react-select
    const currencyOptions = currencyList.map((currency) => ({
        value: currency.code,
        label: `${currency.code} - ${currency.currency}`,
    }));

    return (
        <div className="form-container mx-auto px-4 w-full">
            {/* Display Added Items */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">{items.length !== 0 ? (
                    <p className="text-gray-500">Added Investments</p>
                ) : ("")}</h3>
                {items.length === 0 ? (
                    <p className="text-gray-500">No investments added yet.</p>
                ) : (
                    <div className="grid grid-cols-2 gap-6">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white shadow-lg rounded-lg flex flex-col justify-between items-center transition-transform transform hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="flex flex-col text-center">
                                    <p className="text-gray-600 mt-2">
                                        <strong>Date:</strong> {item.investmentDate}
                                    </p>
                                    <p className="text-gray-600 mt-2">
                                        <strong>Amount:</strong> {item.fundingAmount} {item.currency}
                                    </p>
                                    <p className="text-gray-600 mt-1">
                                        <strong>Stage:</strong> {item.fundingStage}
                                    </p>
                                    <p className="text-gray-600 mt-1">
                                        <strong>Type:</strong> {item.fundingType}
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(index)}
                                        className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Investment Button */}
            <button
                onClick={() => setShowModal(true)}
                className="w-full p-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 mt-6"
            >
                Add Investment
            </button>

            {/* Modal for Form */}
            {showModal && (
                <div className="fixed inset-0 mt-36 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-[16px] w-1/3 z-20 relative">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Form Fields */}
                            <div>
                                <label className="block mb-2 text-left">Company Name</label>
                                <input
                                    type="text"
                                    id="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-left">Investment Date</label>
                                <input
                                    type="date"
                                    id="investmentDate"
                                    value={formData.investmentDate}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-left">Currency</label>
                                <Select
                                    options={currencyOptions}
                                    value={currencyOptions.find((c) => c.value === formData.currency)}
                                    onChange={handleCurrencyChange}
                                    placeholder="Select Currency"
                                    className="w-full"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            minHeight: "55px",
                                            borderRadius: "0.5rem",
                                            borderColor: "#d1d5db",
                                            boxShadow: "none",
                                            "&:hover": {
                                                borderColor: "#2563eb",
                                            },
                                        }),
                                    }}
                                />
                            </div>
                            
                            <div>
                                <label className="block mb-2 text-left">Funding Amount</label>
                                <input
                                    type="text"
                                    id="fundingAmount"
                                    value={formData.fundingAmount}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-left">Funding Stage</label>
                                <div className="relative">
                                    <select
                                        name="fundingStage"
                                        id="fundingStage"
                                        value={formData.fundingStage}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border rounded-lg bg-white focus:ring-1 focus:ring-blue-500 appearance-none"
                                    >
                                        <option value="">Select Funding Range</option>
                                        {fundingStages.map((range) => (
                                            <option key={range} value={range}>
                                                {range}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Custom Arrow */}
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                        <svg
                                            className="w-6 h-6 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-left">Funding Type</label>
                                <div className="relative">
                                    <select
                                        name="fundingType"
                                        id="fundingType"
                                        value={formData.fundingType}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border rounded-lg bg-white focus:ring-1 focus:ring-blue-500 appearance-none"
                                    >
                                        <option value="">Select Funding Type</option>
                                        {fundingTypes.map((range) => (
                                            <option key={range} value={range}>
                                                {range}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Custom Arrow */}
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                        <svg
                                            className="w-6 h-6 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex space-x-8">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="w-full p-3 bg-gray-100 text-gray-600 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    {editIndex !== null ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvestmentDetailsForm;