import { TaskRow, TeamMemberDetails } from "@/common/types";

import { Separator } from "@/components/ui/separator";

import TaskColumnCard from "@/components/cards/TaskColumnCard";
import { DraggableWrapper } from "@/components/wrappers/DraggableWrapper";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";

type Props = {
    columnId: string;
    tasks: TaskRow[];
    teamMemberDetails: TeamMemberDetails[];
};

export default function TasksColumn({
    columnId,
    tasks,
    teamMemberDetails,
}: Props) {
    const { isOver, setNodeRef } = useDroppable({
        id: columnId,
    });

    return (
        <div
            className={cn(
                "flex h-full w-80 flex-col gap-2 rounded-md px-1 transition-shadow 2xl:w-96",
                isOver ? "shadow-xl" : "",
            )}
            ref={setNodeRef}
        >
            <h2 className="w-min text-nowrap rounded-2xl bg-violet-700 px-2 py-1 text-sm font-semibold text-white">
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
                            />
                        </DraggableWrapper>
                    );
                })}
            </div>
        </div>
    );
}
