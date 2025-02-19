import { ChevronRight, Home, MoreHorizontal, Users } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
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
        <>
            <SidebarGroup>
                <SidebarGroupLabel>Navigation Menu</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton tooltip={item.title} asChild>
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
            <SidebarGroup className="group-data-[collapsible=icon]:opacity-0 transition-opacity duration-400">
                <SidebarGroupLabel>Documentation</SidebarGroupLabel>
                {/* TODO: Make submenu collapsable */}
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Collapsible defaultOpen className="group/collapsible">
                            <CollapsibleTrigger asChild>
                                <div>
                                    <SidebarMenuButton>
                                        <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        <span>Common Docs</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <SidebarMenuAction>
                                                    <MoreHorizontal />
                                                </SidebarMenuAction>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                side="right"
                                                align="start"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <DropdownMenuItem>
                                                    <span>Edit Project</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <span>Delete Project</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </SidebarMenuButton>
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton>
                                            Bruh
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton>
                                            Bruh 2
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </Collapsible>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Collapsible defaultOpen className="group/collapsible">
                            <CollapsibleTrigger asChild>
                                <div>
                                    <SidebarMenuButton>
                                        <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        <span>Project Docs</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <SidebarMenuAction>
                                                    <MoreHorizontal />
                                                </SidebarMenuAction>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                side="right"
                                                align="start"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <DropdownMenuItem>
                                                    <span>Edit Project</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <span>Delete Project</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </SidebarMenuButton>
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <div>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton>
                                                Bruh
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton>
                                                Bruh 2
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </div>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </Collapsible>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        </>
    );
}
