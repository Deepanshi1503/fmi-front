"use client";

import React, { useState } from "react";
import FounderTeam from "@/components/profile-creation/founder-team/founder-team-form1";

const stepsComponents = [
  { name: "Founder & Team", component: FounderTeam },
];

const ProfileStepPanel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isOpen, setIsOpen] = useState(Array(stepsComponents.length).fill(false));

  const handleStepClick = (index) => {
    setActiveStep(index);
    const newIsOpen = isOpen.map((_, i) => i === index);
    setIsOpen(newIsOpen);
  };

  const renderStepContent = () => {
    const StepComponent = stepsComponents[activeStep]?.component;
    return StepComponent ? <StepComponent /> : null;
  };

  return (
    <div className="flex">
      {/* Left Panel for Progress */}
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg">
        {stepsComponents.map((step, index) => (
          <div
            key={index}
            onClick={() => handleStepClick(index)}
            className={`cursor-pointer mt-2 p-2 rounded hover:bg-gray-200 ${index === activeStep ? "bg-blue-500 text-white" : ""}`}
          >
            <h3>{step.name}</h3>
          </div>
        ))}
      </div>

      {/* Right Panel for Content */}
      <div className="w-3/4 bg-white p-6 rounded-lg">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default ProfileStepPanel;
