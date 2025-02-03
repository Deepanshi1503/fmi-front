"use client";
import React, { useEffect, useRef, useState } from "react";
import Header2 from "@/components/business-listing/header2";
import Footer from "@/components/footer";
import Heading from "./heading-box";
import SectionNavigation from "./section-navigation";
import ContentSections from "./content-sections";
import { fetchBusinessById } from "@/utils/api";

export default function Detail({ businessId }) {
    const [business, setBusiness] = useState(null);
    const [error, setError] = useState(null);
    const sections = useRef({});

    // Function to fetch business data
    const loadBusinessData = async () => {
        try {
            const data = await fetchBusinessById(businessId);
            if (data && data.data) {
                setBusiness(data.data.attributes);
            } else {
                setError("Business data not found.");
            }
        } catch (err) {
            console.error("Error fetching business data:", err);
            setError("Failed to load business data. Please try again later.");
        }
    };

    useEffect(() => {
        if (businessId) {
            loadBusinessData();
        }
    }, [businessId]);

    const scrollToSection = (id) => {
        if (sections.current[id]) {
            sections.current[id].scrollIntoView({ behavior: "smooth" });
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!business) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header2 />
            <Heading
                image={business.business_image?.data?.attributes?.url}
                title={business.company_name}
                location={business.headquarters}
                company_type={business.industry.data.attributes.name}
                funding_type={business.fundraise_business_details?.type_of_funding || "Sale"}
            />
            <div className="flex mx-72">
                <SectionNavigation onNavigate={scrollToSection} />
                <ContentSections business={business} sectionsRef={sections} />
            </div>
            <Footer />
        </div>
    );
}
