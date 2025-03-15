import { CalendarClock } from "lucide-react";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";

type Props = {
    task: {
        taskName: string;
        taskDescription: string;
        createdAt: string;
    };
};

export default function TaskHoverCard({ task }: Props) {
    return (
        <HoverCard openDelay={0}>
            <HoverCardTrigger className="cursor-pointer font-medium underline underline-offset-4">
                {task.taskName}
            </HoverCardTrigger>
            <HoverCardContent align="start" className="space-y-2">
                <p className="font-semibold italic">{task.taskName}</p>
                <Separator />
                <p className="line-clamp-5 text-muted-foreground">
                    {task.taskDescription}
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm">
                    <CalendarClock className="h-4 w-4" />
                    {task.createdAt}
                </p>
            </HoverCardContent>
        </HoverCard>
    );
}
