import { formatDateTime } from "@/utils/dateAndTimeConvertHumanReadable";

export default function HeadingBox({ title, authors, category, issueDate }) {
    const authorNames = authors.data.map(author => `${author.attributes.first_name} ${author.attributes.last_name}`).join(", ");
    const categories = category.data.map(type => `${type.attributes.name}`).join(", ");

    return (
        <div className="bg-[#F5F5F5] mx-12 rounded-b-xl py-10">
            <div className="mx-20 flex=col">
                <h1 className="text-[#0A66C2] text-[42px]">{title}</h1>
                <p className="text-[#181818CC] text-[20px]">By : <span>{authorNames}</span></p>
                <p className="text-[#181818CC] text-[20px]">Category : <span>{categories}</span></p>
                <p className="text-[#181818CC] text-[20px]">Date : <span>{formatDateTime(issueDate)}</span></p>
            </div>
        </div>
    );
}
