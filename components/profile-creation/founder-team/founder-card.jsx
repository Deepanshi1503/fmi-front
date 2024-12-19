import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const FounderCard = ({ founder, index, onEdit, onDelete }) => {
  return (
    <div
      key={index}
      className="rounded-lg shadow-md p-4 border-2 border-[#18181833] flex flex-col items-center text-center"
    >
      <div className="w-24 h-24 rounded-full border-2 border-[#18181833] overflow-hidden mb-4">
        {founder.profileImage ? (
          <img
            src={founder.profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-gray-300 w-full h-full flex items-center justify-center">
            <span className="text-white text-2xl">A</span>
          </div>
        )}
      </div>
      <h3 className="font-semibold text-lg text-[#404D61]">{founder.name}</h3>
      <h3 className="text-sm text-gray-500">{founder.role}</h3>
      <h3 className="text-sm text-gray-500">{founder.education}</h3>
      <a
        href={founder.linkedinProfile}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0A66C2] text-sm"
      >
        LinkedIn
      </a>

      {/* Edit and Delete Buttons */}
      <div className="mt-2 flex space-x-4">
        <button
          onClick={() => onEdit(index)}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg inline-flex items-center justify-center"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onDelete(index)}
          className="px-3 py-1 bg-red-500 text-white rounded-lg inline-flex items-center justify-center"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default FounderCard;
