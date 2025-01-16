"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";

const FundraisingStatusForm = ({ onCompletion }) => {
    const [fundraisingStatus, setFundraisingStatus] = useState([{ lender: "", amount: "", leadInvestor: false, fundingRound: "" }]);
    const [totalFundsRaised, setTotalFundsRaised] = useState(0);
    const [fundingRoundOptions, setFundingRoundOptions]=useState([]);

    // Fetch funding round options from the backend
    useEffect(() => {
        const fetchFundingOptions = async () => {
            try {
                const response = await fetch("http://localhost:1337/api/content-type-builder/components/form.fundraising-status");
                const data = await response.json();

                if (data?.data?.schema?.attributes?.funding_round?.enum) {
                    const options = data.data.schema.attributes.funding_round.enum.map((option) => ({
                        value: option, // Normalize for consistent value keys
                        label: option,
                    }));
                    setFundingRoundOptions(options);
                }
            } catch (error) {
                console.error("Error fetching funding round options:", error);
            }
        };

        fetchFundingOptions();
    }, []);

    // Handle changes for fundraising status rows
    const handleFundraisingStatusChange = (index, field, value) => {
        const updatedRows = [...fundraisingStatus];
        updatedRows[index][field] = value;
        setFundraisingStatus(updatedRows);
    };

    // Add a new row
    const addRow = () => setFundraisingStatus((prev) => [...prev, { lender: "", amount: "", leadInvestor: false, fundingRound: "" }]);

    // Remove a row
    const removeRow = (index) => {
        setFundraisingStatus((prev) => prev.filter((_, i) => i !== index));
    };

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("combineInfo")) || {};
        const fundraisingData = savedData.fundraisingStatus || { fundraisingStatus: [{ lender: "", amount: "", leadInvestor: false, fundingRound: "" }], totalFundsRaised: 0 };

        setFundraisingStatus(fundraisingData.fundraisingStatus || [{ lender: "", amount: "", leadInvestor: false, fundingRound: "" }]);
        setTotalFundsRaised(fundraisingData.totalFundsRaised || 0);
    }, []);

    // Save data to localStorage when state changes
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("combineInfo")) || {};

        const updatedData = {
            ...savedData,
            fundraisingStatus: {
                fundraisingStatus,
                totalFundsRaised,
            },
        };

        localStorage.setItem("combineInfo", JSON.stringify(updatedData));
    }, [fundraisingStatus, totalFundsRaised]);

    // Calculate the total funds raised based on the entered amounts
    useEffect(() => {
        const total = fundraisingStatus.reduce((acc, row) => acc + (parseFloat(row.amount) || 0), 0);
        setTotalFundsRaised(total);
    }, [fundraisingStatus]);

    // Check if form is complete
    const checkCompletion = () => {
        const isComplete = fundraisingStatus.every(
            (row) => row.lender.trim() !== "" && row.amount > 0 && row.fundingRound.trim() !== ""
        ) && totalFundsRaised > 0;

        onCompletion(isComplete);
    };

    // Call onCompletion on every change
    useEffect(() => {
        checkCompletion();
    }, [fundraisingStatus, totalFundsRaised]);

    return (
        <div className="form-container mx-auto px-4 w-full">
            <form className="space-y-6">
                {/* Current Fundraising Status */}
                <div>
                    <h3 className="text-[16px] text-left font-medium mb-1">Current Fundraising Status</h3>
                    {fundraisingStatus.map((row, index) => (
                        <div key={index} className="flex items-center gap-4 mb-4">
                            {/* Lender input */}
                            <input
                                type="text"
                                name="lender"
                                value={row.lender || ""}
                                onChange={(e) => handleFundraisingStatusChange(index, "lender", e.target.value)}
                                className="w-[25%] p-3 border rounded-lg"
                                placeholder="Enter Lender Name"
                            />
                            {/* Amount input */}
                            <input
                                type="number"
                                name="amount"
                                value={row.amount || ""}
                                onChange={(e) => handleFundraisingStatusChange(index, "amount", e.target.value)}
                                className="w-[25%] p-3 border rounded-lg"
                                placeholder="Enter Amount"
                            />
                            {/* Lead Investor checkbox */}
                            <div className="flex items-center w-[20%]">
                                <input
                                    type="checkbox"
                                    name="leadInvestor"
                                    checked={row.leadInvestor}
                                    onChange={(e) => handleFundraisingStatusChange(index, "leadInvestor", e.target.checked)}
                                    className="mr-2"
                                />
                                <label>Lead Investor</label>
                            </div>
                            {/* Funding Round dropdown */}
                            <div className="w-[30%]">
                                <Select
                                    options={fundingRoundOptions}
                                    value={fundingRoundOptions.find((option) => option.value === row.fundingRound)}
                                    onChange={(selectedOption) =>
                                        handleFundraisingStatusChange(index, "fundingRound", selectedOption?.value || "")
                                    }
                                    placeholder="Funding Round"
                                    className="w-full"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={addRow}
                                    className="px-2 bg-blue-500 text-white rounded"
                                >
                                    +
                                </button>
                                {fundraisingStatus.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeRow(index)}
                                        className="px-2 bg-red-500 text-white rounded"
                                    >
                                        -
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total Funds Raised */}
                <div>
                    <h3 className="text-[16px] text-left font-medium mb-1">Total Funds Raised</h3>
                    <input
                        type="number"
                        value={totalFundsRaised || ""}
                        onChange={(e) => setTotalFundsRaised(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Total Funds Raised"
                    />
                </div>
            </form>
        </div>
    );
};

export default FundraisingStatusForm;
