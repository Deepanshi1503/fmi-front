import React, { useState, useEffect } from 'react';

const ProfileCard = ({ profile }) => {
    const [animatedCompletion, setAnimatedCompletion] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = profile.completion / 100; // Determines the step size
        const animation = setInterval(() => {
            start += increment;
            if (start >= profile.completion) {
                clearInterval(animation);
                start = profile.completion; // Ensure it stops exactly at the target
            }
            setAnimatedCompletion(start);
        }, 10); // Updates every 10ms for smooth animation
    }, [profile.completion]);

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center">
                <h3 className="text-[24px] font-medium text-[#181818]">
                    {profile.title}
                </h3>
                <button className="bg-[#E8F4FF] text-[#0966C3] text-[16px] px-8 py-2 rounded-full">
                    Profile
                </button>
            </div>

            {/* Conditional Layout */}
            <div
                className={`${profile.completed ? "flex justify-center" : "flex justify-between mx-14"
                    } items-center my-6`}
            >
                {/* Circular Progress Bar */}
                <div className="relative flex justify-center items-center">
                    <div
                        className="w-60 h-60 rounded-full"
                        style={{
                            background: `conic-gradient(${profile.completed ? "#5A57FF" : "#4AD991"
                                } ${animatedCompletion}%, #e5e7eb ${animatedCompletion}%)`,
                        }}
                    ></div>
                    {/* Inner White Circle */}
                    <div className="absolute w-40 h-40 bg-white rounded-full flex items-center justify-center">
                    </div>
                </div>

                {/* Profile Sections (Visible Only if Incomplete) */}
                {!profile.completed && (
                    <div>
                        {profile.sections.map((section, idx) => (
                            <p key={idx} className="text-[12px] font-medium text-[#00000099]">
                                <span
                                    className={`${section.completed ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {section.completed ? "✔️" : "❌"}
                                </span>{" "}
                                {section.label}
                            </p>
                        ))}
                    </div>
                )}
            </div>

            {/* Status Message */}
            <h6
                className={`text-center text-[18px] font-normal ${profile.completed ? "text-[#00B69B]" : "text-[#FBC035]"
                    }`}
            >
                {profile.status}
            </h6>
            <h6 className="text-center text-[18px] font-normal text-[#282D32]">
                Your profile is {profile.completion}% completed
            </h6>
        </div>
    );
};

const ProfilesSection = ({ profiles }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-8 mb-10">
            {profiles.map((profile, index) => (
                <ProfileCard key={index} profile={profile} />
            ))}
        </div>
    );
};

export default ProfilesSection;
