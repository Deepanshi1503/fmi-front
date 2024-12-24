"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const SaleForm = ({ data, setData }) => {
    const [formData, setFormData] = useState({
        valuation: "",
        ownershipStake: "",
        salePrice: "",
        reasonForSale: "",
    });

    const [reasonOptions] = useState([
        "Retirement",
        "Financial Constraints",
        "Strategic Partnership",
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
            <form className="space-y-6">
                {/* Valuation */}
                <div className="form-group mb-4">
                    <label
                        htmlFor="valuation"
                        className="block mb-3 text-[16px] text-left font-medium"
                    >
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
                        placeholder="Enter Valuation (e.g., ₹10 Crore)"
                    />
                </div>

                {/* Ownership Stake Offered */}
                <div className="form-group mb-4">
                    <label
                        htmlFor="ownershipStake"
                        className="block mb-3 text-[16px] text-left font-medium"
                    >
                        Ownership Stake Offered*
                    </label>
                    <input
                        type="text"
                        name="ownershipStake"
                        id="ownershipStake"
                        value={formData.ownershipStake}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter Ownership Stake (e.g., 50%)"
                    />
                </div>

                {/* Sale Price */}
                <div className="form-group mb-4">
                    <label
                        htmlFor="salePrice"
                        className="block mb-3 text-[16px] text-left font-medium"
                    >
                        Sale Price*
                    </label>
                    <input
                        type="number"
                        name="salePrice"
                        id="salePrice"
                        value={formData.salePrice}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter Sale Price (e.g., ₹8 Crore)"
                    />
                </div>

                {/* Reason for Sale */}
                <div className="form-group mb-4">
                    <label
                        htmlFor="reasonForSale"
                        className="block mb-3 text-[16px] text-left font-medium"
                    >
                        Reason for Sale*
                    </label>
                    <div className="select-wrapper relative">
                        <select
                            name="reasonForSale"
                            id="reasonForSale"
                            value={formData.reasonForSale}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">Select a reason</option>
                            {reasonOptions.map((reason) => (
                                <option key={reason} value={reason}>
                                    {reason}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SaleForm;
