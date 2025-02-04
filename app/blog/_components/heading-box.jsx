import { MapPin, Check } from "lucide-react";

export default function HeadingBox({ image, title, location, city, country, investor_type, funding_type}) {
  return (
    <div className="bg-[#F5F5F5] mx-12 rounded-b-xl mb-10 py-16">
      <div className="mx-64 flex=col">
        <h1 className="text-[#0A66C2] text-[72px]">Blog</h1>
        <p className="text-[20px] text-[#181818] mt-4">Find My Investor is a cutting-edge platform designed to simplify and amplify fund</p>
      </div>
    </div>
  );
}
