// components/steps/FounderTeam.jsx
"use client";

const FounderTeam = () => {
  return (
    <div>
      <h3>Founder & Team</h3>
      <p>Provide information about your founding members, their experience, and key roles.</p>
      <form className="p-4 mt-2 bg-gray-100 rounded">
        <input type="text" placeholder="Founder's Name" className="w-full mt-2 p-2" />
        <input type="text" placeholder="Position" className="w-full mt-2 p-2" />
        <input type="email" placeholder="Contact Email" className="w-full mt-2 p-2" />
      </form>
    </div>
  );
};

export default FounderTeam;
