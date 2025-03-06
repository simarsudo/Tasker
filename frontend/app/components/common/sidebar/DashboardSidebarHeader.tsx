import { useEffect, useState } from "react";

import { SidebarHeaderData } from "@/common/types";

import { ChevronsUpDown, Plus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

type Props = {
    isMobile?: boolean;
    SidebarHeaderData: SidebarHeaderData;
};

function getSidebarProjectsData(data: SidebarHeaderData) {
    const currentProject = data.projects.find((project) => {
        if (data.currentProjectID === project.id) {
            return true;
        }
    })!;
    const projects = data.projects.filter((project) => {
        if (data.currentProjectID !== project.id) {
            return true;
        }
    });

    return { currentProject, projects };
}

export default function DashboardSidebarHeader({
    isMobile,
    SidebarHeaderData,
}: Props) {
    const [currentProject, setCurrentProject] = useState<{
        id: number;
        projectName: string;
    }>({
        id: 0,
        projectName: "",
    });
    const [projects, setProjects] = useState<
        { id: number; projectName: string }[]
    >([]);

    useEffect(() => {
        if (SidebarHeaderData) {
            const { currentProject, projects } =
                getSidebarProjectsData(SidebarHeaderData);

            setCurrentProject(currentProject);
            setProjects(projects);
        }
    }, [SidebarHeaderData]);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
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
                                    {currentProject.projectName}
                                </span>
                                <span className="truncate text-xs">Pro</span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
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

                        {projects.map((project) => {
                            return (
                                <DropdownMenuItem
                                    key={project.id}
                                    className="gap-2 p-2"
                                    onClick={() => {
                                        const { currentProject, projects } =
                                            getSidebarProjectsData({
                                                currentProjectID: project.id,
                                                projects:
                                                    SidebarHeaderData.projects,
                                            });

                                        setCurrentProject(currentProject);
                                        setProjects(projects);
                                    }}
                                >
                                    <div className="flex size-6 items-center justify-center overflow-hidden rounded-sm border">
                                        <img
                                            src="https://picsum.photos/32?random=4"
                                            alt={project.projectName + " logo"}
                                        />
                                    </div>
                                    {project.projectName}
                                    <DropdownMenuShortcut>
                                        Pro
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            );
                        })}
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
