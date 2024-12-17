"use client";

const FounderForm = () => {
  return (
    <div className="mx-12">
      <form className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="founder-name" className="block text-left text-[#404D61] font-medium text-[18px]">
            Name
          </label>
          <input
            id="founder-name"
            type="text"
            placeholder="Founder's Name"
            className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
          />
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="founder-email" className="block text-left text-[#404D61] font-medium text-[18px]">
            Email ID
          </label>
          <input
            id="founder-email"
            type="email"
            placeholder="founder@example.com"
            className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="founder-phone" className="block text-[#404D61] font-medium text-left text-[18px]">
            Phone Number
          </label>
          <input
            id="founder-phone"
            type="tel"
            placeholder="0123456789"
            className="w-full p-2 rounded-lg border border-[#E1E3E6] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
          />
        </div>
      </form>
    </div>
  );
};

export default FounderForm;
