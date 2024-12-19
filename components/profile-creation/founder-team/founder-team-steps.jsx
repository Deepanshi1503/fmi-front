"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import FounderForm from "@/components/profile-creation/founder-team/founder-info-form";
import { useGlobalContext } from "@/context/context";

const FounderTeam = () => {
  const { founders, setFounders, teamMembers, setTeamMembers, advisors, setAdvisors } = useGlobalContext(); // Accessing global context
  const [activeStep, setActiveStep] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(Array(3).fill(false));

  const stepsComponents = [
    {
      image: "/images/founder-details.png",
      name: "Founder Details",
      description:
        "Introduce yourself and your team with a concise description of your expertise.",
      formComponent: () => (
        <FounderForm
          data={founders}
          setData={setFounders}
          title="Co-Founder"
        />
      ),
    },
    {
      image: "/images/team-details.png",
      name: "Team",
      description: "Provide details about your team members, their roles, and key contributions to the company.",
      formComponent: () => (
        <FounderForm
          data={teamMembers}
          setData={setTeamMembers}
          title="Team Member"
        />
      ),
    },
    {
      image: "/images/advisor-details.png",
      name: "Key Advisors & Board Members",
      description: "List your key advisors and board members with their roles and expertise.",
      formComponent: () => (
        <FounderForm
          data={advisors}
          setData={setAdvisors}
          title="advisor or board member"
        />
      ),
    }
  ];

  const handleToggleForm = (index) => {
    setIsFormOpen((prevState) =>
      prevState.map((isOpen, i) => (i === index ? !isOpen : false))
    );
    setActiveStep(index); // Set the current active step
  };

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
        <h2 className="text-[32px] xl:text-[48px] whitespace-nowrap flex justify-center 2xl:justify-start font-semibold text-[#0A66C2] mb-4">
          Founder & Team
        </h2>
        <h4 className="text-[12px] xl:text-[15px] whitespace-nowrap font-normal flex justify-center 2xl:justify-start text-[#181818CC] mb-12">
          Make it easy for people
        </h4>

        <div>
          {stepsComponents.map((step, index) => (
            <div key={index} className="relative flex items-start mb-6">
              {/* Step Circle */}
              <div
                className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-bold z-10 ${index < activeStep
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

      {/* Top Panel - Step Progress Bar for mobile */}
      <div
        className="w-full xl:hidden sm:block"
      >
        <h2 className="text-[32px] xl:text-[48px]  font-semibold text-[#0A66C2] mb-4">
          Founder & Team
        </h2>
        <h4 className="text-[12px] xl:text-[15px] whitespace-nowrap font-normal flex justify-center 2xl:justify-start text-[#181818CC] mb-8">
          Make it easy for people
        </h4>

        <div className="flex items-center justify-between">
          {stepsComponents.map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold z-10 ${index < activeStep
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
              {index !== stepsComponents.length - 1 && (
                <div
                  className={`h-[2px] flex-1 ${index < activeStep ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  style={{ width: "100px" }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Collapsible Forms */}
      <div className="w-[100%] xl:w-2/3 pt-6">
        {stepsComponents.map((step, index) => (
          <div
            key={index}
            className={`mb-16 bg-[#f9f9f9] rounded-[16px] ${isFormOpen[index] ? "" : ""
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

export default FounderTeam;
