import React, {useState, useEffect} from "react";

export default function SectionNavigation({ onNavigate }) {
    const sections = [
        { id: "overview", title: "Overview" },
        { id: "fundingRequirement", title: "Funding Requirement" },
        { id: "financials", title: "Financials" },
        { id: "currentInvestment", title: "Current Investment" },
        { id: "contactDetails", title: "Contact Details" },
        { id: "products", title: "Products & Services" },
        { id: "founders", title: "Founders & Team" },
        { id: "market", title: "Market & Competition" },
    ];

    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleObserver = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleObserver, {
            root: null, // viewport
            rootMargin: "0px",
            threshold: 0.6, // 60% of the section must be visible to trigger
        });

        const sectionElements = sections.map((section) =>
            document.getElementById(section.id)
        );

        sectionElements.forEach((element) => {
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            sectionElements.forEach((element) => {
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [sections]);

    return (
        <div className="w-1/4 p-4" style={{
            position: "sticky",
            top: "0", // Sticks the left panel to the top
            alignSelf: "flex-start", // Maintains left panel position
        }}>
            <ul className="space-y-6">
                {sections.map((section) => (
                    <li
                        key={section.id}
                        className={`cursor-pointer text-[18px] font-medium ${activeSection === section.id ? "text-[#0A66C2] " : ""
                            }`}
                        onClick={() => onNavigate(section.id)}
                    >
                        <span className={`${activeSection === section.id ? "border-b-2 border-[#0A66C2]" : ""}`}>{section.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
