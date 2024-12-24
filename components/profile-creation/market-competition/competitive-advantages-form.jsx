"use client";
import React, { useState } from "react";
import Select from "react-select";
import countries from "world-countries";

const CompetitiveAnalysisForm = () => {
    const [globalMarketSize, setGlobalMarketSize] = useState([{ country: "", currency: "", amount: "" }]);
    const [currentMarketShare, setCurrentMarketShare] = useState([{ country: "", share: "", value: "" }]);
    const [descriptions, setDescriptions] = useState({
        competitors: "",
        whyDifferent: "",
        whyNow: "",
    });

    // Prepare countries for react-select
    const countryOptions = countries.map((country) => ({
        value: country.cca2, // Two-letter country code
        label: country.name.common, // Country name
    }));

    // Static currency options
    const currencyOptions = [
        { value: "USD", label: "USD" },
        { value: "INR", label: "INR" },
    ];

    // Handle changes for global market size rows
    const handleGlobalMarketChange = (index, field, value) => {
        const updatedRows = [...globalMarketSize];
        updatedRows[index][field] = value;
        setGlobalMarketSize(updatedRows);
    };

    // Handle changes for current market share rows
    const handleMarketShareChange = (index, field, value) => {
        const updatedRows = [...currentMarketShare];
        updatedRows[index][field] = value;
        setCurrentMarketShare(updatedRows);
    };

    // Handle description changes
    const handleDescriptionChange = (e) => {
        const { name, value } = e.target;
        setDescriptions((prev) => ({ ...prev, [name]: value }));
    };

    // Add a new row
    const addRow = (setRows) => setRows((prev) => [...prev, {}]);

    // Remove a row
    const removeRow = (index, setRows) => {
        setRows((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="form-container mx-auto px-4 w-full">
            <form className="space-y-6">
                {/* Global Market Size */}
                <div>
                    <h3 className="text-[16px] text-left font-medium mb-1">Global Market Size</h3>
                    {globalMarketSize.map((row, index) => (
                        <div key={index} className="flex items-center gap-4 mb-4">
                            {/* Country dropdown */}
                            <div className="w-1/3">
                                <Select
                                    options={countryOptions}
                                    value={countryOptions.find((option) => option.value === row.country)}
                                    onChange={(selectedOption) =>
                                        handleGlobalMarketChange(index, "country", selectedOption?.value || "")
                                    }
                                    placeholder="Select Country"
                                    className="text-left"
                                />
                            </div>
                            {/* Currency dropdown */}
                            <div className="w-1/3">
                                <Select
                                    options={currencyOptions}
                                    value={currencyOptions.find((option) => option.value === row.currency)}
                                    onChange={(selectedOption) =>
                                        handleGlobalMarketChange(index, "currency", selectedOption?.value || "")
                                    }
                                    placeholder="Select Currency"
                                    className="text-left"
                                />
                            </div>
                            <input
                                type="number"
                                name="amount"
                                value={row.amount || ""}
                                onChange={(e) => handleGlobalMarketChange(index, "amount", e.target.value)}
                                className="w-1/3 p-3 border rounded-lg custom-input-height"
                                placeholder="Enter Amount"
                            />
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => addRow(setGlobalMarketSize)}
                                    className="px-2 bg-blue-500 text-white rounded"
                                >
                                    +
                                </button>
                                {globalMarketSize.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeRow(index, setGlobalMarketSize)}
                                        className="px-2 bg-red-500 text-white rounded"
                                    >
                                        -
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Current Market Share */}
                <div>
                    <h3 className="text-[16px] text-left font-medium mb-1">Current Market Share</h3>
                    {currentMarketShare.map((row, index) => (
                        <div key={index} className="flex items-center gap-4 mb-4">
                            {/* Country dropdown */}
                            <div className="w-1/3">
                                <Select
                                    options={countryOptions}
                                    value={countryOptions.find((option) => option.value === row.country)}
                                    onChange={(selectedOption) =>
                                        handleMarketShareChange(index, "country", selectedOption?.value || "")
                                    }
                                    placeholder="Select Country"
                                    className="text-left"
                                />
                            </div>
                            <input
                                type="number"
                                name="share"
                                value={row.share || ""}
                                onChange={(e) => handleMarketShareChange(index, "share", e.target.value)}
                                className="w-1/3 p-3 border rounded-lg custom-input-height"
                                placeholder="Enter Share Percentage"
                            />
                            <input
                                type="number"
                                name="value"
                                value={row.value || ""}
                                onChange={(e) => handleMarketShareChange(index, "value", e.target.value)}
                                className="w-1/3 p-3 border rounded-lg custom-input-height"
                                placeholder="Enter Value"
                            />
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => addRow(setCurrentMarketShare)}
                                    className="px-2 bg-blue-500 text-white rounded"
                                >
                                    +
                                </button>
                                {currentMarketShare.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeRow(index, setCurrentMarketShare)}
                                        className="px-2 bg-red-500 text-white rounded"
                                    >
                                        -
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Description Fields */}
                <div className="space-y-6 text-left">
                    <div>
                        <label className="block mb-2 font-medium" htmlFor="competitors">
                            Your Competitors
                        </label>
                        <textarea
                            name="competitors"
                            id="competitors"
                            value={descriptions.competitors}
                            onChange={handleDescriptionChange}
                            rows="4"
                            className="w-full p-3 border rounded-lg"
                            placeholder="Write about your competitors"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium" htmlFor="whyDifferent">
                            Why Are You Different?
                        </label>
                        <textarea
                            name="whyDifferent"
                            id="whyDifferent"
                            value={descriptions.whyDifferent}
                            onChange={handleDescriptionChange}
                            rows="4"
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter why you are different"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium" htmlFor="whyNow">
                            Why You And Why Now?
                        </label>
                        <textarea
                            name="whyNow"
                            id="whyNow"
                            value={descriptions.whyNow}
                            onChange={handleDescriptionChange}
                            rows="4"
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter why you and why now"
                        ></textarea>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CompetitiveAnalysisForm;
