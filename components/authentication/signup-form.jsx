"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/context";
import VerifyOtpForm from "./verify-otp";

export default function SignupForm() {
  const { setPhoneNumber, setEmail, name, email, phoneNumber, setName, step, setStep } = useGlobalContext();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      alert("Phone number is required.");
      return;
    }

    setStep("verify-otp");
    console.log(step);
  };

  if (step === "verify-otp") {
    return <VerifyOtpForm />; // Render VerifyOtpForm if step is 'verify-otp'
  }

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
          className="mx-auto mb-2"
        />
        <h2 className="text-[#525252] whitespace-nowrap lg:text-[36px] md:text-[20px] sm:text-[12px] font-medium mb-2">
          Create Your Account
        </h2>
        <p className="text-[#525252] whitespace-nowrap text-[16px] mb-6">
          See what&apos;s going on with your business.
        </p>

        {/* Sign-Up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Deepanshi Singhal"
              className="w-full p-3 rounded-md border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="deepanshi@gmail.com"
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
              placeholder="0123456789"
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
            Request OTP
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center whitespace-nowrap">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
