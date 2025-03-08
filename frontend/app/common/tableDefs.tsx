import { EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";

export type TeamMember = {
    id: string;
    fullName: string;
    email: string;
    role: "Admin" | "Member";
};

export const columns: ColumnDef<TeamMember>[] = [
    {
        accessorKey: "fullName",
        header: "Full Name",
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
        cell: ({ row }) => {
            const user = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <EllipsisVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(user.id)
                            }
                        >
                            Copy USER ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
