"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import InvestmentsForm from "./investments-form";

const ProductService = () => {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const sectionKey = "investments";
  const totalSteps = 1;

  // Progress and completion state
  const [completionStatus, setCompletionStatus] = useState(
    JSON.parse(localStorage.getItem("profileInvestorProgress"))?.[sectionKey]?.completionStatus || [false]
  );
  const [progress, setProgress] = useState(
    JSON.parse(localStorage.getItem("profileInvestorProgress"))?.[sectionKey]?.progress || 0
  );

  // Update localStorage whenever completion status changes
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
  const updateFormCompletion = (isCompleted) => {
    setCompletionStatus([isCompleted]);
  };

  // Toggle form visibility
  const handleToggleForm = () => {
    setIsFormOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col xl:flex-row mx-6 xl:mx-44 xl:pl-12">
      {/* Left Panel - Step Progress Bar */}
      <div
        className="w-1/3 p-6 xl:mr-20 hidden xl:block"
        style={{
          position: "sticky",
          top: "5rem", // Sticks the left panel to the top
          alignSelf: "flex-start", // Maintains left panel position
        }}
      >
        <h2 className="text-[32px] xl:text-[48px] whitespace-nowrap flex justify-center 2xl:justify-start font-semibold text-[#0A66C2] mb-4">
          Investments
        </h2>
        <h4 className="text-[12px] xl:text-[15px] whitespace-nowrap flex justify-center 2xl:justify-start font-normal text-[#181818CC] mb-12">
          Provide details about your past and current investments.
        </h4>

        {/* Progress Tracker */}
        <div className="relative flex items-start mb-6">
          {/* Step Circle */}
          <div
            className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-bold z-10 ${isFormOpen ? "bg-transparent border-2 border-[#0A66C2]"
              : "border-2 border-[#D4D4D4]"
              }`}
          >
            {isFormOpen ? (
              <div className="w-3 h-3 bg-[#0A66C2] rounded-full"></div>
            ) : null}
          </div>

          {/* Step Content */}
          <div className="ml-4 text-left cursor-pointer w-full">
            <h3 className={`text-[16px] font-semibold ${isFormOpen ? "text-blue-500" : "text-gray-700"
              }`}
              onClick={() => handleToggleForm()}>Investments</h3>
            <p className="text-[12px] text-gray-500 mt-1">
              Add details about your investment history and interests.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Collapsible Form */}
      <div className="w-[100%] xl:w-2/3 pt-6">
        <div className={`mb-8 bg-[#f9f9f9] rounded-[16px] ${isFormOpen ? "" : ""}`}>
          {/* Collapsible Header */}
          <div
            className={`flex items-center p-3 border cursor-pointer ${isFormOpen
              ? "bg-white border-2 border-[#18181833] rounded-t-[16px] rounded-b-none"
              : "bg-white rounded-[16px] shadow-md"
              }`}
            onClick={handleToggleForm}
          >
            <img
              src="/images/investment.png"
              alt={`company-details illustration`}
              className="2xl:w-[35px] 2xl:h-[35px] w-[30px] h-[30px] rounded"
            />
            <div className="justify-between w-full items-center flex">
              <h2 className="font-normal text-left text-[18px] 2xl:text-[28px] ml-3 text-[#181818]">
              Investments
              </h2>
              <div>
                {isFormOpen ? (
                  <ChevronUp className="w-8 h-8 text-blue-500" />
                ) : (
                  <ChevronDown className="w-8 h-8 text-gray-500" />
                )}
              </div>
            </div>
          </div>

          {/* Collapsible Form */}
          {isFormOpen && (
            <div className="p-4 border rounded-b-[16px] bg-white mt-1">
              <InvestmentsForm onCompletion={updateFormCompletion} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductService;