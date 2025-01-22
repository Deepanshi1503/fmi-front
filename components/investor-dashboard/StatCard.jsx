import React, {useState, useEffect} from "react";

const StatCard = ({ title, value, percentage, text, positive, image }) => {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        let startValue = 0;
        const increment = value / 100; // Determines the step size
        const interval = setInterval(() => {
            startValue += increment;
            if (startValue >= value) {
                clearInterval(interval);
                startValue = value; // Ensure it stops exactly at the target
            }
            setAnimatedValue(Math.round(startValue));
        }, 10); // Updates every 10ms for smooth animation

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [value]);

    return (
        <div className="bg-white shadow-md px-4 py-4 rounded-lg ">
            <div className="flex  justify-between">
                {/* Left Section */}
                <div>
                    <h3 className="text-[16px] text-[#202224] font-normal mb-6">{title}</h3>
                    <p className="text-[28px] font-semibold text-[#202224]">{animatedValue}</p>
                </div>

                {/* Right Section */}
                {image && (
                    <img
                        src={image}
                        alt="Main Image"
                        className="w-16 h-16"
                        style={{ objectFit: "contain" }}
                    />
                )}
            </div>
            <div className="flex items-center mt-2">
                <span
                    className={`text-[16px] flex items-center ${positive ? "text-green-500" : "text-red-500"
                        }`}
                >
                    <img
                        src={positive ? "/images/increasing-arrow.png" : "/images/decreasing-arrow.png"}
                        alt={positive ? "Up Arrow" : "Down Arrow"}
                        className="w-4 h-3 mr-2"
                    />
                    {percentage}%
                </span>
                <span className="ml-2 text-[16px] text-gray-500">{text}</span>
            </div>
        </div>
    );
};

export default StatCard;
