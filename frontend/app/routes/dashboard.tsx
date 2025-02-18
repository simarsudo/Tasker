import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { DashboardSidebar } from "~/components/common/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useRequireAuthentication } from "~/hooks/useRequireAuthentication";
import { Separator } from "@/components/ui/separator";

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
                <div className="flex w-full shrink-0 items-center gap-4 border-b-2 p-2">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-5" />
                    {/* TODO: Add breadcrumbs */}
                    <p>Bruh</p>
                </div>
                <Outlet />
            </main>
        </SidebarProvider>
    );
}
