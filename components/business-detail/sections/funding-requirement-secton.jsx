import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Image from "next/image";

const COLORS = ["#FF5A5A", "#13A8E3", "#FD68B5", "#7120FF"];

const OverviewSection = React.forwardRef(({ business }, ref) => {
    const isFundraise = business.fundraise_business_details;
    const isSale = business.sale_business_details;

    const fundraiseDetails = business.fundraise_business_details;
    const fundsAllocation = fundraiseDetails?.funds_allocation || [];

    const saleDetails = business.sale_business_details;

    const renderFundraiseUI = () => {
        return (
            <div>
                <p className="text-[28px] font-semibold mb-3">Funding Requirement</p>

                <div className="grid grid-cols-2 gap-4 items-center">
                    {/* Left Section */}
                    <div className="w-[70%] mt-3">
                        <div className="mb-4 border border-[#1818181A] rounded-[16px] p-3">
                            <p className="text-[#202224] text-[16px] mb-2">Asking Fund</p>
                            <p className="text-[22px] font-semibold mb-0">
                                USD ${fundraiseDetails.funding_ask} Million
                            </p>
                        </div>
                        <div className="mb-4 border border-[#1818181A] rounded-[16px] p-3">
                            <p className="text-[#202224] text-[16px] mb-2">Investor Role</p>
                            <p className="text-[22px] font-semibold mb-0">{fundraiseDetails.investor_role}</p>
                        </div>
                        <div className="border border-[#1818181A] rounded-[16px] p-3">
                            <p className="text-[#202224] text-[16px] mb-2">Preferred Type of Funding</p>
                            <p className="text-[22px] font-semibold mb-0">{fundraiseDetails?.type_of_funding}</p>
                        </div>
                    </div>

                    {/* Right Section: Pie Chart */}
                    <div>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={fundsAllocation}
                                    dataKey="percentage_allocated"
                                    nameKey="area_of_concern"
                                    outerRadius={160}
                                    innerRadius={100}
                                    fill="#8884d8"
                                >
                                    {fundsAllocation.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between mt-4 mx-20">
                    {fundsAllocation.map((item, index) => (
                        <div key={item.id} className="flex items-center mr-4">
                            <span
                                className="-mt-[22px] w-3 h-3 mr-3 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></span>
                            <div className="flex flex-col">
                                <span className="text-[24px] font-semibold">{item.percentage_allocated}%</span>
                                <span
                                    className="text-[16px]"
                                    style={{ color: COLORS[index % COLORS.length] }}  // Apply the color here
                                >
                                    {item.area_of_concern}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderSaleUI = () => {
        const saleDetails = business.sale_business_details;

        return (
            <div>
                <p className="text-[28px] font-semibold mb-8">For Sale</p>

                <div className="grid grid-cols-2 gap-y-10 items-center">
                    {/* Selling Price */}
                    <div className="flex items-start space-x-4">
                        <Image
                            loading="lazy"
                            src="/images/salePrice.png"
                            className="mt-2"
                            alt="logo"
                            width={40}
                            height={77}
                        />
                        <div>
                            <p className="text-[#18181899] text-[16px] mb-2">Selling Price</p>
                            <p className="text-[24px] font-medium mb-0">USD ${saleDetails.sale_price} Million</p>
                        </div>
                    </div>

                    {/* Ownership Stake Offer */}
                    <div className="flex items-start space-x-4">
                    <Image
                            loading="lazy"
                            src="/images/ownershipOffered.png"
                            className="mt-2"
                            alt="logo"
                            width={40}
                            height={77}
                        />
                        <div>
                        <p className="text-[#202224] text-[16px] mb-2">Ownership Stake Offer</p>
                        <p className="text-[24px] font-medium mb-0">{saleDetails.ownership_stake_offered}%</p>
                        </div>
                    </div>

                    {/* Valuation */}
                    <div className="flex items-start space-x-4">
                    <Image
                            loading="lazy"
                            src="/images/valuation.png"
                            className="mt-2"
                            alt="logo"
                            width={40}
                            height={77}
                        />
                        <div>
                        <p className="text-[#202224] text-[16px] mb-2">Valuation</p>
                        <p className="text-[24px] font-medium mb-0">USD ${saleDetails.valuation} Million</p>
                        </div>
                    </div>

                    {/* Reason for Sale */}
                    <div className="flex items-start space-x-4">
                    <Image
                            loading="lazy"
                            src="/images/reasonForSale.png"
                            className="mt-2"
                            alt="logo"
                            width={40}
                            height={77}
                        />
                        <div>
                        <p className="text-[#202224] text-[16px] mb-2">Reason for Sale</p>
                        <p className="text-[24px] font-medium mb-0">{saleDetails.reason_for_sale}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <section id="fundingRequirement" ref={ref} className="mb-12 p-4 border border-[#EFEFEF] rounded-[16px] bg-white">
            {/* <p className="text-[28px] font-semibold mb-3">Funding Requirement</p> */}
            {isFundraise && renderFundraiseUI()}
            {isSale && renderSaleUI()}
            {!isFundraise && !isSale && <p>No details available.</p>}
        </section>
    );
});

export default OverviewSection;

// fundingRequirement