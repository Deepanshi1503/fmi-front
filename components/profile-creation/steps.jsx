"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const ProfileStep = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = [
    "Founder & Team",
    "Company Overview",
    "Products and Services",
    "Progress & Traction",
    "Market and Competition",
    "Business Model & Strategy",
    "Financial",
    "Equity & Fundraising",
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

  return (
    <div className="w-full">
      {/* Stepper Container */}
      <div className="flex items-center justify-between relative px-24 py-4 flex-wrap">
        {steps.map((label, index) => (
          <div
            key={index}
            className={`flex items-center text-center relative flex-wrap mt-2 cursor-pointer ${index <= activeStep ? "opacity-100" : "opacity-70"}`}
            onClick={() => setActiveStep(index)}
          >
            {/* Vertical Line */}
            <div className="absolute left-[-12px] top-0 bottom-0 w-[2px] h-[60px] bg-[#18181833]"></div>

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
              className={`ml-3 text-[16px] font-medium break-words max-w-[140px] text-center 
                ${index === activeStep ? "text-[#0A66C2]" : "text-gray-500"}`}
            >
              {label}
            </div>

            {/* Vertical line at the end of the last step */}
            {index === steps.length - 1 && (
              <div className="absolute right-[-12px] top-0 bottom-0 w-[2px] h-[60px] bg-[#18181833]"></div>
            )}
          </div>
        ))}
      </div>

      {/* Horizontal Line at the End */}
      <div className="border-t-2 border-[#18181833] mt-4"></div>

      {/* Step Content */}
      <div className="mt-4 mb-4 text-center">
        <h3 className="text-lg font-semibold">{steps[activeStep]}</h3>
        <p className="text-gray-500 mt-2">Content for {steps[activeStep]} goes here.</p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
          className="bg-gray-300 hover:bg-gray-400 text-black"
        >
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileStep;
