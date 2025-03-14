import { DashboardOutlet } from "@/common/types";

import { Separator } from "@/components/ui/separator";

import AddTaskForm from "@/components/forms/AddTaskForm";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request, params }) => {
    const cookieHeader = request.headers.get("Cookie");
    const projectID = params.projectId;

    let data = null;

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
                😢 Oops! An error occurred while loading the data.
            </h1>
            <p className="italic">
                Please refresh the page or try again later.{" "}
                <span className="not-italic">🔄</span>
            </p>
        </div>
    );
}

type Props = {};

export default function AddTask({}: Props) {
    const { teamMembers } = useLoaderData<typeof loader>();
    const { projectId } = useOutletContext<DashboardOutlet>();

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="m-4 w-80 max-w-[30rem] sm:w-full">
                <h1 className="text-xl font-semibold leading-none tracking-tight">
                    Create a New Task
                </h1>
                <h3 className="text-sm text-muted-foreground">
                    Please complete the form to add a new task.
                </h3>
                <div>
                    <Separator className="my-2" />
                </div>
                <AddTaskForm projectID={projectId} teamMembers={teamMembers} />
            </div>
        </div>
    );
}
