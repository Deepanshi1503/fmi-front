"use client";
import React, { useEffect, useRef, useState } from "react";
import SectionNavigation from "./section-navigation";
import ContentSections from "./content-sections";

export default function SectionTracker({ business }) {
    const sectionsRef = useRef({});
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        Object.values(sectionsRef.current).forEach((element) => {
            if (element) observer.observe(element);
        });

        return () => {
            Object.values(sectionsRef.current).forEach((element) => {
                if (element) observer.unobserve(element);
            });
        };
    }, []);

    const scrollToSection = (id) => {
        if (sectionsRef.current[id]) {
            sectionsRef.current[id].scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="flex mx-72">
            <SectionNavigation activeSection={activeSection} onNavigate={scrollToSection} />
            <ContentSections business={business} sectionsRef={sectionsRef} />
        </div>
    );
}
