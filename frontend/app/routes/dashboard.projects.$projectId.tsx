import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";

import Navbar from "@/components/common/Navbar";
import { DashboardSidebar } from "@/components/common/sidebar/DashboardSidebar";
import { useRequireAuthentication } from "@/hooks/useRequireAuthentication";
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const sidebarState = cookieHeader?.includes("sidebar_state=true") ?? false;

    let projectData = null;

    try {
        const response = await fetch(
            `${process.env.BACKEND_URL}/api/v1/get-current-project`,
            {
                headers: {
                    Cookie: cookieHeader || "",
                },
            },
        );

        if (response.ok) {
            projectData = await response.json();
        } else {
            console.log("Failed to fetch project data");
        }
    } catch (error) {
        console.error("Error fetching project data:", error);
    }

    return Response.json({
        defaultOpen: sidebarState,
        userProjectsData: projectData,
    });
};

export default function DashboardLayout() {
    useRequireAuthentication();
    const { projectId } = useParams();
    const { defaultOpen, userProjectsData } = useLoaderData<typeof loader>();
    let projectDoesNotExist = false;

    projectDoesNotExist = !userProjectsData.projects.some(
        (project: { id: number }) => project.id === Number(projectId),
    );

    if (projectDoesNotExist) {
        return (
            <div>
                <Navbar />
                <div className="grid h-[calc(100vh-2.5rem)] w-full place-content-center gap-2 text-center text-lg">
                    <h1 className="font-semibold">
                        Can't find the project you're looking for.
                    </h1>
                    <h1 className="italic">Maybe it's on vacation 🏖️?</h1>
                </div>
            </div>
        );
    }

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <DashboardSidebar
                userProjectsData={userProjectsData.projects}
                projectId={Number(projectId)}
            />
            <main className="w-full">
                <div>
                    <Navbar showSidebarTrigger={true} />
                    <Separator orientation="vertical" className="h-5" />
                    {/* TODO: Add breadcrumbs */}
                </div>
                <div className="px-4">
                    <Outlet context={{ projectId }} />
                </div>
            </main>
        </SidebarProvider>
    );
}
