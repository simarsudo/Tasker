import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
    children: ReactNode;
    className?: string;
};

export default function DashboardWrapper({ children, className }: Props) {
    return (
        <div className="flex justify-center">
            <div
                className={cn(
                    "flex min-h-full w-full max-w-screen-2xl flex-col gap-2",
                    className,
                )}
            >
                {children}
            </div>
        </div>
    );
}
