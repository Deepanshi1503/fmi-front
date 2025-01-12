"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Minus, Plus } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuarterlyDataForm = () => {
    const [yearData, setYearData] = useState([]);
    const [currentYear, setCurrentYear] = useState("");
    const [activeYearIndex, setActiveYearIndex] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState("USD");

    /* Profle Progress and local storage handling */
    const [completionStatus, setCompletionStatus] = useState([]);
    const [progress, setProgress] = useState(0);

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("combineInfo")) || {};
        const savedYearData = savedData.yearData || [];
        const savedCompletionStatus = savedData.completionStatus || [];

        setYearData(savedYearData);
        setCompletionStatus(savedCompletionStatus);
    }, []);

    // Save data to localStorage when yearData or selectedCurrency changes
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("combineInfo")) || {};
        const updatedData = {
            ...savedData,
            yearData: yearData,
            selectedCurrency: selectedCurrency,
        };
        // Calculate progress
        const totalYears = yearData.length;
        const completedYears = completionStatus.filter(Boolean).length;
        const progressPercentage = Math.floor((completedYears / totalYears) * 100);
        
        // Store the progress and completionStatus
        const financial = {
            completionStatus: completionStatus,
            progress: progressPercentage,
        };
        const previousProfileProgress = JSON.parse(localStorage.getItem("profileProgress")) || {};
        const updatedProfileProgress = {
            ...previousProfileProgress,
            financial: financial, // Adding the new financial data
        };
        localStorage.setItem("profileProgress", JSON.stringify(updatedProfileProgress));
        
        localStorage.setItem("combineInfo", JSON.stringify(updatedData));
    }, [yearData, completionStatus, selectedCurrency]);

    const isYearCompleted = (yearIndex) => {
        return yearData[yearIndex].quarters.every(
            (quarter) => quarter.revenue && quarter.profitLoss
        );
    };

    // Function to update completion status and progress
    useEffect(() => {
        const updatedCompletionStatus = yearData.map((_, index) => isYearCompleted(index));
        setCompletionStatus(updatedCompletionStatus);

        // Calculate progress as percentage of completed years
        const completedYears = updatedCompletionStatus.filter(Boolean).length;
        const progressPercentage = Math.floor((completedYears / yearData.length) * 100);
        setProgress(progressPercentage);
    }, [yearData]);

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
                const updatedData = [...prev, newData].sort((a, b) => a.year - b.year);
                const newIndex = updatedData.findIndex((data) => data.year === currentYear);
                setActiveYearIndex(newIndex); // Automatically set the new year as active
                return updatedData;
            });

            setCurrentYear("");
        }
    };

    const updateQuarter = (yearIndex, quarterIndex, field, value) => {
        const updatedData = [...yearData];
        const quarter = updatedData[yearIndex].quarters[quarterIndex];
        quarter[field] = value;

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

    const removeYear = (yearIndex) => {
        const updatedData = yearData.filter((_, index) => index !== yearIndex);
        setYearData(updatedData);
        if (activeYearIndex === yearIndex) {
            setActiveYearIndex(null);
        }
    };

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
        <div className="flex flex-col lg:flex-row justify-between gap-12 py-6 lg:py-12 mx-48">
            {/* Left Section */}
            <div className="lg:w-[40%] ml-12 space-y-6">
                <div className="">
                    <h2 className="text-[32px] xl:text-[48px] whitespace-nowrap flex justify-center 2xl:justify-start font-semibold text-[#0A66C2] mb-2">Financial Overview</h2>
                    <p className="text-[12px] xl:text-[15px] whitespace-nowrap font-normal flex justify-center 2xl:justify-start text-[#181818CC] mb-6">
                        Track and manage your financial performance.
                    </p>
                </div>

                {/* Year Input with Currency Dropdown */}
                <div className="flex items-center justify-between gap-3 pb-2">
                    {/* Year Input */}
                    <input
                        type="text"
                        value={currentYear}
                        onChange={(e) => setCurrentYear(e.target.value)}
                        placeholder="Enter Year"
                        className="border rounded-lg p-3 w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Currency Dropdown */}
                    <select
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        className="border rounded-lg p-2 w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="USD">USD</option>
                        <option value="INR">INR</option>
                        {/* Add more options as needed */}
                    </select>

                    {/* Add Button with Icon */}
                    <button
                        type="button"
                        onClick={addYear}
                        disabled={currentYear === "" || yearData.length >= 5}
                        className={`flex items-center justify-center px-3 py-2 text-white font-semibold rounded-lg shadow-sm ${yearData.length >= 5 || currentYear === ""
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        <Plus className="w-5 h-5" /> {/* Add Icon */}
                    </button>
                </div>

                {/* Year List */}
                <div className="flex flex-wrap justify-evenly pb-2">
                    {yearData.map((data, yearIndex) => (
                        <div
                            key={data.year}
                            className={`flex-grow basis-1/5 max-w-[17%] p-2 rounded-lg border cursor-pointer transition ${activeYearIndex === yearIndex ? "bg-blue-100 border-blue-300" : "bg-white border-gray-300"
                                } hover:shadow-md`}
                            onClick={() => setActiveYearIndex(yearIndex)}
                        >
                            <div className="flex justify-between items-center">
                                {/* Year Display */}
                                <span className="text-lg font-semibold text-gray-800">
                                    {data.year}
                                </span>

                                {/* Remove Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the click event for the card
                                        removeYear(yearIndex);
                                    }}
                                    className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring focus:ring-red-300"
                                >
                                    <Minus />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quarterly Data Table */}
                {activeYearIndex !== null && (
                    <div className="mt-6 overflow-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-3 text-left">Quarter</th>
                                    <th className="border p-3 text-left">Revenue</th>
                                    <th className="border p-3 text-left">Profit/Loss</th>
                                </tr>
                            </thead>
                            <tbody>
                                {yearData[activeYearIndex].quarters.map((quarter, quarterIndex) => (
                                    <tr key={quarterIndex} className="hover:bg-gray-50">
                                        <td className="border p-3">Q{quarterIndex + 1}</td>
                                        <td className="border p-3">
                                            <input
                                                type="number"
                                                value={quarter.revenue}
                                                onChange={(e) =>
                                                    updateQuarter(activeYearIndex, quarterIndex, "revenue", e.target.value)
                                                }
                                                className="w-full p-2 border rounded focus:ring-1 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="border p-3">
                                            <input
                                                type="number"
                                                value={quarter.profitLoss}
                                                onChange={(e) =>
                                                    updateQuarter(activeYearIndex, quarterIndex, "profitLoss", e.target.value)
                                                }
                                                className="w-full p-2 border rounded focus:ring-1 focus:ring-blue-500"
                                            />
                                        </td>
                                    </tr>
                                ))}
                                <tr className="bg-gray-100 font-bold">
                                    <td className="border p-3">Total</td>
                                    <td className="border p-3">{yearData[activeYearIndex].totalRevenue}</td>
                                    <td className="border p-3">{yearData[activeYearIndex].totalProfitLoss}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Right Section */}
            <div className="lg:w-[50%] mt-32">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default QuarterlyDataForm;