
import { Label } from '@/components/ui/label'
import Select, { components } from "react-select";

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { Controller, useForm, } from "react-hook-form"
import axiosInstance from '@/config/axios.config';
import { Loader2 } from "lucide-react";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    AvatarGroup,
} from "@/components/ui/avatar";
const FromError = ({ error, name }) => {
    return (
        <>
            {error[name]?.message ? <p className={cn("text-xs text-destructive leading-none px-1.5 py-2  rounded-0.5")} >
                {error[name]?.message}
            </p> : <></>}
        </>
    )
}
const styles = {
    multiValue: (base, state) => {
        return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
    },
    multiValueLabel: (base, state) => {
        return state.data.isFixed
            ? { ...base, color: "#626262", paddingRight: 6 }
            : base;
    },
    multiValueRemove: (base, state) => {
        return state.data.isFixed ? { ...base, display: "none" } : base;
    },
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};


function CourseInstructor({ handleBack, handleNext, course }) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onChange'
    })
    const [isPending, startTransition] = React.useTransition();
    const [instructors, setInstructors] = useState([])
    const [instructorsList, setInstructorsList] = useState([])
    const selectedInstructor = watch('instructors')
    const [selectedInstructorList, setSelectedInstructorList] = useState([])
    const onSubmit = (form) => {
        startTransition(async () => {
            try {
                const instructors = form.instructors.map((ele => ele.value))
                const formData = { instructors, completed_progress: 75 }
                let query = ''
                if (form.publish) {
                    query = '?status=published'
                }
                else if (!form.publish && !form.publishedAt) {
                    query = '?status=draft'
                } else if (!form.publish && form.publishedAt) {
                    formData['publishedAt'] = form.publishedAt
                }
                await axiosInstance({
                    url: `/api/courses/${course.documentId}${query}`,
                    method: 'PUT',
                    data: {
                        data: formData
                    }
                })
                handleNext(course.documentId)
                toast.success("Save Successful");
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong')
            }
        })
    }
    const getAllInstructor = async () => {
        try {
            const response = await axiosInstance({
                url: `/api/users?populate=*`,
                method: 'GET'
            })
            console.log(response)
            setInstructorsList(response.data)
            setInstructors(response.data.map(ele => ({ label: `${ele.firstName} ${ele.lastName || ''}`, value: ele.id })))
            setTimeout(() => {
                const instructors = course?.instructors?.map(ele => ({ label: `${ele.firstName} ${ele.lastName || ''}`, value: ele.id }))
                reset({ instructors })
            }, 0)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllInstructor()
    }, [])
    useEffect(() => {

        const list = instructorsList.filter((ele) => selectedInstructor?.find((ele1) => ele1.value === ele.id))
        setSelectedInstructorList(list)

    }, [selectedInstructor])




    return (
        <>
            <div className="col-span-12 xl:col-span-9  mr-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-0 bg-card rounded-md shadow-sm">
                        <div className="col-span-12 mb-4 mt-0 space-y-1.5 px-6 py-6 mb-0 border-b border-border flex flex-row items-center">
                            <h3 className="text-xl font-medium capitalize">
                                Instructor
                            </h3>
                        </div>

                        <div className="grid grid-cols-12 gap-7 p-6">

                            <div className="col-span-12 lg:col-span-12">
                                <div className="space-y-2">
                                    <Label className="text-base">Assign Instructor *</Label>
                                    <Controller
                                        name="instructors"
                                        control={control}
                                        rules={{ required: "Course Instructor is required" }}
                                        render={({ field }) =>
                                            <Select
                                                defaultValue={field.value}
                                                value={field.value}
                                                onChange={(value) => { field.onChange(value) }}
                                                isClearable={false}
                                                styles={styles}
                                                isMulti
                                                name='instructors'
                                                options={instructors}
                                                className="react-select"
                                                classNamePrefix="select"
                                            />
                                        }
                                    />
                                    <FromError error={errors} name={'instructors'} />
                                </div>
                            </div>
                        </div>
                        {
                            selectedInstructorList.map((item) =>
                                <div className='bg-background rounded-md shadow-sm mt-3'>
                                    <div className='p-4 flex gap-2'>
                                        <div>
                                            {console.log(item)}
                                            <Avatar className="rounded h-12 w-12">
                                                <AvatarImage src={item?.profileImage ? process.env.NEXT_PUBLIC_STRAPI_URL + item?.profileImage.url : ''} alt="" />
                                                <AvatarFallback className="rounded uppercase bg-success/30 text-success">
                                                    {item?.firstName?.slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className='flex self-center'>
                                            <div className="text-base font-semibold text-default-900 capitalize mb-1">
                                                {`${item.firstName} ${item.lastName || ''}`}  <span class="text-red-500">({item?.role?.name.toLowerCase()})</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </div>

                    <div className="flex mt-6 gap-4 justify-end">
                        <Button
                            type={'button'}
                            size="xl"
                            variant="outline"
                            color="default"
                            className="cursor-pointer"
                            onClick={() => { handleBack(course.documentId) }}
                        >
                            Back
                        </Button>
                        <Button
                            size="xl"
                            variant=""
                            color="default"
                            className="cursor-pointer"
                        >
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Next
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CourseInstructor