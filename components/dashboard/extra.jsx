import axios from 'axios';

export const fetchBusinessStats = async (businessId, timeSpan = '7d') => {
  const response = await axios.get('/api/businesses/stats', {
    params: { businessId, timeSpan },
  });
  return response.data.stats;
};



import React, { useState, useEffect, useMemo } from 'react';
import Heading from './heading';
import StatCard from './StatCard';
import ProfileSection from './graphs';
import AddButton from './add-button';
import { useGlobalContext } from '@/context/context';
import { fetchBusinessStats } from '@/api/business';

const Dashboard = () => {
  const { businesses, selectedBusiness } = useGlobalContext();
  const [stats, setStats] = useState([]);
  const [timeSpan, setTimeSpan] = useState('7d'); // Default time span

  useEffect(() => {
    // Fetch stats when selected business or time span changes
    const businessId = selectedBusiness ? selectedBusiness.id : null;
    fetchBusinessStats(businessId, timeSpan).then((data) => setStats(data));
  }, [selectedBusiness, timeSpan]);

  return (
    <div className="mx-60">
      <Heading profiles={businesses} />

      {/* Time Span Selector */}
      <div className="flex justify-end mt-4">
        <select
          value={timeSpan}
          onChange={(e) => setTimeSpan(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="1y">Last Year</option>
        </select>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 mt-8">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.currentStats.views}
            percentage={`${stat.percentageChange.views.toFixed(2)}%`}
            text="Change in views"
            positive={stat.percentageChange.views >= 0}
            image="/images/total-view.png"
          />
        ))}
      </div>

      <ProfileSection profiles={businesses} />

      {/* Floating Add Button */}
      <AddButton />
    </div>
  );
};

export default Dashboard;
