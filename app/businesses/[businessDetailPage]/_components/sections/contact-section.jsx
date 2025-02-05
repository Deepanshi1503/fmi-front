import React from "react";
import Image from "next/image";

const ContactSection = React.forwardRef(({ business }, ref) => {
    const { professional_emailid, phone_number, headquarters, website_url } = business;

    return (
        <section id="contactDetails" ref={ref} className="mb-8 p-4 border border-gray-200 rounded-[16px] bg-white">
            {/* Section Heading */}
            <h2 className="text-[28px] font-semibold mb-4">Contact Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email Address */}
                <div className="flex items-start space-x-4">
                    <Image
                        loading="lazy"
                        src="/images/bDetailsMail.png"
                        className="mt-2"
                        alt="logo"
                        width={35}
                        height={77}
                    />
                    <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="text-[16px] font-medium">
                            {professional_emailid || "Not Available"}
                        </p>
                    </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-start space-x-4 ml-2">
                    <Image
                        loading="lazy"
                        src="/images/bDetailsPhone.png"
                        className="mt-2"
                        alt="logo"
                        width={25}
                        height={77}
                    />
                    <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="text-[16px] font-medium">
                            {phone_number || "Not Available"}
                        </p>
                    </div>
                </div>

                {/* Headquarters */}
                <div className="flex items-start space-x-4 ml-2">
                    <Image
                        loading="lazy"
                        src="/images/bDetailsLocations.png"
                        className="mt-2"
                        alt="logo"
                        width={25}
                        height={77}
                    />
                    <div>
                        <p className="text-sm text-gray-500">Headquarters</p>
                        <p className="text-[16px] font-medium">
                            {headquarters || "Not Available"}
                        </p>
                    </div>
                </div>

                {/* Website URL */}
                <div className="flex items-center space-x-4 ml-1">
                    <Image
                        loading="lazy"
                        src="/images/bDetailsWeb.png"
                        className="mb-2"
                        alt="logo"
                        width={35}
                        height={77}
                    />
                    <div>
                        <p className="text-sm text-gray-500">Website</p>
                        {website_url ? (
                            <a
                                href={website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[16px] font-medium text-blue-600 hover:underline"
                            >
                                {website_url}
                            </a>
                        ) : (
                            <p className="text-[16px] font-medium">{website_url || "Not Available"}</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default ContactSection;
