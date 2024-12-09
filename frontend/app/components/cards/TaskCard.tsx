import { useDraggable } from "@dnd-kit/core";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { PriorityBadgeMap } from "~/common/common";

type Props = {
  heading: string;
  status: number;
  description: string;
  priority: number;
  id: number;
  assignedTo: string;
};

function TaskCard({ heading, description, id, priority, assignedTo }: Props) {
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
          <CardTitle>{heading}</CardTitle>
          {PriorityBadge && PriorityBadge}
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Badge className="bg-violet-700">Assigned To: {assignedTo}</Badge>
      </CardFooter>
    </Card>
  );
}

export default TaskCard;
