import React from "react";

export default function HeadingBox() {
  return (
    <div className="bg-[#F5F5F5] mx-12 rounded-b-xl">
      {/* Heading Section */}
      <div className="px-4 py-8 flex flex-col items-start justify-start ml-12">
        <h1 className="w-[60%] text-[72px] font-bold text-[#0A66C2] mb-2">
          Welcome to Investor List
        </h1>
        <p className="w-[45%] mt-2 text-[#181818] text-[20px]">
          Tap into an extensive network of investors, both local and global, ready to support
          your vision. Our platform simplifies fundraising by connecting you with the right
          partners to drive success.
        </p>
      </div>
    </div>
  );
}
