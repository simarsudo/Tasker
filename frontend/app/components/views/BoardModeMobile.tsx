import { TaskRow, TaskStatus, TeamMemberDetails } from "@/common/types";

import TaskColumnCard from "../cards/TaskColumnCard";

type Props = {
    tasks: TaskRow[];
    teamMemberDetails: TeamMemberDetails[];
    updateTaskStatus: (taskId: number, newStatus: TaskStatus) => void;
    reassignTask: (taskID: number, teammemberID: number) => void;
};

export default function BoardModeMobile({
    tasks,
    reassignTask,
    teamMemberDetails,
    updateTaskStatus,
}: Props) {
    return (
        <div className="space-y-6">
            {Object.values(TaskStatus).map((status) => {
                return (
                    <div key={status} className="space-y-4 p-2">
                        <h2 className="w-min -skew-x-6 text-nowrap bg-violet-700 px-2 py-1 text-lg font-semibold tracking-wide text-white">
                            {status}
                        </h2>
                        <div className="space-y-8">
                            {(() => {
                                const tasksWithStatus = tasks.filter(
                                    (t) => t.status === status,
                                );

                                if (tasksWithStatus.length === 0) {
                                    return (
                                        <p className="text-center italic text-gray-500">
                                            No tasks in this status
                                        </p>
                                    );
                                }

                                return tasksWithStatus.map((task) => (
                                    <TaskColumnCard
                                        key={task.id}
                                        task={task}
                                        reassignTask={reassignTask}
                                        teamMemberDetails={teamMemberDetails}
                                        updateTaskStatus={updateTaskStatus}
                                    />
                                ));
                            })()}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
