import React, { useState, useEffect } from "react";

const DocumentForm = ({onCompletion}) => {
  const [formData, setFormData] = useState({
    pitchDeck: null,
    companyProfile: null,
    youtubeUrl: "",
  });

  useEffect(() => {
    const isCompleted =
      formData.pitchDeck &&
      formData.companyProfile &&
      formData.youtubeUrl;
    onCompletion(isCompleted);
  }, [formData]);

  const documentId = localStorage.getItem("busiessId")

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

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      const backendFieldName = name === "pitchDeck" ? "pitch_deck" : "company_profile";
      const { fileId, fileUrl } = await uploadFile(file, backendFieldName);

      if (fileId && fileUrl) {
        const updatedData = { ...formData, [name]: { fileId, fileUrl } };
        setFormData(updatedData);

        // Update localStorage with fileId and fileUrl
        const combinedInfo = JSON.parse(localStorage.getItem("combineInfo")) || {};
        combinedInfo[name] = { fileId, fileUrl };
        localStorage.setItem("combineInfo", JSON.stringify(combinedInfo));
      }
    }
  };

  const uploadFile = async (file, fieldName) => {
    const formDataToSend = new FormData();
    formDataToSend.append("files", file);

    try {
      const response = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const responseData = await response.json();
        const uploadedFile = responseData[0]; // Assuming the file upload returns an array with one file
        console.log(`${fieldName} uploaded successfully:`, uploadedFile);

        // Extract the fileId and fileUrl
        const fileId = uploadedFile.id;
        const fileUrl = uploadedFile.url;

        // Return the fileId and fileUrl
        return { fileId, fileUrl };
      } else {
        const errorResponse = await response.json();
        console.error(`Error uploading ${fieldName}:`, errorResponse);
        return { fileId: null, fileUrl: null };
      }
    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
      return { fileId: null, fileUrl: null };
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const businessData = {
  //     youtubeUrl: formData.youtubeUrl,
  //     pitchDeck: formData.pitchDeck,
  //     companyProfile: formData.companyProfile,
  //   };

  //   try {
  //     let url = "http://localhost:1337/api/businesses";
  //     let method = "POST";

  //     if (documentId) {
  //       url = `http://localhost:1337/api/businesses/${documentId}`;
  //       method = "PUT";
  //     }

  //     const response = await fetch(url, {
  //       method: method,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(businessData),
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log("Business data saved successfully:", responseData);

  //       // If a new business was created, save the ID for future use
  //       if (!documentId && responseData.data.id) {
  //         const newId = responseData.data.id;
  //         localStorage.setItem("busiessId", newId);
  //       }
  //     } else {
  //       const errorResponse = await response.json();
  //       console.error("Error saving business data:", errorResponse);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting business data:", error);
  //   }
  // };

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
            // onSubmit={handleSubmit}
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
            // onSubmit={handleSubmit}
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
