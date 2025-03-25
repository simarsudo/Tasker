import { LucideIcon } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { FollowerPointerBG } from "@/components/wrappers/FollowingPointerWrapper";
import { cn } from "@/lib/utils";

type Props = {
    Icon: LucideIcon;
    description: string;
    pointerTitle: string;
    pointerBGClassName: string;
    pointerClassName: string;
    hoverShadowClassName: string;
    hoverOutlineClassName: string;
};

export default function BenifitsCard({
    Icon,
    description,
    pointerTitle,
    pointerBGClassName,
    pointerClassName,
    hoverShadowClassName,
    hoverOutlineClassName,
}: Props) {
    return (
        <FollowerPointerBG
            title={pointerTitle}
            bgClassName={pointerBGClassName}
            pointerClassName={pointerClassName}
        >
            <Card
                className={cn(
                    "w-56 p-4 shadow-sm transition-all hover:scale-110 hover:shadow-lg 2xl:w-64",
                    hoverShadowClassName,
                    hoverOutlineClassName,
                )}
            >
                <CardHeader>
                    <CardTitle className="grid place-content-center">
                        <Icon className="size-10" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid h-full place-content-center px-2 text-center text-sm font-semibold italic tracking-wider">
                    <CardDescription>{description}</CardDescription>
                </CardContent>
            </Card>
        </FollowerPointerBG>
    );
}
