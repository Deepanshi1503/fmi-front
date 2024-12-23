"use client"
import React, { useEffect, useState } from 'react'
import CourseHeader from "./CourseHeader";
import Loading from './loading'
import { Card, CardFooter } from "@/components/ui/card";
import axiosInstance from '@/config/axios.config';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation';
import OverView from './Overview'
import Modules from './Modules'
import Enrollments from './Enrollments'
import Ratings from './Ratings'
import Teams from './Teams'
import { useRouter, useParams } from 'next/navigation';

const pages = [
    {
        text: "overview",
        value: "overview",
    },
    // {
    //     text: "Q & A",
    //     value: "q & a",
    // },
    {
        text: "Reviews",
        value: "reviews",
    },
    {
        text: "Enrollments",
        value: "enrollments",
    },
    {
        text: "Stats",
        value: "stats",
    },
];
const getHash = () =>
    typeof window !== 'undefined' ? window.location.hash : ''
function CourseView({ }) {
    const [course, setCourse] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isNotFound, setIsNotFound] = useState(false)
    const locationName = usePathname();
    const router = useRouter()
    const [hash, setHash] = useState(getHash())
    const params = useParams()
    useEffect(() => {
        const hash = getHash()
        if (!hash)
            router.push(`${locationName}#${pages[0].value}`)
        else
            setHash(getHash())
    }, [params])
    const generateQuery = (status) => {
        const params = new URLSearchParams({
            "populate[0]": "course_tags",
            "populate[1]": "course_thumbnail",
            "populate[2]": "course_intro_video",
            "populate[3]": "modules.topics",
            "populate[4]": "modules.topics.videos",
            "populate[5]": "modules.topics.files",
            "populate[6]": "modules.topics.audios",
            "populate[7]": "modules.topics.images",
            "populate[8]": "modules.videos",
            "populate[9]": "modules.files",
            "populate[10]": "modules.audios",
            "populate[11]": "modules.images",
            "populate[11]": "instructors",
            "populate[12]": "departments",
            "populate[13]": "locations",
            "populate[14]": "courses_categories",
            "populate[15]": "highlights",
            status: status || ''
        });
        return params.toString();
    };

    const getCourseStatus = (date) => {
        try {
            if (!date)
                return 'draft'
            if (date) {
                if (new Date(date) > new date())
                    return 'Scheduled'
                return 'Completed'
            }
        } catch (error) {
            console.log(error)
        }
    }
    function minutesToHMS(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.floor(totalMinutes % 60);
        const seconds = Math.round((totalMinutes - Math.floor(totalMinutes)) * 60);
        return `${String(hours).padStart(2, "0")} hours ${String(minutes).padStart(2, "0")} minutes`;
    }
    function minutesToDays(totalMinutes) {
        const days = Math.floor(totalMinutes / 1440);
        return `${days} days`;
    }

    const fetchCourse = async () => {
        try {
            const { data } = await axiosInstance({
                url: `/api/courses/${params.courseDocumentId}?${generateQuery('draft')}`,
                method: 'GET'
            })
            const courseObj = {
                ...data.data,
                documentId: data.data.documentId,
                title: data.data.title,
                short_description: data.data.short_description,
                status: getCourseStatus(data.data.publishedAt),
                thumbnail: data.data?.course_thumbnail?.url ? process.env.NEXT_PUBLIC_STRAPI_URL + data.data?.course_thumbnail?.url : '',
                course_type: data.data?.course_type,
                completed_progress: data.data.completed_progress,
                createdAt: data.data.createdAt,
                publishedAt: data.data.publishedAt,
                instructors: data.data.instructors.map(ele => ({ id: ele.id, firstName: ele.firstName, lastName: ele.lastName, profileImageUrl: ele?.profileImage?.url ? process.env.NEXT_PUBLIC_STRAPI_URL + ele?.profileImage?.url : '' })),
                course_duration: minutesToHMS(data.data.course_duration),
                course_completion_time: data.data.course_completion_time ? minutesToDays(data.data.course_completion_time) : '',
                course_tags: data.data.course_tags.map(ele => ele.tag_name).join(','),
                courses_categories: data.data.courses_categories.map((ele => ele.title)).join(', ')
            }
            setCourse(courseObj)

        } catch (error) {
            console.log(error)
            setIsNotFound(true)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCourse()
    }, [])


    return (
        <>
            {isLoading ? <Loading /> :
                <>
                    <Card className="mb-6">
                        <CourseHeader course={course} />
                        <CardFooter className="gap-x-4 gap-y-3 lg:gap-x-6 pb-2 pt-6 flex-wrap detailsTabHeadLink">
                            {pages.map((item) => (
                                <Link
                                    key={item.value}
                                    href={`/admin/course/${course.documentId}#${item.value}`}
                                    className={cn(
                                        "text-lg font-semibold text-default-500 capitalize pb-3 border-Linkb border-transparent cursor-pointer",
                                        {
                                            "border-primary": locationName === `/admin/course/${course.documentId}#${item.value}`,
                                        }
                                    )}
                                >
                                    {item.value}
                                </Link>
                            ))}
                        </CardFooter>

                    </Card>

                    {hash === '#overview' && <OverView course={course} />}
                    {/* {hash === '#q-a' && <Modules course={course} />} */}
                    {hash === '#reviews' && <Teams course={course} />}
                    {hash === '#enrollments' && <Enrollments course={course} />}
                    {hash === '#stats' && <Ratings course={course} />}

                </>
            }
        </>
    )
}

export default CourseView