"use client";
import * as React from "react";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { fetchAllUsers, fetchSingleUser, blockUser, fetchAllRoles } from "@/components/auth/admin-operation";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddUser from "./add-user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Users() {
  const [inputValue, setInputValue] = useState('')
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [users, setUsers] = React.useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const userDetails = useSelector((state) => state.user);
  const loadRoles = async () => {
    try {
      const fetchedRoles = await fetchAllRoles();
      const formattedRoles = fetchedRoles?.roles.map((role) => ({
        value: role.id,
        label: role.name,
      }));
      setSelectedRoles(formattedRoles.filter(ele => ele.label !== 'Public'));
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  React.useEffect(() => {
    loadRoles()
  }, [])

  const columns = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="  font-medium  text-card-foreground/80">
          <div className="flex space-x-3  rtl:space-x-reverse items-center">
            <span className="capitalize text-sm text-card-foreground whitespace-nowrap">
              {row?.original?.id}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="  font-medium  text-card-foreground/80">
          <div className="flex space-x-3  rtl:space-x-reverse items-center">
            <Avatar className=" rounded-full">
              <AvatarImage src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${row?.original?.profileImage?.url || ''}`} />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <span className="capitalize text-sm text-card-foreground whitespace-nowrap">
              {(row?.original?.name || "")}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase whitespace-nowrap">{row.getValue("email")}</div>,
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const isBlocked = row?.original?.blocked;
        const color = isBlocked ? "destructive" : "success";
        const label = isBlocked ? "Blocked" : "Active";

        return (
          <Badge variant="soft" color={color} className="capitalize">
            {label}
          </Badge>
        );
      },
    },

    {
      accessorKey: "role",
      header: () => <div className="text-right">Role</div>,
      filterFn: "roleFilter",
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row?.original?.role?.name || ""}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;
        const [loading, setLoading] = useState(false);

        const handleBlockToggle = async (userId) => {
          setLoading(true);
          try {
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === userId ? { ...user, blocked: !user.blocked } : user
              )
            );
            await blockUser(userId, user.blocked);
          } catch (error) {
            console.error("Failed to toggle block status:", error);
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === userId ? { ...user, blocked: user.blocked } : user
              )
            );
          } finally {
            setLoading(false);
          }
        };

        const handleUpdateUser = async (user) => {
          setSelectedUser(user);
          setIsFormOpen(true);
        };

        return (
          <div className=" text-end">
            <DropdownMenu>
              <DropdownMenuTrigger disabled={userDetails.id === row.original.id} asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleUpdateUser(user)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBlockToggle(user.id)} disabled={loading}>
                  {user.blocked ? "Unblock" : "Block"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: inputValue
    },
    filterFns: {
      roleFilter: (row, columnId, filterValue) => {
        const roleName = row.getValue(columnId);
        return filterValue.includes(roleName.name);
      }
    },
  });

  React.useEffect(() => {
    if (!isFormOpen) {
      handleFetchUsers();
    }
  }, [isFormOpen])



  const handleFetchUsers = async () => {
    const data = await fetchAllUsers();

    const sortedData = data.sort((a, b) => {
      const updatedAtDiff = new Date(b.updatedAt) - new Date(a.updatedAt);
      if (updatedAtDiff !== 0) return updatedAtDiff;

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setUsers(sortedData);
  };


  const handleAddUser = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="space-y-5">

        <CardHeader className="p-6">

          <CardTitle className="text-xl font-medium capitalize items-center flex justify-between">
            <h3>Users</h3>
            <div className="flex gap-3">
              <Input
                placeholder="Search by email, name..."
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                }}
                className="max-w-sm min-w-[200px] h-10"
              />
              <Button onClick={handleAddUser}>
                Add User
              </Button>
              <AddUser
                open={isFormOpen}
                onClose={handleCloseForm}
                user={selectedUser}
                onUserUpdated={handleFetchUsers}
              />
            </div>
          </CardTitle>
        </CardHeader>

      </div>

      <div className="flex items-center flex-wrap gap-2 px-4">
      </div>
      <Tabs defaultValue="All" className="inline-block w-full px-4 mb-6">
        <TabsList className="py-2 p-1 py-2 rounded-none h-14 bg-transparent text-muted-foreground rounded-sm justify-start px-4">
          <TabsTrigger
            value="All"
            className="text-base font-medium capitalize  data-[state=active]:shadow-none  data-[state=active]:bg-transparent data-[state=active]:text-primary transition duration-150 before:transition-all before:duration-150 relative before:absolute
         before:left-1/2 before:-bottom-[5px] before:h-[2px]
           before:-translate-x-1/2 before:w-0 data-[state=active]:before:bg-primary data-[state=active]:before:w-full"
            onClick={() => setColumnFilters([])}
          >
            All
          </TabsTrigger>

          {Array.from(new Set(selectedRoles.map((role) => role.label))).map((roleLabel) => (
            <TabsTrigger
              key={roleLabel}
              value={roleLabel}
              className="text-base font-medium capitalize data-[state=active]:shadow-none  data-[state=active]:bg-transparent data-[state=active]:text-primary transition duration-150 before:transition-all before:duration-150 relative before:absolute
         before:left-1/2 before:-bottom-[5px] before:h-[2px]
           before:-translate-x-1/2 before:w-0 data-[state=active]:before:bg-primary data-[state=active]:before:w-full"
              onClick={() =>
                setColumnFilters([{ id: "role", value: [roleLabel] }])
              }
            >
              <div className="capitalize">
                {roleLabel.toLowerCase()}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="m-6 mt-0 rounded-md border">
        <Table >
          <TableHeader className="bg-default-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  className="h-24 text-center last:text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center flex-wrap gap-4 px-6 py-6">
        <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="flex gap-2  items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8"
          >
            <Icon icon="heroicons:chevron-left" className="w-5 h-5 rtl:rotate-180" />
          </Button>

          {table.getPageOptions().map((page, pageIdx) => (
            <Button
              key={`basic-data-table-${pageIdx}`}
              onClick={() => table.setPageIndex(pageIdx)}
              variant={`${pageIdx === table.getState().pagination.pageIndex ? "" : "outline"}`}
              className={cn("w-8 h-8")}
            >
              {page + 1}
            </Button>

          ))}

          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <Icon icon="heroicons:chevron-right" className="w-5 h-5 rtl:rotate-180" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default Users;

