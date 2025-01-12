"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronDown, ChevronUp, Check, AlertCircle, Lock } from "lucide-react";
import { useGlobalContext } from "@/context/context";
import FundraisingStatus from "@/components/profile-creation/equity-fundraising/current-fundraising-status-form";
import InvestmentDetails from "@/components/profile-creation/equity-fundraising/investment-details";
import SaleDetails from "@/components/profile-creation/equity-fundraising/sale-detail-form";

const ProductServices = () => {
  const { isSaleListing, setIsSaleListing } = useGlobalContext();

  const [activeStep, setActiveStep] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(Array(6).fill(false));
  const totalSteps = 2;
  const sectionKey = "equitySell";

  /* Profle Progress */
  const [completionStatus, setCompletionStatus] = useState(
    JSON.parse(localStorage.getItem("profileProgress"))?.[sectionKey]?.completionStatus || Array(totalSteps).fill(false)
  );
  const [progress, setProgress] = useState(
    JSON.parse(localStorage.getItem("profileProgress"))?.[sectionKey]?.progress || 0
  );
  const updateFormCompletion = useCallback((index, isCompleted) => {
    setCompletionStatus((prev) =>
      prev.map((status, i) => (i === index ? isCompleted : status))
    );
  }, []);
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

  
  // Update form data dynamically
  const updateFormData = (key, data) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: data,
    }));
  };

  const handleToggleForm = (index) => {
    if (!isSaleListing && index === 2) return; // Prevent toggling the SaleOffer form if it's not a Sale Listing

    setIsFormOpen((prevState) =>
      prevState.map((isOpen, i) => (i === index ? !isOpen : false))
    );
    setActiveStep(index);
  };

  useEffect(() => {
    setIsFormOpen((prevState) => {
      const updatedState = [...prevState];
      updatedState[0] = true; // Open the first form by default
      return updatedState;
    });
  }, []);

  // Centralized state for all form data
  const [formData, setFormData] = useState({
    currentFUndraisingStatus: {},
    investmentDetails: {},
    saleDetails: {},
  });

  // Check if a step has data
  const stepsComponents = useMemo(() => [
    {
      image: "/images/founder-details.png",
      name: "Current fundraising status",
      description:
        "Introduce yourself and your team with a concise description of your expertise.",
      formComponent: () => (
        <FundraisingStatus
          data={formData.productServiceDetail}
          setData={(data) => updateFormData("productServiceDetail", data)}
          onCompletion={(isCompleted) => updateFormCompletion(0, isCompleted)}
        />
      ),
    },
    {
      image: "/images/advisor-details.png",
      name: "Investment Required",
      description: "List your key advisors and board members with their roles and expertise.",
      formComponent: () =>
        !isSaleListing ? (
          <InvestmentDetails
            data={formData.revenueModel}
            setData={(data) => updateFormData("revenueModel", data)}
            onCompletion={(isCompleted) => updateFormCompletion(1, isCompleted)}
          />
        ) : null, // Conditionally render based on the listing type
    },
    {
      image: "/images/advisor-details.png",
      name: "Sale Offer",
      description: "List your key advisors and board members with their roles and expertise.",
      formComponent: () =>
        isSaleListing ? (
          <SaleDetails
            data={formData.revenueModel}
            setData={(data) => updateFormData("revenueModel", data)}
            onCompletion={(isCompleted) => updateFormCompletion(1, isCompleted)}
          />
        ) : null, // Conditionally render based on the listing type
    },
  ], [formData, isSaleListing]);

  return (
    <div className="flex flex-col xl:flex-row mx-6 xl:mx-44 xl:pl-12">
      {/* Left Panel - Step Progress Bar for desktop */}
      <div
        className="w-1/3 p-6 xl:mr-20 hidden xl:block"
        style={{
          position: "sticky",
          top: "0", // Sticks the left panel to the top
          alignSelf: "flex-start", // Maintains left panel position
        }}
      >
        <h2 className="text-[32px] xl:text-[40px] whitespace-nowrap flex justify-center 2xl:justify-start font-semibold text-[#0A66C2] mb-4">
          Equity & Raising / Sale
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
                  className={`text-[16px] font-semibold ${index === 2 && !isSaleListing
                    ? "text-gray-400" // Disabled step - grey text for Sale Offer when not a Sale Listing
                    : activeStep === index
                      ? "text-blue-500"
                      : "text-gray-700"
                    }`}
                  onClick={() => handleToggleForm(index)}
                  style={{
                    cursor: index === 2 && !isSaleListing ? "not-allowed" : "pointer", // Disable clicking on Sale Offer if not a Sale Listing
                  }}
                >
                  {step.name}
                </h3>
                {index === 2 && !isSaleListing && (
                  <div className="absolute top-1 right-1">
                    <Lock className="text-gray-400 w-6 h-6" />
                  </div>
                )}
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
            className={`mb-12 bg-[#f9f9f9] rounded-[16px] ${isFormOpen[index] ? "" : ""
              }`}
          >
            {/* Collapsible Header */}
            <div
              className={`flex items-center p-3 border cursor-pointer ${isFormOpen[index]
                ? "bg-white border-2 border-[#18181833] rounded-t-[16px] rounded-b-none"
                : "bg-white rounded-[16px] shadow-md"
                } ${index === 2 && !isSaleListing ? "cursor-not-allowed" : ""}`} // Disable cursor for the Sale Offer form
              onClick={() => handleToggleForm(index)}
              style={{
                pointerEvents: index === 2 && !isSaleListing ? "none" : "auto", // Prevent opening SaleOffer if not a Sale Listing
              }}
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
                  {index === 2 && !isSaleListing ? (
                    <Lock className="text-gray-400 w-6 h-6" /> // Show locked icon when SaleOffer is disabled
                  ) : isFormOpen[index] ? (
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

export default ProductServices;
