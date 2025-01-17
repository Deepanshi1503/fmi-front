import React from "react";
import { MapPin, Check } from "lucide-react";

export default function HeadingBox({ image, title, location, company_type, funding_type}) {
  return (
    <div className="bg-[#F5F5F5] mx-12 rounded-b-xl mb-10 py-16">
      <div className="mx-64 flex">
        <img
          src={
            image ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${image}` : 
            "/images/fallback-image.png"}
          alt="business Logo"
          className="w-[267px] h-[243px] rounded-[16px] object-cover"
        />
        <div className="ml-20 mt-2 flex flex-col gap-y-4">
          <p className="text-[48px] text-[#0A66C2] font-bold mb-0">{title}</p>
          <h6 className="text-[20px] flex items-center mb-0 mt-2"> <MapPin color="#0A66C2" size={20} className="mr-1"/> {location}</h6>
          <h6 className="text-[20px] font-thin mb-0">Company Name: <span className="font-medium">{company_type}</span></h6>
          <h6 className="text-[20px] font-thin mb-0">Funding Type: <span className="font-medium">{funding_type}</span></h6>
          <button className="bg-[#0A66C2] px-4 py-2 text-white flex w-[50%] mt-6 rounded-[16px] text-[18px] font-semibold items-center">Interested <Check size={20} className="ml-2" strokeWidth={4}/></button>
        </div>
      </div>
    </div>
  );
}
