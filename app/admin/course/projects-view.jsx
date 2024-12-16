"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProjectGrid from "./project-grid";
import ProjectList from "./ProjectList";
import { cn } from "@/lib/utils";
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./project-list/components/columns";
import Blank from "@/components/blank";
import { useRouter } from "next/navigation";
import axiosInstance from "@/config/axios.config";
const ProjectsView = ({ }) => {
  const router = useRouter()
  const [pageView, setPageView] = React.useState("grid");
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [projects, setProjects] = useState([])
  const table = useReactTable({
    data: projects,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const getCourseStatus = (date) => {
    try {
      if (!date)
        return 'draft'
      if (date) {
        if (new Date(date) > new Date())
          return 'Scheduled'
        return 'Published'
      }
    } catch (error) {
      console.log(error)
    }
  }
  const fetchCourse = async () => {
    try {
      const { data } = await axiosInstance({
        url: '/api/courses?populate[0]=course_thumbnail&populate[1]=instructors.profileImage&status=published&status=draft',
        method: 'GET'
      })
      function getDocument(ele) {
        return {
          documentId: ele.documentId,
          title: ele.title,
          short_description: ele.short_description,
          status: getCourseStatus(ele.publishedAt),
          thumbnail: ele?.course_thumbnail?.url ? process.env.NEXT_PUBLIC_STRAPI_URL + ele?.course_thumbnail?.url : '',
          course_type: ele?.course_type,
          completed_progress: ele.completed_progress,
          createdAt: ele.createdAt,
          publishedAt: ele.publishedAt,
          mandatory: ele.course_mandatory,
          instructors: ele.instructors.map(ele => ({ id: ele.id, profileImageUrl: ele?.profileImage?.url ? process.env.NEXT_PUBLIC_STRAPI_URL + ele?.profileImage?.url : '' }))
        }
      }
      const response = await axiosInstance({
        url: '/api/courses?populate[0]=course_thumbnail&populate[1]=instructors.profileImage&status=published',
        method: 'GET'
      })
      const publishCourse = response.data.data
      const obj = data.data.map(ele => {
        const ob = publishCourse.find(ele1 => ele1.documentId === ele.documentId)
        if (ob)
          return getDocument(ob)
        else
          return getDocument(ele)
      })
      console.log(obj)
      setProjects(obj)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteCourse = async (id) => {
    try {
      const { data } = await axiosInstance({
        url: `/api/courses/${id}`,
        method: 'DELETE'
      })
      setProjects(old => old.filter(ele => ele.documentId !== id))
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCourse()
  }, [])

  const createCourse = () => {
    router.push('/admin/course/new/1')
  }

  return (
    <>
      {
        projects.length < 1 ?
          <>
            <Blank className="max-w-[320px] mx-auto flex flex-col items-center justify-center h-full space-y-3">
              <div className=" text-default-900 text-xl font-semibold">
                No Course Here
              </div>
              <div className=" text-sm  text-default-600 ">
                There is no course. create If you want to create a new course then click this
                button & create new course.
              </div>
              <div></div>
              <Button onClick={createCourse}>
                <Plus className="w-4 h-4 text-primary-foreground mr-2" />
                Add Course
              </Button>
            </Blank>
          </>
          :
          <div className="space-y-5">

            <div className="flex items-center flex-wrap justify-between gap-4">
              <div className="text-2xl font-medium text-default-800 ">
                Manage Courses
              </div>
            </div>


            <Card>
              <CardContent className="pt-6">
                <div className="flex lg:flex-row flex-col flex-wrap gap-6">

                  <div className=" flex-1  flex gap-3">
                    {pageView === "grid" && <div className="flex lg:flex-row flex-col w-fit flex-wrap items-center gap-2 lg:mr-2">
                      <Input placeholder="search..." className="h-8 w-full lg:w-[250px] lg:mb-0 mb-3" />
                    </div>
                    }
                    {pageView === "list" && <div className="flex lg:flex-row flex-col w-fit flex-wrap items-center gap-2 lg:mr-2">
                      <Input
                        placeholder="Filter tasks..."
                        value={table.getColumn("title")?.getFilterValue() ?? ""}
                        onChange={(event) =>
                          table.getColumn("title")?.setFilterValue(event.target.value)
                        }
                        className="h-8 w-full lg:w-[250px] lg:mb-0 mb-3"
                      />
                    </div>}
                  </div>

                  <div className="flex-none flex gap-3">
                    <Button onClick={createCourse} className="whitespace-nowrap">
                      <Plus className="w-4 h-4  ltr:mr-2 rtl:ml-2 " />
                      Add Course
                    </Button>

                    <Button
                      size="icon"
                      variant="outline"
                      className={cn("hover:bg-transparent  ", {
                        "hover:border-primary hover:text-primary":
                          pageView === "grid",
                        "hover:border-muted-foreground hover:text-muted-foreground":
                          pageView !== "grid",
                      })}
                      color={pageView === "grid" ? "primary" : "secondary"}
                      onClick={() => setPageView("grid")}
                    >
                      <LayoutGrid className="h-5 w-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className={cn("hover:bg-transparent  ", {
                        "hover:border-primary hover:text-primary":
                          pageView === "list",
                        "hover:border-muted-foreground hover:text-muted-foreground":
                          pageView !== "list",
                      })}
                      color={pageView === "list" ? "primary" : "secondary"}
                      onClick={() => setPageView("list")}
                    >
                      <List className="h-5 w-5" />
                    </Button>
                  </div>

                </div>
              </CardContent>
            </Card>
            {pageView === "grid" && (
              <div className="grid  xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
                {projects?.map((project, i) => (
                  <ProjectGrid
                    project={project}
                    key={`project-grid-${i}`}
                    onDelete={deleteCourse}
                  />
                ))}
              </div>
            )}
            {pageView === "list" && (
              <ProjectList data={projects} table={table} columns={columns} />
            )}
          </div>
      }
    </>
  );
};

export default ProjectsView;
