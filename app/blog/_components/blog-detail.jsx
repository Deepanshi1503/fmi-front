import React from 'react';

export default function BlogDetail({ image, description }) {
    return (
        <div className="mx-12 my-16">
            <div className="flex justify-center mb-8">
                <img src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image}`} alt="Blog Image" className="max-w-full h-auto rounded-lg" />
            </div>

            <div className="prose mx-auto">
                <div
                    dangerouslySetInnerHTML={{
                        __html: description,
                    }}
                />
            </div>
        </div>
    );
}
