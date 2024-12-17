"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, MoveLeft, MoveRight } from "lucide-react";
import FounderTeam from "@/components/profile-creation/founder-team";

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
    <div className="w-full relative">
      {/* Stepper Container */}
      <div className="flex items-center justify-evenly relative ml-20 mr-2 px-32 py-2 flex-wrap">
        {steps.map((label, index) => (
          <div
            key={index}
            className={`relative flex items-center relative flex-wrap cursor-pointer ${index <= activeStep ? "opacity-100" : "opacity-70"}`}
            onClick={() => setActiveStep(index)}
          >
            {/* Vertical Line */}
            <div className="absolute left-[-12px] top-0 bottom-0 w-[2px] bg-[#18181833]"></div>

            {/* Step Number Circle */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-semibold
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
              className={`ml-3 text-[13px] font-medium break-words max-w-[140px] ${index === activeStep ? "text-[#0A66C2]" : "text-gray-500"}`}
            >
              {renderLabelWithLineBreaks(label)}
            </div>

            {/* Vertical line at the end of the last step */}
            {index === steps.length - 1 && (
              <div className="absolute right-[-12px] top-0 bottom-0 w-[2px] bg-[#18181833]"></div>
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
      <div className="flex gap-x-10 -mt-6 justify-end mr-[12.5rem]">
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
          className="border-2 border-[#18181899] rounded-xl bg-white text-[18px] w-[129px] h-[45px]"
        >
          <MoveLeft size={19} className="mr-2"/> Back
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
            Next <MoveRight size={19} className="ml-2"/>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileStep;
