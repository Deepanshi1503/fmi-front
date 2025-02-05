"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

export default function SimilarBlogs({ blogs }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                setCanScrollLeft(scrollRef.current.scrollLeft > 0);
                setCanScrollRight(
                    scrollRef.current.scrollLeft + scrollRef.current.clientWidth <
                    scrollRef.current.scrollWidth
                );
            }
        };

        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            handleScroll();
        }

        return () => container?.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
        }
    };

    return (
        <div className="my-16 px-12 relative">
            <h2 className="text-[42px] font-medium text-center mb-12">Further Reading...</h2>

            {/* Left Scroll Button */}
            {canScrollLeft && (
                <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-3 shadow-md rounded-full z-10 hidden md:block"
                    onClick={scrollLeft}
                >
                    ❮
                </button>
            )}

            {/* Blog Cards Container */}
            <div className="overflow-hidden px-4">
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{
                        scrollSnapType: "x mandatory",
                        display: "flex",
                        paddingLeft: "5%",
                        paddingRight: "5%",
                        scrollBehavior: "smooth",
                        overflowX: "scroll",
                    }}
                >
                    {blogs.map((blog, index) => (
                        <div
                            key={blog.id}
                            className="bg-white rounded-xl w-[400px] flex-shrink-0 border-2 border-gray-300"
                            style={{
                                scrollSnapAlign: "start",
                            }}
                        >
                            <img
                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.attributes.cover_image.data.attributes.url}`}
                                alt={blog.attributes.title}
                                className="w-full h-[200px] object-cover rounded-t-xl"
                            />
                            <div className="pt-4 px-2 flex flex-col h-[200px] justify-between">
                                <h3 className="text-lg font-semibold line-clamp-2">{blog.attributes.title}</h3>

                                {/* Category */}
                                <p className="text-[16px] text-[#18181899] line-clamp-1">
                                    Category - <span className="text-[#181818]">{blog?.attributes?.industries?.data[0]?.attributes?.name}</span>
                                </p>

                                {/* Read More Section */}
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-gray-500 text-sm">
                                        {new Date(blog.attributes.createdAt).toDateString()}
                                    </p>
                                    <Link href={`/blog/${blog.id}-${blog.attributes.title.replace(/\s+/g, "-").toLowerCase()}`}>
                                        <button className="border border-black px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-black hover:text-white">
                                            Read More
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Scroll Button */}
            {canScrollRight && (
                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-3 shadow-md rounded-full z-10 hidden md:block"
                    onClick={scrollRight}
                >
                    ❯
                </button>
            )}

            {/* Hide Scrollbar */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}
