import React, { useState } from "react";

const OverviewSection = React.forwardRef(({ business }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_LENGTH = 800; // Maximum length of text before truncation

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const overviewText = business.description_about_company;
    const shouldApplyFade = overviewText.length > MAX_LENGTH;

    return (
        <section id="overview" ref={ref} className="mb-12 pt-4 border border-[#EFEFEF] rounded-[16px] bg-white">
            <div className="px-4">
            <p className="text-[28px] font-semibold mb-3">Overview</p>
            <p className="text-[24px] font-medium mb-4">{business.company_name}</p>
            <div
                className={`relative text-[16px] ${shouldApplyFade & !isExpanded ? "max-h-[150px] overflow-hidden fade-effect" : "mb-4"
                    }`}
                style={{
                    lineHeight: "1.6",
                }}
            >
                {overviewText}
            </div>
            </div>
            {overviewText.length > MAX_LENGTH && (
                <button
                    onClick={toggleExpansion}
                    className="mt-2 text-[#0A2FC2] text-[18px] py-2  hover:underline focus:outline-none bg-[#F5F5F5] rounded-b-[16px] w-full"
                >
                    {isExpanded ? "Show less" : "Show more"}
                </button>
            )}
        </section>
    );
});

export default OverviewSection;
