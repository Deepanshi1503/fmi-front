"use client"
import { useState } from "react";
import SignupForm from "@/components/authentication/signup-form";
import VerifyOtpForm from "@/components/authentication/verify-otp";

export default function SignUp() {
  const [step, setStep] = useState("signup"); // Can be "signup" or "verify-otp"
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="flex h-screen">
      {/* Left Image */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center relative z-10"
        style={{ backgroundImage: "url('/images/signup.jpg')" }}
      ></div>

      {/* Right Form Section */}
      {step === "signup" ? (
        <SignupForm onNextStep={(phone) => { console.log("Switching to verify-otp step with phone:", phone); setPhoneNumber(phone); setStep("verify-otp"); }} />
      ) : (
        <VerifyOtpForm phoneNumber={phoneNumber} />
      )}
    </div>
  );
}
