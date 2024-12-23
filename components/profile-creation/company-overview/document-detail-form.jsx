import React, { useState } from "react";

const DocumentForm = () => {
  const [formData, setFormData] = useState({
    pitchDeck: null, // File for pitch deck
    companyProfile: null, // File for company profile
    youtubeUrl: "", // YouTube URL
  });

  const [error, setError] = useState("");

  // Handle text field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0], // Store the selected file
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.professionalEmail || !formData.phoneNumber) {
      setError("Please fill all required fields.");
      return;
    }

    // Handle form submission logic
    console.log("Submitted Data:", formData);
    setError(""); // Clear any previous errors
  };

  return (
    <div className="form-container mx-auto px-4 w-full">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Pitch Deck */}
        <div className="form-group flex justify-between items-center mb-4">
          <label
            htmlFor="pitchDeck"
            className="block text-[16px] text-left font-medium"
          >
            Pitch Deck
          </label>
          <input
            type="file"
            name="pitchDeck"
            id="pitchDeck"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-[80%] p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Company Profile */}
        <div className="form-group flex justify-between items-center mb-4">
          <label
            htmlFor="companyProfile"
            className="block text-[16px] text-left font-medium"
          >
            Company Profile
          </label>
          <input
            type="file"
            name="companyProfile"
            id="companyProfile"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-[80%] p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* YouTube URL */}
        <div className="form-group flex justify-between items-center mb-4">
          <label
            htmlFor="youtubeUrl"
            className="block text-[16px] text-left font-medium"
          >
            YouTube URL
          </label>
          <input
            type="url"
            name="youtubeUrl"
            id="youtubeUrl"
            value={formData.youtubeUrl}
            onChange={handleChange}
            className="w-[80%] p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Enter the YouTube Video URL"
          />
        </div>
      </form>
    </div>
  );
};

export default DocumentForm;
