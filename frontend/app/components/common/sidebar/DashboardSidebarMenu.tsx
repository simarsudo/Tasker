import {
    ChevronRight,
    FileCheck2,
    Home,
    MoreHorizontal,
    Users,
} from "lucide-react";

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
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

import { NavLink, useParams } from "@remix-run/react";
import { Link } from "@remix-run/react";

export default function DashboardSidebarMenu() {
    const { projectId } = useParams();

    const items = [
        {
            title: "Board",
            url: `/dashboard/projects/${projectId}`,
            icon: Home,
        },
        {
            title: "Tasks",
            url: `/dashboard/projects/${projectId}/tasks`,
            icon: FileCheck2,
        },
        {
            title: "Team",
            url: `/dashboard/projects/${projectId}/team`,
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

    return (
        <>
            <SidebarGroup>
                <SidebarGroupLabel>
                    <p>Project Menu</p>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton tooltip={item.title} asChild>
                                    <NavLink to={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            {/* <SidebarGroup className="duration-400 transition-opacity group-data-[collapsible=icon]:opacity-0">
                <SidebarGroupLabel>
                    {isLoading ? (
                        <Skeleton className="h-4 w-2/3" />
                    ) : (
                        <p>Documentation</p>
                    )}
                </SidebarGroupLabel>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Collapsible
                            defaultOpen={false}
                            className="group/collapsible"
                        >
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
                        <Collapsible
                            defaultOpen={false}
                            className="group/collapsible"
                        >
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
            </SidebarGroup> */}
        </>
    );
}
