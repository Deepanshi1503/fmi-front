"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginForm({ onNextStep }) {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!email || !phoneNumber) {
      alert("Both email and phone number are required.");
      return;
    }

    try {
      // const response = await fetch("/api/send-otp", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, phone_number: phoneNumber }),
      // });

      // const result = await response.json();

      // if (response.ok) {
      //   alert(result.message);
      //   setStep("verify-otp");  // Move to OTP step
      // } else {
      //   alert(result.error);
      // }
      onNextStep(phoneNumber, email);
    } catch (err) {
      console.error(err);
      alert("Internal server error. Please try again.");
    }
  };

  return (
    <div className="relative w-full lg:w-1/2 p-8 flex items-center justify-center overflow-hidden">
      {/* Decorative Circles */}
      <div className="hidden lg:block absolute w-96 h-96 bg-gradient-to-br from-[#DDEAFC] to-[#4D8FD7] rounded-full -bottom-48 -left-48 opacity-40"></div>
      <div className="hidden lg:block absolute w-96 h-96 bg-gradient-to-br from-[#DDEAFC] to-[#4D8FD7] rounded-full -top-48 -right-48 opacity-40"></div>
        <div className="lg:w-[50%] p-6 z-10 relative">
          <Image src="/images/logo.png" width={145} height={61} alt="logo" className="mx-auto mb-2" />
          
          <h2 className="text-[#525252] text-[36px] font-medium mb-2">
            Login to Your Account
          </h2>
          <p className="text-[#525252] text-[16px] mb-6">
            Access your business insights.
          </p>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-md border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full p-3 rounded-md border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#0966C3] text-white font-semibold text-[18px] p-3 rounded-md mt-6 hover:bg-blue-600"
            >
              Login
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-4 text-center whitespace-nowrap">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-blue-500 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
    </div>
  );
}
