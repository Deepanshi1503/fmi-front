"use client"
import { Cup, Eye, Increase, Session } from '@/components/svg';
import React, { useEffect, useState } from 'react'
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardCounts, resetState } from '@/provider/slice/AdminSlice';
const reports = [
    {
        id: 1,
        name: "Registered",
        count: "6,132",
        rate: "150",
        isUp: true,
        icon: <Session className="h-4 w-4" />,
        color: "primary",
    },
    {
        id: 2,
        name: "Page Views",
        count: "11,236",
        rate: "202",
        isUp: false,
        icon: <Eye className="h-4 w-4" />,
        color: "info",
    },
    {
        id: 3,
        name: "Avg. Duration",
        count: "46s",
        rate: "22",
        isUp: true,
        icon: <Increase className="h-4 w-4" />,
        color: "warning",
    },
    {
        id: 4,
        name: "Bounce Rate",
        count: "46s",
        rate: "30",
        isUp: false,
        icon: <Cup className="h-4 w-4" />,
        color: "destructive",
    },
];

const headerCard = () => {
  const dispatch = useDispatch();
    const { counts, loading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchDashboardCounts());
        return () => {
            dispatch(resetState());
        };
    }, [dispatch]);
    console.log(counts);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        reports.map((item, index) => (
            <Card key={`report-card-${index}`} >
               
                <CardContent className="pb-4 px-4">
                    <div className="text-2xl font-semibold text-default-900 mb-2.5">{item.count}</div>
                </CardContent>
                <CardHeader className="flex-col-reverse sm:flex-row flex-wrap gap-2  border-none mb-0 pb-0">
                    <span className="text-sm font-medium text-default-900 flex-1">{item.name}</span>
                    <span className={cn("flex-none h-9 w-9 flex justify-center items-center bg-default-100 rounded-full", {
                        "bg-primary bg-opacity-10 text-primary": item.color === "primary",
                        "bg-info bg-opacity-10 text-info": item.color === "info",
                        "bg-warning bg-opacity-10 text-warning": item.color === "warning",
                        "bg-destructive bg-opacity-10 text-destructive": item.color === "destructive",
                    })}>{item.icon}</span>
                </CardHeader>
            </Card>
        ))

    )
}


export default headerCard;