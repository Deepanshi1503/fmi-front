"use client";
import Image from "next/image";
import { useState } from "react";
import { Sun, Menu, Search } from "lucide-react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
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
            className="block w-28 h-auto md:w-40 lg:w-48"
            width={0} // Let Tailwind handle width
            height={0} // Let Tailwind handle height
            sizes="(max-width: 768px) 7rem, (max-width: 1024px) 10rem, 12rem"
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
        <div className="flex items-center gap-3 md:gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-[#094BA1]"
          >
            <Sun size={26} fill="white" />
          </button>

          {/* Mail */}
          <div className="relative hidden md:block">
            <Image
              src="/images/mail-open.png"
              alt="Mail"
              width={26}
              height={26}
              className="rounded-full"
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
