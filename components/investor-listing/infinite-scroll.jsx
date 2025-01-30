"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import InvestorCard from "./investor-card";
import { fetchInvestorBusinesses } from "@/utils/api";

const InfiniteScroll = ({ initialFilters, initialSort, startPage = 2 }) => {
    const [businesses, setBusinesses] = useState([]);
    const [page, setPage] = useState(startPage);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const { ref, inView } = useInView({
        threshold: 1,
    });

    // Fetch the next page with a delay
    const fetchMore = async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            // Introduce a delay of 3 seconds
            await new Promise((resolve) => setTimeout(resolve, 3000));

            const { data, meta } = await fetchInvestorBusinesses(initialFilters, initialSort, page);
            if (data?.length > 0) {
                setBusinesses((prev) => [...prev, ...data]);
                setPage((prevPage) => prevPage + 1);
                if (meta?.pagination?.page >= meta?.pagination?.pageCount) {
                    setHasMore(false);
                }
            } else {
                setHasMore(false); // No more data to fetch
            }
        } catch (error) {
            console.error("Error fetching more businesses:", error);
        } finally {
            setLoading(false);
        }
    };

    // Trigger fetching when in view
    useEffect(() => {
        if (inView && hasMore) {
            fetchMore();
        }
    }, [inView]);

    return (
        <div>
            {/* Render all businesses */}
            <div className="flex flex-col gap-y-8">
                {businesses.map((business) => (
                    <InvestorCard key={business.id} business={business} />
                ))}
            </div>

            {/* Loading or end-of-results indicator */}
            <div ref={ref} className="text-center">
                {loading && hasMore && <span className="">Loading more...</span>}
            </div>

            <div ref={ref} className={`${!loading && !hasMore ? "pt-6 text-center" : ""}`}>
                {!hasMore && !loading && <span className="">No more results</span>}
            </div>
        </div>
    );
};

export default InfiniteScroll;
