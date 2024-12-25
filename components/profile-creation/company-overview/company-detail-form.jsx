import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/context";
import axios from "axios";

const CompanyDetailForm = () => {
    const [companyTypeOptions, setCompanyTypeOptions] = useState([]); // Options for 'Type of Company'
    const [companyStageOptions, setCompanyStageOptions] = useState([]); // Options for 'Stage of the Company'
    const [industryOptions, setIndustryOptions] = useState([]); // Options for Industry
    const [subIndustryOptions, setSubIndustryOptions] = useState([]); // Options for Sub-Industry
    const [formData, setFormData] = useState({
        companyName: "",
        website: "",
        yearOfIncorporation: "",
        companyStage: "",
        companyType: "",
        industry: "",
        subIndustry: "",
        description: "",
        mission: "",
        vision: "",
    });

    const { companyName, website, yearOfIncorporation, companyStage, companyType, industry, subIndustry, description, mission, vision } = formData;

    // Handle form data change
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "industry") {
            // Update sub-industries based on selected industry
            const selectedIndustry = industryOptions.find(
                (industry) => industry.id === parseInt(value)
            );
            setSubIndustryOptions(selectedIndustry?.attributes?.sub_industries?.data || []);
            setFormData((prev) => ({
                ...prev,
                [name]: value,
                subIndustry: "", // Reset sub-industry when industry changes
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        const formS = JSON.parse(localStorage.getItem("company info CO"));
        if (companyName === "" && website === "" && yearOfIncorporation === "" && companyStage === "" && companyType === "" && industry === "" && subIndustry === "" && description === "" && mission === "" && vision === "") {
            setFormData((prev) => ({ ...prev, ...formS }));
            // Populate subIndustryOptions based on the saved industry
            if (formS?.industry) {
                const selectedIndustry = industryOptions.find(
                    (industry) => industry.id === parseInt(formS.industry)
                );
                setSubIndustryOptions(selectedIndustry?.attributes?.sub_industries?.data || []);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("company info CO", JSON.stringify(formData));
    }, [companyName, website, yearOfIncorporation, companyStage, companyType, industry, subIndustry, description, mission, vision]);

    const [error, setError] = useState("");

    // Fetch options from the backend
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:1337/api/content-type-builder/content-types/api::business.business"
                );

                const response2 = await axios.get(
                    "http://localhost:1337/api/industries?populate=sub_industries"
                );

                const schemaAttributes = response.data?.data?.schema?.attributes || {};

                // Fetch 'Type of Company' options
                const typeOptions =
                    schemaAttributes?.type_of_company?.enum.map((option) =>
                        option.replace(/^"|"$/g, "") // Removes double quotes
                    ) || [];

                // Fetch 'Stage of Company' options
                const stageOptions =
                    schemaAttributes?.stage_of_company?.enum.map((option) =>
                        option.replace(/^"|"$/g, "") // Removes double quotes
                    ) || [];

                setCompanyTypeOptions(typeOptions);
                setCompanyStageOptions(stageOptions);
                setIndustryOptions(response2.data.data || []);
            } catch (err) {
                console.error("Error fetching company options:", err);
                setError("Failed to load company options.");
            }
        };

        fetchOptions();
    }, []);

    return (
        <div className="form-container mx-auto px-4 w-full">
            <form className="space-y-4">
                {/* Company Name */}
                <div className="form-group mb-4">
                    <label htmlFor="companyName" className="block mb-3 text-[16px] text-left font-medium">
                        Company Name*
                    </label>
                    <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={formData.companyName || ""}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter Your Company Name"
                    />
                </div>

                {/* Website */}
                <div className="form-group mb-4">
                    <label htmlFor="website" className="block mb-3 text-[16px] text-left font-medium">
                        Website*
                    </label>
                    <input
                        type="text"
                        name="website"
                        id="website"
                        value={formData.website || ""}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                        placeholder="www.example.com"
                    />
                </div>

                {/* Year of Incorporation */}
                <div className="form-group mb-4">
                    <label htmlFor="yearOfIncorporation" className="block mb-3 text-[16px] text-left font-medium">
                        Year of Incorporation*
                    </label>
                    <div className="select-wrapper relative">
                        <select
                            name="yearOfIncorporation"
                            id="yearOfIncorporation"
                            value={formData.yearOfIncorporation || ""}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#cccccc]"
                        >
                            <option value="" className="max-h-[50px]">Select a Year</option>
                            {[...Array(50).keys()].map((i) => (
                                <option key={i} value={2024 - i}>
                                    {2024 - i}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Stage of Company */}
                <div className="form-group mb-4">
                    <label htmlFor="companyStage" className="block mb-3 text-[16px] text-left font-medium">
                        Stage of Company*
                    </label>
                    <div className="select-wrapper relative">
                        <select
                            name="companyStage"
                            id="companyStage"
                            value={formData.companyStage || ""}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#cccccc]"
                        >
                            <option value="">Select a Stage</option>
                            {companyStageOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Type of Company */}
                <div className="form-group mb-4">
                    <label htmlFor="companyType" className="block mb-3 text-[16px] text-left font-medium">
                        Type of Company*
                    </label>
                    <div className="select-wrapper relative">
                        <select
                            name="companyType"
                            id="companyType"
                            value={formData.companyType || ""}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#cccccc]"
                        >
                            <option value="">Select a Type</option>
                            {companyTypeOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Industry */}
                <div className="form-group mb-4">
                    <label htmlFor="industry" className="block mb-3 text-[16px] text-left font-medium">
                        Industry*
                    </label>
                    <div className="select-wrapper relative">
                        <select
                            name="industry"
                            id="industry"
                            value={formData.industry || ""}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#cccccc]"
                        >
                            <option value="">Select an Industry</option>
                            {industryOptions.map((industry) => (
                                <option key={industry.id} value={industry.id}>
                                    {industry.attributes.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Sub Industry */}
                <div className="form-group mb-4">
                    <label htmlFor="subIndustry" className="block mb-3 text-[16px] text-left font-medium">
                        Sub Industry
                    </label>
                    <div className="select-wrapper relative">
                        <select
                            name="subIndustry"
                            id="subIndustry"
                            value={formData.subIndustry || ""}
                            onChange={handleChange}
                            disabled={!formData.industry}
                            className="w-full p-3 border rounded-lg"
                        >
                            <option value="">Select a Sub-Industry</option>
                            {subIndustryOptions.map((subIndustry) => (
                                <option key={subIndustry.id} value={subIndustry.id}>
                                    {subIndustry.attributes.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div className="form-group mb-4">
                    <label htmlFor="description" className="block mb-3 text-[16px] text-left font-medium">
                        Description About Company*
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description || ""}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                        placeholder="Write about your company"
                        required
                    />
                </div>

                {/* Company Mission */}
                <div className="form-group mb-4">
                    <label htmlFor="mission" className="block mb-3 text-[16px] text-left font-medium">
                        Company Mission*
                    </label>
                    <textarea
                        name="mission"
                        id="mission"
                        value={formData.mission || ""}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter your company's mission"
                        required
                    />
                </div>

                {/* Company Vision */}
                <div className="form-group">
                    <label htmlFor="vision" className="block mb-3 text-[16px] text-left font-medium">
                        Company Vision*
                    </label>
                    <textarea
                        name="vision"
                        id="vision"
                        value={formData.vision || ""}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter your company's vision"
                        required
                    />
                </div>
            </form>
        </div>
    );
};

export default CompanyDetailForm;