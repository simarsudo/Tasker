import { DashboardOutlet } from "@/common/types";

import { Link } from "lucide-react";

import { SidebarProvider } from "@/components/ui/sidebar";

import Navbar from "@/components/common/Navbar";
import { DashboardSidebar } from "@/components/common/sidebar/DashboardSidebar";
import DashboardContent from "@/components/wrappers/DashboardContent";
import PageWithNavbarWrapper from "@/components/wrappers/PageWithNavbarWrapper";
import { useRequireAuthentication } from "@/hooks/useRequireAuthentication";
import { RequestOptions, makeRequest } from "@/lib/utils";
import { LoaderFunction } from "@remix-run/node";
import { Outlet, redirect, useLoaderData, useParams } from "@remix-run/react";
import * as cookie from "cookie";

export const loader: LoaderFunction = async ({ request, params }) => {
    const cookieHeader = request.headers.get("Cookie");
    const sidebarState = cookieHeader?.includes("sidebar_state=true") ?? false;
    const cookies = cookie.parse(request.headers.get("Cookie") || "");
    const token = cookies["token"];
    const projectID = params.projectId;

    if (!token) {
        return redirect("/login");
    }

    const options: RequestOptions = {
        headers: {
            Cookie: cookieHeader || "",
        },
    };

    const response = await makeRequest(
        `/get-current-project/${projectID}`,
        options,
    );

    if (!response.ok) {
        if (response.status === 401) {
            throw new Response("Unauthorized", { status: 401 });
        }
        throw new Response(
            `Error fetching project data: ${response.statusText}`,
            {
                status: response.status || 500,
            },
        );
    }

    const projectData = await response.json();

    return {
        defaultOpen: sidebarState,
        userProjectsData: projectData,
        userData: projectData.userData,
    };
};

export function ErrorBoundary() {
    return (
        <PageWithNavbarWrapper className="grid place-content-center text-center">
            <p className="text-lg font-semibold">
                Looks like there is some error.
            </p>
            <p>
                Please refresh the page or <Link to="/login">Login</Link> again
            </p>
        </PageWithNavbarWrapper>
    );
}

export default function DashboardLayout() {
    useRequireAuthentication();
    const { projectId } = useParams();
    const { defaultOpen, userProjectsData, userData } =
        useLoaderData<typeof loader>();

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
                userData={userData}
            />
            <main className="w-full overflow-x-hidden">
                <DashboardContent>
                    <Outlet
                        context={
                            {
                                userDetails: userData,
                                projectId: Number(projectId),
                            } as DashboardOutlet
                        }
                    />
                </DashboardContent>
            </main>
        </SidebarProvider>
    );
}
