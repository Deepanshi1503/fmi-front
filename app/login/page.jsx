// app/login/page.jsx
import LoginForm from "@/components/authentication/login-form";
import { GlobalContextProvider } from "@/context/context";

export default function LoginPage() {
  return (
    <GlobalContextProvider>
      <div className="flex h-screen">
        {/* Left Image */}
        <div
          className="hidden lg:block w-1/2 bg-cover bg-center relative z-10"
          style={{ backgroundImage: "url('/images/signup.jpg')" }}
        ></div>

        {/* Right Form Section */}
          <LoginForm/>
      </div>
    </GlobalContextProvider>
  );
}
