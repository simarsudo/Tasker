import { useDroppable } from "@dnd-kit/core";
import { Card, CardTitle } from "../ui/card";
import TaskCard from "../cards/TaskCard";

type Props = {
  statusId: number;
  name: string;
  tasks: {
    id: number;
    statusId: number;
    statusName: string;
    priority: number;
    assignedTo: string;
    heading: string;
    description: string;
  }[];
};

function DroppableColumns({ statusId, name, tasks }: Props) {
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
            status={task.statusId}
            assignedTo={task.assignedTo}
          />
        ))
      ) : (
        <div>Bruh</div>
      )}
    </Card>
  );
}

export default DroppableColumns;
