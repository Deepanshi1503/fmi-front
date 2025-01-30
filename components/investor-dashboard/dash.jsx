import React, { useMemo, useState, useEffect } from 'react';
import Heading from './heading';
import StatCard from './StatCard';
import ProfileSection from './graphs';
import { useGlobalContext } from '@/context/context';
import { fetchInvestorStats } from '@/utils/api';

const Dashboard = () => {
  const { investor, setInvestor } = useGlobalContext();
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userId")); // Replace with the actual userId from context/auth
        const timeSpan = '7d'; // Adjust as needed
        const investorId =  null;

        const response = await fetchInvestorStats(userId, timeSpan, investorId);
        setStatsData(response.stats || []);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const stats = useMemo(() => {
    if (loading || statsData.length === 0) return [];

    return statsData.map((stat) => {
      const { totalStats, dailyPercentageChanges } = stat;
      const length = dailyPercentageChanges.length;

      return [
        {
          title: 'Total View',
          value: totalStats.views,
          percentage: dailyPercentageChanges?.[length - 1]?.views || 0,
          text: dailyPercentageChanges?.[length - 1]?.views > 0 ? 'Up from yesterday' : 'Down from yesterday',
          positive: dailyPercentageChanges?.[length - 1]?.views > 0,
          image: '/images/total-view.png',
        },
        {
          title: 'Interested Investor',
          value: totalStats.interests,
          percentage: dailyPercentageChanges?.[length - 1]?.interests || 0,
          text: dailyPercentageChanges?.[length - 1]?.interests > 0 ? 'Up from yesterday' : 'Down from yesterday',
          positive: dailyPercentageChanges?.[length - 1]?.interests > 0,
          image: '/images/interested-investor.png',
        },
        {
          title: 'Appearances in Search',
          value: totalStats.search,
          percentage: dailyPercentageChanges?.[length - 1]?.search || 0,
          text: dailyPercentageChanges?.[length - 1]?.search > 0 ? 'Up from yesterday' : 'Down from yesterday',
          positive: dailyPercentageChanges?.[length - 1]?.search > 0,
          image: '/images/appearance-search.png',
        },
      ];
    })[0]; // Assuming one business or aggregated stats
  }, [statsData, loading]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mx-60">
      <Heading profiles={investor} />

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

      <ProfileSection profiles={investor} />
    </div>
  );
};

export default Dashboard;
