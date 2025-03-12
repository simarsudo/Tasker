import { UserProjects } from "@/common/types";
import { UserData } from "@/common/types";

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

type Props = {
    userProjectsData: UserProjects;
    projectId: number;
    userData: UserData;
};

export function DashboardSidebar({
    userProjectsData,
    projectId,
    userData,
}: Props) {
    const { isMobile } = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <DashboardSidebarHeader
                    isMobile={isMobile}
                    userProjectsData={userProjectsData}
                    projectId={projectId}
                    userData={userData}
                />
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <DashboardSidebarMenu />
            </SidebarContent>
            <SidebarFooter>
                <DashboardSidebarFooter
                    userData={userData}
                    isMobile={isMobile}
                />
            </SidebarFooter>
            <Toaster />
        </Sidebar>
    );
}
