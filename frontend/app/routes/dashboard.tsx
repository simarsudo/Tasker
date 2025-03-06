import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";

import Navbar from "@/components/common/Navbar";
import { DashboardSidebar } from "@/components/common/sidebar/DashboardSidebar";
import { useRequireAuthentication } from "@/hooks/useRequireAuthentication";
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

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
        projectData: projectData,
    });
};

export default function DashboardLayout() {
    useRequireAuthentication();
    const { defaultOpen, projectData } = useLoaderData<typeof loader>();

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <DashboardSidebar SidebarHeaderData={projectData} />
            <main className="w-full">
                <div>
                    <Navbar showSidebarTrigger={true} />
                    <Separator orientation="vertical" className="h-5" />
                    {/* TODO: Add breadcrumbs */}
                </div>
                <div className="px-4">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    );
}
