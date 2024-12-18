"use client";
import Image from "next/image";
import { useState } from "react";
import { Sun, Menu, Search } from "lucide-react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#0B66C3] text-white w-full">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Image
            src="/images/logo2.png"
            alt="Logo"
            width={150}
            height={60}
            className="hidden md:block"
          />

          {/* Hamburger Menu - visible only on small screens */}
          <button
            className="p-2 rounded-md md:hidden hover:bg-[#094BA1]"
            onClick={toggleMenu}
          >
            <Menu size={32} />
          </button>

          {/* Search Bar */}
          <div className="flex items-center text-white hidden md:flex">
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
            <Sun size={32} fill="white" />
          </button>

          {/* Mail */}
          <div className="relative hidden md:block">
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

      {/* Mobile Menu - Sidebar */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-black fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center pt-10">
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-3xl">
            ✖️
          </button>
          <button onClick={() => alert("Navigate to Home")} className="mt-4">
            Home
          </button>
          <button onClick={() => alert("Navigate to Search")} className="mt-4">
            Search
          </button>
          <button onClick={toggleTheme} className="mt-4">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </header>
  );
}
