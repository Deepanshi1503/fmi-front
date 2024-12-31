"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Sun, Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation"; // Import to get the current URL path

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInvestor, setIsInvestor] = useState(false); // State to toggle text
  const pathname = usePathname(); // Get current URL path

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Toggle between Investor and Business
  const toggleInvestorBusiness = () => {
    setIsInvestor(!isInvestor);
  };

  return (
    <header className="bg-[#0B66C3] text-white w-full">
      <div className="flex items-center justify-between px-4 py-2 md:px-6 md:py-3">
        {/* Left Section */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Logo */}
          <Image
            src="/images/logo2.png"
            alt="Logo"
            className="hidden lg:block w-28 h-auto md:w-40 lg:w-48"
            width={0} // Let Tailwind handle width
            height={0} // Let Tailwind handle height
            sizes="(max-width: 768px) 7rem, (max-width: 1024px) 10rem, 12rem"
            priority
          />

          {/* Hamburger Menu - visible on all screen sizes */}
          <button className="p-2 rounded-md hover:bg-[#094BA1]">
            <Menu size={26} />
          </button>

          {/* Search Bar */}
          <div className="flex items-center text-white">
            <Search size={22} className="mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="hidden md:block bg-transparent text-white placeholder-white focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-x-8 lg:mr-6">
          {/* Conditionally render toggle button on '/dashboard' path */}
          {pathname === '/dashboard' && (
            <button
              onClick={toggleInvestorBusiness}
              className="bg-white text-[#0A66C2] text-[14px] whitespace-nowrap hidden lg:block px-4 py-2.5 rounded-xl"
            >
              {isInvestor ? 'Switch to Business' : 'Switch to Investor'}
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-md hover:bg-[#094BA1]"
          >
            <Image
              src="/images/toggle-theme.png"
              alt="theme"
              width={30}
              height={30}
              className="rounded-full"
            />
          </button>

          {/* Mail */}
          <div className="relative hidden md:block">
            <Image
              src="/images/mail-open.png"
              alt="Mail"
              width={30}
              height={30}
              className=""
            />
          </div>

          {/* Profile */}
          <div className="relative w-6 h-6 md:w-8 md:h-8">
            <Image
              src="/images/user-image.png"
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
