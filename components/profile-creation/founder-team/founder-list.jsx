import React from "react";
import FounderCard from "./founder-card";

const FounderList = ({ founders, onEdit, onDelete }) => {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
      {founders?.map((founder, index) => (
        <FounderCard
          key={index}
          founder={founder}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default FounderList;
