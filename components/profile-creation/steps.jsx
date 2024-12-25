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

const stepsConfig = [
  { id: "company-overview", label: "Company Overview", component: <CompanyOverview /> },
  { id: "products-services", label: "Products and Services", component: <ProductServices /> },
  { id: "founder-team", label: "Founder & Team", component: <FounderTeam /> },
  // { id: "progress-traction", label: "Progress & Traction", component: <div>Progress and Traction Component</div> },
  { id: "market-competition", label: "Market and Competition", component: <MarketCompetition /> },
  // { id: "business-model", label: "Business Model/n& Strategy", component: <div>Business Model Component</div> },
  { id: "financial", label: "Financial", component: <Financial /> },
  { id: "equity-fundraising", label: "Equity & Fundraising", component: <EquitySale /> },
];

const ProfileStep = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Function to sync data with the backend
  const syncBusinessData = async (businessData) => {
    const businessId = localStorage.getItem("businessId");

    // Map data to backend schema
    const payload = {
      data: {
        title: businessData.companyName,
        website_url: businessData.website,
        year_of_incorporation: parseInt(businessData.yearOfIncorporation) || null,
        stage_of_company: businessData.companyStage,
        type_of_company: businessData.companyType,
        description_about_company: businessData.description,
        company_mission: businessData.mission,
        company_vision: businessData.vision,
        purpose_of_listing_business: businessData.lookingFor,
        reason_for_selling_fundraise: businessData.reason,
        preferred_timeframe_for_action: mapPreferredTimeframe(businessData.preferredTimeframe),
        professional_emailid: businessData.professionalEmail,
        phone_number: businessData.phoneNumber,
        linkedin_id: businessData.linkedInId,
        pitch_deck: businessData.pitchDeck,
        company_profile: businessData.companyProfile,
        youtube_url: businessData.youtubeUrl,
        workforce_range: mapNumberOfEmployees(businessData.numberOfEmployees),
        remote_onsite_workforce_ration: businessData.workforceRatio,
        diversity_information: businessData.diversityInfo,
      }
      // Additional fields if required
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
          body: JSON.stringify({
            "data": {
              "title": "Sample Business",
              "slug": "sample-business-title",
              "purpose_of_listing_business": "Raise Funds",
              "reason_for_selling_fundraise": "Need capital to expand operations",
              "company_name": "Sample Company",
              "website_url": "https://samplecompany.com",
              "stage_of_company": "Scaling",
              "type_of_company": "Private Limited",
              "description_about_company": "This is a sample company description.",
              "company_mission": "Deliver quality solutions.",
              "company_vision": "To be a global leader in our field.",
              "remote_onsite_workforce_ration": "50:50",
              "diversity_information": "50% women workforce",
              "headquarters": "New York",
              "country": "United States",
              "state": "New York",
              "geographical_presence": "North America, Europe",
              "current_geography": "United States",
              "parent_company": "Parent Corp",
              "professional_emailid": "info@samplecompany.com",
              "phone_number": 1234567890,
              "linkedin_id": "https://linkedin.com/company/sample",
              "year_of_incorporation": 2005,
              "youtube_url": "https://youtube.com/samplevideo",
              "product_name": "Sample Product",
              "product_description": "Detailed description of the product.",
              "revenue_model": "Subscription",
              "current_status": "Launched",
              "preferred_timeframe_for_action": "\"3 - 6 months\"",
              "workforce_range": "\"11 - 50\""
            }
          }
          ),  // Send the payload wrapped in a "data" object
        });
        console.log(response.data.data.id);

        localStorage.setItem("businessId", response.data.data.id); // Store the created business ID
        console.log("Business created successfully.");
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
    const formData = {
      companyName: "sdsdsd",
      website: "sdsds",
      yearOfIncorporation: "2024",
      companyStage: "R&D",
      companyType: "Private Limited",
      description: "dd",
      mission: "fgdg",
      vision: "dfgdg",
      lookingFor: "Sell My Business",
      reason: "jasu da janam hoya bhaga wali raat",
      preferredTimeframe: "Immediate",
      professionalEmail: "info@samplecompany.com",
      phoneNumber: "sdsdsdsd",
      linkedInId: "sdsdsdss",
      pitchDeck: "school18-website",
      companyProfile: "fmi-front",
      youtubeUrl: "asasasas",
      numberOfEmployees: "11 - 50",
      workforceRatio: "dsdsdsds",
      diversityInfo: "sasasasasdsdsdsd",
    };

    // Sync with backend before navigating
    await syncBusinessData(formData);

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
        <div className="flex items-center justify-evenly relative 2xl:ml-20 2xl:mr-2 2xl:px-32 2xl:py-3 overflow-x-auto">
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
