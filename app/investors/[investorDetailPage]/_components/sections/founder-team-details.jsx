import React, { useState } from "react";

const FounderTeam = React.forwardRef(({ founderDetail }, ref) => {
    const [showMore, setShowMore] = useState(false);
    const peopleToShow = showMore ? founderDetail : founderDetail.slice(0, 1);

    const renderPersonDetails = (person, index) => {
        const imageUrl =`${process.env.NEXT_PUBLIC_STRAPI_URL}${person.image?.data?.attributes?.url}`

        return (
            <div key={person.id} className="mb-4">
                <div className="flex items-start">
                    <img
                        src={person.image?.data?.attributes?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${person.image?.data?.attributes?.url}` : "/images/defaultProfile"}
                        alt={person.name}
                        className="w-[275px] h-[244px] rounded-[16px] object-cover mr-4 flex-shrink-0"
                    />
                    <div className="flex flex-col justify-between mt-2">
                        <p className="text-[28px] font-semibold mb-2">{person.name}</p>
                        <p className="text-[16px] text-[#18181899] mb-3">
                            {person.role}
                        </p>
                        <p className="text-[#18181899] text-[16px] mb-3">
                            {person.background}
                        </p>
                        <p className="text-[18px] text-[#2196F3]">
                            <strong className="text-[#18181899] font-normal">LinkedIn:</strong>{" "}
                            <a
                                href={person.linkedin_profile}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {person.linkedin_profile}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section id="founterAndTeam" ref={ref} className="mb-8">
            <div className="mb-8 border border-gray-200 rounded-[16px] bg-white pt-4">
                <div className="px-4">
                    <h2 className="text-[28px] font-semibold mb-3">Founder & Team</h2>
                    {peopleToShow.map((person, index) =>
                        renderPersonDetails(person, index)
                    )}
                </div>
                {founderDetail.length > 1 && (
                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="text-[#0A2FC2] text-[18px] py-2 hover:underline focus:outline-none bg-[#F5F5F5] rounded-b-[16px] w-full"
                    >
                        {showMore ? "Show Less" : "Show More"}
                    </button>
                )}
            </div>
        </section>
    );
});

export default FounderTeam;
