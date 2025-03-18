import { useState } from "react";

import { TaskRow, TaskStatus, TeamMemberDetails } from "@/common/types";

import { ArrowRightLeft, Ellipsis, UserPen } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";

type Props = {
    task: TaskRow;
    teamMemberDetails: TeamMemberDetails[];
    updateTaskStatus: (taskId: number, newStatus: TaskStatus) => void;
};

export function TaskCardDropDownMenu({
    task,
    teamMemberDetails,
    updateTaskStatus,
}: Props) {
    const moveToColumn = (columnId: number) => {
        console.log(columnId);
    };

    const assignToUser = (assignToId: number) => {
        console.log(assignToId);
    };

    return (
        <div
            // Need to stop propogation to DnD so onClick events can fire
            onPointerDown={(e) => e.stopPropagation()}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <ArrowRightLeft />
                                <span>Move to</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuLabel>
                                        Select the column:
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {Object.values(TaskStatus).map((col) => {
                                        return (
                                            task.status !== col && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        updateTaskStatus(
                                                            task.id,
                                                            col,
                                                        )
                                                    }
                                                    key={col}
                                                >
                                                    <span>{col}</span>
                                                </DropdownMenuItem>
                                            )
                                        );
                                    })}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>

                        {/* Assign to user Sub Menu */}
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <UserPen />
                                <span>Assign to</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuLabel>
                                        Select team member:
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {teamMemberDetails.map((teamMember) => {
                                        return (
                                            teamMember.userID !==
                                                task.assignedToID && (
                                                <DropdownMenuItem
                                                    // onClick={() =>
                                                    //     assignToUser(teamMember.userID)
                                                    // }
                                                    key={teamMember.userID}
                                                >
                                                    <span>
                                                        {teamMember.fullName}
                                                    </span>
                                                </DropdownMenuItem>
                                            )
                                        );
                                    })}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
