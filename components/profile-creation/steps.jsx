"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, MoveLeft, MoveRight } from "lucide-react";
import FounderTeam from "@/components/profile-creation/founder-team/founder-team-steps";
import { GlobalContextProvider } from "@/context/context";

const stepComponents = [
  <FounderTeam />
];

const ProfileStep = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = [
    "Founder/n& Team",
    "Company/nOverview",
    "Products and/nServices",
    "Progress &/nTraction",
    "Market and/nCompetition",
    "Business Model/n& Strategy",
    "Financial",
    "Equity &/nFundraising",
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
          {steps.map((label, index) => (
            <div
              key={index}
              className={`relative flex items-center cursor-pointer transition-transform duration-300 ease-in-out ${index <= activeStep ? "opacity-100" : "opacity-70"}`}
              onClick={() => setActiveStep(index)}
            >
              {/* Vertical Line */}
              <div className="hidden 2xl:block absolute left-[-12px] top-0 bottom-0 w-[2px] bg-[#18181833]"></div>

              {/* Step Number Circle */}
              <div
                className={`w-8 h-8 2xl:w-10 2xl:h-10 my-2 2xl:my-0 flex items-center justify-center rounded-full 2xl:text-lg font-semibold
                ${index < activeStep
                    ? "bg-[#0A66C2] text-white"
                    : index === activeStep
                      ? "bg-[#0A66C2] text-white"
                      : "border border-[#181818CC] text-[#181818CC]"
                  }`}
              >
                {index < activeStep ? <Check size={20} /> : index + 1}
              </div>

              {/* Step Label */}
              <div
                className={`hidden 2xl:block ml-3 text-[13px] font-medium break-words max-w-[140px] ${index === activeStep ? "text-[#0A66C2]" : "text-gray-500"}`}
              >
                {renderLabelWithLineBreaks(label)}
              </div>

              {/* Vertical line at the end of the last step */}
              {index === steps.length - 1 && (
                <div className="hidden 2xl:block absolute right-[-12px] top-0 bottom-0 w-[2px] bg-[#18181833]"></div>
              )}
            </div>
          ))}
        </div>

        {/* Horizontal Line at the End */}
        <div className="border-t-2 border-[#18181833]"></div>

        {/* Step Content */}
        <div className="mt-4 mb-4 text-center">
          {stepComponents[activeStep]}
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

          {activeStep === steps.length - 1 ? (
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
