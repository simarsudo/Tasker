import { useEffect, useState } from "react";

import { UserRoles } from "@/common/common";
import { UserData, UserProjects } from "@/common/types";

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

import { Link } from "@remix-run/react";

type Props = {
    isMobile?: boolean;
    userProjectsData: UserProjects;
    projectId: number;
    userData: UserData;
};

function getSidebarProjectsData(projectId: number, projectsData: UserProjects) {
    const currentProject = projectsData.find((project) => {
        if (projectId === project.id) {
            return true;
        }
    })!;

    const projects = projectsData.filter((project) => {
        if (projectId !== project.id) {
            return true;
        }
    });

    return { currentProject, projects };
}

export default function DashboardSidebarHeader({
    isMobile,
    userProjectsData,
    projectId,
    userData,
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
        if (userProjectsData) {
            const { currentProject, projects } = getSidebarProjectsData(
                projectId,
                userProjectsData,
            );

            setCurrentProject(currentProject);
            setProjects(projects);
        }
    }, [userProjectsData]);

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
                            Projects
                        </DropdownMenuLabel>

                        {projects.length > 0 ? (
                            <>
                                <DropdownMenuSeparator />
                                {projects.map((project) => {
                                    return (
                                        <Link
                                            key={project.id}
                                            to={`/dashboard/projects/${project.id}`}
                                        >
                                            <DropdownMenuItem className="gap-2 p-2">
                                                <div className="flex size-6 items-center justify-center overflow-hidden rounded-sm border">
                                                    <img
                                                        src="https://picsum.photos/32?random=4"
                                                        alt={
                                                            project.projectName +
                                                            " logo"
                                                        }
                                                    />
                                                </div>
                                                {project.projectName}
                                                <DropdownMenuShortcut>
                                                    Pro
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </Link>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                {/* Do not show this text to admin user */}
                                {userData.role !== UserRoles.Admin ? (
                                    <DropdownMenuItem
                                        disabled
                                        className="text-sm"
                                    >
                                        No other projects here. 📭
                                    </DropdownMenuItem>
                                ) : null}
                            </>
                        )}

                        {userData.role === UserRoles.Admin ? (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 p-2">
                                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                        <Plus className="size-4" />
                                    </div>
                                    <div className="font-medium text-muted-foreground">
                                        Create project
                                    </div>
                                </DropdownMenuItem>
                            </>
                        ) : null}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
