import { FC } from "react";

import { ColumnProperties, priorityColorClasses } from "@/common/common";
import { TaskRow } from "@/common/types";

import { UserPen } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

type Props = {
    task: TaskRow;
    className?: string;
};

const TaskColumnCard: FC<Props> = ({ task, className }) => {
    // Get the appropriate color class based on task priority
    const beforeColorClass =
        priorityColorClasses[
            task.priority as keyof typeof priorityColorClasses
        ] || "before:bg-gray-300";

    return (
        <Card
            className={cn(
                "relative w-80 overflow-hidden",
                "before:absolute before:left-0 before:top-0 before:block before:h-full before:w-1",
                beforeColorClass,
                className,
            )}
        >
            <CardHeader>
                <CardTitle>{task.taskName}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="line-clamp-2">{task.taskDescription}</p>
            </CardContent>
            <CardFooter>
                <CardDescription className="flex items-center gap-2">
                    <UserPen className="size-4" /> {task.assignedToName}
                </CardDescription>
            </CardFooter>
        </Card>
    );
};

export default TaskColumnCard;
