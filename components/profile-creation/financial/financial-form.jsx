"use client";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuarterlyDataForm = () => {
    const [yearData, setYearData] = useState([]);
    const [currentYear, setCurrentYear] = useState("");
    const [activeYearIndex, setActiveYearIndex] = useState(null);

    // Add new year with empty quarterly data
    const addYear = () => {
        if (currentYear && !yearData.some((data) => data.year === currentYear) && yearData.length < 5) {
            const newData = {
                year: currentYear,
                quarters: [
                    { revenue: "", profitLoss: "" },
                    { revenue: "", profitLoss: "" },
                    { revenue: "", profitLoss: "" },
                    { revenue: "", profitLoss: "" },
                ],
                totalRevenue: 0,
                totalProfitLoss: 0,
            };

            setYearData((prev) => {
                const updatedData = [...prev, newData];
                return updatedData.sort((a, b) => a.year - b.year); // Sort by year in ascending order
            });

            setCurrentYear("");
        }
    };

    // Update quarterly data
    const updateQuarter = (yearIndex, quarterIndex, field, value) => {
        const updatedData = [...yearData];
        const quarter = updatedData[yearIndex].quarters[quarterIndex];
        quarter[field] = value;

        // Recalculate totals
        const totals = updatedData[yearIndex].quarters.reduce(
            (acc, q) => ({
                totalRevenue: acc.totalRevenue + (parseFloat(q.revenue) || 0),
                totalProfitLoss: acc.totalProfitLoss + (parseFloat(q.profitLoss) || 0),
            }),
            { totalRevenue: 0, totalProfitLoss: 0 }
        );

        updatedData[yearIndex].totalRevenue = totals.totalRevenue;
        updatedData[yearIndex].totalProfitLoss = totals.totalProfitLoss;
        setYearData(updatedData);
    };

    // Remove a year from the list
    const removeYear = (yearIndex) => {
        const updatedData = yearData.filter((_, index) => index !== yearIndex);
        setYearData(updatedData);
        if (activeYearIndex === yearIndex) {
            setActiveYearIndex(null); // Reset active year if removed
        }
    };

    // Bar chart data
    const chartData = {
        labels: yearData.map((data) => data.year),
        datasets: [
            {
                label: "Total Revenue",
                data: yearData.map((data) => data.totalRevenue),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
                label: "Total Profit/Loss",
                data: yearData.map((data) => data.totalProfitLoss),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <div className="flex space-x-48 mx-40 pl-4 space-y-6">
            {/* Left Section */}
            <div className="w-full md:w-1/3 space-y-4">
                <div>
                    <h2 className="xl:text-[48px] whitespace-nowrap flex justify-center 2xl:justify-start font-semibold text-[#0A66C2] mb-4">Financial</h2>
                    <p className="text-[12px] xl:text-[15px] whitespace-nowrap font-normal flex justify-center 2xl:justify-start text-[#181818CC] mb-6">Make it easy for people</p>
                </div>

                {/* Year Input */}
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        value={currentYear}
                        onChange={(e) => setCurrentYear(e.target.value)}
                        placeholder="Enter Year"
                        className="border rounded-lg p-2 w-1/3"
                    />
                    <button
                        type="button"
                        onClick={addYear}
                        disabled={currentYear === '' || yearData.length >= 5}
                        className={`px-4 py-2 ${yearData.length >= 5 || currentYear === '' ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'} text-white rounded-lg`}
                    >
                        +
                    </button>
                </div>

                {/* Table for Selected Year */}
                {activeYearIndex !== null && (
                    <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
                        <thead>
                            <tr>
                                <th className="border p-2">Quarter</th>
                                <th className="border p-2">Revenue</th>
                                <th className="border p-2">Profit/Loss</th>
                            </tr>
                        </thead>
                        <tbody>
                            {yearData[activeYearIndex].quarters.map((quarter, quarterIndex) => (
                                <tr key={quarterIndex}>
                                    <td className="border p-2 text-center">Q{quarterIndex + 1}</td>
                                    <td className="border p-2">
                                        <input
                                            type="number"
                                            value={quarter.revenue}
                                            onChange={(e) =>
                                                updateQuarter(activeYearIndex, quarterIndex, "revenue", e.target.value)
                                            }
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <input
                                            type="number"
                                            value={quarter.profitLoss}
                                            onChange={(e) =>
                                                updateQuarter(activeYearIndex, quarterIndex, "profitLoss", e.target.value)
                                            }
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td className="border p-2 font-bold text-center">Total</td>
                                <td className="border p-2 font-bold text-center">{yearData[activeYearIndex].totalRevenue}</td>
                                <td className="border p-2 font-bold text-center">{yearData[activeYearIndex].totalProfitLoss}</td>
                            </tr>
                        </tbody>
                    </table>
                )}

                {/* Collapsible Bars */}
                <div className="space-y-2">
                    {yearData.map((data, yearIndex) => (
                        <div
                            key={data.year}
                            className={`border rounded-lg p-3 cursor-pointer ${activeYearIndex === yearIndex ? "bg-blue-100" : "bg-gray-100"}`}
                            onClick={() => setActiveYearIndex(yearIndex)}
                        >
                            <div className="flex justify-between items-center">
                                <span>Year: {data.year} - Revenue: {data.totalRevenue}, Profit/Loss: {data.totalProfitLoss}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the click event
                                        removeYear(yearIndex);
                                    }}
                                    className="text-red-500 font-bold"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full pt-32 md:w-[50%] h-full -mr-12">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default QuarterlyDataForm;
