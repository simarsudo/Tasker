import { FC } from "react";

import { priorityColorClasses } from "@/common/common";
import { TaskRow, TaskStatus, TeamMemberDetails } from "@/common/types";

import { UserPen } from "lucide-react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import { TaskCardDropDownMenu } from "@/components/DropDownMenu/TaskCardDropDownMenu";
import { cn } from "@/lib/utils";

type Props = {
    task: TaskRow;
    className?: string;
    teamMemberDetails: TeamMemberDetails[];
    updateTaskStatus: (taskId: number, newStatus: TaskStatus) => void;
    reassignTask: (taskID: number, teammemberID: number) => void;
};

const TaskColumnCard: FC<Props> = ({
    task,
    className,
    teamMemberDetails,
    updateTaskStatus,
    reassignTask,
}) => {
    // Get the priority key
    const priorityKey = task.priority as keyof typeof priorityColorClasses;

    // Get the color based on priority
    const baseColorClass = priorityColorClasses[priorityKey] || "bg-gray-300";

    return (
        <div className="group relative">
            {/* Priority badge */}
            <span
                className={cn(
                    "absolute -top-5 right-3 text-nowrap rounded-t-sm px-2 py-0.5 text-xs font-semibold tracking-wide",
                    baseColorClass,
                )}
            >
                {task.priority}
            </span>
            <Card
                className={cn(
                    "relative space-y-3 overflow-hidden border-t-0 px-5 pb-4 pt-5",
                    className,
                )}
            >
                <CardTitle>{task.taskName}</CardTitle>
                <CardDescription>
                    <p className="line-clamp-3">{task.taskDescription}</p>
                </CardDescription>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm">
                        <UserPen className="size-4" /> {task.assignedToName}
                    </span>
                    <TaskCardDropDownMenu
                        teamMemberDetails={teamMemberDetails}
                        task={task}
                        updateTaskStatus={updateTaskStatus}
                        reassignTask={reassignTask}
                    />
                </div>
                {/* Color bar at top */}
                <span
                    className={cn(
                        "absolute -top-3 left-0 h-1 w-full",
                        baseColorClass,
                    )}
                />
            </Card>
        </div>
    );
};

export default TaskColumnCard;
