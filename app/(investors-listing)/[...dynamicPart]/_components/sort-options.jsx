"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const SortOptions = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryParams = new URLSearchParams(searchParams);
    const pathname = usePathname();

    const handleSortChange = (e) => {
        queryParams.set("sort", e.target.value);
        const queryString = queryParams.toString();

        router.replace(`${pathname}?${queryString}`, { scroll: false });
    };

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-[16px] font-medium text-[#363638] mt-2">
                Sort By :
            </label>
            <div className="relative">
                <select
                    id="sort"
                    value={queryParams.get("sort") || ""}
                    onChange={handleSortChange}
                    className="appearance-none px-4 py-2 border rounded-lg text-[16px] text-[#495057] focus:outline-none"
                >
                    <option value="null">Select</option>
                    <option value="newest">Newest</option>
                    <option value="views">Views</option>
                    <option value="search">Search</option>
                    <option value="commitment-amount-low-to-high">Commitment Amount - low to high</option>
                    <option value="commitment-amount-high-to-low">Commitment Amount - high to low</option>
                </select>
                <span className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1.5 5.5L8 12l6.5-6.5H1.5z" />
                    </svg>
                </span>
            </div>
        </div>
    );
};

export default SortOptions;
