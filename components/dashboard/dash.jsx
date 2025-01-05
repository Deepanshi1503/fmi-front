import React, { useMemo } from 'react';
import Heading from './heading';
import StatCard from './StatCard';
import ProfileSection from './graphs';
import AddButton from './add-button';
import { useGlobalContext } from '@/context/context';

const Dashboard = () => {
  const { businesses, filteredProfiles, selectedBusiness } = useGlobalContext();


  // Compute the statistics using useMemo
  const stats = useMemo(() => {
    // Determine the source of business data
    const businessData = selectedBusiness ? [selectedBusiness] : businesses;

    // Aggregate the statistics
    const aggregatedStats = businessData.reduce(
      (acc, business) => {
        acc.views += parseInt(business.attributes.business_views, 10) || 0;
        acc.interests += parseInt(business.attributes.business_interests, 10) || 0;
        acc.search += parseInt(business.attributes.business_search, 10) || 0;
        return acc;
      },
      { views: 0, interests: 0, search: 0 }
    );

    // Define the statistics array
    return [
      {
        title: 'Total View',
        value: aggregatedStats.views,
        percentage: '8.5%',
        text: 'Up from yesterday',
        positive: true,
        image: '/images/total-view.png',
      },
      {
        title: 'Interested Investor',
        value: aggregatedStats.interests,
        percentage: '1.3%',
        text: 'Up from past week',
        positive: true,
        image: '/images/interested-investor.png',
      },
      {
        title: 'Appearances in Search',
        value: aggregatedStats.search,
        percentage: '4.3%',
        text: 'Down from yesterday',
        positive: false,
        image: '/images/appearance-search.png',
      },
    ];
  }, [businesses, selectedBusiness]);

  return (
    <div className="mx-60">
      <Heading profiles={businesses} />

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
      <AddButton />
    </div>
  );
};

export default Dashboard;
