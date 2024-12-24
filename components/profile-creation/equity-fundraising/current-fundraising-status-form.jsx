"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";

const FundraisingStatusForm = () => {
    const [fundraisingStatus, setFundraisingStatus] = useState([{ lender: "", amount: "" }]);
    const [totalFundsRaised, setTotalFundsRaised] = useState(0);

    // Handle changes for fundraising status rows
    const handleFundraisingStatusChange = (index, field, value) => {
        const updatedRows = [...fundraisingStatus];
        updatedRows[index][field] = value;
        setFundraisingStatus(updatedRows);
    };

    // Add a new row
    const addRow = () => setFundraisingStatus((prev) => [...prev, { lender: "", amount: "" }]);

    // Remove a row
    const removeRow = (index) => {
        setFundraisingStatus((prev) => prev.filter((_, i) => i !== index));
    };

    // Calculate the total funds raised based on the entered amounts
    useEffect(() => {
        const total = fundraisingStatus.reduce((acc, row) => acc + (parseFloat(row.amount) || 0), 0);
        setTotalFundsRaised(total);
    }, [fundraisingStatus]);

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
                                className="w-1/2 p-3 border rounded-lg"
                                placeholder="Enter Lender Name"
                            />
                            {/* Amount input */}
                            <input
                                type="number"
                                name="amount"
                                value={row.amount || ""}
                                onChange={(e) => handleFundraisingStatusChange(index, "amount", e.target.value)}
                                className="w-1/2 p-3 border rounded-lg"
                                placeholder="Enter Amount"
                            />
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
