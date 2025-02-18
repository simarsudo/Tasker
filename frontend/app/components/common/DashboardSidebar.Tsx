import { useState } from "react";

import {
    Bell,
    Calendar,
    ChevronsUpDown,
    CircleUserRound,
    Cog,
    Home,
    LogOut,
    Plus,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    useSidebar,
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
        icon: Calendar,
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

// 32px and 24px
type Team = {
    plan: string;
    image: string;
};

const teams: Record<string, Team> = {
    "Low Elo Team": {
        plan: "Free",
        image: "https://picsum.photos/32?random=1",
    },
    "High Elo Team": {
        plan: "Pro",
        image: "https://picsum.photos/32?random=2",
    },
    "Mid Elo Team": {
        plan: "Standard",
        image: "https://picsum.photos/32?random=3",
    },
    "Elite Team": {
        plan: "Enterprise",
        image: "https://picsum.photos/32?random=4",
    },
};

export function DashboardSidebar() {
    const { isMobile } = useSidebar();
    const [selectedTeam, setSelectedTeam] =
        useState<keyof typeof teams>("Low Elo Team");

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        {/* TODO: Fix icon */}
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src="https://picsum.photos/32?random=2"
                                                alt="Elder"
                                            />
                                            <AvatarFallback className="rounded-lg">
                                                CN
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {selectedTeam}
                                            </span>
                                            <span className="truncate text-xs">
                                                {teams[selectedTeam].plan}
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto" />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                align="start"
                                side={isMobile ? "bottom" : "right"}
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="text-xs text-muted-foreground">
                                    Teams
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {Object.entries(teams).map(
                                    ([teamName, { plan, image }]) => {
                                        if (teamName === selectedTeam) {
                                            return null;
                                        }
                                        return (
                                            <DropdownMenuItem
                                                key={teamName}
                                                className="gap-2 p-2"
                                                onClick={() =>
                                                    setSelectedTeam(teamName)
                                                }
                                            >
                                                <div className="flex size-6 items-center justify-center overflow-hidden rounded-sm border">
                                                    <img
                                                        src={image}
                                                        alt={teamName + " logo"}
                                                    />
                                                </div>
                                                {teamName}
                                                <DropdownMenuShortcut>
                                                    {plan}
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        );
                                    },
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 p-2">
                                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                        <Plus className="size-4" />
                                    </div>
                                    <div className="font-medium text-muted-foreground">
                                        Add team
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
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
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src="https://picsum.photos/32?random=2"
                                            alt="Elder"
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            CN
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            "Elder"
                                        </span>
                                        <span className="truncate text-xs">
                                            "Elder@scrolls.com"
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src="https://picsum.photos/32?random=2"
                                                alt="Elder"
                                            />
                                            <AvatarFallback className="rounded-lg">
                                                CN
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                "Elder"
                                            </span>
                                            <span className="truncate text-xs">
                                                "Elder@scrolls.com"
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <CircleUserRound />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Cog />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
