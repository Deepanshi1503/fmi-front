import React from "react";
import Header2 from "@/components/business-listing/header2";
import Footer from "@/components/footer";
import HeadingBox from "./_components/heading-box";
import Link from "next/link";
import { formatDateTime } from "../../utils/dateAndTimeConvertHumanReadable";
// import LoadMore from "./LoadMore";

export default async function Blog() {
    const currentPage = 1;
    const limit = 3;

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?sort[0]=createdAt:desc&pagination[page]=${currentPage}&pagination[pageSize]=${limit}&populate=*`, {
        cache: 'no-store',
    });
    const { data: blogData } = await res.json();
    console.log("blog data", blogData);

    return (
        <div>
            <Header2 />
            <HeadingBox />
            <Footer />
        </div>
    );
}
