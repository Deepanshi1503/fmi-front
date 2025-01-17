import React, { useState, useEffect, useRef } from "react";
import { fetchIndustryOptions, fetchOptions } from "@/utils/api";
import { Trash2 } from "lucide-react";

const CompanyDetailForm = ({ onCompletion }) => {
    const [formData, setFormData] = useState({
        companyLogo: null,
        companyName: "",
        website: "",
        yearOfEstablishment: "",
        headquarters: "",
        profileDescription: "",
        availableForPitches: "",
    });

    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const isCompleted =
            formData.companyLogo &&
            formData.companyName &&
            formData.website &&
            formData.yearOfEstablishment &&
            formData.headquarters &&
            formData.profileDescription.trim() !== "" &&
            formData.availableForPitches !== "";
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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formDataToSend = new FormData();
            formDataToSend.append("files", file);

            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);

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
                    const fileUrl = (`${process.env.NEXT_PUBLIC_STRAPI_URL}${uploadedFile.url}`);

                    // Update form data with the uploaded file information
                    setFormData((prev) => ({
                        ...prev,
                        companyLogo: { fileId, fileUrl },
                    }));

                    // Update localStorage
                    const savedData = JSON.parse(localStorage.getItem("combineInvestorInfo")) || {};
                    savedData.companyLogo = { fileId, fileUrl };
                    localStorage.setItem("combineInvestorInfo", JSON.stringify(savedData));
                } else {
                    console.error("Error uploading logo:", await response.json());
                }
            } catch (error) {
                console.error("Error uploading logo:", error);
            }
        }
    };

    const handleDelete = () => {
        setImagePreview(null);
        setFormData((prev) => ({
            ...prev,
            companyLogo: null, // Reset companyLogo in the formData
        }));

        // Remove the companyLogo from localStorage
        const savedData = JSON.parse(localStorage.getItem("combineInvestorInfo")) || {};
        delete savedData.companyLogo; // Remove companyLogo from saved data
        localStorage.setItem("combineInvestorInfo", JSON.stringify(savedData)); // Save updated data back to localStorage
    };

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("combineInvestorInfo")) || {};
        setFormData((prev) => ({ ...prev, ...savedData }));
        setImagePreview(savedData?.companyLogo?.fileUrl);
    }, []);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("combineInvestorInfo")) || {};
        if (JSON.stringify(savedData) !== JSON.stringify(formData)) {
            localStorage.setItem("combineInvestorInfo", JSON.stringify(formData));
        }
    }, [formData]);

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

                {/* Company Logo */}
                <div className="form-group mb-4">
                    <label htmlFor="companyLogo" className="block mb-3 text-[16px] text-left font-medium">
                        Company Logo*
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center relative">
                        {!imagePreview ? (
                            <>
                                <input
                                    type="file"
                                    id="companyLogo"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">Drop a file here or click upload</p>
                                    <p className="text-xs text-gray-400">Minimum upload size 10 MB</p>
                                </div>
                            </>
                        ) : (
                            <div className="relative w-full h-64 flex items-center justify-center">
                                <img
                                    src={imagePreview}
                                    alt="Company Logo Preview"
                                    className="w-full h-full object-contain rounded-lg"
                                />
                                <button
                                    onClick={handleDelete}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        )}
                    </div>
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

                {/* Year of Establishment */}
                <div className="form-group mb-4">
                    <label htmlFor="yearOfEstablishment" className="block mb-3 text-[16px] text-left font-medium">
                        Year of Establishment*
                    </label>
                    <div className="select-wrapper relative">
                        <select
                            name="yearOfEstablishment"
                            id="yearOfEstablishment"
                            value={formData.yearOfEstablishment || ""}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#cccccc]"
                        >
                            <option value="">Select a Year</option>
                            {[...Array(50).keys()].map((i) => (
                                <option key={i} value={2024 - i}>
                                    {2024 - i}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Headquarters */}
                <div className="form-group mb-4">
                    <label htmlFor="headquarters" className="block mb-3 text-[16px] text-left font-medium">
                        Headquarters*
                    </label>
                    <input
                        type="text"
                        name="headquarters"
                        id="headquarters"
                        value={formData.headquarters || ""}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter Headquarters Location"
                    />
                </div>

                {/* Profile Description */}
                <div className="form-group mb-4">
                    <label htmlFor="profileDescription" className="block mb-3 text-[16px] text-left font-medium">
                        Profile Description*
                    </label>
                    <textarea
                        name="profileDescription"
                        id="profileDescription"
                        value={formData.profileDescription || ""}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                        placeholder="Write about your company"
                        required
                    />
                </div>

                {/* Availability for Pitches */}
                <div className="form-group mb-4">
                    <label htmlFor="availableForPitches" className="block mb-3 text-[16px] text-left font-medium">
                        Available for Pitches*
                    </label>
                    <div className="select-wrapper relative">
                        <select
                            name="availableForPitches"
                            id="availableForPitches"
                            value={formData.availableForPitches || ""}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#cccccc]"
                        >
                            <option value="">Select Availability</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CompanyDetailForm;