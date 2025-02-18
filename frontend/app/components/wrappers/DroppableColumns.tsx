import TaskCard from "../cards/TaskCard";
import { Card, CardTitle } from "../ui/card";

import { useDroppable } from "@dnd-kit/core";
import { TeamData, TeamMemberId } from "~/common/common";
import { columnType } from "~/common/types";

type Props = {
    statusId: number;
    name: string;
    tasks: {
        id: number;
        statusId: number;
        statusName: string;
        priority: number;
        assignedTo: TeamMemberId;
        heading: string;
        description: string;
    }[];
    columnData: columnType;
};

function DroppableColumns({ statusId, name, tasks, columnData }: Props) {
    const { isOver, setNodeRef } = useDroppable({
        id: statusId,
    });

    let isOverStyles = "";

    if (isOver) {
        isOverStyles = "bg-rose-500";
    }

    return (
        <Card
            className={`flex min-h-[calc(100vh-20rem)] min-w-[calc(24rem+4rem+4px)] flex-col gap-4 border-2 border-gray-600 px-8 py-6 ${isOverStyles}`}
            ref={setNodeRef}
        >
            <CardTitle className="text-lg capitalize">{name}</CardTitle>
            {tasks.length ? (
                tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        id={task.id}
                        priority={task.priority}
                        heading={task.heading}
                        description={task.description}
                        statusId={task.statusId}
                        assignedTo={task.assignedTo}
                        columnData={columnData}
                    />
                ))
            ) : (
                <div>Bruh</div>
            )}
        </Card>
    );
}

export default DroppableColumns;
