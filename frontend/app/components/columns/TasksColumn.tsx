import { TaskRow, TaskStatus, TeamMemberDetails } from "@/common/types";

import { Separator } from "@/components/ui/separator";

import TaskColumnCard from "@/components/cards/TaskColumnCard";
import { DraggableWrapper } from "@/components/wrappers/DraggableWrapper";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";

type Props = {
    columnId: string;
    tasks: TaskRow[];
    teamMemberDetails: TeamMemberDetails[];
    updateTaskStatus: (taskId: number, newStatus: TaskStatus) => void;
    reassignTask: (taskID: number, teammemberID: number) => void;
};

export default function TasksColumn({
    columnId,
    tasks,
    teamMemberDetails,
    updateTaskStatus,
    reassignTask,
}: Props) {
    const { isOver, setNodeRef } = useDroppable({
        id: columnId,
    });

    return (
        <div
            className={cn(
                "flex min-h-full w-80 flex-col gap-2 rounded-md px-1 transition-shadow 2xl:w-96",
                isOver ? "shadow-lg shadow-primary" : "",
            )}
            ref={setNodeRef}
        >
            <h2 className="w-min -skew-x-6 text-nowrap bg-violet-700 px-2 py-1 font-semibold tracking-wide text-white">
                {columnId}
            </h2>
            <Separator className="mb-2 mt-1 rounded bg-gray-500" />
            <div className="space-y-4">
                {tasks.map((task) => {
                    return (
                        <DraggableWrapper id={task.id} key={task.id}>
                            <TaskColumnCard
                                teamMemberDetails={teamMemberDetails}
                                task={task}
                                updateTaskStatus={updateTaskStatus}
                                reassignTask={reassignTask}
                            />
                        </DraggableWrapper>
                    );
                })}
            </div>
        </div>
    );
}
