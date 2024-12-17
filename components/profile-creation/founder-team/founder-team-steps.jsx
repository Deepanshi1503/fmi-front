"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import FounderForm from "@/components/profile-creation/founder-team/founder-info-form";

const stepsComponents = [
  {
    image: "/images/founder-details.png",
    name: "Founder Details",
    description:
      "Introduce yourself and your team with a concise description of your expertise.",
    formComponent: FounderForm,
    isComplete: false,
  },
  {
    image: "/images/team-details.png",
    name: "Team",
    description: "Provide details about your team members, their roles, and key contributions to the company.",
    formComponent: () => <p>Team Form Component Placeholder</p>,
    isComplete: false,
  },
  {
    image: "/images/advisor-details.png",
    name: "Key Advisors and Board Members",
    description: "List your key advisors and board members with their roles and expertise.",
    formComponent: () => <p>Advisors Form Component Placeholder</p>,
    isComplete: false,
  },
  {
    image: "/images/contact-details.png",
    name: "Contact Information",
    description: "Share your preferred contact information for inquiries and collaboration.",
    formComponent: () => <p>Contact Information Form Component Placeholder</p>,
    isComplete: false,
  },
];

const ProfileStepPanel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(Array(stepsComponents.length).fill(false));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Reset on component unmount
    };
  }, []);

  const handleToggleForm = (index) => {
    setIsFormOpen((prevState) =>
      prevState.map((isOpen, i) => (i === index ? !isOpen : false))
    );
    setActiveStep(index);
  };

  const handleStepComplete = (index) => {
    stepsComponents[index].isComplete = true;
    setIsFormOpen((prevState) => prevState.map((_, i) => (i === index ? false : prevState[i])));
  };

  return (
    <div className="flex mx-44 pl-12">
      {/* Left Panel - Step Progress Bar */}
      <div className="w-1/2 p-6">
        <h2 className="text-[48px] text-left font-bold text-[#0A66C2] mb-4">Founder & Team</h2>
        <h4 className="text-[15px] font-normal text-left text-[#181818CC] mb-12">make it easy for people </h4>
        <div className="relative">
          {stepsComponents.map((step, index) => (
            <div key={index} className="relative flex items-start mb-6">
              {/* Step Circle */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold z-10 ${step.isComplete
                  ? "bg-[#0A66C2]" // Completed step - filled blue background
                  : activeStep === index
                    ? "bg-transparent border-2 border-[#0A66C2]" // Active step - blue border
                    : "border-2 border-[#D4D4D4]" // Inactive step - grey border
                  }`}
              >
                {step.isComplete ? (
                  <Check className="w-5 h-5 text-white" /> // Tick icon
                ) : activeStep === index ? (
                  <div className="w-3 h-3 bg-[#0A66C2] rounded-full"></div> // Small blue dot for active step
                ) : (
                  <div></div> // Empty for inactive step
                )}
              </div>


              {/* Step Line */}
              {index !== stepsComponents.length - 1 && (
                <div
                  className={`absolute left-[15px] top-8 w-[2px] ${stepsComponents[index].isComplete || activeStep > index
                    ? "bg-blue-500"
                    : "bg-gray-300"
                    }`}
                  style={{ height: activeStep === index ? "90%" : "1.5rem", }}
                ></div>
              )}

              {/* Step Content */}
              <div className="ml-4 text-left cursor-pointer" onClick={() => handleToggleForm(index)}>
                <h3
                  className={`text-[16px] font-semibold ${activeStep === index ? "text-blue-500" : "text-gray-700"
                    }`}
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
      <div className="w-1/2 p-6 mt-2" style={{
        maxHeight: "60vh", // Adjust based on your layout height
        overflowY: "auto",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // Internet Explorer 11
      }}>
        {stepsComponents.map((step, index) => (
          <div key={index} className={`mb-4 bg-[#f9f9f9] rounded-[16px] 
            ${isFormOpen[index] ? "bg-[#18181833] p-2" : ""}`}>
            {/* Collapsible Header */}
            <div
              className={`flex items-center p-4 border cursor-pointer ${isFormOpen[index] ? "bg-white border-2 border-[#18181833] rounded-t-[16px] rounded-b-none" : "bg-white rounded-[16px] shadow-md"
                }`}
              onClick={() => handleToggleForm(index)}
            >
              {step.image && (
                <img
                  src={step.image}
                  alt={`${step.name} illustration`}
                  className="w-[38px] h-[38px] rounded"
                />
              )}
              <div className="justify-between w-full items-center flex">
                <h2 className="font-medium text-[28px] ml-4 text-[#181818]">{step.name}</h2>
                <div className="">
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
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleStepComplete(index)}
                >
                  Mark as Complete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStepPanel;
