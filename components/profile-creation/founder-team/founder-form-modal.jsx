import React, { useState, useEffect } from "react";

const FounderFormModal = ({ isOpen, onClose, onSubmit, editingFounder }) => {
  const [formData, setFormData] = useState({
    profileImage: "",
    name: "",
    role: "",
    education: "",
    professionalBackground: "",
    linkedinProfile: "",
  });

  useEffect(() => {
    if (editingFounder) {
      setFormData(editingFounder);
    }
  }, [editingFounder]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.role || !formData.education || !formData.linkedinProfile) {
      alert("Please fill out all fields before submitting.");
      return;
    }
    onSubmit(formData);
    setFormData({
      profileImage: "",
      name: "",
      role: "",
      education: "",
      professionalBackground: "",
      linkedinProfile: "",
    });
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl p-6">
          <h2 className="text-[20px] font-semibold text-[#404D61] mb-4">
            {editingFounder ? "Edit Co-founder Details" : "Add Co-founder Details"}
          </h2>
          <form className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Image */}
            <div>
              <label
                htmlFor="profileImage"
                className="block mt-4 text-left text-[#404D61] font-medium text-[18px]"
              >
                Profile Image
              </label>
              <input
                id="profileImage"
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
              />
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-left text-[#404D61] font-medium text-[18px]">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Founder's Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
              />
            </div>

            {/* Role/Designation */}
            <div>
              <label htmlFor="role" className="block text-left text-[#404D61] font-medium text-[18px]">
                Role/Designation
              </label>
              <input
                id="role"
                type="text"
                placeholder="Role/Designation"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
              />
            </div>

            {/* Education */}
            <div>
              <label htmlFor="education" className="block text-left text-[#404D61] font-medium text-[18px]">
                Education
              </label>
              <input
                id="education"
                type="text"
                placeholder="Education"
                value={formData.education}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
              />
            </div>

            {/* Professional Background */}
            <div>
              <label
                htmlFor="professionalBackground"
                className="block text-left text-[#404D61] font-medium text-[18px]"
              >
                Professional Background
              </label>
              <textarea
                id="professionalBackground"
                placeholder="Professional Background"
                value={formData.professionalBackground}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                rows={2}
              />
            </div>

            {/* LinkedIn Profile */}
            <div>
              <label
                htmlFor="linkedinProfile"
                className="block text-left text-[#404D61] font-medium text-[18px]"
              >
                LinkedIn Profile URL
              </label>
              <input
                id="linkedinProfile"
                type="url"
                placeholder="LinkedIn Profile"
                value={formData.linkedinProfile}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
              />
            </div>
          </form>

          {/* Popup Buttons */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleFormSubmit}
              className="px-4 py-2 bg-[#0B66C3] text-white rounded-lg"
            >
              {editingFounder ? "Save" : "Add"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default FounderFormModal;
