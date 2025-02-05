// import NotFound from "./not-found";
import Header2 from "@/components/business-listing/header2"
import HeadingBox from "../_components/heading-box2"
import Footer from "@/components/footer";
import BlogDetail from "../_components/blog-detail"
import AuthorDetail from "../_components/author-detail";

const BlogDetailPage = async ({ params }) => {
    const id = params.slug?.split("-")[0];
    console.log("id", id);

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs/${id}?populate=*,authors.profile_image,cover_image,industries`, {
        cache: 'no-store',
    });

    const { data: investor } = await res.json();
    console.log("investor data", investor);

    if (!res.ok || !investor) {
        return <NotFound />;
    }

    return (
        <div>
            <Header2 />
            <HeadingBox
                title={investor.attributes.title}
                authors={investor.attributes.authors}
                category={investor.attributes.industries}
                issueDate={investor.attributes.createdAt}
            />
            <BlogDetail
                image={investor.attributes.cover_image.data.attributes.url}
                description={investor.attributes.description}
            />
            <AuthorDetail
                authorData={investor.attributes.authors?.data}
            />
            <Footer />
        </div>
    );
};

export default BlogDetailPage;
