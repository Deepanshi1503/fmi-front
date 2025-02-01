"use client"
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { fetchIndustryOptions, fetchCountryCityOptions, generateInvestorListingURL } from "@/utils/api";
import { fetchInvestorTypeOptions } from "@/utils/validation-investor-profile-creation";
import { Range } from "react-range";

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

const Filter = ({initialSlugData}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const MIN = 1;
    const MAX = 10000;

    // Parse slug data to extract fundingInterest and region
    const parseSlugData = (slugData) => {
        if (!slugData || !slugData["investors"]) return { fundingInterest: "", region: "" };
        
        const slug = slugData["investors"][0];
        let fundingInterest = "";
        let region = "";

        if (slug.includes("-investors-in-")) {
            const parts = slug.split("-investors-in-");
            fundingInterest = parts[0].replace(/-/g, " ");
            region = parts[1].replace(/-/g, " ");
        } else if (slug.includes("-investors")) {
            fundingInterest = slug.replace(/-investors$/, "").replace(/-/g, " ");
        } else if (slug.includes("investors-in-")) {
            region = slug.replace(/^investors-in-/, "").replace(/-/g, " ");
        }

        return { fundingInterest, region };
    };

    // Get initial values from both URL params and slug
    const slugValues = parseSlugData(initialSlugData);
    console.log("slugvalue", slugValues);

    const initialFilters = {
        search: searchParams.get("search") || "",
        fundingInterest: slugValues.fundingInterest || "",
        fundingType: searchParams.get("fundingType")?.split("_") || [],
        fundingAmount: searchParams.get("fundingAmount")?.split("-").map(Number) || [1, 10000],
        region: slugValues.region || ""
    };

    const [filters, setFilters] = useState(initialFilters);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    let [showAllFundingInterestOptions, setShowAllFundingInterestOptions] = useState(false);
    let [showFundingTypeOptions, setShowFundingTypeOptions] = useState(false);
    let [showCountryCityOptions, setShowCountryCityOptions] = useState(false);

    let [fundingInterestOptions, setFundingInterestOptions] = useState([]);
    let [fundingTypeOptions, setFundingTypeOptions] = useState([]);
    let [countryCityOptions, setCountryCityOptions] = useState([]);

    // Fetch options on mount
    useEffect(() => {
        const fetchData = async () => {
            setFundingInterestOptions(await fetchIndustryOptions());
            const preferredInvestmentTypeData = await fetchInvestorTypeOptions();
            const countryCityData = await fetchCountryCityOptions();

            const combinedCountryCity = [];

            const countries = Array.from(new Set(countryCityData.countries.map(item => item.name)));
            combinedCountryCity.push(...countries);

            const cities = countryCityData.cities.map(item => item.name);
            combinedCountryCity.push(...cities);

            setCountryCityOptions(combinedCountryCity);
            setFundingTypeOptions(preferredInvestmentTypeData.option2.preferred_investment_type.enum);
        };
        fetchData();
    }, []);

    const [collapsedSections, setCollapsedSections] = useState({
        fundingInterest: false,
        fundingType: true,
        fundingAmount: true,
        region: true,
    });

    const toggleSection = (section) => {
        setCollapsedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleInputChange = (e, key) => {
        const { value, checked } = e.target;
        setFilters((prev) => ({
            ...prev,
            [key]: Array.isArray(prev[key])
                ? checked ? [...prev[key], value] : prev[key].filter((item) => item !== value)
                : value,
        }));
    };

    console.log("filters:", filters);

    const handleFundingChange = (values) => {
        setFilters((prev) => ({ ...prev, fundingAmount: values }));
    };

    useEffect(() => {
        if(isInitialLoad){
            setIsInitialLoad(false);
            return;
        }

        const { fundingInterest, region, fundingType, fundingAmount, search } = filters;

        // Generate dynamic route
        const dynamicRoute = generateInvestorListingURL(fundingInterest, region);

        // Create query params
        const params = new URLSearchParams();

        if (search) params.set("search", search);
        if (fundingType.length > 0) params.set("fundingType", fundingType.join("_"));
        if (fundingAmount && !isNaN(fundingAmount[0])) {
            params.set("fundingAmount", fundingAmount.join("-"));
        }

        // Construct the final URL
        const queryString = params.toString();
        const newUrl = `${dynamicRoute}${queryString ? `?${queryString}` : ''}`;

        // Use push to update the URL and trigger a page refresh
        router.push(newUrl);
    }, [filters, router, isInitialLoad]);


    const handleClearFilters = () => {
        setFilters({
            search: "",
            fundingInterest: "",
            fundingType: [],
            fundingAmount: [1, 10000],
            region: ""
        });
        router.push('/investor-listing');
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-[25px] font-medium" >Filter</h3>
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
                                    type="radio"
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

                <div className="border-b-[1px] border-[#18181833]"></div>

                {/* Investor Type */}
                <CollapsibleSection
                    title="Investor Type"
                    isCollapsed={collapsedSections.fundingType}
                    toggleSection={() => toggleSection("fundingType")}
                >
                    <div className="mt-2 flex flex-col gap-y-3">
                        {fundingTypeOptions.slice(0, showFundingTypeOptions ? fundingTypeOptions.length : 2).map((option, index) => (
                            <label key={index} className="flex items-center space-x-2 text-sm">
                                <input
                                    type="checkbox"
                                    name="fundingType"
                                    value={option}
                                    checked={filters.fundingType.includes(option)}
                                    onChange={(e) => handleInputChange(e, "fundingType")}
                                    className="form-checkbox h-[20px] w-[20px] text-[#181818]"
                                />
                                <span className="text-[18px]">{option}</span>
                            </label>
                        ))}
                    </div>
                    {fundingTypeOptions.length > 2 && (
                        <p
                            onClick={() => setShowFundingTypeOptions((prev) => !prev)}
                            className="text-[#0966C3] text-[18px] mt-2 cursor-pointer"
                        >
                            {showFundingTypeOptions ? "See less options" : "See all options"}
                        </p>
                    )}
                </CollapsibleSection>

                <div className="border-b-[1px] border-[#18181833]"></div>

                {/* Funding Amount Filter */}
                <CollapsibleSection
                    title="Funding Amount"
                    isCollapsed={collapsedSections.fundingAmount}
                    toggleSection={() => toggleSection("fundingAmount")}
                >
                    <div className="mt-2">
                        <p className="text-[18px] mb-2">
                            {filters.fundingAmount[0]} - {filters.fundingAmount[1]} Cr
                        </p>
                        <div className="relative w-full px-2 my-2 flex flex-col items-center">
                            <Range
                                step={1}
                                min={MIN}
                                max={MAX}
                                values={filters.fundingAmount}
                                onChange={handleFundingChange}
                                renderTrack={({ props, children }) => {
                                    const minValue = filters.fundingAmount[0];
                                    const maxValue = filters.fundingAmount[1];

                                    return (
                                        <div
                                            {...props}
                                            className="w-full h-2 bg-gray-300 rounded-lg relative"
                                            style={{
                                                background: `linear-gradient(to right, #d1d5db 0%, #d1d5db ${(minValue - MIN) / (MAX - MIN) * 100}%, #0966C3 ${(minValue - MIN) / (MAX - MIN) * 100}%, #0966C3 ${(maxValue - MIN) / (MAX - MIN) * 100}%, #d1d5db ${(maxValue - MIN) / (MAX - MIN) * 100}%, #d1d5db 100%)`,
                                            }}
                                        >
                                            {children}
                                        </div>
                                    );
                                }}
                                renderThumb={({ props }) => (
                                    <div
                                        {...props}
                                        className="h-5 w-5 bg-[#0966C3] rounded-full cursor-pointer border-2 border-white shadow-md"
                                    />
                                )}
                            />

                        </div>
                    </div>
                </CollapsibleSection>

                <div className="border-b-[1px] border-[#18181833]"></div>

                {/* Region */}
                <CollapsibleSection
                    title="Region"
                    isCollapsed={collapsedSections.region}
                    toggleSection={() => toggleSection("region")}
                >
                    <div className="mt-2 flex flex-col gap-y-3">
                        {countryCityOptions.slice(0, showCountryCityOptions ? countryCityOptions.length : 2).map((option, index) => (
                            <label key={index} className="flex items-center space-x-2 text-sm">
                                <input
                                    type="radio"
                                    name="region"
                                    value={option}
                                    checked={filters.region.includes(option)}
                                    onChange={(e) => handleInputChange(e, "region")}
                                    className="form-checkbox h-[20px] w-[20px] text-[#181818]"
                                />
                                <span className="text-[18px]">{option}</span>
                            </label>
                        ))}
                    </div>
                    {countryCityOptions.length > 2 && (
                        <p
                            onClick={() => setShowCountryCityOptions((prev) => !prev)}
                            className="text-[#0966C3] text-[18px] mt-2 cursor-pointer"
                        >
                            {showCountryCityOptions ? "See less options" : "See all options"}
                        </p>
                    )}
                </CollapsibleSection>

                <div className="border-b-[1px] border-[#18181833]"></div>
            </div >
        </div >
    );
};

export default Filter;