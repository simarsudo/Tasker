import { ReactNode } from "react";

import { TaskRow } from "@/common/types";

import TaskColumnCard from "@/components/cards/TaskColumnCard";
import { DraggableWrapper } from "@/components/wrappers/DraggableWrapper";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";

type Props = {
    columnId: string;
    tasks: TaskRow[];
};

export default function TasksColumn({ columnId, tasks }: Props) {
    const { isOver, setNodeRef } = useDroppable({
        id: columnId,
    });

    return (
        <div
            className={cn(
                "flex h-full w-min flex-col gap-2 rounded-md border-2 bg-sidebar-primary-foreground p-2 transition-shadow",
                isOver ? "shadow-2xl" : "",
            )}
            ref={setNodeRef}
        >
            <h2>{columnId}</h2>
            {tasks.map((task) => {
                return (
                    <DraggableWrapper id={task.id} key={task.id}>
                        <TaskColumnCard task={task} />
                    </DraggableWrapper>
                );
            })}
        </div>
    );
}
