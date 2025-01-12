"use client";
import React, { useRef } from "react";
import Header2 from "@/components/business-listing/header2";
import Footer from "@/components/footer";
import Heading from "./heading-box";
import SectionNavigation from "./section-navigation";
import ContentSections from "./content-sections";

export default function Detail({ business }) {
    const sections = useRef({});

    const scrollToSection = (id) => {
        if (sections.current[id]) {
            sections.current[id].scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div>
            <Header2 />
            <Heading
                image={business.business_image.data.attributes.url}
                title={business.company_name}
                location={business.headquarters}
                company_type={business.industry.data.attributes.name}
                funding_type={business.fundraise_business_details.type_of_funding}
            />
            <div className="flex mx-72">
                <SectionNavigation onNavigate={scrollToSection} />
                <ContentSections business={business} sectionsRef={sections} />
            </div>
            <Footer />
        </div>
    );
}
