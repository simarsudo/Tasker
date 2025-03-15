import { DashboardOutlet, TaskRow } from "@/common/types";

import { BookType, CalendarClock, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import TaskHoverCard from "@/components/cards/TaskHoverCard";
import { TaskTable } from "@/components/tables/TaskTable";
import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useOutletContext } from "@remix-run/react";

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

    return data;
};

export function ErrorBoundary() {
    return (
        <div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center gap-2 text-center">
            <h1 className="font-semibold sm:text-lg">
                😢 Oops! An error occurred while loading the team members.
            </h1>
            <p className="italic">
                Please refresh the page or try again later.{" "}
                <span className="not-italic">🔄</span>
            </p>
        </div>
    );
}

export default function DashboardTasks() {
    const { tasks } = useLoaderData<typeof loader>();
    const context = useOutletContext<DashboardOutlet>();
    console.log(tasks);

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">
                Tasks Assigned to Team Members
            </h2>
            <TaskTable projectId={context.projectId} data={tasks} />
        </div>
    );
}
