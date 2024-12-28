import React, { useState, useEffect } from "react";

const DocumentForm = () => {
  const [formData, setFormData] = useState({
    pitchDeck: null,
    companyProfile: null,
    youtubeUrl: "",
  });

  const documentId=localStorage.getItem("busiessId")

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("combineInfo")) || {};
    setFormData((prev) => ({ ...prev, ...savedData }));
  }, []);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("combineInfo")) || {};
    const updatedData = { ...savedData, ...formData };
    localStorage.setItem("combineInfo", JSON.stringify(updatedData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file=files[0];
      const backendFieldName = name === "pitchDeck" ? "pitch_deck" : "company_profile";
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
      uploadFile(file,backendFieldName);
    }
  };

  const uploadFile = async (file, fieldName) => {
    const formDataToSend = new FormData();
    formDataToSend.append(fieldName, file);

    try {
      let url = "http://localhost:1337/api/businesses";
      let method = "POST";

      if (documentId) {
        url = `http://localhost:1337/api/businesses/${documentId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        body: formDataToSend,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(`${fieldName} uploaded successfully:`, responseData);

        // Save the ID if a new document was created
        if (!documentId && responseData.data.id) {
          const newId = responseData.data.id;
          console.log(newId);
          localStorage.setItem("busiessId", newId);
        }
      } else {
        const errorResponse = await response.json();
        console.error(`Error uploading ${fieldName}:`, errorResponse);
      }
    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
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
