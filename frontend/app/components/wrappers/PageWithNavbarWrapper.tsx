import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
    children: ReactNode;
    className?: string | undefined;
};

export default function PageWithNavbarWrapper({ children, className }: Props) {
    return (
        <div>
            <div className="fixed left-0 top-0 z-10 flex h-14 w-full items-center border-b-2 bg-black px-2 sm:px-4">
                <div className="-skew-x-3 -skew-y-3 select-none rounded bg-primary px-4 py-0.5 text-lg font-semibold italic text-primary-foreground">
                    <h3 className="skew-x-3 skew-y-3">Tasker</h3>
                </div>
            </div>
            <div
                className={cn(
                    "group/card relative flex h-full min-h-screen w-full items-center justify-center overflow-hidden bg-transparent px-2 pt-2 sm:px-4 sm:pt-4",
                    className,
                )}
            >
                <div className="relative">{children}</div>
            </div>
        </div>
    );
}
