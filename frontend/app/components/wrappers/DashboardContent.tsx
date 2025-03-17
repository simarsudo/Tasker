import React, { ReactNode } from "react";

import Navbar from "@/components/common/Navbar";
import { cn } from "@/lib/utils";

type Props = {
    className?: string | undefined;
    children: ReactNode;
};

export default function DashboardContent({ children, className }: Props) {
    return (
        <div>
            <Navbar />
            <div
                className={cn(
                    "h-[calc(100vh-2.5rem)] px-2 pt-2 sm:px-4 sm:pt-4",
                    className,
                )}
            >
                {children}
            </div>
        </div>
    );
}
