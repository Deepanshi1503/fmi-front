"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/config/axios.config";
import { formatDate } from "../../question-banks/QuestionBankGrid";

const TopSell = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axiosInstance.get("/api/dashboard/newEnrollments");
        setEnrollments(response?.data?.enrollments);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    };

    fetchEnrollments();
  }, []);
  return (
    <Fragment>
      {enrollments.length > 0 ? (
        enrollments.map((item, index) => (
          <li
            className="flex justify-between items-center gap-5 border-b border-default-300 py-3 px-6 hover:bg-default-50"
            key={`top-sell-${index}`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={`http://localhost:1337${item?.userProfileImage}`}
                  alt={item?.username}
                  className="h-full w-full object-cover"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-default-700">{item?.username}</span>
                <span className="text-xs font-medium text-default-600">{formatDate(item?.createdAt)}</span>
              </div>
            </div>
            <span className="text-sm font-normal text-default-800 ml-4 truncate max-w-full">{item?.latestCourse}</span>

          </li>

        ))) : (
        <div className="text-center py-4 text-default-500">No new enrollments available.</div>
      )}
    </Fragment>
  );
};

export default TopSell;
