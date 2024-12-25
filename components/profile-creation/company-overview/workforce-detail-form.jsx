import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/context";
import axios from "axios";

const WorkforceDetailForm = ({ data, setData, title }) => {
  const [formData, setFormData] = useState({
    numberOfEmployees: "",
    workforceRatio: "",
    diversityInfo: "",
  });

  const [workforceRangeOptions, setWorkforceRangeOptions] = useState([]);
  const [error, setError] = useState("");

  const {numberOfEmployees, workforceRatio, diversityInfo} = formData;

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(()=>{
    const formS = JSON.parse(localStorage.getItem("workforce info CO"));
    if(numberOfEmployees === "" && workforceRatio==="" && diversityInfo===""){
      setFormData((prev)=> ({...prev, ...formS}));
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem("workforce info CO", JSON.stringify(formData));
  },[numberOfEmployees, workforceRatio, diversityInfo]);

  // Fetch workforce range options from the backend
  useEffect(() => {
    const fetchWorkforceRanges = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/content-type-builder/content-types/api::business.business");
        const schemaAttributes = response.data?.data?.schema?.attributes || {};

        // Fetch 'Stage of Company' options
        const workforceOptions =
          schemaAttributes?.workforce_range?.enum.map((option) =>
            option.replace(/^"|"$/g, "") // Removes double quotes
          ) || [];
        setWorkforceRangeOptions(workforceOptions)
      } catch (err) {
        console.error("Error fetching workforce range options:", err);
        setError("Failed to load workforce range options.");
      }
    };

    fetchWorkforceRanges();
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
