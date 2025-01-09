"use client"
import React, { useEffect, useState } from "react";
import { fetchBusinesses } from "@/utils/api";
import BusinessCard from "./business-card";
import Filter from "./filter";
import Header2 from "@/components/business-listing/header2"
import HeadingBox from "@/components/business-listing/heading-box"
import Footer from "@/components/footer"
import Image from 'next/image'

export default function Listing() {
    const [businesses, setBusinesses] = useState([]);
    const [filters, setFilters] = useState({});
    const [sortOption, setSortOption] = useState("");
    const [sortValue, setSortValue]=useState("");
    console.log("sortOption",sortOption );
    

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchBusinesses(filters, sortOption);
            setBusinesses(Array.isArray(data.data) ? data.data : []);
        };

        fetchData();
    }, [filters, sortOption]);

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
    };

    const handleSortChange = (event) => {
        const option = event.target.value;
        const sortMapping = {
            profit: "financial_model_details.profit:desc",
            loss: "financial_model_details.profit:asc",
            revenue: "financial_model_details.revenue:desc",
            year: "year_of_incorporation:asc",
        };

        setSortOption(sortMapping[option] || "");
        setSortValue(event.target.value);
    };

    return (
        <>
            <Header2 />
            <HeadingBox />
            <div className="flex justify-between mx-24 mt-10">
                <div className="w-[23%] px-4 py-2" style={{
                    position: "sticky",
                    top: "0", // Sticks the left panel to the top
                    alignSelf: "flex-start", // Maintains left panel position
                }}>
                    <Filter onFilter={handleFilter} />
                </div>
                <div className="w-[75%] mb-8">
                    {/* Results header section */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-[16px] text-[#181818CC] font-semibold mt-2">
                            ({businesses.length}) Results Found
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="sort" className="text-[16px] font-medium text-[#363638] mt-2">
                                Sort By :
                            </label>
                            <div className="relative">
                                <select
                                    id="sort"
                                    value={sortValue}
                                    onChange={handleSortChange}
                                    className="appearance-none px-4 py-2 border rounded-lg text-[16px] text-[#495057] focus:outline-none focus:ring-1 focus:ring-[#CED4DA] bg-transparent"
                                >
                                    <option value="">Select</option>
                                    <option value="profit">Profit</option>
                                    <option value="loss">Loss</option>
                                    <option value="revenue">Revenue</option>
                                    <option value="year">Year of Incorporation</option>
                                </select>
                                {/* Custom arrow */}
                                <span className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="text-[#495057]"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M1.5 5.5L8 12l6.5-6.5H1.5z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Business cards */}
                    <div className="flex flex-col gap-y-8">
                        {businesses.map((business) => (
                            <BusinessCard
                                key={business.id}
                                business={business}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}