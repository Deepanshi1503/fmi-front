import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/context";
import axios from "axios";

const WorkforceDetailForm = ({ data, setData, title }) => {
  const [formData, setFormData] = useState({
    numberOfEmployees: "",
    workforceRatio: "",
    diversityInfo: "",
  });

  const [error, setError] = useState("");

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="form-container mx-auto px-4 w-full">

      {/* {error && <div className="text-red-500 text-center mb-4">{error}</div>} */}

      <form className="space-y-4">
        {/* "Number of Employees" Dropdown */}
        <div className="form-group mb-4">
          <label htmlFor="numberOfEmployees" className="block mb-3 text-[16px] text-left font-medium">
            Number of Employees*
          </label>
          <div className="select-wrapper relative">
          <select
            name="numberOfEmployees"
            id="numberOfEmployees"
            value={formData.numberOfEmployees}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none"
          >
            <option value="">Select a range</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="501+">501+</option>
          </select>
          </div>
        </div>

        {/* "Remote/Onsite Workforce Ratio" */}
        <div className="form-group mb-4">
          <label htmlFor="workforceRatio" className="block mb-3 text-[16px] text-left font-medium">
            Remote/Onsite Workforce Ratio
          </label>
          <input
            type="text"
            name="workforceRatio"
            id="workforceRatio"
            value={formData.workforceRatio}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none"
            placeholder="Indicate the ratio or percentage"
            required
          />
        </div>

        {/* "Diversity Information" */}
        <div className="form-group mb-4">
          <label htmlFor="diversityInfo" className="block mb-3 text-[16px] text-left font-medium">
            Diversity Information
          </label>
          <textarea
            name="diversityInfo"
            id="diversityInfo"
            value={formData.diversityInfo}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:outline-none"
            placeholder="Share any diversity metrics or inclusion efforts"
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

export default WorkforceDetailForm;
