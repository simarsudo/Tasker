import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
    children: ReactNode;
    className?: string | undefined;
};

export default function PageWithNavbarWrapper({ children, className }: Props) {
    return (
        <div>
            <div className="fixed left-0 top-0 z-10 flex h-10 w-full items-center border-b-2 bg-white px-2 sm:px-4">
                <h3 className="text-lg font-semibold italic">Tasker</h3>
            </div>
            <div
                className={cn(
                    "mt-10 h-[calc(100vh-2.5rem)] px-2 pt-2 sm:px-4 sm:pt-4",
                    className,
                )}
            >
                {children}
            </div>
        </div>
    );
}
