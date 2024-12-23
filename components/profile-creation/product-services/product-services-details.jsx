"use client"
import React, { useState } from "react";

const ProductServiceForm = ({ data, setData }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
  });

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="form-container mx-auto px-4 w-full">
      <form className="space-y-4">
        {/* Product/Service Name */}
        <div className="form-group mb-4">
          <label htmlFor="productName" className="block mb-3 text-[16px] text-left font-medium">
            Product/Service Name*
          </label>
          <input
            type="text"
            name="productName"
            id="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Enter the name of your product or service"
            required
          />
        </div>

        {/* Product/Service Description */}
        <div className="form-group mb-4">
          <label htmlFor="productDescription" className="block mb-3 text-[16px] text-left font-medium">
            Product/Service Description*
          </label>
          <textarea
            name="productDescription"
            id="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
            placeholder="Brief description of the product/service and what it does"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default ProductServiceForm;