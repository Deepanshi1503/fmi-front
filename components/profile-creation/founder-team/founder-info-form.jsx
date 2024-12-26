import React, { useState } from "react";
import {useGlobalContext} from "@/context/context"
import FounderFormModal from "./founder-form-modal";
import FounderList from "./founder-list";

const FounderForm = ({data, setData, title}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup visibility state
  const [editingItem, setEditingItem] = useState(null); // Founder being edited

  const handleAddItem = (formData) => {
    
    if (editingItem !== null) {
      // Update the founder if editing
      const updatedData = [...data];
      updatedData[editingItem.index] = formData;
      setData(updatedData);
      setEditingItem(null);
    } else {
      // Add a new founder
      setData([...data, formData]);
    }
    setIsPopupOpen(false);
  };

  const handleEdit = (index) => {
    setEditingItem({ index, data: data[index] });
    setIsPopupOpen(true);
  };

  const handleDelete = (index) => {
    const updatedFounders = data.filter((_, i) => i !== index);
    setData(updatedFounders);
  };

  return (
    <div className="xl:mx-12 relative">
      <FounderList
        founders={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <button
        type="button"
        onClick={() => setIsPopupOpen(true)}
        className={`${data.length > 0 ? "mt-8" : ""} px-4 font-medium py-2 bg-[#0B66C3] text-white rounded-[16px] text-[12px] 2xl:text-[18px]`}
      >
        + Add a {title.toLowerCase()}
      </button>

      {/* Popup Modal */}
      <FounderFormModal
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleAddItem}
        editingFounder={editingItem ? editingItem.data : null}
      />
    </div>
  );
};

export default FounderForm;
