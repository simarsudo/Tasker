import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DroppableColumns from "~/components/wrappers/DroppableColumns";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const FakeData = [
  // Column 1: "Backlog"
  {
    id: 1,
    statusId: 0,
    statusName: "Backlog",
    priority: 1,
    assignedTo: "Alice",
    heading: "Research Competitors",
    description:
      "Analyze competitors' features and design to identify gaps and opportunities.",
  },
  {
    id: 2,
    statusId: 0,
    statusName: "Backlog",
    priority: 2,
    assignedTo: "Bob",
    heading: "Gather Requirements",
    description:
      "Collaborate with stakeholders to document detailed project requirements.",
  },
  {
    id: 3,
    statusId: 0,
    statusName: "Backlog",
    priority: 0,
    assignedTo: "Charlie",
    heading: "Plan Sprint Goals",
    description:
      "Create a plan for the first sprint and identify high-priority tasks.",
  },

  // Column 2: "In Progress"
  {
    id: 4,
    statusId: 1,
    statusName: "In Progress",
    priority: 1,
    assignedTo: "Alice",
    heading: "Develop Login Feature",
    description:
      "Implement and test the login functionality with form validation.",
  },
  {
    id: 5,
    statusId: 1,
    statusName: "In Progress",
    priority: 2,
    assignedTo: "Bob",
    heading: "Build User Dashboard",
    description:
      "Design and code the main user dashboard with responsive layout.",
  },
  {
    id: 6,
    statusId: 1,
    statusName: "In Progress",
    priority: 0,
    assignedTo: "Charlie",
    heading: "Setup DevOps Pipeline",
    description:
      "Configure CI/CD pipelines for automated builds and deployments.",
  },

  // Column 3: "Testing"
  {
    id: 7,
    statusId: 2,
    statusName: "Testing",
    priority: 1,
    assignedTo: "Alice",
    heading: "Unit Test Login",
    description:
      "Write unit tests for login feature to ensure correct functionality.",
  },
  {
    id: 8,
    statusId: 2,
    statusName: "Testing",
    priority: 2,
    assignedTo: "Bob",
    heading: "Verify Dashboard Design",
    description:
      "Perform cross-browser and device testing for the dashboard UI.",
  },

  // Column 4: "Completed"
  {
    id: 9,
    statusId: 3,
    statusName: "Completed",
    priority: 1,
    assignedTo: "Charlie",
    heading: "Create Wireframes",
    description:
      "Designed wireframes for the app's key features and navigation flow.",
  },
  {
    id: 10,
    statusId: 3,
    statusName: "Completed",
    priority: 2,
    assignedTo: "Alice",
    heading: "Setup Project Repository",
    description:
      "Initialized the Git repository and setup branch structure for the team.",
  },
  {
    id: 11,
    statusId: 3,
    statusName: "Completed",
    priority: 0,
    assignedTo: "Bob",
    heading: "Optimize Database Queries",
    description:
      "Improved the performance of key database queries for faster response times.",
  },
];

type columnType = { columnId: number; columnName: string }[];

export default function Index() {
  const [tasks, setTasks] = useState(FakeData);
  const [columns, setColumns] = useState<columnType>([]);

  useEffect(() => {
    const uniqueColumns = Array.from(
      new Map(
        FakeData.map((task) => [
          task.statusId,
          { columnId: task.statusId, columnName: task.statusName },
        ]),
      ).values(),
    );
    setColumns(uniqueColumns);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex items-center justify-center gap-16">
          {columns.map((column) => (
            <DroppableColumns
              key={column.columnId}
              statusId={column.columnId}
              name={column.columnName}
              tasks={tasks.filter((task) => task.statusId === column.columnId)}
            ></DroppableColumns>
          ))}
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskIndex = tasks.findIndex((task) => task.id === active.id);

    setTasks((prev) => {
      const prevTasks = [...prev];

      if (taskIndex != -1) {
        tasks[taskIndex].statusId = Number(over.id);
      }

      return prevTasks;
    });
  }
}
