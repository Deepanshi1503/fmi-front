import { title } from "process";
import React from "react";

export default function SectionNavigation({ onNavigate }) {
    const sections = [
        { id: "overview", title: "Overview" },
        { id: "fundingRequirement", title: "Funding Requirement" },
        { id: "financials", title: "Financials" },
        {id: "currentInvestment", title: "Current Investment"},
        { id: "contactDetails", title: "Contact Details" },
        { id: "products", title: "Products & Services" },
        { id: "founders", title: "Founders & Team" },
        { id: "market", title: "Market & Competition" },
    ];

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
                        className="cursor-pointer text-[18px] font-medium"
                        onClick={() => onNavigate(section.id)}
                    >
                        {section.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
