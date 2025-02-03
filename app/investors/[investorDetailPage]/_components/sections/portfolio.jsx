import React from "react";

const CurrentInvestment = React.forwardRef(({ companyName, investmentDetails }, ref) => {
    // Function to format the date as "Month Year"
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

    return (
        <section id="portfolio" ref={ref} className="mb-8 p-4 border border-gray-200 rounded-[16px] bg-white">
            {/* Heading */}
            <p className="text-[28px] font-semibold mb-0">Portfolio</p>
            <p className="text-[#181818CC] text-[24px] my-4">{companyName} Previous Investment</p>

            {/* Investment Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto mx-auto text-center">
                    <thead className="text-[20px] border-t-[1px] border-b-[1px]">
                        <tr className="font-medium">
                            <th className="px-4 py-3 font-medium">Organization Name</th>
                            <th className="px-4 py-3 font-medium">Date</th>
                            <th className="px-4 py-3 font-medium">Funding Round</th>
                            <th className="px-4 py-3 font-medium">Money Provided</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investmentDetails.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`${index !== investmentDetails.length - 1 ? "border-b border-gray-300" : ""}`}
                            >
                                <td className="px-4 py-2 text-[20px] font-medium">
                                    {item.company_name || "N/A"}
                                </td>
                                <td className="px-4 py-2 text-[16px] font-medium">
                                    {item.investment_date ? formatDate(item.investment_date) : "No"}
                                </td>
                                <td className="px-4 py-2 text-[18px] font-medium">
                                    {item.funding_stage || "N/A"}
                                </td>
                                <td className="px-4 py-2 text-[18px] font-medium">
                                    {item.funding_amount ? `$${item.funding_amount}M` : "N/A"}
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
