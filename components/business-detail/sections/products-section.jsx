import React, { useState } from "react";

const ProductSection = React.forwardRef(({ business }, ref) => {
    const [showMore, setShowMore] = useState(false);

    const { product_services_detail } = business || {};

    return (
        <section id="products" ref={ref} className="mb-8 border border-gray-200 rounded-[16px] bg-white">
            {/* Section Heading */}
            <div className="px-4 pt-4">
            <p className="text-[28px] font-semibold mb-3">Product & Services</p>

            {/* Product Details */}
            {product_services_detail?.slice(0, showMore ? product_services_detail.length : 1).map((product) => (
                <div key={product.id} className="mb-2 border-b-[2px]">
                    <h3 className="text-[24px] font-medium mb-2 text-[#181818CC]">{product.product_name}</h3>
                    <p className="text-[20px] text-[#181818CC] mb-3">{product.product_description}</p>
                    <p className="text-[20px] font-normmal">
                        <span className="text-[#181818CC] font-medium text-[20px]">Revenue Model - </span>
                        {product.revenue_model || "Not Specified"}
                    </p>
                    <p className="text-[20px] font-normmal">
                        <span className="text-[#181818CC] font-medium text-[20px]">Current Status - </span>
                        {product.current_status || "Not Specified"}
                    </p>
                </div>
            ))}
            </div>

            {/* Show More Button */}
            {product_services_detail?.length > 1 && (
                <button
                    onClick={() => setShowMore((prev) => !prev)}
                    className="text-[#0A2FC2] text-[18px] py-2  hover:underline focus:outline-none bg-[#F5F5F5] rounded-b-[16px] w-full"
                >
                    {showMore ? "Show less" : "Show more"}
                </button>
            )}
        </section>
    );
});

export default ProductSection;
