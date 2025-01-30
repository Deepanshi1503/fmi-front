"use client"
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { fetchIndustryOptions } from "@/utils/api";

const CollapsibleSection = ({ title, isCollapsed, toggleSection, children }) => (
    <div>
        <div
            className="flex justify-between items-center cursor-pointer mb-3"
            onClick={toggleSection}
        >
            <span className="text-[20px] font-medium">{title}</span>
            <span className="mb-1">{isCollapsed ? <ChevronDown /> : <ChevronUp />}</span>
        </div>
        {!isCollapsed && <div>{children}</div>}
    </div>
);

const Filter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialFilters = {
        search: "",
        fundingInterest: [],
        // revenue: { min: "", max: "" },
    };

    const [filters, setFilters] = useState(initialFilters);

    const [showAllFundingInterestOptions, setShowAllFundingInterestOptions] = useState(false);

    const [fundingInterestOptions, setFundingInterestOptions] = useState([]);

    // Fetch options on mount
    useEffect(() => {
        const fetchData = async () => {
            setFundingInterestOptions(await fetchIndustryOptions());
        };
        fetchData();
    }, []);

    const [collapsedSections, setCollapsedSections] = useState({
        fundingInterest: false,
    });

    const toggleSection = (section) => {
        setCollapsedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleInputChange = (e, key) => {
        const { value, checked } = e.target;
        setFilters((prev) => {
            // Handle multi-select fields (arrays)
            if (Array.isArray(prev[key])) {
                const updatedField = checked
                    ? [...prev[key], value]
                    : prev[key].filter((item) => item !== value);
                return {
                    ...prev,
                    [key]: updatedField,
                };
            }

            // Default fallback for simple fields
            return {
                ...prev,
                [key]: value,
            };
        });
    };
    console.log("filters:", filters);

    useEffect(() => {
        let params = new URLSearchParams(searchParams.toString());

        filters.search ? params.set("search", filters.search) : params.delete("search");

        if (filters.fundingInterest.length > 0) {
            const formattedInterests = filters.fundingInterest.map((interest) =>
                interest.toLowerCase().replace(/\s*\/\s*/g, "-").replace(/\s+/g, "-")
            );

            params.set("funding-interest", formattedInterests.join("_"));
        } else {
            params.delete("funding-interest");
        }


        router.push(`/investor-listing?${params.toString()}`, { scroll: false });
    }, [filters, router]);

    const handleClearFilters = () => {
        setFilters(initialFilters);
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-[25px] font-medium">Filter</h3>
                <button onClick={handleClearFilters} className="text-[16px] text-[#0A66C2] focus:outline-none">
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
                    onChange={(e) => handleInputChange(e, "search")}
                    className="w-full px-3 py-2 border rounded-[100px] focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm"
                />

                <div className="border-b-[1px] border-[#18181833]"></div>

                {/* Industry */}
                <CollapsibleSection
                    title="Funding Interest"
                    isCollapsed={collapsedSections.fundingInterest}
                    toggleSection={() => toggleSection("fundingInterest")}
                >
                    <div className="mt-2 flex flex-col gap-y-3">
                        {fundingInterestOptions.slice(0, showAllFundingInterestOptions ? fundingInterestOptions.length : 2).map((option, index) => (
                            <label key={index} className="flex items-center space-x-2 text-sm">
                                <input
                                    type="checkbox"
                                    name="fundingInterest"
                                    value={option}
                                    checked={filters.fundingInterest.includes(option)}
                                    onChange={(e) => handleInputChange(e, "fundingInterest")}
                                    className="form-checkbox h-[20px] w-[20px] text-[#181818]"
                                />
                                <span className="text-[18px]">{option}</span>
                            </label>
                        ))}
                    </div>
                    {fundingInterestOptions.length > 2 && (
                        <p
                            onClick={() => setShowAllFundingInterestOptions((prev) => !prev)}
                            className="text-[#0966C3] text-[18px] mt-2 cursor-pointer"
                        >
                            {showAllFundingInterestOptions ? "See less options" : "See all options"}
                        </p>
                    )}
                </CollapsibleSection>

                {/* <CollapsibleSection
                    title="Financial Metrics"
                    isCollapsed={collapsedSections.financialMetrics}
                    toggleSection={() => toggleSection("financialMetrics")}
                >
                    <p>Financial Metrics Content</p>
                </CollapsibleSection> */}

                {/* Financial Metrics */}
                {/* <CollapsibleSection
                    title="Financial Metrics"
                    isCollapsed={collapsedSections.financialMetrics}
                    toggleSection={() => toggleSection("financialMetrics")}
                >
                    {["revenue", "profit", "valuation"].map((key) => (
                        <div key={key} className="mb-3">
                            <label className="text-[20px] font-medium capitalize">{key}</label>
                            <div className="flex items-center gap-2 mt-1">
                                <input
                                    type="number"
                                    name="min"
                                    placeholder="$Min"
                                    value={filters[key].min}
                                    onChange={(e) => handleInputChange(e, key)}
                                    className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm"
                                />
                                <span className="text-[#363638] mt-2">-</span>
                                <input
                                    type="number"
                                    name="max"
                                    placeholder="$Max"
                                    value={filters[key].max}
                                    onChange={(e) => handleInputChange(e, key)}
                                    className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm"
                                />
                            </div>
                        </div>
                    ))}
                </CollapsibleSection> */}

                {/* <div className="border-b-[1px] border-[#18181833]"></div> */}

                {/* Funding */}
                {/* <CollapsibleSection
                    title="Type of Funding"
                    isCollapsed={collapsedSections.funding}
                    toggleSection={() => toggleSection("funding")}
                >
                    <div className="mt-2 flex flex-col gap-y-3">
                        {fundingOptions.slice(0, showAllFunding ? fundingOptions.length : 2).map((option, index) => (
                            <label key={index} className="flex items-center space-x-2 text-sm">
                                <input
                                    type="checkbox"
                                    name="funding"
                                    value={option}
                                    checked={filters.funding.includes(option)}
                                    onChange={(e) => handleInputChange(e, "funding")}
                                    className="form-checkbox h-[20px] w-[20px] text-[#181818]"
                                />
                                <span className="text-[18px]">{option}</span>
                            </label>
                        ))}
                    </div>
                    {fundingOptions.length > 2 && (
                        <p
                            onClick={() => setShowAllFunding((prev) => !prev)}
                            className="text-[#0966C3] text-[18px] mt-2 cursor-pointer"
                        >
                            {showAllFunding ? "See less options" : "See all options"}
                        </p>
                    )}
                </CollapsibleSection> */}

                {/* <div className="border-b-[1px] border-[#18181833]"></div> */}

                {/* <div className="border-b-[1px] border-[#18181833]"></div> */}

                {/* Employee Size */}
                {/* <CollapsibleSection
                    title="Employee Size"
                    isCollapsed={collapsedSections.employeeSize}
                    toggleSection={() => toggleSection("employeeSize")}
                >
                    <div className="mt-2">
                        <input
                            type="range"
                            name="employeeSize"
                            min="1"
                            max="1000"
                            value={filters.employeeSize}
                            onChange={(e) => handleInputChange(e)}  // When the slider is moved
                            className="w-full"
                            onMouseDown={() => setIsDragging(true)}  // When the user starts dragging
                            onMouseUp={() => setIsDragging(false)}  // When the user stops dragging
                        />
                        <div className="text-sm text-gray-600">{filters.employeeSize}+</div>
                    </div>
                </CollapsibleSection> */}

                {/* <div className="border-b-[1px] border-[#18181833]"></div> */}

                {/* Region */}
                {/* <CollapsibleSection
                    title="Region"
                    isCollapsed={collapsedSections.region}
                    toggleSection={() => toggleSection("region")}
                >
                    <div className="mt-2 flex flex-col gap-y-3 overflow-y-scroll max-h-[200px]">
                        {countryOptions.map((option, index) => (
                            <label key={index} className="flex items-center space-x-2 text-sm">
                                <input
                                    type="checkbox"
                                    name="region"
                                    value={option.value}
                                    checked={filters.region.includes(option.value)}
                                    onChange={(e) => handleInputChange(e, "region")}
                                    className="form-checkbox h-[20px] w-[20px] text-[#181818]"
                                />
                                <span className="text-[18px]">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </CollapsibleSection> */}

                <div className="border-b-[1px] border-[#18181833]"></div>
            </div >
        </div >
    );
};

export default Filter;