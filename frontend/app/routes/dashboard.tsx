import { Outlet } from "@remix-run/react";
import { DashboardSidebar } from "@/components/common/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useRequireAuthentication } from "~/hooks/useRequireAuthentication";

export default function DashboardLayout() {
    useRequireAuthentication();

    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main>
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    );
}
