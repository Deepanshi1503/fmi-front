"use client";
import React, { useState, useEffect } from "react";
import { fetchInvestorTypeOptions, fetchSectors } from "@/utils/validation-investor-profile-creation";
import Select from "react-select";
import { Country } from "country-state-city";

const InvestmentPreferences = ({ onCompletion }) => {
    const [formData, setFormData] = useState({
        preferredInvestmentType: "",
        preferredSectorOfInterest: [],
        geographicFocus: [],
        typicalInvestmentRange: "",
        preferredStageOfInvestment: "",
    });

    useEffect(() => {
        const isCompleted =
            formData.preferredInvestmentType &&
            formData.preferredSectorOfInterest &&
            formData.geographicFocus &&
            formData.typicalInvestmentRange &&
            formData.preferredStageOfInvestment;
        onCompletion(isCompleted);
    }, [formData]);

    // Handle form data change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleMultiSelectChange = (selectedOptions, field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: selectedOptions.map((option) => ({
                id: option.value,
                name: option.label,
            })),
            // [field]: selectedOptions.map(option => option.label),  // store selected values in array
        }));
    };

    const [investorTypeOptions, setInvestorTypeOptions] = useState([]);
    const [preferredSectors, setPreferredSectors] = useState([]);
    const [geographicFocusOptions, setGeographicFocusOptions] = useState([]);
    const [typicalInvestmentRanges, setTypicalInvestmentRanges] = useState([]);
    const [preferredStages, setPreferredStages] = useState([]);

    // Fetch dropdown options
    useEffect(() => {
        const countries = Country.getAllCountries().map((country) => ({
            value: country.isoCode,
            label: country.name,
        }));
        setGeographicFocusOptions(countries);
    }, []);

    useEffect(() => {
        const fetchOptions = async () => {
            const preferredInvestmentTypeData = await fetchInvestorTypeOptions();
            setInvestorTypeOptions(preferredInvestmentTypeData.option2.preferred_investment_type.enum);
            setTypicalInvestmentRanges(preferredInvestmentTypeData.option2.typical_investment_range.enum);
            setPreferredStages(preferredInvestmentTypeData.option2.preferred_stage_of_investment.enum);

            const fetchSectorOptions = await fetchSectors();
            setPreferredSectors(fetchSectorOptions);
        };

        fetchOptions();
    }, []);

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

    return (
        <div className="form-container mx-auto px-4 w-full">
            <form className="space-y-6">
                {/* Preferred Investment Type */}
                <div className="form-group mb-4">
                    <label htmlFor="preferredInvestmentType" className="block mb-3 text-[16px] text-left font-medium">
                        Preferred Investment Type*
                    </label>
                    <select
                        name="preferredInvestmentType"
                        id="preferredInvestmentType"
                        value={formData.preferredInvestmentType}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">Select Investment Type</option>
                        {investorTypeOptions.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Preferred Sectors of Interest */}
                <div className="form-group mb-4">
                    <label htmlFor="geographicFocus" className="block mb-3 text-[16px] text-left font-medium">
                        Preferred Sectors of Interest*
                    </label>
                    <Select
                        isMulti
                        options={preferredSectors.map((sector) => ({
                            value: sector.id,
                            label: sector.attributes.name,
                        }))} 
                        value={preferredSectors
                            .filter((sector) =>
                                formData.preferredSectorOfInterest.some(
                                    (selected) => selected.id === sector.id
                                )
                            )
                            .map((sector) => ({
                                value: sector.id,
                                label: sector.attributes.name,
                            }))}
                        onChange={(selectedOptions) =>
                            handleMultiSelectChange(selectedOptions, "preferredSectorOfInterest")
                        }
                        placeholder="Select Sectors of Interest"
                        className="basic-multi-select"
                        classNamePrefix="select"
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

                {/* Geographic Focus (Multi-Select) */}
                <div className="form-group mb-4">
                    <label htmlFor="geographicFocus" className="block mb-3 text-[16px] text-left font-medium">
                        Geographic Focus*
                    </label>
                    <Select
                        isMulti
                        options={geographicFocusOptions}
                        value={geographicFocusOptions.filter((option) =>
                            formData.geographicFocus.some((selected) => selected.id === option.value)
                        )}
                        onChange={(selected) => handleMultiSelectChange(selected, "geographicFocus")}
                        placeholder="Select Geographic Focus"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={{
                            control: (base) => ({
                                ...base,
                                minHeight: "55px", // Set the height
                                borderRadius: "0.5rem", // Tailwind rounded-lg equivalent
                                borderColor: "#d1d5db", // Tailwind border-gray-300 equivalent
                                boxShadow: "none", // Remove default box-shadow
                                "&:hover": {
                                    borderColor: "#2563eb", // Tailwind hover:border-blue-500 equivalent
                                },
                            })
                        }}
                    />
                </div>

                {/* Typical Investment Range */}
                <div className="form-group mb-4">
                    <label htmlFor="typicalInvestmentRange" className="block mb-3 text-[16px] text-left font-medium">
                        Typical Investment Range*
                    </label>
                    <select
                        name="typicalInvestmentRange"
                        id="typicalInvestmentRange"
                        value={formData.typicalInvestmentRange}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">Select Investment Range</option>
                        {typicalInvestmentRanges.map((range) => (
                            <option key={range} value={range}>
                                {range}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Preferred Stage of Investment */}
                <div className="form-group mb-4">
                    <label htmlFor="preferredStageOfInvestment" className="block mb-3 text-[16px] text-left font-medium">
                        Preferred Stage of Investment*
                    </label>
                    <select
                        name="preferredStageOfInvestment"
                        id="preferredStageOfInvestment"
                        value={formData.preferredStageOfInvestment}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">Select Stage of Investment</option>
                        {preferredStages.map((stage) => (
                            <option key={stage} value={stage}>
                                {stage}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    );
};

export default InvestmentPreferences;
