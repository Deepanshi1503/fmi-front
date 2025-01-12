import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/context";
import axios from "axios";
import { fetchWorkforceRanges } from "@/utils/api";

const WorkforceDetailForm = ({ onCompletion }) => {
  const [formData, setFormData] = useState({
    numberOfEmployees: "",
    workforceRatio: "",
    diversityInfo: "",
  });

  useEffect(() => {
    const isCompleted =
      formData.numberOfEmployees &&
      formData.workforceRatio &&
      formData.diversityInfo;
    onCompletion(isCompleted);
  }, [formData]);

  const [workforceRangeOptions, setWorkforceRangeOptions] = useState([]);
  const [error, setError] = useState("");

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("combineInfo")) || {};
    const mergedData = { ...formData, ...savedData };
    setFormData(mergedData);
  }, []);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("combineInfo")) || {};
    const updatedData = { ...savedData, ...formData };
    localStorage.setItem("combineInfo", JSON.stringify(updatedData));
  }, [formData]);

  // Fetch workforce range options from the backend
  useEffect(() => {
    const fetchWorforceOptions = async () => {
      try {
        const workforceOptions = await fetchWorkforceRanges();
        setWorkforceRangeOptions(workforceOptions)
      } catch (err) {
        console.error(err);
        setError("Failed to load options.");
      }
    };

    fetchWorforceOptions();
  }, []);

  return (
    <div className="form-container mx-auto px-4 w-full">

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
              className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#cccccc]"
            >
              <option value="">Select a range</option>
              {workforceRangeOptions.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
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
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
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
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Share any diversity metrics, such as gender ratio or inclusion efforts"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default WorkforceDetailForm;
