import React, { useState, useEffect, useRef, useMemo } from 'react';
import Heading from "./heading"
import StatCard from "./StatCard"
import ProfileSection from "./graphs"
import AddButton from "./add-button"
import { useGlobalContext } from '@/context/context';

const Dashboard = () => {
    const { businesses, filteredProfiles, selectedBusiness } = useGlobalContext();

    const stats = useMemo(()=>{
        const businessStats = selectedBusiness
        ? selectedBusiness.attributes.stats
        : businesses.reduce(
            (acc,business)=>{
                acc.search +=business.attributes.stats.search || 0;
                acc.views +=business.attributes.stats.views || 0;
                acc.interests +=business.attributes.stats.interests || 0;
                return acc;
            },
            {search:0, views:0, interests:0}
        );

        return [
            {
                title: 'Total View',
                value: businessStats.views,
                percentage: '8.5%',
                text: 'Up from yesterday',
                positive: true,
                image: '/images/total-view.png' 
            },
            { 
                title: 'Interested Investor',
                value: businessStats.interests,
                percentage: '1.3%',
                text: 'Up from past week',
                positive: true,
                image: '/images/interested-investor.png'
            },
            { 
                title: 'Appearances in Search',
                value: businessStats.search,
                percentage: '4.3%',
                text: 'Down from yesterday',
                positive: false,
                image: '/images/appearance-search.png'
            },
        ]
    })

    return (
        <div className='mx-60'>
            <Heading profiles={businesses}/>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 mt-8">
                {stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        percentage={stat.percentage}
                        text={stat.text}
                        positive={stat.positive}
                        image={stat.image}
                    />
                ))}
            </div>

            <ProfileSection profiles={filteredProfiles} />

            {/* Floating Add Button */}
            <AddButton/>
        </div>
    );
};

export default Dashboard;
