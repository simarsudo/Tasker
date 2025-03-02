import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import Navbar from "@/components/common/Navbar";
import { DashboardSidebar } from "@/components/common/sidebar/DashboardSidebar";
import { useRequireAuthentication } from "@/hooks/useRequireAuthentication";
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
    const cookieHeader = request.headers.get("Cookie");
    const sidebarState = cookieHeader?.includes("sidebar_state=true") ?? false;

    return new Response(JSON.stringify({ defaultOpen: sidebarState }), {
        headers: { "Content-Type": "application/json" },
    });
};

export default function DashboardLayout() {
    useRequireAuthentication();
    const { defaultOpen } = useLoaderData<typeof loader>();

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <DashboardSidebar />
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
