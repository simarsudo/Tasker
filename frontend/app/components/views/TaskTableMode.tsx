import { TaskRow } from "@/common/types";

import { TaskTable } from "@/components/tables/TaskTable";

type Props = {
    projectId: number;
    tasks: TaskRow[];
};

export default function TaskTableMode({ projectId, tasks }: Props) {
    return <TaskTable projectId={projectId} data={tasks} />;
}
