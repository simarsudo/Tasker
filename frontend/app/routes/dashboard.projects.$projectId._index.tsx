import { useState } from "react";

import { ColumnNames, TasksViewMode } from "@/common/common";
import { DashboardOutlet, TaskRow, TaskStatus } from "@/common/types";

import { FolderKanban, Table2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import BoardMode from "@/components/views/BoardMode";
import TaskTableMode from "@/components/views/TaskTableMode";
import DashboardWrapper from "@/components/wrappers/DashboardWrapper";
import { makeRequest } from "@/lib/utils";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { toast } from "sonner";

export const loader: LoaderFunction = async ({ request, params }) => {
    const cookieHeader = request.headers.get("Cookie");
    const projectID = params.projectId;

    let data = null;

    try {
        const response = await fetch(
            `${process.env.BACKEND_URL}/api/v1/get-project-tasks?projectID=${projectID}`,
            {
                headers: {
                    Cookie: cookieHeader || "",
                },
            },
        );

        if (response.ok) {
            data = await response.json();
        } else {
            throw new Error(
                `Error fetching project data: ${response.statusText}`,
            );
        }
    } catch (error) {
        throw new Response("Failed to load team members", { status: 500 });
    }

    let teamMembers = null;

    try {
        const response = await fetch(
            `${process.env.BACKEND_URL}/api/v1/get-project-team-members?projectID=${projectID}&onlyNames=1`,
            {
                headers: {
                    Cookie: cookieHeader || "",
                },
            },
        );

        if (response.ok) {
            teamMembers = await response.json();
        } else {
            throw new Error(
                `Error fetching project data: ${response.statusText}`,
            );
        }
    } catch (error) {
        throw new Response("Failed to load team members", { status: 500 });
    }

    return { data, teamMembers: teamMembers.teamMembers };
};

export function ErrorBoundary() {
    return (
        <div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center gap-2 text-center">
            <h1 className="font-semibold sm:text-lg">
                😢 Oops! An error occurred while loading the your project data.
            </h1>
            <p className="italic">
                Please refresh the page or try again later.{" "}
                <span className="not-italic">🔄</span>
            </p>
        </div>
    );
}

export default function Project() {
    const { data, teamMembers } = useLoaderData<typeof loader>();
    const [taskViewMode, setTaskViewMode] = useState(TasksViewMode.TableMode);
    const [tasks, setTasks] = useState<TaskRow[]>(data?.tasks || []);
    const [activeId, setActiveId] = useState<number | null>(null);
    const [activeTask, setActiveTask] = useState<TaskRow | null>(null);
    const context = useOutletContext<DashboardOutlet>();

    function updateTaskStatus(taskId: number, newStatus: TaskStatus) {
        // Update state locally
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === taskId
                    ? { ...task, status: newStatus as any }
                    : task,
            ),
        );

        // Updating state on server
        makeRequest("/update-task-status", {
            method: "POST",
            body: JSON.stringify({
                id: taskId,
                status: newStatus,
            }),
        }).then(async (r) => {
            if (r.ok) {
                toast.success(`Status updated to ${newStatus}.`);
            } else {
                toast.error("Failed to update task status. Please try again.");
            }
        });
    }

    function reassignTask(taskID: number, teammemberID: number) {
        makeRequest("/reassign-task", {
            method: "POST",
            body: JSON.stringify({
                id: taskID,
                assignToID: teammemberID,
            }),
        }).then(async (r) => {
            if (r.ok) {
                const data = await r.json();

                setTasks((currentTasks) =>
                    currentTasks.map((task) =>
                        task.id === taskID
                            ? {
                                  ...task,
                                  assignedToName: data.assignedToName,
                                  assignedToID: data.assignedToID,
                              }
                            : task,
                    ),
                );
                toast.success(`Task successfully reassigned.`);
            } else {
                toast.error("Failed to reassign task. Please try again.");
            }
        });
    }

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        setActiveId(active.id as number);

        const taskBeingDragged = tasks.find((task) => task.id === active.id);
        setActiveTask(taskBeingDragged || null);
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id;
        const destinationColumn = over.id;

        const existingTask = tasks.find((task) => task.id === taskId);

        // If the task is dropped in the same column
        if (existingTask && existingTask.status === destinationColumn) {
            return;
        }

        if (Object.values(ColumnNames).includes(destinationColumn as any)) {
            updateTaskStatus(taskId as number, destinationColumn as TaskStatus);

            // Clear drag state
            setActiveId(null);
            setActiveTask(null);
        }
    }

    // Simple loading check
    if (!tasks || tasks.length === 0) {
        return (
            <div className="flex h-48 items-center justify-center">
                <p>No tasks found for this project.</p>
            </div>
        );
    }

    return (
        <DashboardWrapper>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Tasks Assigned to Team Members
                </h2>
                <Button
                    size="icon"
                    variant="ghost"
                    className="[&_svg]:size-5"
                    onClick={() =>
                        setTaskViewMode(
                            taskViewMode === TasksViewMode.TableMode
                                ? TasksViewMode.BoardMode
                                : TasksViewMode.TableMode,
                        )
                    }
                >
                    {taskViewMode === TasksViewMode.TableMode ? (
                        <FolderKanban />
                    ) : (
                        <Table2 />
                    )}
                </Button>
            </div>
            {taskViewMode === TasksViewMode.TableMode ? (
                <TaskTableMode projectId={context.projectId} tasks={tasks} />
            ) : (
                <BoardMode
                    activeId={activeId}
                    activeTask={activeTask}
                    handleDragEnd={handleDragEnd}
                    handleDragStart={handleDragStart}
                    reassignTask={reassignTask}
                    tasks={tasks}
                    teamMembers={teamMembers}
                    updateTaskStatus={updateTaskStatus}
                />
            )}
        </DashboardWrapper>
    );
}
