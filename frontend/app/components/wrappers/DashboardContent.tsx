import React, { ReactNode } from "react";

import Navbar from "@/components/common/Navbar";
import { cn } from "@/lib/utils";

type Props = {
    className?: string | undefined;
    children: ReactNode;
};

export default function DashboardContent({ children, className }: Props) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar />
            <div
                className={cn(
                    "flex h-[calc(100vh-2.5rem)] min-h-max w-full grow flex-col px-2 pt-2 sm:px-4 sm:pt-4",
                    className,
                )}
            >
                {children}
            </div>
        </div>
    );
}
