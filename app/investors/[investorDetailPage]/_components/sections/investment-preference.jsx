import React, { forwardRef } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const InvestmentPreferences = forwardRef(({ investment_details = [] }, ref) => {
    const generateDynamicColor = (index, total) => {
        const hue = (index * (360 / total)) % 360; 
        return `hsl(${hue}, 70%, 60%)`; 
    };

    // Function to calculate percentage distribution
    const calculatePercentages = (key) => {
        if (investment_details.length === 0) return []; 

        const total = investment_details.length;
        const counts = investment_details.reduce((acc, item) => {
            acc[item[key]] = (acc[item[key]] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(counts).map(([name, count], index) => ({
            name,
            value: parseFloat(((count / total) * 100).toFixed(2)), 
            color: generateDynamicColor(index, Object.keys(counts).length)
        }));
    };

    const investmentTypeData = calculatePercentages("funding_type");
    const geographicFocusData = calculatePercentages("country");

    return (
        <section id="investmentPreference" ref={ref} className="mb-12">
            <div className="mb-8 border border-gray-200 rounded-[16px] bg-white p-4">
                <h2 className="text-[28px] font-semibold">Investment Preferences</h2>

                {/* Preferred Investment Type */}
                {investmentTypeData.length > 0 && (
                    <div className="flex justify-between border-b pb-4">
                        <div className="w-1/2">
                            <h3 className="text-[24px] font-semibold mb-2 mt-4 text-[#181818CC]">Preferred Investment Type</h3>
                            {investmentTypeData.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex items-center">
                                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                                        <strong className="ml-2">{item.value}%</strong>
                                    </div>
                                    <span className="ml-[1.2rem] text-[16px]" style={{ color: item.color }}>{item.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className="w-1/2 flex justify-center items-center">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={investmentTypeData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        innerRadius={50}
                                        dataKey="value"
                                    >
                                        {investmentTypeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Geographic Focus */}
                {geographicFocusData.length > 0 && (
                    <div className="flex justify-between pt-4 pb-4">
                        <div className="w-1/2">
                            <h3 className="text-[24px] font-semibold mb-2 mt-4 text-[#181818CC]">Geographic Focus</h3>
                            {geographicFocusData.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <div key={index} className="flex items-center">
                                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                                        <strong className="ml-2">{item.value}%</strong>
                                    </div>
                                    <span className="ml-[1.2rem] text-[16px]" style={{ color: item.color }}>{item.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className="w-1/2 flex justify-center items-center">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={geographicFocusData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        innerRadius={50}
                                        dataKey="value"
                                    >
                                        {geographicFocusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
});

export default InvestmentPreferences;
