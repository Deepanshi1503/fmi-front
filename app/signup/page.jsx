// "use client"
// import { useState } from "react";
import SignupForm from "@/components/authentication/signup-form";
import { GlobalContextProvider } from "@/context/context";
// import VerifyOtpForm from "@/components/authentication/verify-otp";

export default function SignUp() {
  // const [step, setStep] = useState("signup");
  // const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <GlobalContextProvider>
      <div className="flex h-screen">
        {/* Left Image */}
        <div
          className="hidden lg:block w-1/2 bg-cover bg-center relative z-10"
          style={{ backgroundImage: "url('/images/signup.jpg')" }}
        ></div>

        {/* Right Form Section */}
        <SignupForm />
      </div>
    </GlobalContextProvider>
  );
}
