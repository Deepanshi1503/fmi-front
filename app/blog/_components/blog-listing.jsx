import Link from "next/link";
import Image from "next/image";
import { formatDateTime } from "@/utils/dateAndTimeConvertHumanReadable";

export default function BlogListing({ blogData }) {
    return (
        <section className="container mx-14 py-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                {blogData.map((blog) => (
                    <div key={blog.id} className="relative overflow-hidden rounded-[16px] group transition-all duration-300 border-[2px] border-grey-500 flex flex-col h-full">
                        <div className="h-52 overflow-hidden">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${blog?.attributes?.cover_image?.data?.attributes?.url}`}
                                alt={blog.title}
                                width={500}
                                height={300}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-[24px] text-[#181818] font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                                {blog.attributes.title}
                            </h3>
                            <p className="text-[16px] text-[#18181899] mb-4 flex-grow">Category - <span className="text-[#181818]">{blog?.attributes?.industries?.data[0]?.attributes?.name}</span> </p>
                            {/* Date and Read More Button in the same row */}
                            <div className="flex items-center justify-between cursor-pointer">
                                <span className="text-gray-600">{formatDateTime(blog?.attributes?.createdAt)}</span>
                                <Link href={`/blog/${blog.id}-${blog.attributes.blog_slug}`} className="flex items-center bg-black text-white text-sm px-4 py-2 rounded-2xl transition-all duration-300 group-hover:bg-blue-600">
                                    Read More
                                    <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:rotate-45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7.146 16.217a.75.75 0 0 1 0-1.061l8.5-8.5a.75.75 0 1 1 1.061 1.06l-8.5 8.5a.75.75 0 0 1-1.06 0z" />
                                        <path d="M6.427 7.186a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0v-8.25h-8.25a.75.75 0 0 1-.75-.75" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
