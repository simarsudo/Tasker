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
};

const TaskColumnCard: FC<Props> = ({
    task,
    className,
    teamMemberDetails,
    updateTaskStatus,
}) => {
    // Get the appropriate color class based on task priority
    const beforeColorClass =
        priorityColorClasses[
            task.priority as keyof typeof priorityColorClasses
        ] || "before:bg-gray-300";

    return (
        <Card
            className={cn(
                "relative space-y-3 overflow-hidden p-5",
                "before:absolute before:left-0 before:top-0 before:block before:h-1 before:w-full",
                beforeColorClass,
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
                />
            </div>
        </Card>
    );
};

export default TaskColumnCard;
