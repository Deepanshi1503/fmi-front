import React from "react";

const CurrentInvestment = React.forwardRef(({ business }, ref) => {
    const { fundraising_status = [], total_fundraised } = business;

    return (
        <section id="currentInvestment" ref={ref} className="mb-8 p-4 border border-gray-200 rounded-[16px] bg-white">
            {/* Heading */}
            <p className="text-[28px] font-semibold mb-2">Current Investment</p>

            {/* Total Fundraised */}
            <div className="mb-6 text-lg font-medium">
                <span className="text-gray-600">Total Fund Raised: </span>
                <span className="text-blue-500 font-bold">
                    {total_fundraised ? `$${total_fundraised}M` : "N/A"}
                </span>
            </div>

            {/* Investment Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto mx-auto text-center">
                    <thead className="text-[20px] border-t-[1px] border-b-[1px]">
                        <tr className="font-medium">
                            <th className="px-4 py-3 font-medium">Organizational Name</th>
                            <th className="px-4 py-3 font-medium">Lead Investor</th>
                            <th className="px-4 py-3 font-medium">Funding Round</th>
                            <th className="px-4 py-3 font-medium">Money Raised</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fundraising_status.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`${index !== fundraising_status.length - 1 ? "border-b border-gray-300" : ""}`}
                            >
                                <td className="px-4 py-2 text-[20px] font-medium">
                                    {item.current_status || "N/A"}
                                </td>
                                <td className="px-4 py-2 text-[16px] font-medium">
                                    {item.lead_investor ? "Yes" : "No"}
                                </td>
                                <td className="px-4 py-2 text-[18px] font-medium">
                                    {item.funding_round || "N/A"}
                                </td>
                                <td className="px-4 py-2 text-[18px] font-medium">
                                    {item.amount ? `$${item.amount}M` : "N/A"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
});

export default CurrentInvestment;
