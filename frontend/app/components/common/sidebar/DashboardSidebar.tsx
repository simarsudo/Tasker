import { SidebarHeaderData } from "@/common/types";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";

import DashboardSidebarFooter from "./DashboardSidebarFooter";
import DashboardSidebarHeader from "./DashboardSidebarHeader";
import DashboardSidebarMenu from "./DashboardSidebarMenu";

type Props = {
    SidebarHeaderData: SidebarHeaderData;
};

export function DashboardSidebar({ SidebarHeaderData }: Props) {
    const { isMobile } = useSidebar();

    const DropDownSkeleton = <Skeleton className="h-12 w-full border-2" />;

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <DashboardSidebarHeader
                    isMobile={isMobile}
                    SidebarHeaderData={SidebarHeaderData}
                />
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
