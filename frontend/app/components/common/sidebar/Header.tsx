import { useState } from "react";

import { ChevronsUpDown, Plus } from "lucide-react";

import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

type SidebarHeaderProps = {
    isMobile?: boolean;
};

function Header({ isMobile }: SidebarHeaderProps) {
    const [selectedTeam, setSelectedTeam] =
        useState<keyof typeof teams>("Low Elo Team");

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-8 w-8 overflow-hidden rounded-lg">
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
    );
}

export default Header;
