"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Check, MoveLeft, MoveRight } from "lucide-react";
import FounderTeam from "@/components/profile-creation/founder-team/founder-team-steps";
import CompanyOverview from "@/components/profile-creation/company-overview/company-overview-steps";
import ProductServices from "@/components/profile-creation/product-services/product-services-steps";
import MarketCompetition from "@/components/profile-creation/market-competition/market-competition-steps";
import Financial from "@/components/profile-creation/financial/financial-form"
import EquitySale from "@/components/profile-creation/equity-fundraising/equity-sell-steps"
import { GlobalContextProvider } from "@/context/context";
import { useGlobalContext } from "@/context/context";

const stepsConfig = [
  { id: "company-overview", label: "Company Overview", component: <CompanyOverview /> },
  { id: "products-services", label: "Products and Services", component: <ProductServices /> },
  { id: "founder-team", label: "Founder & Team", component: <FounderTeam /> },
  { id: "market-competition", label: "Market and Competition", component: <MarketCompetition /> },
  { id: "financial", label: "Financial", component: <Financial /> },
  { id: "equity-fundraising", label: "Equity & Fundraising", component: <EquitySale /> },
];

const ProfileStep = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  
  const syncBusinessData = async (businessData, founderData, teamData, advisorData) => {
    const businessId = localStorage.getItem("businessId");
    console.log(businessData.marketOpportunity)

    // Map data to backend schema
    const payload = {
      data: {
        title: businessData.companyName,
        slug: businessData.companyName.toLowerCase().replace(/\s+/g, '-') + '-title',
        purpose_of_listing_business: businessData.lookingFor,
        reason_for_selling_fundraise: businessData.reason,
        company_name: businessData.companyName,
        website_url: businessData.website,
        stage_of_company: businessData.companyStage,
        type_of_company: businessData.companyType,
        description_about_company: businessData.description,
        company_mission: businessData.mission,
        company_vision: businessData.vision,
        remote_onsite_workforce_ration: businessData.workforceRatio,
        diversity_information: businessData.diversityInfo,
        headquarters: businessData.headquarters,
        country: businessData.country,
        state: businessData.state,
        geographical_presence: businessData.geographicalPresence,
        current_geography: businessData.currentGeography,
        parent_company: businessData.parentCompany,
        professional_emailid: businessData.professionalEmail,
        phone_number: businessData.phoneNumber,
        linkedin_id: businessData.linkedInId,
        year_of_incorporation: parseInt(businessData.yearOfIncorporation) || null,
        youtube_url: businessData.youtubeUrl,
        product_name: businessData.productName,
        product_description: businessData.productDescription,
        revenue_model: businessData.revenueModel,
        current_status: businessData.currentStatus,
        preferred_timeframe_for_action: mapPreferredTimeframe(businessData.preferredTimeframe),
        workforce_range: mapNumberOfEmployees(businessData.numberOfEmployees),
        founder_detail: founderData.map(founder => ({
          name: founder.name,
          role: founder.role,
          background: founder.professionalBackground,
          linkedin_profile: founder.linkedinProfile,
          education:founder.education,
          // image:founder.profileImage,
        })),
        team_details: teamData.map(member => ({
          name: member.name,
          role: member.role,
          background: member.professionalBackground,
          linkedin_profile: member.linkedinProfile,
          education:member.education,
          // image:member.profileImage,
        })),
        board_member_advisor__detail: advisorData.map(advisor => ({
          name: advisor.name,
          role: advisor.role,
          background: advisor.professionalBackground,
          linkedin_profile: advisor.linkedinProfile,
          education:advisor.education,
          // image:advisor.profileImage,
        })),
        market_opportunity_size: businessData.marketOpportunity,
        competitor_analysis:businessData.competitorAnalysis,
        global_market_share: businessData.competitiveAnalysis.globalMarketSize.map((item) => ({
          country: item.country,
          currency: item.currency,
          amount: item.amount,
        })),
        current_market_share: businessData.competitiveAnalysis.currentMarketShare.map((item) => ({
          country: item.country,
          share_percentage: item.share,
          value: item.value,
        })),
        your_competitors: businessData.competitiveAnalysis.descriptions.competitors,
        why_are_you_different: businessData.competitiveAnalysis.descriptions.whyDifferent,
        why_you_why_now: businessData.competitiveAnalysis.descriptions.whyNow,
        fundraising_status: businessData.fundraisingStatus.fundraisingStatus.map((item) => ({
          current_status: item.lender,
          amount: item.amount,
        })),
        total_fundraised:businessData.fundraisingStatus.totalFundsRaised,
      }
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail(businessData.professionalEmail)) {
      console.error("Invalid email format:", businessData.professionalEmail);
      return; // Prevent sending the request
    }

    try {
      if (businessId) {
        // Update existing business
        await axios.put(`http://localhost:1337/api/businesses/${businessId}`, payload);
        console.log("Business updated successfully.");
      } else {
        // Create new business
        const response = await fetch("http://localhost:1337/api/businesses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",  // Set content type to JSON
          },
          body: JSON.stringify(payload),  // Send the payload directly
        });
        const responseData = await response.json(); // Parse the response
        if (responseData) {
          console.log("Business created successfully:", responseData.data.id);
          localStorage.setItem("businessId", responseData.data.id); // Store the created business ID
        }
      }
    } catch (error) {
      console.error("Error syncing business data:", error);
    }
  };


  const mapPreferredTimeframe = (timeframe) => {
    const timeframeMap = {
      "Immediate": "\"Immediate\"",
      "1 - 3 months": "\"1 - 3 months\"", // Update based on actual allowed values
      "3 - 6 months": "\"3 - 6 months\"",
      "6 - 12 months": "\"6 - 12 months\"",
    };
    return timeframeMap[timeframe] || null;
  };

  const mapNumberOfEmployees = (employees) => {
    const employeeMap = {
      "1 - 10": "\"1 - 10\"",
      "11 - 50": "\"11 - 50\"",
      "51 - 200": "\"51 - 200\"",
      "201 - 500": "\"201 - 500\"",
      "501 - 1000": "\"501 + \"",
    };
    return employeeMap[employees] || null;
  };


  const handleNext = async () => {
    // Simulate form data
    const formData = JSON.parse(localStorage.getItem("combineInfo"));
    const founderData = JSON.parse(localStorage.getItem("founders"));
    const teamData = JSON.parse(localStorage.getItem("teamMembers"));
    const advisorData = JSON.parse(localStorage.getItem("advisors"));

    // Sync with backend before navigating
    await syncBusinessData(formData, founderData, teamData, advisorData);

    // Navigate to the next step
    if (activeStep < stepsConfig.length - 1) setActiveStep((prev) => prev + 1);
  };


  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // const renderLabelWithLineBreaks = (label) => {
  //   return label.split("/n").map((line, index) => (
  //     <React.Fragment key={index}>
  //       {line}
  //       <br />
  //     </React.Fragment>
  //   ));
  // };

  return (
    <GlobalContextProvider>
      <div className="w-full relative">
        {/* Stepper Container */}
        <div className="flex items-center justify-evenly relative 2xl:ml-20 2xl:mr-2 2xl:px-[100px] 2xl:py-3 overflow-x-auto">
          {stepsConfig.map((step, index) => (
            <div
              key={step.id}
              className={`relative flex items-center cursor-pointer transition-transform duration-300 ease-in-out ${index <= activeStep ? "opacity-100" : "opacity-70"}`}
              onClick={() => setActiveStep(index)}
            >
              {/* Vertical Line */}
              <div className="hidden 2xl:block absolute left-[-12px] top-0 bottom-0 w-[2px] bg-[#18181833]"></div>

              {/* Step Number Circle */}
              <div
                className={`w-8 h-8 2xl:w-10 2xl:h-10 my-2 2xl:my-0 flex items-center justify-center rounded-full 2xl:text-lg font-semibold
                  ${index === activeStep
                    ? "bg-[#0A66C2] text-white"
                    : "border border-gray-400 text-gray-400"
                  }`}
              >
                {index + 1}
              </div>

              {/* Step Label */}
              <div
                className={`hidden whitespace-nowrap 2xl:block ml-3 text-[13px] font-medium break-words max-w-[140px] ${index === activeStep ? "text-[#0A66C2]" : "text-gray-500"}`}
              >
                {step.label}
              </div>

              {/* Vertical line at the end of the last step */}
              {index === stepsConfig.length - 1 && (
                <div className="hidden 2xl:block absolute right-[-12px] top-0 bottom-0 w-[2px] bg-[#18181833]"></div>
              )}
            </div>
          ))}
        </div>

        {/* Horizontal Line at the End */}
        <div className="border-t-2 border-[#18181833]"></div>

        {/* Step Content */}
        <div className="mt-4 mb-4 text-center">
          {stepsConfig[activeStep].component}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-x-4 xl:gap-x-10 mb-8 xl:mb-12 justify-center xl:justify-end xl:mr-[11rem]">
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            className="border-2 border-[#18181899] rounded-xl bg-white text-[18px] w-[129px] h-[45px]"
          >
            <MoveLeft size={19} className="mr-2" /> Back
          </Button>

          {activeStep === stepsConfig.length - 1 ? (
            <Button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl text-[18px] w-[129px] h-[45px]"
            >
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-[#0A66C2] hover:bg-blue-700 text-white rounded-xl text-[18px] w-[129px] h-[45px]"
            >
              Next <MoveRight size={19} className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </GlobalContextProvider>
  );
};

export default ProfileStep;
