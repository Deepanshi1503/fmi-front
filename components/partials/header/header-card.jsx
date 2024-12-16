"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from '@/config/axios.config';
import { Card, CardContent } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
const HeaderCard = () => {
  const [counts, setCounts] = useState({
    userCount: 0,
    assessmentCount: 0,
    trainerCount: 0,
    enrolledCount: 0,
    publishedCourseCount: 0,
    inactiveUser: 0,
    electiveParticipationCount: 0,
    mandatoryParticipationCount: 0,
    overallParticipationPerc: 0,
    mandatoryPercentage: 0,
    electivePercentage: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cardMappings = [
    { key: "userCount", title: "Registered Users", color: "info", icon: "mdiusers" },
    { key: "enrolledCount", title: "Enrolled in Courses", color: "info", icon: "mdiusers" },
    { key: "trainerCount", title: "Registered Trainers", color: "primary", icon: "usertie" },
    { key: "inactiveUser", title: "Inactive Users", color: "destructive", icon: "inactiveusers" },
    { key: "publishedCourseCount", title: "Published Courses", color: "info", icon: "publishcourses" },
    { key: "assessmentCount", title: "Published Assessments", color: "info", icon: "assessments" }, 

    {
      key: "enrolledCount",
      title: "Overall Participation",
      color: "success",
      cardColor: "bg-green-100",
      icon: "Session",
      hasPerc: true,
      percentageKey: "overallParticipationPerc"
    },
    {
      key: "mandatoryParticipationCount",
      title: "Mandatory Course Participation",
      color: "primary",
      cardColor: "bg-orange-100",
      icon: "Session",
      hasPerc: true,
      percentageKey: "mandatoryPercentage"
    },

    {
      key: "electiveParticipationCount",
      title: "Elective Course Participation",
      color: "info",
      cardColor: "bg-cyan-100",
      icon: "Increase",
      hasPerc: true,
      percentageKey: "electivePercentage"
    },

  ];
  useEffect(() => {
    const fetchDashboardCounts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/api/dashboard/counts`);
        setCounts(response?.data?.counts);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardCounts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pt-5">
      {cardMappings.map((card, index) => (
        <Card
          key={`dynamic-card-${index}`}
          className={cn(
            "w-full h-[140px] rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between",
            card?.cardColor ? card.cardColor : "bg-white"
          )}
        >
          <CardContent className="flex-1 p-3 flex flex-col">
            <div className="flex items-center justify-between mb-2 p-2">
              {/* Value Section */}
              <div className="text-3xl font-bold">
                {counts ? counts?.[card.key] : 0}
              </div>

              {/* Icon or Progress Section */}
              {card?.hasPerc === true ? (
                <div className="flex justify-center items-center h-12 w-12">
                  <CircularProgress
                    value={counts?.[card.percentageKey] ? Math.round(counts[card.percentageKey]) : 0}
                    color={card.color}
                    showValue
                  />
                </div>
              ) : (
                <span
                  className={cn(
                    "flex h-10 w-10 justify-center items-center bg-default-100 rounded-full p-1",
                    {
                      "bg-primary bg-opacity-10 text-primary": card.color === "primary",
                      "bg-info bg-opacity-10 text-info": card.color === "info",
                      "bg-warning bg-opacity-10 text-warning": card.color === "warning",
                      "bg-destructive bg-opacity-10 text-destructive": card.color === "destructive",
                    }
                  )}
                >
                  {React.createElement(require("@/components/svg")[card.icon], {
                    className: "h-6 w-6"
                  })}
                </span>
              )}
            </div>

            {/* Title Section */}
            <div className="text-sm font-medium mt-1 text-ellipsis overflow-hidden max-w-[130px]">
              {card.title}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

  );
};

export default HeaderCard;
