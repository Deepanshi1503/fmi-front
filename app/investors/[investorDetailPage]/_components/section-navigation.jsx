import React from "react";

export default function SectionNavigation({ activeSection, onNavigate }) {
    const sections = [
        { id: "overview", title: "Overview" },
        { id: "investmentPreference", title: "Investment Preference" },
        { id: "portfolio", title: "Portfolio" },
        { id: "companyDetails", title: "Company Details" },
        { id: "contactSection", title: "Contact Section" },
        { id: "founterAndTeam", title: "Founder & Team" },
    ];

    return (
        <div className="w-1/4 p-4 " style={{
            position: "sticky",
            top: "0", 
            alignSelf: "flex-start",
        }}>
            <ul className="space-y-6">
                {sections.map((section) => (
                    <li
                        key={section.id}
                        className={`cursor-pointer text-[18px] font-medium `}
                        onClick={() => onNavigate(section.id)}
                    >
                       <span
                            className={`inline-block ${
                                activeSection === section.id ? "text-[#0A66C2] border-b-2 border-[#0A66C2]" : ""
                            }`}
                        >
                            {section.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
