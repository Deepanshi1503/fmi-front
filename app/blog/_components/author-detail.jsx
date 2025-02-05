export default function AuthorDetail({ authorData }) {
    if (!authorData || authorData.length === 0) return null;
  
    const author = authorData[0].attributes;
  
    return (
      <div className="flex justify-center my-16">
        <div className="bg-[#F9F7F7] rounded-[16px] p-6 flex items-center gap-6 w-[40rem]">
          {/* Author Image */}
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${author.profile_image.data.attributes.url}`} 
            alt={`${author.first_name} ${author.last_name}`}
            className="w-[240px] h-[240px] rounded-lg object-cover"
          />
  
          {/* Author Info */}
          <div className="flex flex-col justify-center">
            <h3 className="text-[20px] font-semibold">{`${author.first_name} ${author.last_name}`}</h3>
            <h3 className="text-[16px] font-medium">{`Experience -  ${author.experience}`}</h3>
            <p className="text-[#181818CC] text-[16px]">
              {author.author_description}
            </p>
          </div>
        </div>
      </div>
    );
  }
  