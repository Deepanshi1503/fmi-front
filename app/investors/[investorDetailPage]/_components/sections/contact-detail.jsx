import React from "react";
import Image from "next/image";

const ContactSection = React.forwardRef(({ gmail, phoneNumber, location, city, country, website }, ref) => {
    return (
        <section id="contactSection" ref={ref} className="mb-8 p-4 border border-gray-200 rounded-[16px] bg-white">
            {/* Section Heading */}
            <h2 className="text-[28px] font-semibold mb-4">Contact Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email Address */}
                <div className="flex items-start space-x-4">
                    <Image
                        loading="lazy"
                        src="/images/imail.png"
                        className="mt-2"
                        alt="logo"
                        width={35}
                        height={77}
                    />
                    <div>
                        <p className="text-[16px] text-[#094277]">Gmail</p>
                        <p className="text-[16px] font-medium">
                            {gmail || "Not Available"}
                        </p>
                    </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-start space-x-4 ml-2">
                    <Image
                        loading="lazy"
                        src="/images/icall.png"
                        className="mt-2"
                        alt="logo"
                        width={25}
                        height={77}
                    />
                    <div>
                        <p className="text-[16px] text-[#094277]">Phone Number</p>
                        <p className="text-[16px] font-medium">
                            {phoneNumber || "Not Available"}
                        </p>
                    </div>
                </div>

                {/* Headquarters */}
                <div className="flex items-start space-x-4 ml-2">
                    <Image
                        loading="lazy"
                        src="/images/imappin.png"
                        className="mt-2"
                        alt="logo"
                        width={25}
                        height={77}
                    />
                    <div>
                        <p className="text-[16px] text-[#094277]">Location</p>
                        <p className="text-[16px] font-medium">
                            {location || city || country ? `${location || ''}${location && city ? ', ' : ''}${city || ''}${(location || city) && country ? ', ' : ''}${country || ''}` : "Not Available"}
                        </p>
                    </div>
                </div>

                {/* Website URL */}
                <div className="flex items-center space-x-4 ml-1">
                    <Image
                        loading="lazy"
                        src="/images/iwebsite.png"
                        className="mb-2"
                        alt="logo"
                        width={35}
                        height={77}
                    />
                    <div>
                        <p className="text-[16px] text-[#094277]">Website</p>
                        {website ? (
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[16px] font-medium text-blue-600 hover:underline"
                            >
                                {website}
                            </a>
                        ) : (
                            <p className="text-[16px] font-medium">Not Available</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default ContactSection;
