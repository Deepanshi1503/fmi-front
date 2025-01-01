import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Flag from "react-world-flags";
import { Country, State } from "country-state-city"; // A utility for getting country and state info

const GeographicsForm = ({ onCompletion }) => {
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

  useEffect(() => {
    const isCompleted =
      formData.headquarters &&
      formData.country &&
      formData.state &&
      formData.geographicalPresence &&
      formData.currentGeography &&
      formData.parentCompany;
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

  return (
    <div className="form-container mx-auto px-4 w-full">

      <form className="space-y-4">
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
      </form>
    </div>
  );
};

export default GeographicsForm;
