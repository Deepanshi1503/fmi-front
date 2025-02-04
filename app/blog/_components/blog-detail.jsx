export default function BlogDetail({ image, description }) {
    const formatDescription = (text) => {
      let withHeadings = text.replace(/### (.*?)\n/g, '<h3 class="text-[34px] font-semibold mt-4 mb-0">$1</h3>');
    
      let withParagraphs = withHeadings.replace(/\n\n/g, '</p><p class="text-[20px] text-[#181818CC] leading-[1.8]">');
    
      withParagraphs = withParagraphs.replace(/\n/g, '<br />');
  
      return `<p class="text-[20px] text-[#181818CC] leading-[1.8]">${withParagraphs}</p>`;
    };
  
    return (
      <div className="mx-12 my-16">
        <div className="flex justify-center w-full mb-10">
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image}`}
            alt="Blog Image"
            className="w-[67rem] h-auto rounded-[16px]"
          />
        </div>
    
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
  