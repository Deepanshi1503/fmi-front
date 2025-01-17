import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, Text } from "recharts";

const OverviewSection = React.forwardRef(({ business }, ref) => {
    const globalMarketValues = business.global_market_share || [];
    const currentMarketValues = business.current_market_share || [];

    // Calculate the total values
    const totalGlobalMarketValue = globalMarketValues.reduce(
        (sum, market) => sum + parseFloat(market.amount || 0),
        0
    );
    const totalCurrentMarketValue = currentMarketValues.reduce(
        (sum, market) => sum + parseFloat(market.value || 0),
        0
    );

    // Dynamic generation of country and market share data
    const countryData = currentMarketValues.map((market, index) => ({
        name: market.country,
        value: market.share_percentage,
        color: `hsl(${index * 60}, 70%, 50%)` // Generate dynamic colors based on index
    }));

    // Dynamic generation of valuation data
    // const valuationData = currentMarketValues.map((valuation, index) => ({
    //     name: valuation.country,
    //     value: valuation.value,
    //     color: `hsl(${index * 50}, 80%, 60%)` // Generate dynamic colors for valuation
    // }));
    const valuationData = currentMarketValues.map((market, index) => ({
        name: market.country,
        value: market.value,
        color: `hsl(${index * 60}, 70%, 50%)` // Generate dynamic colors based on index
    }));

    // Pie chart data format
    const pieData = [
        { name: "Global Market", value: totalGlobalMarketValue, fill: "#F44336" },
        { name: "Current Market", value: totalCurrentMarketValue, fill: "#9D27B0" }
    ];

    return (
        <section id="market" ref={ref} className="mb-12">
            <div className="mb-8 border border-gray-200 rounded-[16px] bg-white p-4">
                <p className="text-[28px] font-semibold mb-2">Market & Competition</p>
                <div className="flex mt-6 justify-between border-b-[1px] border-[#18181833] pb-4">
                    {/* Market Size Info */}
                    <div className="w-1/2">
                        <h3 className="text-[24px] font-semibold mb-3 text-[#181818CC]">Market Size</h3>
                        <div className="mb-3 flex flex-col">
                            <span className="text-[#18181899] ml-[1.2rem] mb-1 text-[16px]">Global Market</span>
                            <strong className="font-medium text-[20px]">
                                <span className="inline-block w-3 h-3 rounded-full bg-[#F44336] mr-2"></span>
                                USD {totalGlobalMarketValue.toLocaleString()} Billion
                            </strong>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#18181899] ml-[1.2rem] mb-1 text-[16px]">Current Market Share:</span>{" "}
                            <strong className="font-medium text-[20px]">
                                <span className="inline-block w-3 h-3 rounded-full bg-[#9D27B0] mr-2"></span>
                                USD {totalCurrentMarketValue.toLocaleString()} Million
                            </strong>
                        </div>
                    </div>

                    {/* Pie Chart for Market Share */}
                    <div className="w-1/2 flex justify-center mt-3">
                        <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    innerRadius={50}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                {/* <Legend /> */}
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Country & Market Share Info */}
                <h3 className="text-[24px] font-semibold mb-2 mt-4 text-[#181818CC]">Country & Market Share</h3>
                <div className="flex">
                    {/* Country List */}
                    <div className="w-1/2">
                        {countryData.map((country, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <span
                                    className="inline-block w-3 h-3 rounded-full"
                                    style={{ backgroundColor: country.color }}
                                ></span>
                                <span className="ml-2 text-[16px]">{country.name}</span>
                                <strong className="ml-2 font-medium text-[16px]">
                                    {country.value}%
                                </strong>
                            </div>
                        ))}
                    </div>

                    {/* Pie Chart for Country Market Share */}
                    <div className="w-1/2 flex justify-center">
                        <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                                <Pie
                                    data={countryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    innerRadius={50}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {countryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Valuation Section */}
                {/* <h3 className="text-[24px] font-semibold mb-2 mt-4 text-[#181818CC]">Valuation</h3>
                <div className="flex">
                    <div className="w-1/2">
                        {valuationData.map((valuation, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <span
                                    className="inline-block w-3 h-3 rounded-full"
                                    style={{ backgroundColor: valuation.color }}
                                ></span>
                                <span className="ml-2 text-[16px]">{valuation.name}</span>
                                <strong className="ml-2 font-medium text-[16px]">
                                    USD {valuation.value.toLocaleString()}
                                </strong>
                            </div>
                        ))}
                    </div>

                    <div className="w-1/2 flex justify-center">
                        <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                                <Pie
                                    data={valuationData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    innerRadius={50}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {valuationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div> */}
            </div>
        </section>
    );
});

export default OverviewSection;
