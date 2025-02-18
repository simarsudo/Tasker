import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar";

import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";

export function DashboardSidebar() {
    const { isMobile } = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Header isMobile={isMobile} />
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <Menu />
            </SidebarContent>
            <SidebarFooter>
                <Footer isMobile={isMobile} />
            </SidebarFooter>
        </Sidebar>
    );
}
