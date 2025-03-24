import { columns, createColumns } from "@/common/tableDefs";
import { DashboardOutlet } from "@/common/types";

import { DataTable } from "@/components/common/DataTable";
import InviteTeamMemberDialogForm from "@/components/forms/InviteTeamMemberDialogForm";
import DashboardWrapper from "@/components/wrappers/DashboardWrapper";
import { RequestOptions, makeRequest } from "@/lib/utils";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request, params }) => {
    const cookieHeader = request.headers.get("Cookie");
    const projectID = params.projectId;

    const options: RequestOptions = {
        headers: {
            Cookie: cookieHeader || "",
        },
    };

    const response = await makeRequest(
        `/get-project-team-members?projectID=${projectID}`,
        options,
    );

    if (!response.ok) {
        if (response.status === 401) {
            throw new Response("Unauthorized", { status: 401 });
        }
        throw new Response(
            `Error fetching project data: ${response.statusText}`,
            { status: response.status },
        );
    }

    return response.json();
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

export default function DashboardTeam() {
    const { teamMembers } = useLoaderData<typeof loader>();
    const { projectId } = useOutletContext<{ projectId: number }>();
    const outlet = useOutletContext<DashboardOutlet>();

    const columns = createColumns(outlet.userDetails.email);

    return (
        <DashboardWrapper className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Your Team Details</h3>
                <InviteTeamMemberDialogForm projectID={projectId} />
            </div>
            <DataTable columns={columns} data={teamMembers} />
        </DashboardWrapper>
    );
}
