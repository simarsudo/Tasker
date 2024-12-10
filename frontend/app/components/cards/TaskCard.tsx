import { columnType } from "~/common/types";
import { useDraggable } from "@dnd-kit/core";
import { PriorityBadgeMap } from "~/common/common";
import { Badge } from "../ui/badge";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardFooter,
} from "../ui/card";
import { TaskCardDropDownMenu } from "../DropDownMenu/TaskCardDropDownMenu";
import { TeamData, TeamMemberId } from "~/common/common";

type Props = {
    id: number;
    heading: string;
    statusId: number;
    description: string;
    priority: number;
    assignedTo: TeamMemberId;
    columnData: columnType;
};

function TaskCard({
    id,
    heading,
    description,
    priority,
    assignedTo,
    columnData,
    statusId,
}: Props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    const PriorityBadge = PriorityBadgeMap[priority];

    return (
        <Card
            className={`w-96 border border-purple-500 ${
                transform ? "border-orange-600" : ""
            }`}
            style={style}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
            <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="line-clamp-1">{heading}</CardTitle>
                    {PriorityBadge && PriorityBadge}
                </div>
            </CardHeader>
            <CardContent>
                <p className="line-clamp-4">{description}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <Badge className="bg-violet-700">
                    Assigned To: {TeamData[assignedTo]}
                </Badge>
                <TaskCardDropDownMenu
                    statusId={statusId}
                    taskId={id}
                    columnData={columnData}
                />
            </CardFooter>
        </Card>
    );
}

export default TaskCard;
