"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useGlobalContext } from "@/context/context";
import stepsConfig from "@/config/steps.config";
import { validateMandatoryFields, syncBusinessData } from "@/utils/valdation-business-profile-creation";

import { Button } from "@/components/ui/button";
import { Check, MoveLeft, MoveRight } from "lucide-react";
import Loader from "@/components/loader";

const ProfileStep = () => {
  const { activeStep, setActiveStep, loading } = useGlobalContext();

  if (loading) {
    return <Loader />;
  }

  const handleNext = async () => {
    // Simulate form data
    const formData = JSON.parse(localStorage.getItem("combineInfo"));
    // const founderData = JSON.parse(localStorage.getItem("founders"));
    // const teamData = JSON.parse(localStorage.getItem("teamMembers"));
    // const advisorData = JSON.parse(localStorage.getItem("advisors"));
    const progress = JSON.parse(localStorage.getItem("profileProgress"));

    // Validate mandatory fields dynamically
    const mandatoryFields = ["companyName", "professionalEmail", "phoneNumber"];
    const errorMessage = "Please fill in the Company Name, Email, and Phone Number to proceed.";

    // Validate only for the first step
    if (activeStep === 0 && !validateMandatoryFields(formData, mandatoryFields, errorMessage)) {
      return;
    }

    // Sync with backend before navigating
    await syncBusinessData(formData, progress);

    if (activeStep < stepsConfig.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="w-full relative">
      <ToastContainer />
      {/* Stepper Container */}
      <div className="sticky top-0 z-10 bg-white">
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
        <div className="border-t-2 border-[#18181833]"></div>
      </div>

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
  );
};

export default ProfileStep;