import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

import DashboardSidebarFooter from "./DashboardSidebarFooter";
import DashboardSidebarHeader from "./DashboardSidebarHeader";
import DashboardSidebarMenu from "./DashboardSidebarMenu";

export function DashboardSidebar() {
    const { isMobile } = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <DashboardSidebarHeader isMobile={isMobile} />
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <DashboardSidebarMenu />
            </SidebarContent>
            <SidebarFooter>
                <DashboardSidebarFooter isMobile={isMobile} />
            </SidebarFooter>
            <Toaster />
        </Sidebar>
    );
}
