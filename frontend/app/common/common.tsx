import { CircleGauge, CircleCheckBig, Shapes } from "lucide-react";
import { lucidIconType } from "./types";
import { Badge } from "~/components/ui/badge";

export const StatusIconMap: { [key: number]: lucidIconType } = {
    0: Shapes,
    1: CircleGauge,
    2: CircleCheckBig,
};

// Define the type of Priority object
export const PriorityBadgeMap: { [key: number]: JSX.Element } = {
    0: <Badge className="bg-rose-500">Important</Badge>,
    1: <Badge className="bg-orange-500">Normal</Badge>,
    2: <Badge className="bg-neutral-500">Low</Badge>,
};
