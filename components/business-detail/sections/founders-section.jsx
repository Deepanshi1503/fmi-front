import React, { useState } from "react";

const OverviewSection = React.forwardRef(({ business }, ref) => {
  const { founder_detail = [], team_details = [] } = business || {};
  const allPeople = [...founder_detail, ...team_details];

  const [showMore, setShowMore] = useState(false);
  const peopleToShow = showMore ? allPeople : allPeople.slice(0, 1);

  const renderPersonDetails = (person, index) => {
    const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${person.image?.data?.attributes?.url}`;

    const isTeamDetailsStart =
      index === founder_detail.length && team_details.length > 0;

    return (
      <div key={person.id} className="mb-4">
        {/* Conditional Team Details Heading */}
        {isTeamDetailsStart && (
          <h3 className="text-[24px] font-semibold text-gray-800 mb-4 mt-6">
            Team Details
          </h3>
        )}
        <div className="flex items-start">
          <img
            src={imageUrl}
            alt={person.name}
            className="w-[275px] h-[244px] rounded-[16px] object-cover mr-4 flex-shrink-0"
          />
          <div className="flex flex-col justify-between mt-6">
            <p className="text-[28px] font-semibold mb-0">{person.name}</p>
            <p className="text-[#18181899] text-[16px] mt-3 mb-3">
              {person.background}
            </p>
            <p className="text-[16px] text-[#18181899] mb-3">
              <strong className="text-[#181818] font-semibold">Role:</strong>{" "}
              {person.role}
            </p>
            <p className="text-[16px] text-[#2196F3]">
              <strong className="text-[#181818] font-semibold">LinkedIn:</strong>{" "}
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
    <section id="founders" ref={ref} className="mb-8">
      <div className="mb-8 border border-gray-200 rounded-[16px] bg-white pt-4">
        <div className="px-4">
          <h2 className="text-[28px] font-semibold mb-3">Founder & Team</h2>
          {peopleToShow.map((person, index) =>
            renderPersonDetails(person, index)
          )}
        </div>
        {allPeople.length > 1 && (
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

export default OverviewSection;
