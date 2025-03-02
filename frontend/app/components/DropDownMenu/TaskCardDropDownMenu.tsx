import { useState } from "react";

import { TeamData, TeamMemberId, currentUserId } from "@/common/common";
import { columnType } from "@/common/types";

import {
    ArrowRightLeft,
    EllipsisVertical,
    Pencil,
    UserPen,
} from "lucide-react";

import { DeleteTaskModal } from "../modals/DeleteTaskModal";
import { Button } from "../ui/button";
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
} from "../ui/dropdown-menu";

type Props = {
    columnData: columnType;
    taskId: number;
    statusId: number;
};

export function TaskCardDropDownMenu({ columnData, taskId, statusId }: Props) {
    const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
    const [openDeleteAlertModel, setOpenDeleteAlertModel] = useState(false);

    const moveToColumn = (columnId: number) => {
        console.log(columnId);
    };

    const assignToUser = (assignToId: TeamMemberId) => {
        console.log(assignToId);
    };

    const closeDeleteTaskModal = () => {
        // Close the menu and alert dialog
        setOpenDeleteAlertModel(false);
        setOpenDropDownMenu(false);
    };

    const handleAction = () => {
        // TODO: Add fetching logic here
        closeDeleteTaskModal();
    };

    return (
        <div
            // Need to stop propogation to DnD so onClick events can fire
            onPointerDown={(e) => e.stopPropagation()}
        >
            <DropdownMenu
                open={openDropDownMenu}
                onOpenChange={(isOpen) => {
                    // Only close the menu if delete dialog box is not open
                    if (!openDeleteAlertModel) {
                        setOpenDropDownMenu(isOpen);
                    }
                }}
            >
                <DropdownMenuTrigger asChild>
                    <Button size="icon">
                        <EllipsisVertical />
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
                                    {columnData &&
                                        columnData.map((col) => {
                                            return (
                                                statusId !== col.columnId && (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            moveToColumn(
                                                                col.columnId,
                                                            )
                                                        }
                                                        key={col.columnId}
                                                    >
                                                        <span>
                                                            {col.columnName}
                                                        </span>
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
                                    {Object.entries(TeamData).map(
                                        ([id, name]) => {
                                            const userId = Number(
                                                id,
                                            ) as TeamMemberId;
                                            return (
                                                userId !== currentUserId && (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            assignToUser(userId)
                                                        }
                                                        key={userId}
                                                    >
                                                        <span>{name}</span>
                                                    </DropdownMenuItem>
                                                )
                                            );
                                        },
                                    )}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        {/* Delete menu item option */}
                        <DeleteTaskModal
                            closeDeleteTaskModal={closeDeleteTaskModal}
                            handleAction={handleAction}
                            openDeleteAlertModel={openDeleteAlertModel}
                            setOpenDeleteAlertModel={setOpenDeleteAlertModel}
                        />
                        <DropdownMenuItem>
                            <Pencil />
                            <span>Edit</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
