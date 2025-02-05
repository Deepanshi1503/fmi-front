import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const OverviewSection = React.forwardRef(({ business }, ref) => {
    const [selectedYear, setSelectedYear] = useState(business?.financial_model_details[0]?.year || 2024);
    const selectedFinancials = business?.financial_model_details.find(
        (item) => item.year === selectedYear
    );

    const quarterDetailsWithLabels = selectedFinancials?.quarter_details.map((quarter, index) => ({
        ...quarter,
        id: index + 1, // replace `id` with the corresponding quarter number (1 to 4)
        quarterLabel: `Q${index + 1}` // Add a custom quarter label "Q1", "Q2", "Q3", "Q4"
    }));

    const handleYearChange = (event) => {
        setSelectedYear(Number(event.target.value));
    };

    const getProfitLossColor = (profitLoss) => {
        return profitLoss < 0 ? "text-red-500" : "text-green-500"; // Red for negative, green for positive/zero
    };

    return (
        <section id="financials" ref={ref} className="mb-12 p-4 border border-gray-200 rounded-[16px] bg-white">
            <h2 className="text-[28px] font-semibold mb-3">Financial Details</h2>

            {/* Total Revenue and Profit/Loss Indicators */}
            <div className="flex items-center justify-end mb-4">
                <div className="flex items-center mr-10">
                    <span className="inline-block w-10 h-3 mr-2" style={{ backgroundColor: "#4EAFFC" }}></span>
                    <span className="font-medium text-[16px]">Total Revenue</span>
                </div>
                <div className="flex items-center mr-10">
                    <span className="inline-block w-5 h-3" style={{ backgroundColor: "#4CAF50" }}></span>
                    <span className="inline-block w-5 h-3 mr-2" style={{ backgroundColor: "#FF6347" }}></span>
                    <span className="font-medium text-[16px]">Total Profit / Loss</span>
                </div>
                {/* Dropdown for Year Selection */}
                <div className="">
                    <label htmlFor="year-select" className="mr-3">Select Year:</label>
                    <select id="year-select" value={selectedYear} onChange={handleYearChange} className="p-1 border rounded">
                        {business?.financial_model_details.map((item) => (
                            <option key={item.id} value={item.year}>
                                {item.year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Quarterly Graph */}
            <div className="my-6">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={quarterDetailsWithLabels}>
                        <XAxis dataKey="quarterLabel" tickFormatter={(tick) => tick} />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        {/* <Legend /> */}

                        <Bar dataKey="revenue" fill="#4EAFFC" name="Revenue" barSize={30} />
                        {/* <Bar dataKey="profit_loss" fill="#FF6347" name="Profit/Loss" barSize={30} /> */}
                        <Bar
                            dataKey="profit_loss"
                            name="Profit/Loss"
                            barSize={30}
                            shape={(props) => {
                                const { x, y, width, height, value } = props;
                                const color = value >= 0 ? "#4CAF50" : "#FF6347";
                                // Correct y and height for negative values
                                const adjustedY = value >= 0 ? y : y + height;
                                const adjustedHeight = Math.abs(height);
                                return <rect x={x} y={adjustedY} width={width} height={adjustedHeight} fill={color} />;
                            }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Quarterly Details Table */}
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full table-auto mx-auto text-center">
                    <thead className="bg-[#0B66C3] text-white text-[20px]">
                        <tr>
                            <th className="px-4 py-2">Quarter</th>
                            <th className="px-4 py-2">Revenue</th>
                            <th className="px-4 py-2">Profit/Loss</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedFinancials?.quarter_details.map((quarter, id) => (
                            <tr key={id} className={`${id !== selectedFinancials.quarter_details.length - 1 ? "border-b border-gray-300" : ""}`}>
                                <td className="px-4 py-2 text-[20px] font-semibold">{`Q${id + 1}`}</td>
                                <td className="px-4 py-2 text-[18px] font-medium">{quarter.revenue}</td>
                                <td className={`px-4 py-2 text-[18px] font-medium ${getProfitLossColor(quarter.profit_loss)}`}>{quarter.profit_loss}</td>
                            </tr>
                        ))}
                        <tr className="font-semibold bg-[#F8F8F8]">
                            <td className="px-4 py-2 text-[20px] font-semibold">Total</td>
                            <td className="px-4 py-2 text-[18px] font-medium">{selectedFinancials?.total_revenue}</td>
                            <td className={`px-4 py-2 text-[18px] font-medium ${getProfitLossColor(selectedFinancials?.total_profit_loss)}`}>{selectedFinancials?.total_profit_loss}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </section>
    );
});

export default OverviewSection;
