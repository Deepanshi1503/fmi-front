"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import FounderForm from "@/components/profile-creation/founder-team/founder-info-form";

const stepsComponents = [
  {
    image: "/images/founder-details.png",
    name: "Founder Details",
    description:
      "Introduce yourself and your team with a concise description of your expertise.",
    formComponent: FounderForm,
  },
  {
    image: "/images/team-details.png",
    name: "Team",
    description: "Provide details about your team members, their roles, and key contributions to the company.",
    formComponent: () => <p>Team Form Component Placeholder</p>,
  },
  {
    image: "/images/advisor-details.png",
    name: "Key Advisors and Board Members",
    description: "List your key advisors and board members with their roles and expertise.",
    formComponent: () => <p>Advisors Form Component Placeholder</p>,
  },
  {
    image: "/images/contact-details.png",
    name: "Contact Information",
    description: "Share your preferred contact information for inquiries and collaboration.",
    formComponent: () => <p>Contact Information Form Component Placeholder</p>,
  },
];

const ProfileStepPanel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(Array(stepsComponents.length).fill(false));

  const handleToggleForm = (index) => {
    setIsFormOpen((prevState) =>
      prevState.map((isOpen, i) => (i === index ? !isOpen : false))
    );
    setActiveStep(index); // Set the current active step
  };

  return (
    <div className="flex mx-36 pl-16">
      {/* Left Panel - Step Progress Bar */}
      <div
        className="w-1/2 p-6"
        style={{
          position: "sticky",
          top: "0", // Sticks the left panel to the top
          alignSelf: "flex-start", // Maintains left panel position
          height: "100vh",
        }}
      >
        <h2 className="text-[48px] text-left font-semibold text-[#0A66C2] mb-4">
          Founder & Team
        </h2>
        <h4 className="text-[15px] font-normal text-left text-[#181818CC] mb-12">
          Make it easy for people
        </h4>

        <div>
          {stepsComponents.map((step, index) => (
            <div key={index} className="relative flex items-start mb-6">
              {/* Step Circle */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold z-10 ${
                  index < activeStep
                    ? "bg-[#0A66C2]" // Completed step - blue background
                    : index === activeStep
                    ? "bg-transparent border-2 border-[#0A66C2]" // Active step - blue border
                    : "border-2 border-[#D4D4D4]" // Inactive step - grey border
                }`}
              >
                {index < activeStep ? (
                  <Check className="w-5 h-5 text-white" /> // Checkmark icon for completed steps
                ) : index === activeStep ? (
                  <div className="w-3 h-3 bg-[#0A66C2] rounded-full"></div> // Blue dot for active step
                ) : (
                  <div></div> // Empty for inactive step
                )}
              </div>

              {/* Step Line */}
              {index !== stepsComponents.length - 1 && (
                <div
                  className={`absolute left-[15px] top-8 w-[2px] ${
                    index < activeStep ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  style={{ height: activeStep === index ? "90%" : "1.5rem" }}
                ></div>
              )}

              {/* Step Content */}
              <div
                className="ml-4 text-left cursor-pointer"
                onClick={() => handleToggleForm(index)}
              >
                <h3
                  className={`text-[16px] font-semibold ${
                    activeStep === index ? "text-blue-500" : "text-gray-700"
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
      <div className="w-1/2 p-6">
        {stepsComponents.map((step, index) => (
          <div
            key={index}
            className={`mb-10 bg-[#f9f9f9] rounded-[16px] ${
              isFormOpen[index] ? "" : ""
            }`}
          >
            {/* Collapsible Header */}
            <div
              className={`flex items-center p-3 border cursor-pointer ${
                isFormOpen[index]
                  ? "bg-white border-2 border-[#18181833] rounded-t-[16px] rounded-b-none"
                  : "bg-white rounded-[16px] shadow-md"
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
                <h2 className="font-normal text-[28px] ml-3 text-[#181818]">
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

export default ProfileStepPanel;
