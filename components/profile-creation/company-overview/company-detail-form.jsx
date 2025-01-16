import React, { useState, useEffect } from "react";
import { fetchIndustryOptions, fetchOptions } from "@/utils/api";

const CompanyDetailForm = ({ onCompletion }) => {
    const [companyTypeOptions, setCompanyTypeOptions] = useState([]); // Options for 'Type of Company'
    const [companyStageOptions, setCompanyStageOptions] = useState([]); // Options for 'Stage of the Company'
    const [industryOptions, setIndustryOptions] = useState([]); // Options for Industry
    const [subIndustryOptions, setSubIndustryOptions] = useState([]); // Options for Sub-Industry
    const [formData, setFormData] = useState({
        companyLogo: null,
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

    useEffect(() => {
        const isCompleted =
            formData.companyLogo &&
            formData.companyName &&
            formData.website &&
            formData.yearOfIncorporation &&
            formData.companyStage &&
            formData.companyType &&
            formData.industry &&
            formData.subIndustry &&
            formData.description.trim() !== "" &&
            formData.mission.trim() !== "" &&
            formData.vision.trim() !== "";
        onCompletion(isCompleted);
    }, [formData]);

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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formDataToSend = new FormData();
            formDataToSend.append("files", file);

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, {
                    method: "POST",
                    body: formDataToSend,
                });

                if (response.ok) {
                    const responseData = await response.json();
                    const uploadedFile = responseData[0]; // Assuming the API returns an array with one file
                    console.log("Logo uploaded successfully:", uploadedFile);

                    // Extract the file ID and URL
                    const fileId = uploadedFile.id;
                    const fileUrl = uploadedFile.url;

                    // Update form data with the uploaded file information
                    setFormData((prev) => ({
                        ...prev,
                        companyLogo: { fileId, fileUrl },
                    }));

                    // Update localStorage
                    const savedData = JSON.parse(localStorage.getItem("combineInfo")) || {};
                    savedData.companyLogo = { fileId, fileUrl };
                    localStorage.setItem("combineInfo", JSON.stringify(savedData));
                } else {
                    console.error("Error uploading logo:", await response.json());
                }
            } catch (error) {
                console.error("Error uploading logo:", error);
            }
        }
    };

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("combineInfo")) || {};
        const mergedData = { ...formData, ...savedData };
        setFormData(mergedData);
        if (mergedData.industry) {
            const selectedIndustry = industryOptions.find(
                (industry) => industry.id === parseInt(mergedData.industry)
            );
            setSubIndustryOptions(selectedIndustry?.attributes?.sub_industries?.data || []);
        }
    }, []);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("combineInfo")) || {};
        if (JSON.stringify(savedData) !== JSON.stringify(formData)) {
            localStorage.setItem("combineInfo", JSON.stringify(formData));
        }
    }, [formData]);

    const [error, setError] = useState("");

    // Fetch options from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { typeOptions, stageOptions } = await fetchOptions();
                setCompanyTypeOptions(typeOptions);
                setCompanyStageOptions(stageOptions);

                const industryOptions = await fetchIndustryOptions();
                setIndustryOptions(industryOptions);
            } catch (err) {
                setError("Failed to load options.");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="form-container mx-auto px-4 w-full">
            <form className="space-y-4">
                {/* Company Logo */}
                <div className="form-group mb-4">
                    <label htmlFor="companyLogo" className="block mb-3 text-[16px] text-left font-medium">
                        Company Logo*
                    </label>
                    <div className="flex items-center">
                        <input
                            type="file"
                            name="companyLogo"
                            id="companyLogo"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                        />
                        {formData.companyLogo && formData.companyLogo.fileUrl && (
                            <span className="ml-2 text-green-500">&#10003;</span> // Green tick
                        )}
                    </div>
                    {formData.companyLogo?.fileUrl && (
                        <img
                            src={formData.companyLogo.fileUrl}
                            alt="Company Logo Preview"
                            className="mt-3 w-24 h-24 object-cover rounded-lg border"
                        />
                    )}
                </div>

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
                                <option key={industry} value={industry}>
                                    {industry}
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