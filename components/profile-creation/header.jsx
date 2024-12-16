"use client";
import Image from "next/image";
import { useState } from "react";
import { Sun, Menu, Search } from "lucide-react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Implement theme change logic if necessary
  };

  return (
    <header className="bg-[#0B66C3] text-white w-full">
      <div className="flex items-center justify-between px-6 mr-4 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Image
            src="/images/logo2.png"
            alt="Logo"
            width={200}
            height={100}
          />
          {/* Hamburger Menu */}
          <button className="p-2 rounded-md hover:bg-[#094BA1]">
            <Menu size={32} />
          </button>
          {/* Search Bar */}
          <div className="flex items-center text-white">
            <Search size={26} className="mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-white mt-1 placeholder-white focus:outline-none"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-[#094BA1]"
          >
            <Sun size={32} fill="white"/>
          </button>
          {/* Mail */}
          <div className="relative">
            <Image
              src="/images/mail-open.png"
              alt="Mail"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          {/* Profile */}
          <div className="relative w-8 h-8">
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
