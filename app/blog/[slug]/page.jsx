// import NotFound from "./not-found";
import Header2 from "@/components/business-listing/header2"
import HeadingBox from "../_components/heading-box2"
import Footer from "@/components/footer";
import BlogDetail from "../_components/blog-detail"
import AuthorDetail from "../_components/author-detail";
import SimilarBlogs from "../_components/similar-listing"

const BlogDetailPage = async ({ params }) => {
    const id = params.slug?.split("-")[0];

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs/${id}?populate=*,authors.profile_image,cover_image,industries`, {
        cache: 'no-store',
    });

    const { data: blogData } = await res.json();

    if (!res.ok || !blogData) {
        return <NotFound />;
    }

    // Fetch Similar Blogs based on category
    const categoryIds = blogData.attributes.industries?.data.map(cat => cat.id);

    let similarBlogs = [];
    if (categoryIds.length > 0) {
        const categoryFilter = categoryIds.map(id => `filters[industries][id][$in]=${id}`).join("&");

        const similarRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate=*,cover_image,industries&${categoryFilter}&filters[id][$ne]=${id}`, {
            cache: 'no-store',
        });

        const { data: similarData } = await similarRes.json();
        similarBlogs = similarData || [];
    }

    return (
        <div>
            <Header2 />
            <HeadingBox
                title={blogData.attributes.title}
                authors={blogData.attributes.authors}
                category={blogData.attributes.industries}
                issueDate={blogData.attributes.createdAt}
            />
            <BlogDetail
                image={blogData.attributes.cover_image.data.attributes.url}
                description={blogData.attributes.description}
            />
            <AuthorDetail
                authorData={blogData.attributes.authors?.data}
            />
            {/* Similar Blogs Section */}
            {similarBlogs.length > 0 && <SimilarBlogs blogs={similarBlogs} />}
            <Footer />
        </div>
    );
};

export default BlogDetailPage;
