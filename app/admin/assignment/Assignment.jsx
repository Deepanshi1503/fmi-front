"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Blank from '@/components/blank';


import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { SortHeader } from "./SortHeader";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { Plus } from 'lucide-react';
import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Filter } from './FacetedFilter'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axiosInstance from '@/config/axios.config';
import { Input } from '@/components/ui/input';
// import { DataTablePagination } from '../question-banks/[questionBankId]/components/data-table-pagination';
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
function Assignment() {
    const router = useRouter()
    const [assignments, setAssignments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [sorting, setSorting] = React.useState([]);
    const [clearFilter, setClearFilter] = useState(0)
    const [filterBy, setFilterBy] = useState([])
    const [courseCategory, setCourseCategory] = useState([])
    const [open, setOpen] = useState(false);
    const [assignmentId, setAssignmentId] = useState(null);
    const columns = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="translate-y-0.5"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="translate-y-0.5"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: ({ column }) => (
                <SortHeader column={column} title="ID" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex gap-2">
                        <span className="max-w-[500px] truncate font-medium">
                            {row.getValue("id")}
                        </span>
                    </div>
                );
            },
        },
        {
            accessorKey: "title",
            header: ({ column }) => (
                <SortHeader column={column} title="Name" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex gap-2">
                        <span className="max-w-[500px] truncate font-medium">
                            {row.getValue("title")}
                        </span>
                    </div>
                );
            },
        },
        {
            accessorKey: "difficulty_level",
            header: ({ column }) => (
                <SortHeader column={column} title="Difficulty" />
            ),
            cell: ({ row }) => {
                const difficulty_level = row.getValue("difficulty_level")
                return (
                    <div className="flex items-center">
                        <Badge
                            color={
                                (difficulty_level === "Advanced" && "destructive") ||
                                (difficulty_level === "Intermediate" && "info") ||
                                (difficulty_level === "Beginner" && "warning")
                            }>
                            {difficulty_level}
                        </Badge>
                    </div>
                );
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id));
            },
        },
        {
            accessorKey: "score",
            header: ({ column }) => (
                <SortHeader column={column} title="Max Score" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex gap-2">
                        {row.getValue('score') || '-'}
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => {
                return <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="">
                            <DropdownMenuItem onSelect={() => router.push(`/admin/assignment/${row.original.documentId}`)}>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => deleteHandlerAssignment(row.original.documentId)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            },
        },
    ];


    const table = useReactTable({
        data: assignments,
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


    const fetchAllAssignments = async () => {
        try {
            setIsLoading(true);
            const query = new URLSearchParams();

            filterBy.forEach(ele => {
                const filterKey =
                    ele.type === 'course_categories'
                        ? `filters[${ele.type}][id][$in]`
                        : `filters[${ele.type}][$in]`;

                ele.value.forEach(val => query.append(filterKey, val));
            });

            const { data } = await axiosInstance({
                url: "/api/assignments?populate=*&" + query.toString(),
                method: "GET",
            });

            const tempAssignments = data.data.map(ele => ({
                id: ele.id,
                documentId: ele.documentId,
                title: ele.title,
                difficulty_level: ele.difficulty_level,
                score: ele.max_score,
            }));

            setAssignments(tempAssignments);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const addAssignment = () => {
        router.push('/admin/assignment/new#1')
    }

    const deleteHandlerAssignment = (assignmentDocId) => {
        setAssignmentId(assignmentDocId)
        setOpen(true);
    }

    const confirmDelete = () => {
        if (assignmentId) {
            deleteAssignment(assignmentId)
            setOpen(false);
        }
    }

    const deleteAssignment = async (assignmentDocumentId) => {
        if (!assignmentDocumentId) return;
        try {
            await axiosInstance({
                url: `/api/assignments/${assignmentDocumentId}`,
                method: "DELETE"
            })
            await fetchAllAssignments();
        } catch (error) {
            console.log(error);
        }
    }

    const getAllCategory = async () => {
        try {
            const { data } = await axiosInstance({
                url: '/api/courses-categories',
                method: 'get',
            })
            setCourseCategory(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    useEffect(() => {
        fetchAllAssignments()
    }, [filterBy])

    const handleFilter = (type, value) => {
        if (!value.length) {
            setFilterBy((old) => old.filter(ele => ele.type !== type))
        } else {
            setFilterBy(old => old.length ? old.map(ele => ele.type === type ? { type, value } : ele) : [{ type, value }])
        }
    }
                

    return (
        <>
            {assignments.length < 0 ? <Blank className="max-w-[320px] mx-auto flex flex-col items-center justify-center h-full space-y-3">
                <div className=" text-default-900 text-xl font-semibold">
                    No Assignment Here
                </div>
                <div className=" text-sm  text-default-600 ">
                    There is no assignment. create If you want to create a new assignments then click this
                    button & create new assignments.
                </div>
                <div></div>
                <Button onClick={addAssignment}>
                    <Plus className="w-4 h-4 text-primary-foreground mr-2" />
                    Add Assignments
                </Button>
            </Blank> :
                <>
                    <DeleteConfirmationDialog
                        deleteDescription={'Are you sure to delete it?'}
                        headingMessage={' '}
                        open={open}
                        onClose={() => setOpen(false)}
                        onConfirm={confirmDelete}
                    />
                    <div className="space-y-4">
                        <div className=" space-y-5 bg-card p- rounded-md">

                            <div className="col-span-12 mb-4 mt-0 space-y-1.5 px-6 py-6 mb-0 border-b border-border flex flex-row items-center justify-between	">
                                <h3 className="text-xl font-medium capitalize">
                                    Assignments
                                </h3>
                                <Button onClick={addAssignment}>
                                    <Plus className="w-4 h-4 text-primary-foreground mr-2" />
                                    Add Assignments
                                </Button>
                            </div>

                            <div className="grid grid-cols-12 gap-7 p-6">
                                <div className="col-span-12 lg:col-span-12">
                                    <div className="flex flex-1 flex-wrap items-center gap-2 mb-4">
                                        <Input
                                            placeholder="Filter Questions..."
                                            value={table.getColumn("title")?.getFilterValue() ?? ""}
                                            onChange={(event) =>
                                                table.getColumn("title")?.setFilterValue(event.target.value)
                                            }
                                            className="h-8 min-w-[200px] max-w-sm"
                                        />
                                        <Filter
                                            title="Category"
                                            options={courseCategory.map(ele => ({ label: ele.title, value: ele.id }))}
                                            clearFilter={clearFilter}
                                            onChange={(value) => handleFilter('courses_categories', value)}
                                        />
                                        <Filter
                                            title="Difficulty"
                                            options={[
                                                {
                                                    label: "Beginner",
                                                    value: "Beginner",
                                                },
                                                {
                                                    label: "Intermediate",
                                                    value: "Intermediate",
                                                },
                                                {
                                                    label: "Advanced",
                                                    value: "Advanced",
                                                },
                                            ]}
                                            clearFilter={clearFilter}
                                            onChange={(value) => handleFilter('difficulty_level', value)}
                                        />

                                        {filterBy.length > 0 && (
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setClearFilter(old => old + 1);
                                                    table.setColumnFilters([]);
                                                }}
                                                className="h-8 px-2 lg:px-3"
                                            >
                                                Reset
                                                <X className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader className="bg-default-100">
                                                {table.getHeaderGroups().map((headerGroup) => (
                                                    <TableRow key={headerGroup.id}>
                                                        {headerGroup.headers.map((header) => {
                                                            return (
                                                                <TableHead key={header.id} colSpan={header.colSpan}>
                                                                    {header.isPlaceholder
                                                                        ? null
                                                                        : flexRender(
                                                                            header.column.columnDef.header,
                                                                            header.getContext()
                                                                        )}
                                                                </TableHead>
                                                            );
                                                        })}
                                                    </TableRow>
                                                ))}
                                            </TableHeader>
                                            <TableBody>
                                                {table.getRowModel().rows?.length ? (
                                                    table.getRowModel().rows.map((row) => (
                                                        <TableRow
                                                            className="hover:bg-default-100"
                                                            key={row.id}
                                                            data-state={row.getIsSelected() && "selected"}
                                                        >
                                                            {row.getVisibleCells().map((cell) => (
                                                                <TableCell key={cell.id}>
                                                                    {flexRender(
                                                                        cell.column.columnDef.cell,
                                                                        cell.getContext()
                                                                    )}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell
                                                            colSpan={columns.length}
                                                            className="h-24 last:text-center"
                                                        >
                                                            No results found.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>

                            {/* <DataTablePagination table={table} /> */}
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Assignment