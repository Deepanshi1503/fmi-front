"use client";
import React, {useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Check, MoveLeft, MoveRight } from "lucide-react";
import FounderTeam from "@/components/profile-creation/founder-team/founder-team-steps";
import CompanyOverview from "@/components/profile-creation/company-overview/company-overview-steps"
import { GlobalContextProvider } from "@/context/context";

const stepsConfig = [
  { id: "company-overview", label: "Company/nOverview", component: <CompanyOverview /> },
  { id: "products-services", label: "Products and/nServices", component: <div>Products and Services Component</div> },
  { id: "founder-team", label: "Founder/n& Team", component: <FounderTeam /> },
  { id: "progress-traction", label: "Progress &/nTraction", component: <div>Progress and Traction Component</div> },
  { id: "market-competition", label: "Market and/nCompetition", component: <div>Market and Competition Component</div> },
  { id: "business-model", label: "Business Model/n& Strategy", component: <div>Business Model Component</div> },
  { id: "financial", label: "Financial", component: <div>Financial Component</div> },
  { id: "equity-fundraising", label: "Equity &/nFundraising", component: <div>Equity and Fundraising Component</div> },
];

const ProfileStep = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const [stepCompletion, setStepCompletion] = useState(() =>
    stepsConfig.reduce((acc, step) => {
      acc[step.id] = false;
      return acc;
    }, {})
  );

  // Load state from localStorage on page load
  useEffect(() => {
    const savedActiveStep = localStorage.getItem("activeStep");
    const savedStepCompletion = JSON.parse(localStorage.getItem("stepCompletion") || "{}");

    if (savedActiveStep) setActiveStep(Number(savedActiveStep));
    if (savedStepCompletion) setStepCompletion(savedStepCompletion);
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeStep", activeStep);
    localStorage.setItem("stepCompletion", JSON.stringify(stepCompletion));
  }, [activeStep, stepCompletion]);

  const handleNext = () => {
    if (activeStep < stepsConfig.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const toggleStepCompletion = (stepId) => {
    setStepCompletion((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  const renderLabelWithLineBreaks = (label) => {
    return label.split("/n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

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
                  ${
                    stepCompletion[step.id]
                      ? "bg-green-500 text-white"
                      : index === activeStep
                      ? "bg-[#0A66C2] text-white"
                      : "border border-gray-400 text-gray-400"
                  }`}
              >
                {stepCompletion[step.id] ? <Check size={20} /> : index + 1}
              </div>

              {/* Step Label */}
              <div
                className={`hidden 2xl:block ml-3 text-[13px] font-medium break-words max-w-[140px] ${index === activeStep ? "text-[#0A66C2]" : "text-gray-500"}`}
              >
                {renderLabelWithLineBreaks(step.label)}
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
