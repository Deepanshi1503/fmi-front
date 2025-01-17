"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CompanyDetailForm from "@/components/investor-profile-creation/company-details/company-detail-form";
import ContactForm from "@/components/investor-profile-creation/company-details/contact-form";

const CompanyOverview = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState([true, false]); // Open the first form by default
  const totalSteps = 2;
  const sectionKey = "companyOverview";

  // Profile progress logic
  const [completionStatus, setCompletionStatus] = useState(
    JSON.parse(localStorage.getItem("profileInvestorProgress"))?.[sectionKey]?.completionStatus || Array(totalSteps).fill(false)
  );
  const [progress, setProgress] = useState(
    JSON.parse(localStorage.getItem("profileInvestorProgress"))?.[sectionKey]?.progress || 0
  );
  useEffect(() => {
    const completedSteps = completionStatus.filter(Boolean).length;
    const progressPercentage = Math.floor((completedSteps / totalSteps) * 100);

    setProgress(progressPercentage);

    const profileProgress = JSON.parse(localStorage.getItem("profileInvestorProgress")) || {};
    profileProgress[sectionKey] = {
      completionStatus,
      progress: progressPercentage,
    };

    localStorage.setItem("profileInvestorProgress", JSON.stringify(profileProgress));
  }, [completionStatus]);
  const updateFormCompletion = useCallback((index, isCompleted) => {
    setCompletionStatus((prev) =>
      prev.map((status, i) => (i === index ? isCompleted : status))
    );
  }, []);

  const handleToggleForm = useCallback((index) => {
    setIsFormOpen((prevState) =>
      prevState.map((isOpen, i) => (i === index ? !isOpen : false))
    );
    setActiveStep(index);
  }, []);

  const stepsComponents = useMemo(
    () => [
      {
        name: "Company Overview",
        description: "Provide details about your company and its operations.",
        formComponent: () => (
          <CompanyDetailForm
            onCompletion={(isCompleted) => updateFormCompletion(0, isCompleted)}
          />
        ),
      },
      {
        name: "Contact Details",
        description: "Provide your company's contact details.",
        formComponent: () => (
          <ContactForm
            onCompletion={(isCompleted) => updateFormCompletion(1, isCompleted)}
          />
        ),
      },
    ],
    [updateFormCompletion]
  );

  return (
    <div className="flex flex-col xl:flex-row mx-6 xl:mx-44 xl:pl-12">
      {/* Left Panel - Step Progress Bar */}
      <div
        className="w-1/3 p-6 xl:mr-20 hidden xl:block"
        style={{
          position: "sticky",
          top: "5rem",
          alignSelf: "flex-start",
        }}
      >
        <h2 className="text-[32px] xl:text-[48px] whitespace-nowrap flex justify-center 2xl:justify-start font-semibold text-[#0A66C2] mb-4">
          Company Overview
        </h2>
        <h4 className="text-[12px] xl:text-[15px] whitespace-nowrap font-normal flex justify-center 2xl:justify-start text-[#181818CC] mb-12">
          Make it easy for people
        </h4>

        <div>
          {stepsComponents.map((step, index) => (
            <div key={index} className="relative flex items-start mb-6">
              {/* Step Circle */}
              <div
                className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-bold z-10 ${index === activeStep
                    ? "bg-transparent border-2 border-[#0A66C2]"
                    : "border-2 border-[#D4D4D4]"
                  }`}
              >
                {index === activeStep ? (
                  <div className="w-3 h-3 bg-[#0A66C2] rounded-full"></div>
                ) : null}
              </div>

              {/* Step Line */}
              {index !== stepsComponents.length - 1 && (
                <div
                  className={`absolute left-[15px] top-8 w-[2px] ${index < activeStep ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  style={{ height: activeStep === index ? "90%" : "1.5rem" }}
                ></div>
              )}

              {/* Step Content */}
              <div className="ml-4 text-left cursor-pointer w-full">
                <h3
                  className={`text-[16px] font-semibold ${activeStep === index ? "text-blue-500" : "text-gray-700"
                    }`}
                  onClick={() => handleToggleForm(index)}
                >
                  {step.name}
                </h3>
                {activeStep === index && (
                  <p className="text-[12px] text-gray-500 mt-1">{step.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Collapsible Forms */}
      <div className="w-[100%] xl:w-2/3 pt-6">
        {stepsComponents.map((step, index) => (
          <div
            key={index}
            className={`mb-8 bg-[#f9f9f9] rounded-[16px] ${isFormOpen[index] ? "" : ""
              }`}
          >
            <div
              className={`flex items-center p-3 border cursor-pointer ${isFormOpen[index]
                  ? "bg-white border-2 border-[#18181833] rounded-t-[16px] rounded-b-none"
                  : "bg-white rounded-[16px] shadow-md"
                }`}
              onClick={() => handleToggleForm(index)}
            >
              <div className="justify-between w-full items-center flex">
                <h2 className="font-normal text-left text-[18px] 2xl:text-[28px] ml-3 text-[#181818]">
                  {step.name}
                </h2>
                <div>
                  {isFormOpen[index] ? (
                    <ChevronUp className="w-8 h-8 text-blue-500" />
                  ) : (
                    <ChevronDown className="w-8 h-8 text-gray-500" />
                  )}
                </div>
              </div>
            </div>

            {isFormOpen[index] && (
              <div className="p-4 border rounded-b-[16px] bg-white mt-1">
                <step.formComponent />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyOverview;