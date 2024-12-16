"use client"
import { Label } from '@/components/ui/label'
import Select from "react-select";
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { Controller, useForm, } from "react-hook-form"
import axiosInstance from '@/config/axios.config';
import { Loader2 } from "lucide-react";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import DatePicker from './DatePicker';
import { Switch } from "@/components/ui/switch";
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


function CourseAccessRole({ course, handleBack }) {
    const {
        handleSubmit,
        control,
        reset,
        watch,
    } = useForm({
        mode: 'onChange'
    })
    const router = useRouter()
    const [isPending, startTransition] = React.useTransition();
    const [roles, setRoles] = useState([])
    const [departments, setDepartments] = useState([])
    const [locations, setLocations] = useState([])

    const onSubmit = (form) => {
        startTransition(async () => {
            try {
                const departmentsData = form?.departments?.map((ele => Number(ele.value))) || []
                const locationsData = form?.locations?.map((ele => Number(ele.value))) || []
                const role = form?.roles?.map(ele => ({ name: ele.label, roleId: String(ele.value) }))
                const formData = { departments: departmentsData, locations: locationsData, roles: role, completed_progress: 100 }
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
                toast.success("Save Successful");
                router.push('/admin/course')
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong')
            }
        })
    }

    const getRoles = async () => {
        try {
            const { data } = await axiosInstance({
                url: '/api/users-permissions/roles',
                method: 'GET'
            })
            return data.roles
        } catch (error) {
            console.log(error)
        }
    }
    const getAllLocations = async () => {
        try {
            const { data } = await axiosInstance({
                url: '/api/locations?status=draft',
                method: 'GET'
            })
            return data.data
        } catch (error) {
            console.log(error)
        }
    }
    const getAllDepartments = async () => {
        try {
            const { data } = await axiosInstance({
                url: '/api/departments?status=draft',
                method: 'GET'
            })
            return data.data
        } catch (error) {
            console.log(error)
        }
    }

    const getInitialData = async () => {
        try {
            const roles = await getRoles()
            const location = await getAllLocations()
            const departments = await getAllDepartments()
            setRoles(roles || [])
            setLocations(location || [])
            setDepartments(departments || [])

            const selectedDepartments = course?.departments?.length ? course?.departments?.map(ele => ({ label: ele.title, value: ele.id })) : departments?.map(ele => ({ label: ele.title, value: ele.id }))
            const selectedLocations = course?.locations?.length ? course?.locations?.map(ele => ({ label: ele.title, value: ele.id })) : location?.map(ele => ({ label: ele.title, value: ele.id }))
            const role = course?.roles?.length ? course?.roles.map(ele => ({ label: ele.name, value: ele.roleId })) : roles.map(ele => ({ label: ele.name, value: ele.id }))
            reset({ departments: selectedDepartments, locations: selectedLocations, roles: role })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getInitialData()
    }, [])
    return (
        <>
            <div className="col-span-12 xl:col-span-9 mr-5 ">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="p-0 bg-card rounded-md shadow-sm">
                        <div className="col-span-12 mb-4 mt-0 space-y-1.5 px-6 py-6 mb-0 border-b border-border flex flex-row items-center">
                            <h3 className="text-xl font-medium capitalize">
                                Access Roles Management
                            </h3>
                        </div>

                        <div className="grid grid-cols-12 gap-7 p-6">

                            <div className="col-span-12 lg:col-span-12">
                                <div className="space-y-2">
                                    <Label className="text-base">Department</Label>
                                    <Controller
                                        name="departments"
                                        control={control}
                                        rules={{}}
                                        render={({ field }) =>
                                            <Select
                                                defaultValue={field.value}
                                                value={field.value}
                                                onChange={(value) => { field.onChange(value) }}
                                                isClearable={false}
                                                styles={styles}
                                                isMulti
                                                name='departments'
                                                options={departments
                                                    .filter(dept => !field.value?.some(selected => selected.value === dept.id))
                                                    .map(ele => ({ label: ele.title, value: ele.id }))}
                                                className="react-select"
                                                classNamePrefix="select"
                                            />
                                        }
                                    />

                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-12">
                                <Label className="mb-2">Roles</Label>
                                <Controller
                                    name="roles"
                                    control={control}
                                    render={({ field }) =>
                                        <Select
                                            defaultValue={field.value}
                                            value={field.value}
                                            onChange={(value) => { field.onChange(value) }}
                                            isClearable={false}
                                            styles={styles}
                                            isMulti
                                            name='roles'
                                            options={roles
                                                .filter(role => !field.value?.some(selected => selected.value === String(role.id)))
                                                .map(ele => ({ label: ele.name, value: ele.id }))
                                            }
                                            className="react-select"
                                            classNamePrefix="select"
                                        />
                                    }
                                />
                            </div>
                            <div className="col-span-12 lg:col-span-12">
                                <div className="space-y-2">
                                    <Label className="text-base">Locations</Label>
                                    <Controller
                                        name="locations"
                                        control={control}
                                        rules={{}}
                                        render={({ field }) =>
                                            <Select
                                                defaultValue={field.value}
                                                value={field.value}
                                                onChange={(value) => { field.onChange(value) }}
                                                isClearable={false}
                                                styles={styles}
                                                isMulti
                                                name='locations'
                                                options={locations
                                                    .filter(loc => !field.value?.some(selected => selected.value === loc.id))
                                                    .map(ele => ({ label: ele.title, value: ele.id }))}
                                                className="react-select"
                                                classNamePrefix="select"
                                            />
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-12 mt-3">
                                <div className="space-y-2">
                                    <Label className="text-base">Course Publish</Label>
                                    <span className='p-2'>
                                        <Controller
                                            name="publish"
                                            control={control}
                                            rules={{}}
                                            render={({ field }) => <Switch defaultChecked={field.value} checked={field.value} onCheckedChange={(value) => { field.onChange(value) }} variant="filled" id="fill_1" />}
                                        />
                                    </span>
                                </div>
                            </div>
                            {!watch('publish') && <div className="col-span-12 lg:col-span-12 mt-3">
                                <div className="space-y-2">
                                    <Label className="text-base">Course Publish Date</Label>
                                    <span className='p-2'>
                                        <Controller
                                            name="publishedAt"
                                            control={control}
                                            render={({ field }) => <DatePicker defaultValue={field.value} value={field.value} onDateChange={(value) => { field.onChange(value) }} variant="filled" id="fill_1" />}
                                        />
                                    </span>
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-6 w-full">
                        <Button
                            type={'button'}
                            size="xl"
                            variant="outline"
                            color="default"
                            className="cursor-pointerl"
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
                            Finish
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CourseAccessRole