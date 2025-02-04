import React from "react";
import Header2 from "@/components/business-listing/header2";
import Footer from "@/components/footer";
import HeadingBox from "./_components/heading-box";
import BlogListing from "./_components/blog-listing"
// import LoadMore from "./LoadMore";

export default async function Blog() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?sort[0]=createdAt:desc&populate=*`, {
        cache: 'no-store',
    });
    const { data: blogData } = await res.json();

    return (
        <div>
            <Header2 />
            <HeadingBox />
            <BlogListing blogData={blogData}/>
            <Footer />
        </div>
    );
}
