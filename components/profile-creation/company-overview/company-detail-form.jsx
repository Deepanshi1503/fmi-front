import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/context";
import axios from "axios";

const CompanyDetailForm = ({ data, setData, title }) => {
    const [companyTypeOptions, setCompanyTypeOptions] = useState([]); // Options for 'Type of Company'
    const [companyStageOptions, setCompanyStageOptions] = useState([]); // Options for 'Stage of the Company'
    const [industryOptions, setIndustryOptions] = useState([]); // Options for 'Industry'
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

    const [error, setError] = useState("");

    // Fetch options from the backend
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                // Fetch 'Type of Company' options (type enum)
                const typeResponse = await axios.get("/api/businesses/enumeration-options");
                setCompanyTypeOptions(typeResponse.data.typeOptions);

                // Fetch 'Stage of Company' options (stage_of_company enum)
                const stageResponse = await axios.get("/api/businesses/enumeration-options");
                setCompanyStageOptions(stageResponse.data.stageOptions);

                // Fetch 'Industry' options (industry relation)
                const industryResponse = await axios.get("/api/industries");
                setIndustryOptions(industryResponse.data);

            } catch (err) {
                console.error("Error fetching options:", err);
                setError("Failed to load options.");
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

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate required fields
        if (!formData.companyName || !formData.website || !formData.companyStage || !formData.companyType) {
            setError("Please fill all required fields.");
            return;
        }

        // Add the new form data to the list
        setData([...data, formData]);

        // Clear the form after submission
        setFormData({
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
        setError(""); // Clear error
    };

    return (
        <div className="form-container mx-auto px-4 w-full">
            {/* {error && <div className="text-red-500 text-center mb-4">{error}</div>} */}

            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Company Name */}
                <div className="form-group mb-4">
                    <label htmlFor="companyName" className="block mb-3 text-[16px] text-left font-medium">
                        Company Name*
                    </label>
                    <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={formData.companyName}
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
                        value={formData.website}
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
                            value={formData.yearOfIncorporation}
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
                        value={formData.companyStage}
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
                        value={formData.companyType}
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
                        value={formData.industry}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#cccccc]"
                    >
                        <option value="">Select an Industry</option>
                        {industryOptions.map((industry) => (
                            <option key={industry.id} value={industry.id}>
                                {industry.name}
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
                    <input
                        type="text"
                        name="subIndustry"
                        id="subIndustry"
                        value={formData.subIndustry}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#cccccc]"
                        placeholder="Sub Industry (optional)"
                    />
                </div>

                {/* Description */}
                <div className="form-group mb-4">
                    <label htmlFor="description" className="block mb-3 text-[16px] text-left font-medium">
                        Description About Company*
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
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
                        value={formData.mission}
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
                        value={formData.vision}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter your company's vision"
                        required
                    />
                </div>

                {/* Submit Button */}
                {/* <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Save
          </button>
        </div> */}
            </form>
        </div>
    );
};

export default CompanyDetailForm;
