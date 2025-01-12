import React from "react";
import OverviewSection from "./sections/overview-section";
import FundingRequirementSection from "./sections/funding-requirement-secton";
import FinancialsSection from "./sections/financials-section";
import LocationsSection from "./sections/location-section";
import ProductsSection from "./sections/products-section";
import FoundersSection from "./sections/founders-section";
import MarketSection from "./sections/market-section";

export default function ContentSections({ business, sectionsRef }) {
    return (
        <div className="w-3/4 p-4">
            <OverviewSection ref={(el) => (sectionsRef.current["overview"] = el)} business={business} />
            <FundingRequirementSection
                ref={(el) => (sectionsRef.current["fundingRequirement"] = el)}
                business={business}
            />
            <FinancialsSection ref={(el) => (sectionsRef.current["financials"] = el)} business={business} />
            <LocationsSection ref={(el) => (sectionsRef.current["locations"] = el)} business={business} />
            <ProductsSection ref={(el) => (sectionsRef.current["products"] = el)} business={business} />
            <FoundersSection ref={(el) => (sectionsRef.current["founders"] = el)} business={business} />
            <MarketSection ref={(el) => (sectionsRef.current["market"] = el)} business={business} />
        </div>
    );
}
