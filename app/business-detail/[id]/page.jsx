import Detail from "@/components/business-detail/detail";

export default async function BusinessDetail({ params }) {
    const { id } = params;
    console.log(id);

    if (!id) {
        return <div>Invalid Business ID</div>;
    }

    return <Detail businessId={id}/>
}