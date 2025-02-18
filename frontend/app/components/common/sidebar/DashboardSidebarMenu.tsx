import { Home, Users } from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
    {
        title: "Dashboard",
        url: "#",
        icon: Home,
    },
    // {
    //     title: "Reports",
    //     url: "#",
    //     icon: Inbox,
    // },
    {
        title: "Team",
        url: "#",
        icon: Users,
    },
    // {
    //     title: "Activity",
    //     url: "#",
    //     icon: Search,
    // },
    // {
    //     title: "Settings",
    //     url: "#",
    //     icon: Settings,
    // },
];

export default function DashboardSidebarMenu() {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
