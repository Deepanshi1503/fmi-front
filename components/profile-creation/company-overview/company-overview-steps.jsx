"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronDown, ChevronUp, Check, AlertCircle } from "lucide-react";
import ListingForm from "@/components/profile-creation/company-overview/listing-info-form"
import CompanyDetailForm from "@/components/profile-creation/company-overview/company-detail-form"
import WorkforceDetailForm from "@/components/profile-creation/company-overview/workforce-detail-form";
import GeographicalDetailForm from "@/components/profile-creation/company-overview/geographical-detail-form";
import ContactForm from "@/components/profile-creation/company-overview/contact-form";
import DocumentForm from "@/components/profile-creation/company-overview/document-detail-form"
import { useGlobalContext } from "@/context/context";

const CompanyOverview = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(Array(6).fill(false));
  const totalSteps = 6;
  const sectionKey = "companyOverview";

  /* Profle Progress */
  const [completionStatus, setCompletionStatus] = useState(
    JSON.parse(localStorage.getItem("profileProgress"))?.[sectionKey]?.completionStatus || Array(totalSteps).fill(false)
  );
  const [progress, setProgress] = useState(
    JSON.parse(localStorage.getItem("profileProgress"))?.[sectionKey]?.progress || 0
  );
  // Update local storage whenever completion status changes
  useEffect(() => {
    const completedSteps = completionStatus.filter(Boolean).length;
    const progressPercentage = Math.floor((completedSteps / totalSteps) * 100);

    setProgress(progressPercentage);

    const profileProgress = JSON.parse(localStorage.getItem("profileProgress")) || {};
    profileProgress[sectionKey] = {
      completionStatus,
      progress: progressPercentage
    };

    localStorage.setItem("profileProgress", JSON.stringify(profileProgress));
  }, [completionStatus]);
  const updateFormCompletion = useCallback((index, isCompleted) => {
    setCompletionStatus((prev) =>
      prev.map((status, i) => (i === index ? isCompleted : status))
    );
  }, []);


  useEffect(() => {
    setIsFormOpen((prevState) => {
      const updatedState = [...prevState];
      updatedState[0] = true; // Open the first form by default
      return updatedState;
    });
  }, []);

  const stepsComponents = useMemo(() => [
    {
      image: "/images/founder-details.png",
      name: "Listing Details",
      description:
        "Introduce yourself and your team with a concise description of your expertise.",
      formComponent: () => (
        <ListingForm onCompletion={(isCompleted) => updateFormCompletion(0, isCompleted)} />
      ),
    },
    {
      image: "/images/team-details.png",
      name: "Company Overview",
      description: "Provide details about your team members, their roles, and key contributions to the company.",
      formComponent: () => (
        <CompanyDetailForm onCompletion={(isCompleted) => updateFormCompletion(1, isCompleted)} />
      ),
    },
    {
      image: "/images/advisor-details.png",
      name: "Workforce",
      description: "List your key advisors and board members with their roles and expertise.",
      formComponent: () => (
        <WorkforceDetailForm onCompletion={(isCompleted) => updateFormCompletion(2, isCompleted)} />
      ),
    },
    {
      image: "/images/advisor-details.png",
      name: "Geographics",
      description: "List your key advisors and board members with their roles and expertise.",
      formComponent: () => (
        <GeographicalDetailForm onCompletion={(isCompleted) => updateFormCompletion(3, isCompleted)} />
      ),
    },
    {
      image: "/images/advisor-details.png",
      name: "Contact Details",
      description: "List your key advisors and board members with their roles and expertise.",
      formComponent: () => (
        <ContactForm onCompletion={(isCompleted) => updateFormCompletion(4, isCompleted)} />
      ),
    },
    {
      image: "/images/advisor-details.png",
      name: "Documents",
      description: "List your key advisors and board members with their roles and expertise.",
      formComponent: () => (
        <DocumentForm onCompletion={(isCompleted) => updateFormCompletion(5, isCompleted)} />
      ),
    },
  ], [updateFormCompletion]);

  const handleToggleForm = useCallback((index) => {
    setIsFormOpen((prevState) =>
      prevState.map((isOpen, i) => (i === index ? !isOpen : false))
    );
    setActiveStep(index);
  }, []);

  return (
    <div className="flex flex-col xl:flex-row mx-6 xl:mx-44 xl:pl-12">
      {/* Left Panel - Step Progress Bar for desktop */}
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
                  ? "bg-transparent border-2 border-[#0A66C2]" // Active step - blue border
                  : "border-2 border-[#D4D4D4]" // Unvisited step - grey border
                  }`}
              >
                {index === activeStep ? (
                  <div className="w-3 h-3 bg-[#0A66C2] rounded-full"></div> // Blue dot for active step
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
            {/* Collapsible Header */}
            <div
              className={`flex items-center p-3 border cursor-pointer ${isFormOpen[index]
                ? "bg-white border-2 border-[#18181833] rounded-t-[16px] rounded-b-none"
                : "bg-white rounded-[16px] shadow-md"
                }`}
              onClick={() => handleToggleForm(index)}
            >
              {step.image && (
                <img
                  src={step.image}
                  alt={`${step.name} illustration`}
                  className="2xl:w-[38px] 2xl:h-[38px] w-[30px] h-[30px] rounded"
                />
              )}
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

            {/* Collapsible Form */}
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