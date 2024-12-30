import React, {useState} from 'react';
import { Box, Grid, Typography, Card, CardContent, CircularProgress, Button, IconButton } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import Heading from "./heading"
import StatCard from "./StatCard"
import ProfileSection from "./graphs"

const Dashboard = () => {
    const [showOptions, setShowOptions] = useState(false);

    const stats = [
        { title: 'Total View', value: 40, percentage: '8.5%', text: 'Up from yesterday', positive: true, image: '/images/total-view.png' },
        { title: 'Interested Investor', value: 10, percentage: '1.3%', text: 'Up from past week', positive: true, image: '/images/interested-investor.png' },
        { title: 'Appearances in Search', value: 150, percentage: '4.3%', text: 'Down from yesterday', positive: false, image: '/images/appearance-search.png' },
        { title: 'Messages Received', value: 12, percentage: '1.8%', text: 'Up from yesterday', positive: true, image: '/images/messages.png' },
    ];

    const profiles = [
        {
            title: 'Health care business',
            status: 'Profile Completed',
            completion: 100,
            completed: true,
        },
        {
            title: 'Fintech Startup',
            status: 'Draft',
            completion: 85,
            completed: false,
            sections: [
                { label: 'Founder & Team', completed: true },
                { label: 'Company overview', completed: true },
                { label: 'Product & Services', completed: false },
                { label: 'Progress & Transition', completed: false },
            ],
        },
    ];

    return (
        <div className='mx-60'>
            <Heading />

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 mt-8">
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

            <ProfileSection profiles={profiles} />

            {/* Floating Add Button */}
            <div className="fixed bottom-6 right-52">
                {/* Options Menu */}
                {showOptions && (
                    <div className="absolute bottom-16 right-12 bg-white shadow-lg rounded-lg p-2 flex flex-col gap-2">
                        <button
                            className="text-black text-left py-2 px-4 rounded-md hover:bg-[#F7F6F5] whitespace-nowrap outline-none"
                            onClick={() => alert("Create Fundraise clicked")}
                        >
                            Create Fundraise
                        </button>
                        <button
                            className="text-black text-left py-2 px-4 rounded-md hover:bg-[#F7F6F5] whitespace-nowrap outline-none"
                            onClick={() => alert("Create Sale clicked")}
                        >
                            Create Sale
                        </button>
                        <button
                            className="text-black text-left py-2 px-4 rounded-md hover:bg-[#F7F6F5] whitespace-nowrap outline-none"
                            onClick={() => alert("Create Investor Profile clicked")}
                        >
                            Create Investor Profile
                        </button>
                    </div>
                )}

                {/* Add Button */}
                <button
                    className="bg-[#0B66C3] text-white w-16 h-16 rounded-full shadow-lg hover:bg-blue-600 flex items-center justify-center text-5xl outline-none"
                    onClick={() => setShowOptions(!showOptions)}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
