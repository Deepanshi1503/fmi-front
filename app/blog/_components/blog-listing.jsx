import BlogCard from "./blog-card"

export default function BlogListing({ blogData }) {
    return (
        <section className="container mx-14 py-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                {blogData.map((blog) => (
                    <BlogCard blog={blog}/>
                ))}
            </div>
        </section>
    );
}
