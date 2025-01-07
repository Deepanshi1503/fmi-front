import React, { useState } from "react";

const Filter = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        search: "",
        monthlyRevenue: { min: "", max: "" },
        monthlyProfit: { min: "", max: "" },
        priceRange: { min: "", max: "" },
        industry: "",
        employeeSize: 0,
        region: "",
    });

    const handleInputChange = (e, field) => {
        const { name, value } = e.target;
        if (field) {
            setFilters({
                ...filters,
                [field]: { ...filters[field], [name]: value },
            });
        } else {
            setFilters({ ...filters, [name]: value });
        }
    };

    const applyFilters = () => {
        onFilter(filters);
    };

    const resetFilters = () => {
        setFilters({
            search:"",
            monthlyRevenue: { min: "", max: "" },
            monthlyProfit: { min: "", max: "" },
            priceRange: { min: "", max: "" },
            industry: "",
            employeeSize: 0,
            region: "",
        });
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-[25px] font-semibold">Filter</h3>
                <button onClick={resetFilters} className="text-[16px] text-[#0A66C2] focus:outline-none">
                    Clear
                </button>
            </div>
            <div className="space-y-4">
                {/* Search Bar */}
                <input
                    type="text"
                    name="search"
                    placeholder="Search Companies..."
                    value={filters.search}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full px-3 py-2 border rounded-[100px] focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm"
                />
                <div className="border-b-[1px] border-[#18181833]"></div>

                {/* Revenue */}
                <div>
                    <label className="text-[20px] font-semibold">Revenue</label>
                    <div className="flex items-center gap-2 mt-1">
                        <input
                            type="number"
                            name="min"
                            placeholder="$Min"
                            value={filters.monthlyRevenue.min}
                            onChange={(e) => handleInputChange(e, "monthlyRevenue")}
                            className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm"
                        />
                        <h6 className="text-[#363638] mt-2">-</h6>
                        <input
                            type="number"
                            name="max"
                            placeholder="$Max"
                            value={filters.monthlyRevenue.max}
                            onChange={(e) => handleInputChange(e, "monthlyRevenue")}
                            className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm"
                        />
                    </div>
                </div>

                {/* Profit */}
                <div>
                    <label className="text-[20px] font-semibold">Profit</label>
                    <div className="flex items-center gap-2 mt-1">
                        <input
                            type="number"
                            name="min"
                            placeholder="$Min"
                            value={filters.monthlyProfit.min}
                            onChange={(e) => handleInputChange(e, "monthlyProfit")}
                            className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm"
                        />
                        <h6 className="text-[#363638] mt-2">-</h6>
                        <input
                            type="number"
                            name="max"
                            placeholder="$Max"
                            value={filters.monthlyProfit.max}
                            onChange={(e) => handleInputChange(e, "monthlyProfit")}
                            className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm"
                        />
                    </div>
                </div>
                
                <div className="border-b-[1px] border-[#18181833]"></div>

                {/* Industry */}
                <div>
                    <label className="text-[20px] font-semibold">Industry</label>
                    <div className="mt-2 space-y-1 flex flex-col gap-y-2">
                        <label className="flex items-center space-x-2 text-sm">
                            <input
                                type="checkbox"
                                name="industry"
                                value="B2B"
                                checked={filters.industry === "B2B"}
                                onChange={(e) => handleInputChange(e)}
                                className="form-checkbox h-[20px] w-[20px] text-[#181818]"
                            />
                            <span className="text-[18px]">B2B</span>
                        </label>
                        <label className="flex items-center space-x-2 text-sm">
                            <input
                                type="checkbox"
                                name="industry"
                                value="Education"
                                checked={filters.industry === "Education"}
                                onChange={(e) => handleInputChange(e)}
                                className="form-checkbox h-5 w-5 text-[#0966C3]"
                            />
                            <span className="text-[18px]">Education</span>
                        </label>
                        {/* Add more industries as needed */}
                    </div>
                    <p className="text-[#0966C3] text-[18px] mt-3">See all options</p>
                </div>

                <div className="border-b-[1px] border-[#18181833]"></div>

                {/* Employee Size */}
                <div>
                    <label className="text-[20px] font-semibold">Employee Size</label>
                    <div className="mt-2">
                        <input
                            type="range"
                            name="employeeSize"
                            min="1"
                            max="1000"
                            value={filters.employeeSize}
                            onChange={(e) => handleInputChange(e)}
                            className="w-full"
                        />
                        <div className="text-sm text-gray-600">{filters.employeeSize}+</div>
                    </div>
                </div>

                {/* Region */}
                <div>
                    <label className="text-[20px] font-semibold">Region</label>
                    <select
                        name="region"
                        value={filters.region}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm"
                    >
                        <option value="">Select Region</option>
                        <option value="North America">North America</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                    </select>
                </div>
            </div>

            {/* <button
                onClick={applyFilters}
                className="w-full mt-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
            >
                Apply Filters
            </button> */}
        </div>
    );
};

export default Filter;
