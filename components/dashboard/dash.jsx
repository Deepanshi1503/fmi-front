import React from 'react';
import { Box, Grid, Typography, Card, CardContent, CircularProgress, Button, IconButton } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
    const stats = [
        { title: 'Total View', value: 40, percentage: '8.5% Up from yesterday', positive: true, icon: 'people' },
        { title: 'Interested Investor', value: 10, percentage: '1.3% Up from past week', positive: true, icon: 'group' },
        { title: 'Appearances in Search', value: 150, percentage: '4.3% Down from yesterday', positive: false, icon: 'search' },
        { title: 'Messages Received', value: 12, percentage: '1.8% Up from yesterday', positive: true, icon: 'email' },
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
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Find MY Investor Dashboard
            </Typography>

            {/* Stats Section */}
            <Grid container spacing={3}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6">{stat.title}</Typography>
                            <Typography variant="h4">{stat.value}</Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: stat.positive ? 'green' : 'red', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                {stat.positive ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />} {stat.percentage}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Profiles Section */}
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {profiles.map((profile, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {profile.title}
                                </Typography>
                                <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', mb: 2 }}>
                                    <CircularProgress
                                        variant="determinate"
                                        value={profile.completion}
                                        size={100}
                                        sx={{ color: profile.completed ? 'green' : 'orange' }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                    >
                                        <Typography variant="h6">{profile.completion}%</Typography>
                                    </Box>
                                </Box>
                                <Typography
                                    variant="body1"
                                    sx={{ color: profile.completed ? 'green' : 'orange', textAlign: 'center' }}
                                >
                                    {profile.status}
                                </Typography>

                                {profile.sections && (
                                    <Box sx={{ mt: 2 }}>
                                        {profile.sections.map((section, idx) => (
                                            <Typography
                                                key={idx}
                                                variant="body2"
                                                sx={{ color: section.completed ? 'green' : 'red' }}
                                            >
                                                {section.completed ? '✔️' : '❌'} {section.label}
                                            </Typography>
                                        ))}
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add Button */}
            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    },
                }}
                size="large"
            >
                <AddIcon />
            </IconButton>
        </Box>
    );
};

export default Dashboard;
