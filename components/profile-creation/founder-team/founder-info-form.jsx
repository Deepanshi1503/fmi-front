"use client";

const FounderForm = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Founder Details</h3>
      <form>
        <input
          type="text"
          placeholder="Founder's Name"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default FounderForm;
