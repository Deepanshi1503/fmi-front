import React from 'react'

export default function PrivacyPolicy() {
    return (
        <div>
            <header class="bg-[#0a66c2] padding2">
                <div class="container">
                    <h1 class="text-[#ffffff]">Privacy Policy</h1>
                </div>
            </header>

            <section className="padding2">
                <div className="container">
                    {/* Introduction Section */}
                    <div className="bg-white rounded-lg">
                        <h2 className="xl:text-[34px] mb-2">Introduction</h2>
                        <p className="mb-4">
                            Welcome to our Privacy Policy. Your privacy is critically important to us. We are committed to protecting the personal information you share with us. This page outlines how we collect, use, and protect your information while ensuring transparency.
                        </p>
                        <p>
                            By using our services, you agree to the practices described in this Privacy Policy. We recommend that you review this document regularly to stay informed about updates.
                        </p>
                    </div>

                    {/* Information We Collect Section */}
                    <div className="bg-white rounded-lg mt-8">
                        <h2 className="xl:text-[34px] mb-2">Information We Collect</h2>
                        <h3 className="xl:text-[24px] mb-2">When you sign up or contact us</h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Personal data, such as name, email address, and phone number, when you register for our services.</li>
                            <li>Details provided through surveys or feedback forms.</li>
                            <li>Communications via email or support tickets.</li>
                        </ul>
                    </div>

                    {/* How We Use Your Information Section */}
                    <div className="bg-white rounded-lg mt-8">
                        <h2 className="xl:text-[34px] mb-2">How We Use Your Information</h2>
                        <p className="mb-4">
                            The information we collect is used to provide and improve our services. This includes personalizing your experience, responding to your inquiries, and ensuring the security of our platform.
                        </p>
                        <p>
                            We also use your information to analyze website traffic, maintain our infrastructure, and communicate important updates or promotional content. You can opt out of receiving marketing communications at any time.
                        </p>
                    </div>

                    {/* Data Retention Section */}
                    <div className="bg-white rounded-lg mt-8">
                        <h2 className="xl:text-[34px] mb-2">Data Retention</h2>
                        <p className="mb-4">
                            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy. This includes complying with legal obligations, resolving disputes, and enforcing our agreements.
                        </p>
                        <p>
                            Transaction records may be maintained for a minimum of 7 years for tax and legal purposes. Cookies and analytics data are typically stored for a maximum of 2 years unless otherwise specified.
                        </p>
                    </div>

                    {/* Your Rights Section */}
                    <div className="bg-white rounded-lg mt-8">
                        <h2 className="xl:text-[34px] mb-2">Your Rights</h2>
                        <p className="mb-4">
                            As a user, you have rights regarding your personal data. You can request access to your data, update inaccuracies, and even request the deletion of your data, subject to legal obligations.
                        </p>
                        <p>
                            If you have concerns about how your information is being used, you can contact our support team for assistance.
                        </p>
                    </div>
                </div>
            </section>



        </div>
    )
}
