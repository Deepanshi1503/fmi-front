"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useGlobalContext } from "@/context/context";

export default function VerifyOtpForm() {
  const { phoneNumber } = useGlobalContext();
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Handle timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [resendTimer]);

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // Only allow numeric input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to the next input box
    if (value && index < 4) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phoneNumber, otp: enteredOtp }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("OTP verified successfully!");
        // Redirect or further actions
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResendOtp = () => {
    setIsResendDisabled(true);
    setResendTimer(30);

    // Call API to resend OTP
    fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number: phoneNumber }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert("OTP resent successfully!");
        } else {
          alert("Failed to resend OTP. Try again later.");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="relative w-full lg:w-1/2 p-8 flex items-center justify-center overflow-hidden">
      {/* Decorative Circles */}
      <div className="hidden lg:block absolute w-96 h-96 bg-gradient-to-br from-[#DDEAFC] to-[#4D8FD7] rounded-full -bottom-48 -left-48 opacity-40"></div>
      <div className="hidden lg:block absolute w-96 h-96 bg-gradient-to-br from-[#DDEAFC] to-[#4D8FD7] rounded-full -top-48 -right-48 opacity-40"></div>

      <div className="lg:w-[50%] p-6 z-10 relative">
        <Image
          src="/images/logo.png"
          width={145}
          height={61}
          alt="logo"
          className="mx-auto mb-6"
        />
        <h2 className="text-[#525252] text-[36px] font-medium mb-2">
          Verify OTP
        </h2>
        <p className="text-[#525252] whitespace-nowrap text-[16px] mb-6">
          Enter the OTP sent to your phone number: {phoneNumber}
        </p>

        {/* OTP Form */}
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResendDisabled}
              className={`p-2 text-blue-500 text-[16px] font-medium ${
                isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Resend OTP
            </button>
            <span className="text-gray-500 text-[16px]">
              {isResendDisabled && `Resend available in ${resendTimer}s`}
            </span>
          </div>

          <button
            type="submit"
            className="w-full text-[18px] font-semibold bg-[#0966C3] text-white p-3 rounded-md mt-6 hover:bg-blue-600"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
