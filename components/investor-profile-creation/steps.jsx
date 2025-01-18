"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { usePathname } from "next/navigation";

import { useGlobalContext } from "@/context/context";
import businessStepsConfig from "@/config/business-step.config"
import { validateMandatoryFields, syncInvestorData } from "@/utils/validation-investor-profile-creation";

import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import Loader from "@/components/loader";

const ProfileStep = () => {
    const { investorActiveStep, setInvestorActiveStep, loading, setLoading, isInvestorFormDirty, setIsInvestorFormDirty } = useGlobalContext();
    const [targetStep, setTargetStep] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        const fetchInvestorData = async () => {
            const investorId = localStorage.getItem("investorId");
            console.log(investorId);
            if (investorId) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/investors/${investorId}?populate=*`);
                    const investorData = response.data?.data?.attributes;
                    console.log("fetched the data onload succesfully", investorData);
                    if (investorData) {
                        const combineInvestorInfo = {
                            companyName: investorData.company_name,
                            companyLogo: investorData.logo,
                            website: investorData.website_url,
                            yearOfEstablishment: investorData.year_of_establishment,
                            headquarters: investorData.headquarters,
                            productDescription: investorData.profile_description,
                            availabilityForPitches: investorData.availability_for_pitches,
                            phoneNumber: investorData.phone_number,
                            professionalEmail: investorData.professional_emailid,
                            linkedInId: investorData.linkedin_id,
                        };
                        localStorage.setItem("combineInvestorInfo", JSON.stringify(combineInvestorInfo));
                    }
                } catch (error) {
                    console.error("Error fetching investor data:", error);
                }
            }
            setLoading(false); // Ensure loading is false after data fetch
        };

        fetchInvestorData();
    }, [setLoading]);

    // useEffect(() => {
    //     // This runs every time the pathname changes
    //     console.log("Pathname changed to:", pathname);
    //     localStorage.removeItem("combineInvestorInfo");
    //     localStorage.removeItem("profileInvestorProgress");
    //     localStorage.removeItem("investorActiveStep");
    //     localStorage.removeItem("investorId");
    // }, [pathname]);

    if (loading) {
        return <Loader />;
    }

    const handleNext = async () => {
        // Simulate form data
        const formData = JSON.parse(localStorage.getItem("combineInvestorInfo"));
        const progress = JSON.parse(localStorage.getItem("profileInvestorProgress"));

        // Validate mandatory fields dynamically
        const mandatoryFields = ["companyName", "professionalEmail", "phoneNumber"];
        const errorMessage = "Please fill in the Company Name, Email, and Phone Number to proceed.";

        // Validate only for the first step
        if (investorActiveStep === 0 && !validateMandatoryFields(formData, mandatoryFields, errorMessage)) {
            return;
        }

        // Sync with backend before navigating
        if (isInvestorFormDirty) {
            await syncInvestorData(formData, progress);
            setIsInvestorFormDirty(false);
        }

        if (investorActiveStep < businessStepsConfig.length - 1) setInvestorActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (investorActiveStep > 0) setInvestorActiveStep((prev) => prev - 1);
    };

    const handleReset = () => {
        setInvestorActiveStep(0);
    };

    const handleStepClick = (index) => {
        if (isInvestorFormDirty) {
            setTargetStep(index); // Save the target step
            showUnsavedChangesToast(); // Show the confirmation modal
        } else {
            setInvestorActiveStep(index); // Navigate directly if no unsaved changes
        }
    };

    const showUnsavedChangesToast = () => {
        toast.info(
            <div className="flex flex-col">
                <span>You have unsaved changes. What would you like to do?</span>
                <div className="mt-2 flex justify-end gap-2">
                    <Button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent click from propagating
                            handleSaveChanges();
                        }}
                        className="bg-green-500 text-white text-sm"
                    >
                        Save
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent click from propagating
                            handleDiscardChanges();
                        }}
                        className="bg-red-500 text-white text-sm"
                    >
                        Discard
                    </Button>
                </div>
            </div>,
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                pauseOnHover: true,
                position: "top-center",
            }
        );
    };

    const handleSaveChanges = () => {
        toast.dismiss(); // Close the toast
        toast.success("Changes saved successfully!");
        setIsInvestorFormDirty(false);
        if (targetStep !== null) {
            setInvestorActiveStep(targetStep); // Navigate to the target step
            setTargetStep(null);
        }
    };

    const handleDiscardChanges = () => {
        toast.dismiss(); // Close the toast
        toast.warning("Changes discarded.");
        setIsInvestorFormDirty(false);
        if (targetStep !== null) {
            setInvestorActiveStep(targetStep); // Navigate to the target step
            setTargetStep(null);
        }
    };

    return (
        <div className="w-full relative">
            <ToastContainer />

            {/* Stepper Container */}
            <div className="sticky top-0 z-10 bg-white">
                <div className="flex items-center justify-evenly relative 2xl:ml-20 2xl:mr-2 2xl:px-[100px] 2xl:py-3 overflow-x-auto">
                    {businessStepsConfig.map((step, index) => (
                        <div
                            key={step.id}
                            className={`relative flex items-center cursor-pointer transition-transform duration-300 ease-in-out ${index <= investorActiveStep ? "opacity-100" : "opacity-70"}`}
                            onClick={() => handleStepClick(index)}
                        >
                            {/* Vertical Line */}
                            <div className="hidden 2xl:block absolute left-[-12px] top-0 bottom-0 w-[2px] bg-[#18181833]"></div>

                            {/* Step Number Circle */}
                            <div
                                className={`w-8 h-8 2xl:w-10 2xl:h-10 my-2 2xl:my-0 flex items-center justify-center rounded-full 2xl:text-lg font-semibold
                  ${index === investorActiveStep
                                        ? "bg-[#0A66C2] text-white"
                                        : "border border-gray-400 text-gray-400"
                                    }`}
                            >
                                {index + 1}
                            </div>

                            {/* Step Label */}
                            <div
                                className={`hidden whitespace-nowrap 2xl:block ml-3 text-[13px] font-medium break-words max-w-[140px] ${index === investorActiveStep ? "text-[#0A66C2]" : "text-gray-500"}`}
                            >
                                {step.label}
                            </div>

                            {/* Vertical line at the end of the last step */}
                            {index === businessStepsConfig.length - 1 && (
                                <div className="hidden 2xl:block absolute right-[-12px] top-0 bottom-0 w-[2px] bg-[#18181833]"></div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="border-t-2 border-[#18181833]"></div>
            </div>

            {/* Step Content */}
            <div className="mt-4 mb-4 text-center">
                {businessStepsConfig[investorActiveStep].component}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-x-4 xl:gap-x-10 mb-8 xl:mb-12 justify-center xl:justify-end xl:mr-[11rem]">
                <Button
                    onClick={handleBack}
                    disabled={investorActiveStep === 0}
                    className="border-2 border-[#18181899] rounded-xl bg-white text-[18px] w-[129px] h-[45px]"
                >
                    <MoveLeft size={19} className="mr-2" /> Back
                </Button>

                {investorActiveStep === businessStepsConfig.length - 1 ? (
                    <Button
                        onClick={handleReset}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-xl text-[18px] w-[129px] h-[45px]"
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