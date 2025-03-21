import { TaskRow, TaskStatus } from "@/common/types";

import { Toaster } from "@/components/ui/sonner";

import BoardModeMobile from "./BoardModeMobile";

import TaskColumnCard from "@/components/cards/TaskColumnCard";
import TasksColumn from "@/components/columns/TasksColumn";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

type Props = {
    tasks: TaskRow[];
    activeId: number | null;
    activeTask: TaskRow | null;
    teamMembers: any;
    updateTaskStatus: (taskId: number, newStatus: TaskStatus) => void;
    reassignTask: (taskID: number, teammemberID: number) => void;
    handleDragStart: (event: DragStartEvent) => void;
    handleDragEnd: (event: DragEndEvent) => void;
};

export default function BoardMode({
    tasks,
    activeId,
    teamMembers,
    activeTask,
    updateTaskStatus,
    reassignTask,
    handleDragEnd,
    handleDragStart,
}: Props) {
    const isMobile = useIsMobile();

    return (
        <>
            {isMobile ? (
                <BoardModeMobile
                    tasks={tasks}
                    reassignTask={reassignTask}
                    teamMemberDetails={teamMembers}
                    updateTaskStatus={updateTaskStatus}
                />
            ) : (
                <div className="flex min-h-full w-full flex-col items-center pb-4">
                    <DndContext
                        modifiers={[restrictToWindowEdges]}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <div className="flex min-h-full w-full flex-nowrap justify-around gap-2 overflow-x-auto rounded-lg border bg-sidebar p-4 md:flex-row">
                            {Object.values(TaskStatus).map((status) => {
                                return (
                                    <TasksColumn
                                        teamMemberDetails={teamMembers}
                                        key={status}
                                        columnId={status}
                                        tasks={tasks.filter(
                                            (task: TaskRow) =>
                                                task.status === status,
                                        )}
                                        updateTaskStatus={updateTaskStatus}
                                        reassignTask={reassignTask}
                                    />
                                );
                            })}
                        </div>
                        <DragOverlay>
                            {activeTask && activeId !== null ? (
                                <TaskColumnCard
                                    teamMemberDetails={teamMembers}
                                    className="cursor-grabbing"
                                    task={activeTask}
                                    updateTaskStatus={updateTaskStatus}
                                    reassignTask={reassignTask}
                                />
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                    <Toaster />
                </div>
            )}
        </>
    );
}
