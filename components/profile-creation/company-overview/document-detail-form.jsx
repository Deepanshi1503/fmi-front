import React, { useState, useEffect } from "react";

const DocumentForm = () => {
  const [formData, setFormData] = useState({
    pitchDeck: null, // File for pitch deck
    companyProfile: null, // File for company profile
    youtubeUrl: "", // YouTube URL
  });

  const {pitchDeck, companyProfile, youtubeUrl} = formData;

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(()=>{
    const formS = JSON.parse(localStorage.getItem("document info CO"));
    if (formS) {
      setFormData((prev) => ({
        ...prev,
        youtubeUrl: formS.youtubeUrl || "",
      }));
    }
  }, []);

  useEffect(()=>{
    const savedFormData = JSON.parse(localStorage.getItem("document info CO")) || {};
    savedFormData.youtubeUrl = youtubeUrl;
    localStorage.setItem("document info CO", JSON.stringify(savedFormData));
  },[youtubeUrl]);

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0], // Store the file object in state
      }));

      // Save the file name in localStorage (optional)
      const savedFormData = JSON.parse(localStorage.getItem("document info CO")) || {};
      savedFormData[name] = files[0].name; // Store the file name
      localStorage.setItem("document info CO", JSON.stringify(savedFormData));
    }
  };

  return (
    <div className="form-container mx-auto px-4 w-full">

      <form className="space-y-4">
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
