import React from "react";
import OverviewSection from "./sections/overview-section";
import ContactDetail from "./sections/contact-detail";
import CompanyDetail from "./sections/company-detail";
import FounderTeam from "./sections/founder-team-details"
import Portfolio from "./sections/portfolio"
// import InvestmentPreferences from "./sections/investment-preference";

export default function ContentSections({ business, sectionsRef }) {
    console.log("investor business detail", business);
    return (
        <div className="w-3/4 p-4">
            <OverviewSection
                ref={(el) => (sectionsRef.current["overview"] = el)}
                title={business.attributes.company_name}
                description={business.attributes.profile_description}
            />
            <Portfolio
                ref={(el) => (sectionsRef.current["portfolio"] = el)}
                companyName={business.attributes.company_name}
                investmentDetails={business.attributes.investment_details}
            />
            <CompanyDetail
                ref={(el) => (sectionsRef.current["companyDetails"] = el)}
                companyName={business.attributes.company_name}
                yearEstablishment={business.attributes.year_of_establishment}
                website={business.attributes.website_url}
                country={business.attributes.country?.data.attributes.name}
            />
            <ContactDetail
                ref={(el) => (sectionsRef.current["contactSection"] = el)}
                gmail={business.attributes.professional_emailid}
                phoneNumber={business.attributes.phone_number}
                location={business.attributes.headquarters}
                city={business.attributes.city?.data.attributes.name}
                country={business.attributes.country?.data.attributes.name}
                website={business.attributes.website_url}
            />
            <FounderTeam
                ref={(el) => (sectionsRef.current["founterAndTeam"] = el)}
                founderDetail={business.attributes.founder_team_detail}
            />
        </div>
    );
}
