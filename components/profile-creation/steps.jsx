"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import Loader from "@/components/loader"

const stepsConfig = [
  { id: "company-overview", label: "Company Overview", component: <CompanyOverview /> },
  { id: "products-services", label: "Products and Services", component: <ProductServices /> },
  { id: "founder-team", label: "Founder & Team", component: <FounderTeam /> },
  { id: "market-competition", label: "Market and Competition", component: <MarketCompetition /> },
  { id: "financial", label: "Financial", component: <Financial /> },
  { id: "equity-fundraising", label: "Equity & Fundraising", component: <EquitySale /> },
];

const ProfileStep = () => {
  const [activeStep, setActiveStep] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load the active step from localStorage or sessionStorage
  useEffect(() => {
    const savedStep = localStorage.getItem("activeStep");
    if (savedStep !== null) {
      setActiveStep(parseInt(savedStep, 10));
    } else {
      setActiveStep(0);
    }
    setLoading(false);
  }, []);

  // Save the active step to localStorage whenever it changes
  useEffect(() => {
    if (activeStep !== null) {
      localStorage.setItem("activeStep", activeStep);
    }
  }, [activeStep]);

  if (loading) {
    return <Loader />;
  }

  const validateMandatoryFields = () => {
    const formData = JSON.parse(localStorage.getItem("combineInfo")) || {};
    const businessId = localStorage.getItem("businessId");

    if (!businessId) {
      if (!formData.companyName || !formData.professionalEmail || !formData.phoneNumber) {
        toast.error("Please fill in the Company Name, Email, and Phone Number to proceed.", {
          position: "top-center",
        });
        return false;
      }
    }

    return true; // Continue if no validation errors
  };


  const base64ToBlob = (base64) => {
    const [metadata, base64String] = base64.split(",");
    const mime = metadata.match(/:(.*?);/)[1];
    const binary = atob(base64String);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mime });
  };

  // Usage in uploadImage
  const uploadImage = async (imageData) => {
    const blob = base64ToBlob(imageData);
    const formData = new FormData();
    formData.append("files", blob, "profile-image.png");

    try {
      const response = await axios.post("http://localhost:1337/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = response.data[0]?.id;
      return imageUrl
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };


  const syncBusinessData = async (businessData, founderData, teamData, advisorData, profileProgress) => {
    const businessId = localStorage.getItem("businessId");

    if (!businessId) {
      if (!businessData.companyName || !businessData.professionalEmail || !businessData.phoneNumber) {
        console.error("Missing required fields: Company Name, Email, or Phone Number");
        return;
      }
    }

    // Map data to backend schema
    const payload = {
      data: {
        title: businessData.companyName || "",
        slug: (businessData.companyName ? businessData.companyName.toLowerCase().replace(/\s+/g, '-') : '') + '-title',
        purpose_of_listing_business: businessData.lookingFor || null,
        reason_for_selling_fundraise: businessData.reason || null,
        company_name: businessData.companyName,
        website_url: businessData.website || null,
        stage_of_company: businessData.companyStage || null,
        type_of_company: businessData.companyType || null,
        description_about_company: businessData.description || null,
        company_mission: businessData.mission || null,
        company_vision: businessData.vision || null,
        remote_onsite_workforce_ration: businessData.workforceRatio || null,
        diversity_information: businessData.diversityInfo || null,
        headquarters: businessData.headquarters || null,
        country: businessData.country || null,
        state: businessData.state || null,
        geographical_presence: businessData.geographicalPresence || null,
        current_geography: businessData.currentGeography || null,
        parent_company: businessData.parentCompany || null,
        professional_emailid: businessData.professionalEmail || null,
        phone_number: businessData.phoneNumber || null,
        linkedin_id: businessData.linkedInId || null,
        year_of_incorporation: parseInt(businessData.yearOfIncorporation) || null,
        youtube_url: businessData.youtubeUrl || null,
        product_name: businessData.productName || null,
        product_description: businessData.productDescription || null,
        revenue_model: businessData.revenueModel || null,
        current_status: businessData.currentStatus || null,
        preferred_timeframe_for_action: mapPreferredTimeframe(businessData.preferredTimeframe) || null,
        workforce_range: mapNumberOfEmployees(businessData.numberOfEmployees) || null,
        pitch_deck: businessData.pitchDeck?.fileId || null,  // Use the URL of the pitch deck
        company_profile: businessData.companyProfile?.fileId || null,
        founder_detail: await Promise.all(
          (founderData || [])?.map(async (founder) => {
            return {
              name: founder.name || null,
              role: founder.role || null,
              background: founder.professionalBackground || null,
              linkedin_profile: founder.linkedinProfile || null,
              education: founder.education || null,
              image: founder.profileImage ? await uploadImage(founder.profileImage) : null,
            };
          })
        ),
        team_details: await Promise.all(
          (teamData || [])?.map(async (member) => {
            return {
              name: member.name || null,
              role: member.role || null,
              background: member.professionalBackground || null,
              linkedin_profile: member.linkedinProfile || null,
              education: member.education || null,
              image: member.profileImage ? await uploadImage(member.profileImage) : null,
            };
          })
        ),
        board_member_advisor__detail: await Promise.all(
          (advisorData || [])?.map(async (advisor) => {
            return {
              name: advisor.name || null,
              role: advisor.role || null,
              background: advisor.professionalBackground || null,
              linkedin_profile: advisor.linkedinProfile || null,
              education: advisor.education || null,
              image: advisor.profileImage ? await uploadImage(advisor.profileImage) : null,
            };
          })
        ),
        market_opportunity_size: businessData.marketOpportunity || null,
        competitor_analysis: businessData.competitorAnalysis || null,
        global_market_share: (businessData.competitiveAnalysis?.globalMarketSize || []).map((item) => ({
          country: item.country || null,
          currency: item.currency || null,
          amount: item.amount || null,
        })) || [],
        current_market_share: businessData.competitiveAnalysis?.currentMarketShare.map((item) => ({
          country: item.country || null,
          share_percentage: item.share || null,
          value: item.value || null,
        })) || [],
        your_competitors: businessData.competitiveAnalysis?.descriptions.competitors || null,
        why_are_you_different: businessData.competitiveAnalysis?.descriptions.whyDifferent || null,
        why_you_why_now: businessData.competitiveAnalysis?.descriptions.whyNow || null,
        fundraising_status: businessData.fundraisingStatus?.fundraisingStatus.map((item) => ({
          current_status: item.lender || null,
          amount: item.amount || null,
        })) || [],
        total_fundraised: businessData.fundraisingStatus?.totalFundsRaised || null,
        fundraise_business_details: businessData.investorRole
          ? {
            investor_role: businessData.investorRole || null,
            type_of_funding: businessData.typeOfFunding || null,
            valuation: businessData.valuation || null,
            funds_allocation: businessData.fundsAllocation || null,
          }
          : null,
        sale_business_details: businessData.saleValuation
          ? {
            valuation: businessData.saleValuation || null,
            ownership_stake_offered: businessData.ownershipStake || null,
            sale_price: businessData.salePrice || null,
            reason_for_sale: businessData.reasonForSale || null,
          }
          : null,
        financial_model_details: (businessData.yearData || []).map((item) => ({
          year: item.year || null,
          total_revenue: item.totalRevenue || null,
          total_profit_loss: item.totalProfitLoss || null,
          quarter_details: item.quarters.map((quarter) => ({
            revenue: parseInt(quarter.revenue) || 0,
            profit_loss: parseInt(quarter.profitLoss) || 0,
          })) || [],
        })) || [],
        step_progress: profileProgress
          ? {
            company_overview_progress: profileProgress?.companyOverview?.progress || 0,
            product_services_progress: profileProgress?.productServices?.progress || 0,
            founder_team_progress: profileProgress?.founderTeam?.progress || 0,
            market_competition_progress: profileProgress?.marketCompetition?.progress || 0,
            financial_progress: profileProgress?.financial?.progress || 0,
            equity_fundraising_progress: profileProgress?.equitySell?.progress || 0,
          }
          : null,
      }
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail(businessData.professionalEmail) && !businessId) {
      console.error("Invalid email format:", businessData.professionalEmail);
      return;
    }

    try {
      if (businessId) {
        await axios.put(`http://localhost:1337/api/businesses/${businessId}`, payload);
        console.log("Business updated successfully.");
      } else {
        // Create new business
        const response = await fetch("http://localhost:1337/api/businesses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const responseData = await response.json();
        console.log(responseData);
        if (responseData && responseData.data && responseData.data.id) {
          console.log("Business created successfully:", responseData.data.id);
          localStorage.setItem("businessId", responseData.data.id);
        }
      }
    } catch (error) {
      console.error("Error syncing business data:", error);
    }
  };


  const mapPreferredTimeframe = (timeframe) => {
    const timeframeMap = {
      "Immediate": "\"Immediate\"",
      "1 - 3 months": "\"1 - 3 months\"",
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
    // Validate only for the first step
    if (activeStep === 0 && !validateMandatoryFields()) {
      return;
    }

    // Simulate form data
    const formData = JSON.parse(localStorage.getItem("combineInfo"));
    const founderData = JSON.parse(localStorage.getItem("founders"));
    const teamData = JSON.parse(localStorage.getItem("teamMembers"));
    const advisorData = JSON.parse(localStorage.getItem("advisors"));
    const progress = JSON.parse(localStorage.getItem("profileProgress"))

    // Sync with backend before navigating
    await syncBusinessData(formData, founderData, teamData, advisorData, progress);

    // Clear the localStorage after sync
    // localStorage.removeItem("combineInfo");
    // localStorage.removeItem("founders");
    // localStorage.removeItem("teamMembers");
    // localStorage.removeItem("advisors");

    // Fetch the active step data from the backend
    // const businessId = localStorage.getItem("businessId");
    // if (businessId) {
    //   try {
    //     const response = await axios.get(`http://localhost:1337/api/businesses/${businessId}`);
    //     const businessData = response.data;

    //     // Populate the form with fetched data for the current active step
    //     // const stepData = getStepData(businessData, activeStep);
    //     // if (stepData) {
    //     //   // Populate the form with data from the backend
    //     //   populateForm(stepData);
    //     // }
    //   } catch (error) {
    //     console.error("Error fetching business data:", error);
    //   }
    // }

    if (activeStep < stepsConfig.length - 1) setActiveStep((prev) => prev + 1);
  };

  // const getStepData = (businessData, stepIndex) => {
  //   // Retrieve the corresponding data for the active step from the businessData
  //   switch (stepIndex) {
  //     case 0:
  //       return businessData.companyOverview; // Example, adjust based on your data structure
  //     case 1:
  //       return businessData.productsServices;
  //     case 2:
  //       return businessData.founderTeam;
  //     case 3:
  //       return businessData.marketCompetition;
  //     case 4:
  //       return businessData.financial;
  //     case 5:
  //       return businessData.equityFundraising;
  //     default:
  //       return null;
  //   }
  // };

  // const populateForm = (data) => {
  //   // Populate the form fields based on the data retrieved from the backend
  //   if (data) {
  //     // Example of setting form fields dynamically based on the data
  //     // You will need to set the data in the form's state or pass it down as props
  //     // Update form states here based on the received data
  //     // Example: setCompanyName(data.companyName);
  //     console.log("Populating form with data:", data);
  //   }
  // };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <GlobalContextProvider>
      <div className="w-full relative">
        <ToastContainer />
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
