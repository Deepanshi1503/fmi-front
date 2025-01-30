// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { MapPin } from "lucide-react";
import Link from "next/link";

const InvestorCard = ({ business }) => {
    const {
        logo,
        company_name,
        headquarters,
        profile_description,
        commitment_amount,
        preferred_investment_type,
        funding_interest,
        preferred_sectors_of_interests,
        geographic_focus,
        investor_type,
        typical_investment_range,
        preferred_stage_of_investment,
    } = business.attributes || {};

    const metrics = [
        {
            key: "Funding Interest",
            value: funding_interest?.data?.length
                ? `${funding_interest.data[0].attributes.name}`
                : "No interests available"
        },
        {
            key: "Preferred Sectors",
            value: preferred_sectors_of_interests?.data?.length
                ? `${preferred_sectors_of_interests.data
                    .slice(0, 2)
                    .map((sector) => sector.attributes.name)
                    .join(', ')}`
                : "No interests available"
        },
        {
            key: "Geographic Focus",
            value: geographic_focus?.length
                ? `${geographic_focus
                    .slice(0, 2)
                    .map((focus) => focus.name)
                    .join(', ')}`
                : "No interests available"
        },
        { key: "Funding type", value: `${investor_type}` },
        { key: "Investment Range", value: ` ${typical_investment_range}` },
        { key: "Preferred Stage", value: `$ ${preferred_stage_of_investment} Million` },
    ];

    return (
        <div className="flex rounded-[16px] border-[1px] border-[#18181833]">
            <div className="w-[100%] flex flex-col">
                <div className="flex relative w-full border-b-[1px] border-[#18181833]">
                    <div className="flex w-[60%] relative w-full border-[#18181833] border-r-[1px] p-4">
                        <div className="flex-shrink-0 ">
                            <img
                                src={
                                    logo?.data?.attributes?.url
                                        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${logo.data.attributes.url}`
                                        :
                                        "/images/fallback-image.png"}
                                alt="Company Logo"
                                className="w-[176px] h-[176px] rounded-[16px] object-contain"
                            />
                        </div>
                        <div className="ml-4 flex-1 h-[180px] pb-4" >
                            <p className="text-[35px] font-medium">{company_name}</p>
                            <div className="flex flex-col gap-y-2">
                                <div className="flex gap-x-1">
                                    <MapPin size={18} color="#0A66C2" />
                                    <h6 className="text-[16px] font-medium -mt-1">{headquarters || "Location not available"}</h6>
                                </div>
                                <h6 className="ml-1 text-[16px] text-[#18181899] overflow-hidden text-ellipsis whitespace-nowrap w-[670px]">
                                    {profile_description || "No description available"}{" "}
                                </h6>
                                <Link href={`/investor-detail/${business.id}`} className="ml-1 text-[#0966C3] text-[16px] -mt-2">Read more...</Link>
                                <div className="inline-block text-[16px] text-[#181818CC] ml-1 mt-2">
                                    Investor Type : <span className="font-semibold">{preferred_investment_type || "None"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-[40%] pr-4">
                        <p className="text-[28px] whitespace-nowrap font-semibold ml-4">$ {commitment_amount || "NA"} Million</p>
                        <h4 className="text-[16px] text-[#0966C3] font-medium mb-2 ml-4">Total Commitment Amount</h4>
                        {/* Add the button here */}
                        <Link href={`/business-detail/${business.id}`} className="mt-2 ml-4 py-2 px-4 bg-[#0A66C2] text-white text-[16px] font-medium rounded-xl flex items-center justify-center gap-x-2 transition-transform transform hover:scale-105">
                            View Listing
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="flex w-full py-4 px-4 justify-between ">
                    {metrics.map((metric, index) => (
                        <div key={index} className="flex flex-col gap-y-2 w-[160px] overflow-hidden">
                            <span className="text-[16px] text-[#0966C3] font-semibold">{metric.key}</span>
                            <span className="text-[16px] font-medium text-ellipsis overflow-hidden whitespace-nowrap">{metric.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InvestorCard;
