import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Flag from "react-world-flags";
import { Country, State } from "country-state-city"; // A utility for getting country and state info

const GeographicsForm = ({ data, setData, title }) => {
  const [countryOptions, setCountryOptions] = useState([]); // Country options for select
  const [stateOptions, setStateOptions] = useState([]); // State options based on selected country
  const [formData, setFormData] = useState({
    headquarters: "",
    country: "",
    state: "",
    geographicalPresence: "",
    currentGeography: "",
    parentCompany: "",
  });

  const [error, setError] = useState("");

  // Fetch Country options and State options dynamically
  useEffect(() => {
    // Get the list of countries
    const countries = Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: (
        <div className="flex items-center">
          <Flag code={country.isoCode} style={{ width: 24, height: 16, marginRight: 10 }} />
          {country.name}
        </div>
      ),
    }));
    setCountryOptions(countries);
  }, []);

  // Update state options when country is selected
  useEffect(() => {
    if (formData.country) {
      const states = State.getStatesOfCountry(formData.country).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }));
      setStateOptions(states);
    }
  }, [formData.country]);

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
    if (!formData.headquarters || !formData.country || !formData.state || !formData.geographicalPresence || !formData.currentGeography) {
      setError("Please fill all required fields.");
      return;
    }

    // Add the new form data to the list
    setData([...data, formData]);

    // Clear the form after submission
    setFormData({
      headquarters: "",
      country: "",
      state: "",
      geographicalPresence: "",
      currentGeography: "",
      parentCompany: "",
    });
    setError(""); // Clear error
  };

  return (
    <div className="form-container mx-auto px-4 w-full">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Headquarters */}
        <div className="form-group mb-4">
          <label htmlFor="headquarters" className="block mb-3 text-[16px] text-left font-medium">
            Headquarters*
          </label>
          <input
            type="text"
            name="headquarters"
            id="headquarters"
            value={formData.headquarters}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-1 focus:blue-500"
            placeholder="Enter the City, State, and Country"
          />
        </div>

        {/* Country and State in same row */}
        <div className="flex space-x-4 mb-4">
          {/* Country */}
          <div className="w-1/2">
            <label htmlFor="country" className="block mb-3 text-[16px] text-left font-medium">
              Country*
            </label>
            <Select
              name="country"
              id="country"
              value={countryOptions.find((option) => option.value === formData.country)}
              onChange={(selectedOption) => setFormData({ ...formData, country: selectedOption.value })}
              options={countryOptions}
              required
            />
          </div>

          {/* State */}
          <div className="w-1/2">
            <label htmlFor="state" className="block mb-3 text-[16px] text-left font-medium">
              State*
            </label>
            <Select
              name="state"
              id="state"
              value={stateOptions.find((option) => option.value === formData.state)}
              onChange={(selectedOption) => setFormData({ ...formData, state: selectedOption.value })}
              options={stateOptions}
              isDisabled={!formData.country} // Disable State dropdown if Country is not selected
              required
              className="text-left"
            />
          </div>
        </div>

        {/* Geographical Presence */}
        <div className="form-group mb-4">
          <label htmlFor="geographicalPresence" className="block mb-3 text-[16px] text-left font-medium">
            Geographical Presence*
          </label>
          <input
            type="text"
            name="geographicalPresence"
            id="geographicalPresence"
            value={formData.geographicalPresence}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Enter the Countries/Regions Where You Operate"
          />
        </div>

        {/* Current Geography */}
        <div className="form-group mb-4">
          <label htmlFor="currentGeography" className="block mb-3 text-[16px] text-left font-medium">
            Current Geography*
          </label>
          <input
            type="text"
            name="currentGeography"
            id="currentGeography"
            value={formData.currentGeography}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Specify the Primary Country, Region, or Area of Operation"
          />
        </div>

        {/* Parent Company */}
        <div className="form-group mb-4">
          <label htmlFor="parentCompany" className="block mb-3 text-[16px] text-left font-medium">
            Parent Company (if any)
          </label>
          <input
            type="text"
            name="parentCompany"
            id="parentCompany"
            value={formData.parentCompany}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Enter Parent Company Name, if applicable"
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

export default GeographicsForm;
