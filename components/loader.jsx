import React from "react";

const Loader = () => {
  return (
    <div className=" inset-0 flex flex-col justify-center items-center min-h-screen z-50 pointer-events-none">
      <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-black font-semibold text-lg">Loading...</p>
    </div>
  );
};

export default Loader;
