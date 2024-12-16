import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ReactSelect from "react-select";
import { CleaveInput } from "@/components/ui/cleave";
import FileInput from "./FileSelectInput"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { Controller, useFieldArray, useForm, } from "react-hook-form"
import axiosInstance from '@/config/axios.config';
import { Loader2 } from "lucide-react";
import toast from 'react-hot-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
function CourseLandingPage({ handleNext, course }) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, submitCount },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            highlights: [{ name: '' }, { name: '' }]
        }
    })
    const { fields, append, remove } = useFieldArray({ control, name: "highlights", });
    const [isPending, startTransition] = React.useTransition();
    const [imageFiles, setImageFiles] = useState([])
    const [videoFiles, setVideoFiles] = useState([])
    const [courseCategory, setCourseCategory] = useState([])
    const [courseDocumentId, setCourseDocumentId] = useState('')

    const uploadFile = async (files) => {
        let formData = new FormData();
        formData.append("files", files);
        const { data } = await axiosInstance({
            url: '/api/upload/',
            method: 'post',
            data: formData
        })
        const fileId = data[0].id
        return fileId
    }

    const getAllCategory = async () => {
        try {
            const { data } = await axiosInstance({
                url: '/api/courses-categories?status=draft',
                method: 'get',
            })
            console.log(data.data)
            setCourseCategory(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = (form) => {
        startTransition(async () => {

            try {
                const tags = form?.course_tags ? form?.course_tags.split(',') : []
                const formData = {
                    'data': {
                        ...form,
                        course_duration: hmsToMinutes(form.course_duration),
                        course_completion_time: form.course_completion_time ? daysToMinutes(form.course_completion_time) : 0,
                        "course_mandatory": (form.course_mandatory === 'on' || form.course_mandatory === true) ? true : false,
                        course_tags: tags.map(ele => ({ tag_name: ele })),
                        courses_categories: form?.courses_categories?.map(ele => ele.value)
                    }
                }
                if (!courseDocumentId)
                    formData.data['completed_progress'] = 10
                if (imageFiles?.length) {
                    if (imageFiles[0]?.name) {
                        const fileId = await uploadFile(imageFiles[0])
                        formData.data['course_thumbnail'] = fileId
                    }
                } else {
                    formData.data['course_thumbnail'] = null
                }
                if (videoFiles?.length) {
                    if (videoFiles[0]?.name) {
                        const fileId = await uploadFile(videoFiles[0])
                        formData.data['course_intro_video'] = fileId
                    }
                } else {
                    formData.data['course_intro_video'] = null
                }
                const { data } = await axiosInstance({
                    url: courseDocumentId ? `/api/courses/${courseDocumentId}?status=draft` : '/api/courses?status=draft',
                    method: courseDocumentId ? 'PUT' : 'POST',
                    data: formData,
                })
                if (typeof handleNext === 'function' && !courseDocumentId)
                    handleNext(data.data.documentId)
                toast.success("Save Successful");
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong')
            }
        })
    }
    useEffect(() => {
        getAllCategory()
        if (course) {
            console.log(course)
            const data = {
                title: course.title,
                short_description: course.short_description,
                course_type: course.course_type,
                course_mandatory: course.course_mandatory,
                course_duration: course.course_duration ? minutesToHMS(course.course_duration) : '',
                course_completion_time: course.course_completion_time ? minutesToDays(course.course_completion_time) : '',
                courses_categories: course?.courses_categories?.map(ele => ({ label: ele.title, value: ele.id })),
                difficulty_level: course?.difficulty_level,
                highlights: course?.highlights.map(ele => ({ name: ele.name }))
            }

            if (course?.course_tags?.length)
                data['course_tags'] = course.course_tags.map(ele => ele.tag_name).join(',')
            if (course.course_thumbnail) {
                setImageFiles([course.course_thumbnail.url])
            }
            setCourseDocumentId(course.documentId)
            if (course.course_intro_video)
                setVideoFiles([course.course_intro_video.url])
            setTimeout(() => {
                reset(data)
            }, 0)
        }
    }, [])
    function minutesToHMS(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.floor(totalMinutes % 60);
        const seconds = Math.round((totalMinutes - Math.floor(totalMinutes)) * 60);
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    function minutesToDays(totalMinutes) {
        const days = Math.floor(totalMinutes / 1440);
        return days;
    }
    function hmsToMinutes(hms) {
        const [hours, minutes, seconds] = hms.split(":").map(Number);
        const totalMinutes = (hours * 60) + minutes + (seconds / 60);
        return Math.round(totalMinutes);
    }
    function daysToMinutes(days) {
        const totalMinutes = Number(days) * 1440
        return totalMinutes;
    }


    const appendHightLight = () => {
        append({ name: '' })
    }
    const removeHightLight = (index) => {
        remove(index)
    }

    const handleOnBlur = () => {
        console.log(202, courseDocumentId)
        if (courseDocumentId) {
            handleSubmit(onSubmit)
        }
    }
    const formEvent = {
        onSubmit: !courseDocumentId ? handleSubmit(onSubmit) : () => { },
        onBlur: courseDocumentId ? handleSubmit(onSubmit) : () => { }
    }
    return (
        <>
            <div className="col-span-12 xl:col-span-9 mr-5 ">
                <form
                    {...formEvent}
                >

                    <div className="p-0 bg-card rounded-md shadow-sm mb-6">

                        <div className="col-span-12 mb-4 mt-0 space-y-1.5 px-6 py-6 mb-0 border-b border-border flex flex-row items-center">
                            <h3 className="text-xl font-medium capitalize">
                                Basic Course Info
                            </h3>
                        </div>

                        <div className="grid grid-cols-12 gap-7 p-6">

                            {/* Basic Course Information */}
                            <div className="col-span-12 lg:col-span-12">
                                <div className="space-y-2">
                                    <Label className="text-base">Title <span className='text-red-500'>*</span></Label>
                                    <Input type="text" placeholder="Course Title" className="rounded-sm h-14 text-base text-default-700" {...register("title", {
                                        required: "Course Title is required"
                                    })} />
                                    <FromError error={errors} name={'title'} />
                                </div>
                            </div>



                            <div className="col-span-12 lg:col-span-12">
                                <div className="space-y-2">
                                    <Label className="text-base">Short Descriptions <span className='text-red-500'>*</span></Label>
                                    <Textarea className="rounded-sm text-base text-default-700" placeholder="Type Descriptions Here..." id="rows-5" rows="2" {...register("short_description", {
                                        required: "Course descriptions is required"
                                    })} />
                                    <FromError error={errors} name={'short_description'} />
                                </div>
                            </div>

                            <div className="col-span-12 lg:col-span-12">
                                <div className="space-y-2">
                                    <Label className="text-base">Category <span className='text-red-500'>*</span></Label>
                                    <Controller
                                        name="courses_categories"
                                        control={control}
                                        rules={{ required: 'Course Categories is required' }}
                                        render={({ field }) =>
                                            <ReactSelect
                                                defaultValue={field.value}
                                                value={field.value}
                                                onChange={(value) => { field.onChange(value) }}
                                                isClearable={false}
                                                styles={styles}
                                                isMulti
                                                name='courses_categories'
                                                options={courseCategory.map(ele => ({ label: ele.title, value: ele.id }))}
                                                className="react-select h-14 text-base text-default-700"
                                                classNamePrefix="select"
                                            />
                                        }
                                    />
                                    <FromError error={errors} name={'courses_categories'} />
                                </div>
                            </div>

                            <div className="col-span-12 lg:col-span-12">
                                <div className="space-y-2">
                                    <Label className="text-base">Tags (use a comma separator)</Label>
                                    <Textarea className="rounded-sm  text-base text-default-700" placeholder="Enter Tags" id="rows-10" rows="3"  {...register("course_tags")} />
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Course Hightlights */}

                    <div className="p-0 bg-card rounded-md shadow-sm mb-6">

                        <div className="col-span-12 mb-4 mt-0 space-y-1.5 px-6 py-6 mb-0 border-b border-border flex flex-row items-center">
                            <h3 className="text-xl font-medium capitalize">
                                Course Highlights
                            </h3>
                        </div>

                        <div className="grid grid-cols-12 gap-7 p-6">
                            {fields.map((ele, index) =>
                                <div className="col-span-12 lg:col-span-12">
                                    <div className="space-y-2">
                                        <Label className="text-base">Highlight {index + 1} <span className='text-red-500'>*</span></Label>
                                        <div className='flex gap-4'>
                                            <Input key={ele.id} type="text" placeholder="Course Title" className="rounded-sm h-14 text-base text-default-700" {...register(`highlights.${index}.name`, {
                                                required: "Course Highlight is required"
                                            })} />
                                            <Button
                                                type="button"
                                                size="md"
                                                variant="outline"
                                                color="default"
                                                className="cursor-pointer rounded-full h-6 w-6 p-0"
                                                onClick={() => { removeHightLight(index) }}
                                            >

                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 40 40"><path fill="currentColor" d="M21.499 19.994L32.755 8.727a1.064 1.064 0 0 0-.001-1.502c-.398-.396-1.099-.398-1.501.002L20 18.494L8.743 7.224c-.4-.395-1.101-.393-1.499.002a1.05 1.05 0 0 0-.309.751c0 .284.11.55.309.747L18.5 19.993L7.245 31.263a1.064 1.064 0 0 0 .003 1.503c.193.191.466.301.748.301h.006c.283-.001.556-.112.745-.305L20 21.495l11.257 11.27c.199.198.465.308.747.308a1.06 1.06 0 0 0 1.061-1.061c0-.283-.11-.55-.31-.747z" /></svg>

                                            </Button>

                                        </div>
                                        {errors?.highlights?.[index]?.name?.message && <p className={cn("text-xs text-destructive leading-none px-1.5 py-2  rounded-0.5")} >
                                            {errors.highlights[index].name.message}
                                        </p>}
                                    </div>
                                </div>
                            )}
                            <div>
                                <Button
                                    type="button"
                                    size="md"
                                    variant="outline"
                                    color="default"
                                    className="cursor-pointer rounded-full"
                                    onClick={() => { appendHightLight() }}
                                >

                                    Add Highlight <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" className="ml-2" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13z" clip-rule="evenodd" /></svg>
                                </Button>
                            </div>
                        </div>


                    </div>


                    {/* Course Structure */}
                    <div className="p-0 bg-card rounded-md shadow-sm mb-6">

                        <div className="col-span-12 mb-4 mt-0 space-y-1.5 px-6 py-6 mb-0 border-b border-border flex flex-row items-center">
                            <h3 className="text-xl font-medium capitalize">
                                Course Structure
                            </h3>
                        </div>

                        <div className="grid grid-cols-12 gap-7 p-6">

                            <div className="col-span-6 lg:col-span-6">
                                <div className="space-y-2">
                                    <Label className="text-base">Type <span className='text-red-500'>*</span></Label>
                                    <Controller
                                        name="course_type"
                                        control={control}
                                        rules={{ required: "Course Type is required" }}
                                        render={({ field }) => <Select defaultValue={field.value} value={field.value} onValueChange={(value) => { field.onChange(value) }} >
                                            <SelectTrigger className="rounded-sm h-14 text-base text-default-700">
                                                <SelectValue placeholder="Select Course Type" >
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Self Placed">Self Placed</SelectItem>
                                                <SelectItem value="Instructor">Instructor</SelectItem>
                                            </SelectContent>
                                        </Select>}
                                    />
                                    <FromError error={errors} name={'course_type'} />
                                </div>
                            </div>


                            <div className="col-span-6 lg:col-span-6">
                                <div className="space-y-2">
                                    <Label className="text-base">Difficulty level <span className='text-red-500'>*</span></Label>
                                    <Controller
                                        name="difficulty_level"
                                        control={control}
                                        rules={{ required: "Difficulty level is required" }}
                                        render={({ field }) => <Select defaultValue={field.value} value={field.value} onValueChange={(value) => { field.onChange(value) }} >
                                            <SelectTrigger className="rounded-sm h-14  text-base text-default-700">
                                                <SelectValue placeholder="Select Course Type" >
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Beginner">Beginner</SelectItem>
                                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                                <SelectItem value="Advanced">Advanced</SelectItem>
                                            </SelectContent>
                                        </Select>}
                                    />
                                    <FromError error={errors} name={'difficulty_level'} />
                                </div>
                            </div>

                            <div className="col-span-6 lg:col-span-6">
                                <div className="space-y-2">
                                    <Label className="text-base">Duration <span className='text-red-500'>*</span></Label>
                                    <Controller
                                        name="course_duration"
                                        control={control}
                                        rules={{ required: "Course Duration is required" }}
                                        render={({ field }) => <CleaveInput
                                            value={field.value}
                                            className="rounded-sm h-14 text-base text-default-700 read-only:leading-[48px]"
                                            id="course_duration"
                                            options={{
                                                blocks: [2, 2, 2],
                                                delimiters: [":", ":"],
                                                numericOnly: true,
                                            }}
                                            ref={field.ref}
                                            placeholder="HH:MM:SS"
                                            onChange={(event) => field.onChange(event.target.value)}
                                        />}
                                    />
                                    <FromError error={errors} name={'course_duration'} />
                                </div>
                            </div>

                            <div className="col-span-6 lg:col-span-6">
                                <div className="space-y-2">
                                    <Label className="text-base">Completion Deadline (in Days)</Label>
                                    <Input type="text" placeholder="Completion Deadline (in days)" className="rounded-sm h-14 text-base text-default-700" {...register("course_completion_time")} />
                                    {/* <Controller
                                        name="course_completion_time"
                                        control={control}
                                        rules={{}}
                                        render={({ field }) =>
                                            <CleaveInput
                                                value={field.value}
                                                className="rounded-sm h-14 text-md read-only:leading-[48px]"
                                                id="course_completion_time"
                                                options={{
                                                    blocks: [2, 2, 2],
                                                    delimiters: [":", ":"],
                                                    numericOnly: true,
                                                }}
                                                placeholder="DD:HH:MM"
                                                onChange={(event) => field.onChange(event.target.value)}

                                            />
                                        }
                                    /> */}

                                </div>
                            </div>

                            <div className="col-span-12 lg:col-span-12">
                                <span className='space-y-2'>
                                    <Label className="text-base">Choose Type of Subject</Label>
                                    <Controller
                                        name="course_mandatory"
                                        control={control}
                                        rules={{}}
                                        render={({ field }) =>
                                            <RadioGroup defaultValue={field.value} value={field.value} onValueChange={(value) => { field.onChange(value) }}>
                                                <RadioGroupItem value={true} id="r_1" color="">
                                                    Mandatory
                                                </RadioGroupItem>
                                                <RadioGroupItem value={false} id="r_2">
                                                    Elective
                                                </RadioGroupItem>
                                            </RadioGroup>
                                        }
                                    />
                                </span>
                            </div>


                        </div>
                    </div>

                    {/* Media & Visuals Block */}

                    <div className="p-0 bg-card rounded-md shadow-sm">
                        <div className="col-span-12 mb-4 mt-0 space-y-1.5 px-6 py-6 mb-0 border-b border-border flex flex-row items-center">
                            <h3 className="text-xl font-medium capitalize">
                                Media & Visuals
                            </h3>
                        </div>
                        <div className="grid grid-cols-12 gap-7 p-6">
                            <div className="col-span-6 lg:col-span-6">
                                <div className="space-y-2">
                                    <Label className="text-base">Cover Image</Label>
                                    <FileInput className="rounded-sm" onChange={(file) => { setImageFiles(file) }} initialFile={imageFiles} />
                                </div>
                            </div>
                            <div className="col-span-6 lg:col-span-6">
                                <div className="space-y-2">
                                    <Label className="text-base">Intro Video</Label>
                                    <FileInput className="rounded-sm" mediaType='video' onChange={(file) => { setVideoFiles(file) }} initialFile={videoFiles} />
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="flex mt-6 gap-4 justify-end">
                        {courseDocumentId ? <Button
                            type="button"
                            size="xl"
                            variant=""
                            color="default"
                            className="cursor-pointer"
                            onClick={() => { handleNext(courseDocumentId) }}
                        >
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Next
                        </Button> : <Button
                            size="xl"
                            variant=""
                            color="default"
                            className="cursor-pointer"
                        >
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Next
                        </Button>}
                    </div>

                </form>
            </div>
        </>
    )
}

export default CourseLandingPage