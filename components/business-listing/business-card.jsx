import React from "react";
import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { MapPin } from "lucide-react";
import Link from "next/link";

const BusinessCard = ({ business }) => {
    const {
        company_name,
        location,
        description_about_company,
        business_image,
        // funding_ask,
        // valuation,
        // revenue,
        // profit,
        // loss,
        // year_of_incorporation,
        // funding_type,
        // industry,
        financial_model_details,
    } = business.attributes || {};

    console.log(financial_model_details);

    const metrics = [
        { key: "Revenue", value: "$20 Million" },
        { key: "Valuation", value: "$100 Million" },
        { key: "Founded", value: "2024" },
        { key: "Funding type", value: "Debt" },
        { key: "Profit", value: "$5 Million" },
        { key: "Loss", value: "$5 Million" },
    ];

    // Get the latest year's financial data
    const latestYearData = financial_model_details?.reduce((latest, current) => {
        return current.year > (latest?.year || 0) ? current : latest;
    }, null);

    const quarterlyData =
        latestYearData?.quarter_details.map((quarter, index) => ({
            quarter: `Q${index + 1}`,
            revenue: parseFloat(quarter.revenue),
            color: [
                "#62B2FD", // Q1 color
                "#9BDFC4", // Q2 color
                "#F99BAB", // Q3 color
                "#FFB44F", // Q4 color
            ][index],
        })) || [];

    return (
        <div className="flex rounded-lg border-[1px] border-[#18181833]">
            <div className="w-[70%] flex flex-col">
                <div className="flex relative w-full border-b-[1px] border-[#18181833] border-r-[1px] p-4">
                    <div className="flex-shrink-0">
                        <img
                            src={
                                // business_image?.data?.attributes?.url
                                // ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${business_image.data.attributes.url}`
                                // : 
                                "/images/fallback-image.png"}
                            alt="Company Logo"
                            className="w-[176px] h-[176px] rounded-[16px] object-cover"
                        />
                    </div>
                    <div className="ml-4 flex-1 h-[180px] pb-4" >
                        <p className="text-[35px] font-medium">{company_name}</p>
                        <div className="flex space-x-12">
                            <div className="flex flex-col gap-y-2">
                                <div className="flex gap-x-1">
                                    <MapPin size={18} color="#0A66C2" />
                                    <h6 className="text-[16px] font-medium -mt-1">{location || "Location not available"}</h6>
                                </div>
                                <h6 className="ml-1 text-[16px] text-[#18181899] overflow-hidden text-ellipsis whitespace-nowrap w-[350px]">
                                    {description_about_company || "No description available"}{" "}
                                </h6>
                                <Link href="#" className="ml-1 text-[#0966C3] text-[16px] -mt-2">Read more...</Link>
                                <div className="inline-block text-[16px] text-[#181818CC] ml-1 mt-2">
                                    {"Software Development"}
                                </div>
                            </div>
                            <div className="text-end">
                                <h6 className="text-[#0966C3] text-[16px] font-medium -mt-1">Funding ask</h6>
                                <h6 className="text-[22px] font-semibold"> USD $20 Million</h6>
                            </div>
                        </div>
                    </div>
                    {/* <div className="absolute bottom-0 right-0 w-[1000%] border-b-[1px] border-[#18181833]" /> */}
                </div>
                <div className="flex w-full py-4 px-4 border-r-[1px] border-[#18181833] justify-between ">
                    {metrics.map((metric, index) => (
                        <div key={index} className="flex flex-col gap-y-2">
                            <span className="text-[16px] text-[#0966C3] font-semibold">{metric.key}</span>
                            <span className="text-[16px] font-medium">{metric.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center w-[30%] pr-4 pt-3">
                <h4 className="text-[18px] font-semibold mb-4 ml-4">Quarterly Revenue ({latestYearData?.year || "N/A"})</h4>
                {quarterlyData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={quarterlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="quarter"
                                tick={({ x, y, payload }) => (
                                    <g transform={`translate(${x},${y})`}>
                                        <text
                                            x={0}
                                            y={0}
                                            dy={10}
                                            textAnchor="middle"
                                            fill={payload.index !== undefined ? quarterlyData[payload.index].color : '#000'}
                                        >
                                            <circle cx={-12} cy={0} r={3} fill={payload.index !== undefined ? quarterlyData[payload.index].color : '#000'} />
                                            {payload.value}
                                        </text>
                                    </g>
                                )}
                            />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="revenue"
                                barSize={50} // Set the width of the bars
                            >
                                {quarterlyData.map((quarter, index) => (
                                    <Cell key={index} fill={quarter.color} /> // Assign unique color to each bar
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p>No data available</p>
                )}
                {/* Add the button here */}
                <button className="mt-2 ml-4 py-2 w-full bg-[#0A66C2] text-white text-[16px] font-medium rounded-xl flex items-center justify-center gap-x-2">
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
                </button>
            </div>
        </div>
    );
};

export default BusinessCard;
