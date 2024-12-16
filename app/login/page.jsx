// app/login/page.jsx
"use client";
import { useState } from "react";
import LoginForm from "@/components/authentication/login-form";
import VerifyOtpForm from "@/components/authentication/verify-otp";

export default function LoginPage() {
  const [step, setStep] = useState("login"); // "login" or "verify-otp"
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="flex h-screen">
      {/* Left Image */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center relative z-10"
        style={{ backgroundImage: "url('/images/signup.jpg')" }}
      ></div>

      {/* Right Form Section */}
      {step === "login" ? (
        <LoginForm
          onNextStep={(phone, userEmail) => {
            console.log("Switching to verify-otp step with phone:", phone);
            setPhoneNumber(phone);
            setEmail(userEmail);
            setStep("verify-otp");
          }}
        />
      ) : (
        <VerifyOtpForm phoneNumber={phoneNumber} email={email} />
      )}
    </div>
  );
}
