import React, { useState, useEffect } from 'react';

const ProfileCard = ({ profile }) => {
    const [animatedCompletion, setAnimatedCompletion] = useState(0);

    const calculateCompletion = () => {
        const stepProgress = profile.attributes.step_progress || {};
        const totalSteps = 6
        const totalCompletion = Object.values(stepProgress).reduce(
            (sum, progress) => sum + progress,
            0
        );
        return totalSteps > 0 ? totalCompletion / totalSteps : 0; // Average completion
    };

    const completion = calculateCompletion();
    // Set profile status based on completion
    const status = completion >= 100 ? "Profile completed" : "Draft";

    useEffect(() => {
        let start = 0;
        const increment = completion / 100; // Determines the step size
        const animation = setInterval(() => {
            start += increment;
            if (start >= completion) {
                clearInterval(animation);
                start = completion; // Ensure it stops exactly at the target
            }
            setAnimatedCompletion(start);
        }, 10); // Updates every 10ms for smooth animation
    }, [completion]);

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center">
                <h3 className="text-[24px] font-medium text-[#181818]">
                    {profile.attributes.company_name}
                </h3>
                <button className="bg-[#E8F4FF] text-[#0966C3] text-[16px] px-8 py-2 rounded-full">
                    Profile
                </button>
            </div>

            {/* Conditional Layout */}
            <div
                className={`${completion >= 100 ? "flex justify-center" : "flex justify-between mx-14"
                    } items-center my-6`}
            >
                {/* Circular Progress Bar */}
                <div className="relative flex justify-center items-center">
                    <div
                        className="w-60 h-60 rounded-full"
                        style={{
                            background: `conic-gradient(${completion >= 100 ? "#5A57FF" : "#4AD991"
                                } ${animatedCompletion}%, #e5e7eb ${animatedCompletion}%)`,
                        }}
                    ></div>
                    {/* Inner White Circle */}
                    <div className="absolute w-40 h-40 bg-white rounded-full flex items-center justify-center">
                    </div>
                </div>

                {/* Profile Sections (Visible Only if Incomplete) */}
                {completion < 100 && profile?.attributes?.step_progress && (
                    <div className='space-y-4'>
                        {Object.entries(profile.attributes.step_progress).map(([step, progress], idx) => {
                            // Skip the 'id' field
                            if (step === "id") return null;

                            // Map the step name to a custom label
                            const stepNameMap = {
                                company_overview_progress: "Company Overview",
                                product_services_progress: "Product & Services",
                                founder_team_progress: "Founder & Team",
                                market_competition_progress: "Market & Competition",
                                financial_progress: "Financials",
                                equity_fundraising_progress: "Equity Fundraising"
                            };

                            // Get the custom name from the map, or fallback to a formatted version of the step key
                            const customStepName = stepNameMap[step] || step.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

                            return (
                                <div key={idx} className="flex items-center text-[12px] font-medium text-[#00000099]">
                                    <span>
                                        {progress === 100 ? (
                                            <img src="/images/tick.png" alt="Tick" className="mr-2 h-3 w-3" />
                                        ) : (
                                            <img src="/images/cross.png" alt="Cross" className="mr-2 h-3 w-3" />
                                        )}
                                    </span>
                                    <span>{customStepName}</span>
                                </div>
                            );
                        })}
                    </div>
                )}


            </div>

            {/* Status Message */}
            <h6 className="text-center text-[18px] font-normal">
                {status === "Profile completed" ? (
                    <span className="flex items-center justify-center text-[#00B69B]">
                        <img src="/images/tick.png" alt="Tick" className="mr-2 h-4 w-4" />
                        Profile completed
                    </span>
                ) : (
                    <span className="flex items-center justify-center text-[#FBC035]">
                        Draft
                    </span>
                )}
            </h6>
            <h6 className="text-center text-[18px] font-normal text-[#282D32]">
                Your profile is {Math.round(Math.min(completion, 100))}% completed
            </h6>
        </div>
    );
};

const ProfilesSection = ({ profiles }) => {
    if (!profiles || profiles.length === 0) {
        return (
            <div className="text-center mt-40 mb-36">
                <h3 className="text-[18px] font-medium text-gray-600">
                    No profiles created yet. Please create a profile to get started.
                </h3>
            </div>
        );
    }

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-10 mt-8 mb-10`}>
            {profiles.map((profile, index) => (
                <ProfileCard key={index} profile={profile} />
            ))}
        </div>
    );
};

export default ProfilesSection;
