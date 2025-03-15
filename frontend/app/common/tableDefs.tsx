import { useState } from "react";

import { ArrowUpDown, EllipsisVertical, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserRoles } from "./common";
import { TaskRow } from "./types";

import ChangeRoleDialogForm from "@/components/forms/ChangeRoleDialogForm";
import { ColumnDef, TableMeta } from "@tanstack/react-table";

// Add this interface to extend TableMeta
interface CustomTableMeta<TData> extends TableMeta<TData> {
    updateData: (rowId: string, columnId: string, value: unknown) => void;
}

export type TeamMember = {
    id: string;
    fullName: string;
    email: string;
    role: UserRoles;
    userID: number;
};

export const createColumns = (
    currentUserEmail: string,
): ColumnDef<TeamMember>[] => [
    {
        accessorKey: "fullName",
        header: "Name",
        cell: ({ row }) => {
            return <div className="capitalize">{row.getValue("fullName")}</div>;
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            return <div className="capitalize">{row.getValue("role")}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const buttonClasses = "h-7 w-8 p-0";
            const iconClasses = "h-4 w-4";

            // Do not return actions for current user
            const user = row.original;
            if (user.email === currentUserEmail) {
                return (
                    <Button variant="ghost" className={buttonClasses}>
                        <span className={iconClasses} />
                    </Button>
                );
            }

            const meta = table.options.meta as CustomTableMeta<TeamMember>;
            const [dialogOpen, setDialogOpen] = useState(false);
            const [dropdownOpen, setDropdownOpen] = useState(false);
            const [currentlySelectedRole, setCurrentlySelectedRole] = useState(
                UserRoles.Admin,
            );

            // Function to handle opening the dialog and closing the dropdown
            const handleOpenDialog = () => {
                setDropdownOpen(false);
                setTimeout(() => {
                    setDialogOpen(true);
                }, 10);
            };

            return (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DropdownMenu
                        open={dropdownOpen}
                        onOpenChange={setDropdownOpen}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className={buttonClasses}>
                                <span className="sr-only">Open menu</span>
                                <EllipsisVertical className={iconClasses} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    Change role
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuLabel>
                                            Select role
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {Object.values(UserRoles).map((role) =>
                                            role !== user.role ? (
                                                <DialogTrigger
                                                    key={role}
                                                    asChild
                                                >
                                                    <DropdownMenuItem
                                                        key={role}
                                                        onSelect={(e) => {
                                                            e.preventDefault();
                                                            handleOpenDialog();
                                                            setCurrentlySelectedRole(
                                                                role,
                                                            );
                                                        }}
                                                        className="capitalize"
                                                    >
                                                        <span>{role}</span>
                                                    </DropdownMenuItem>
                                                </DialogTrigger>
                                            ) : null,
                                        )}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>

                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(user.email)
                                }
                            >
                                Copy email
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* Dialog box */}
                    <ChangeRoleDialogForm
                        userID={user.userID}
                        fullName={user.fullName}
                        role={currentlySelectedRole}
                        setDialogOpen={setDialogOpen}
                        onRoleChange={() => {
                            if (meta?.updateData) {
                                meta.updateData(
                                    user.id,
                                    "role",
                                    currentlySelectedRole,
                                );
                            } else {
                                console.error(
                                    "updateData function is not available",
                                );
                            }
                        }}
                    />
                </Dialog>
            );
        },
    },
];

// Keep the original columns definition for backwards compatibility
export const columns: ColumnDef<TeamMember>[] = createColumns("");

export const taskColumnDisplayNames: Record<string, string> = {
    taskName: "Task Name",
    priority: "Priority",
    assignedToName: "Assigned To",
    dueDate: "Due Date",
    status: "Status",
    createdByName: "Created By",
    actions: "Actions",
};

export const TasksColumns: ColumnDef<TaskRow>[] = [
    {
        accessorKey: "taskName",
        header: taskColumnDisplayNames["taskName"],
    },
    {
        accessorKey: "priority",
        header: taskColumnDisplayNames["priority"],
    },
    {
        accessorKey: "assignedToName",
        header: taskColumnDisplayNames["assignedToName"],
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("assignedToName")}</div>
        ),
    },
    {
        accessorKey: "dueDate",
        header: taskColumnDisplayNames["dueDate"],
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "createdByName",
        header: taskColumnDisplayNames["createdByName"],
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({}) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View task</DropdownMenuItem>
                        <DropdownMenuItem>Edit task</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
