import { useState } from "react";

import {
    Bell,
    ChevronsUpDown,
    CircleUserRound,
    Cog,
    LogOut,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
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

import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "@remix-run/react";
import { useAuth } from "~/context/auth";
import { makeRequest } from "~/lib/utils";

type Props = {
    isMobile?: boolean;
};

export default function DashboardSidebarFooter({ isMobile }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const { toast } = useToast();

    const logout = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setLoading(true);

        makeRequest("/auth/logout", {
            method: "POST",
        })
            .then((response) => {
                if (response.ok || response.status === 401) {
                    setIsAuthenticated(false);
                    navigate("/login");
                } else {
                    toast({
                        title: "Uh oh! Something went wrong.",
                        description:
                            "Please refresh the page or try again later.",
                        variant: "destructive",
                    });
                }
            })
            .catch((error: any) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
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
                                    Elder
                                </span>
                                <span className="truncate text-xs">
                                    Elder@scrolls.com
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
                                        Elder
                                    </span>
                                    <span className="truncate text-xs">
                                        Elder@scrolls.com
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
                        <DropdownMenuItem
                            disabled={loading}
                            onClick={(e) => logout(e)}
                        >
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
