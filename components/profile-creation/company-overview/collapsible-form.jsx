import { ChevronDown, ChevronUp } from "lucide-react";

const CollapsibleForm = ({ step, isFormOpen, handleToggleForm, index }) => {
  return (
    <div key={index} className={`mb-16 bg-[#f9f9f9] rounded-[16px] ${isFormOpen[index] ? "" : ""}`}>
      <div
        className={`flex items-center p-3 border cursor-pointer ${isFormOpen[index]
          ? "bg-white border-2 border-[#18181833] rounded-t-[16px] rounded-b-none"
          : "bg-white rounded-[16px] shadow-md"
          }`}
        onClick={() => handleToggleForm(index)}
      >
        {step.image && (
          <img
            src={step.image}
            alt={`${step.name} illustration`}
            className="2xl:w-[38px] 2xl:h-[38px] w-[30px] h-[30px] rounded"
          />
        )}
        <div className="justify-between w-full items-center flex">
          <h2 className="font-normal text-left text-[18px] 2xl:text-[28px] ml-3 text-[#181818]">
            {step.name}
          </h2>
          <div>
            {isFormOpen[index] ? (
              <ChevronUp className="w-8 h-8 text-blue-500" />
            ) : (
              <ChevronDown className="w-8 h-8 text-gray-500" />
            )}
          </div>
        </div>
      </div>

      {isFormOpen[index] && (
        <div className="p-4 border rounded-b-[16px] bg-white mt-1">
          <step.formComponent />
        </div>
      )}
    </div>
  );
};

export default CollapsibleForm;
