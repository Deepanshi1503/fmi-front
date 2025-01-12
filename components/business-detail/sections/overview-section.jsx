import React from "react";

const OverviewSection = React.forwardRef(({ business }, ref) => {
    return (
        <section id="overview" ref={ref} className="mb-8">
            <h2 className="text-xl font-bold mb-4">Overview</h2>
            {/* <p>{business.overview}</p> */}
        </section>
    );
});

export default OverviewSection;
