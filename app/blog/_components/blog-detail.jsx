export default function BlogDetail({ image, description }) {
  const formatDescription = (text) => {
    if (!text || text.trim() === "") {
      return `<p class="text-[20px] text-gray-500 italic text-center">No description available.</p>`;
    }

    // Split text into lines
    let lines = text.split("\n");

    // Process each line
    let formattedText = lines
      .map((line) => {
        if (line.startsWith("### ")) {
          // Convert '###' to <h3> headings
          return `<h3 class="text-[34px] font-semibold mt-6 mb-2">${line.replace("### ", "")}</h3>`;
        } else if (line.trim() !== "") {
          // Wrap non-empty lines in <p> tags
          return `<p class="text-[20px] text-[#181818CC] leading-[1.8] mt-2">${line}</p>`;
        }
        return ""; // Ignore empty lines
      })
      .join("");

    return formattedText;
  };

  return (
    <div className="mx-12 my-16">
      {/* Blog Image */}
      <div className="flex justify-center w-full mb-10">
        <img
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image}`}
          alt="Blog Image"
          className="w-[67rem] h-auto rounded-[16px] shadow-lg"
        />
      </div>

      {/* Blog Content */}
      <div className="mx-auto max-w-[67rem]">
        <div
          dangerouslySetInnerHTML={{
            __html: formatDescription(description),
          }}
        />
      </div>
    </div>
  );
}
