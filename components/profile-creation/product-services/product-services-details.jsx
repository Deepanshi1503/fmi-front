"use client";

import React, { useState, useEffect } from "react";

const ProductServiceForm = ({onCompletion}) => {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    revenueModel: "",
    currentStatus: "",
  });

  const [options, setOptions] = useState({
    revenueModels: [],
    currentStatuses: [],
  });

  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Load saved items from localStorage on mount
  useEffect(() => {
    const combineInfo = JSON.parse(localStorage.getItem("combineInfo")) || {};
    const savedItems = combineInfo.productServiceData || [];
    setItems(Array.isArray(savedItems) ? savedItems : []);
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    const combineInfo = JSON.parse(localStorage.getItem("combineInfo")) || {};
    combineInfo.productServiceData = items; // Update only productServiceData
    localStorage.setItem("combineInfo", JSON.stringify(combineInfo));
    if (onCompletion) {
      onCompletion(items.length > 0);
    }
  }, [items]);

  // Fetch the options from the backend when the component mounts
  useEffect(() => {
    // Fetch product details schema
    const fetchOptions = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/content-type-builder/components/form.product-detail");
        const data = await response.json();

        // Extract options for revenueModel and currentStatus
        const revenueModels = data.data.schema.attributes.revenue_model.enum || [];
        const currentStatuses = data.data.schema.attributes.current_status.enum || [];

        // Set the options in state
        setOptions({
          revenueModels,
          currentStatuses,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOptions();
  }, []);

  // Populate form fields when editIndex changes
  useEffect(() => {
    if (editIndex !== null) {
      setFormData(items[editIndex]);
    }
  }, [editIndex, items]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Update existing item
      const updatedItems = [...items];
      updatedItems[editIndex] = formData;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      // Add new item
      setItems((prev) => [formData, ...prev]);
    }

    setFormData({
      productName: "",
      productDescription: "",
      revenueModel: "",
      currentStatus: "",
    });

    // Close modal after submission
    setShowModal(false);
  };

  // Handle Edit
  const handleEdit = (index) => {
    setEditIndex(index);
    setShowModal(true);
  };

  // Handle Delete
  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="form-container mx-auto px-4 w-full">
      {/* Display Added Items Above Button */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Added Items</h3>
        {items.length === 0 ? (
          <p className="text-gray-500">No items added yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {items.map((item, index) => (
              <div key={index} className="p-6 bg-white shadow-lg rounded-lg flex flex-col justify-between items-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                <div className="flex flex-col text-center">
                  <h4 className="text-xl font-semibold text-[#0A66C2]">{item.productName}</h4>
                  <p className="text-gray-600 mt-2">{item.productDescription}</p>
                  <p className="text-gray-600 mt-1 font-medium">{item.revenueModel}</p>
                  <p className="text-gray-600 mt-1 italic">{item.currentStatus}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Product/Service Button */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full p-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 mt-6"
      >
        Add Product/Service
      </button>

      {/* Modal for Form */}
      {showModal && (
        <div className="fixed inset-0 mt-36 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-[16px] w-1/3 z-20 relative">
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                  placeholder="Brief description of the product/service"
                  required
                />
              </div>

              {/* Revenue Model */}
              <div className="form-group mb-4">
                <label htmlFor="revenueModel" className="block mb-3 text-[16px] text-left font-medium">
                  Revenue Model*
                </label>
                <select
                  name="revenueModel"
                  id="revenueModel"
                  value={formData.revenueModel}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Revenue Model</option>
                  {options.revenueModels.map((model, index) => (
                    <option key={index} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current Status */}
              <div className="form-group mb-4">
                <label htmlFor="currentStatus" className="block mb-3 text-[16px] text-left font-medium">
                  Current Status*
                </label>
                <select
                  name="currentStatus"
                  id="currentStatus"
                  value={formData.currentStatus}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Current Status</option>
                  {options.currentStatuses.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full p-3 text-gray-600 bg-gray-100 font-medium rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full p-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
                >
                  {editIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductServiceForm;
