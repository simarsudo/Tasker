import { CircleCheckBig, CircleGauge, Shapes } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { lucidIconType } from "./types";

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

// TODO: Remove
export const TeamData = {
    0: "Jack The Ripper",
    1: "Jack The Begger",
    2: "Jack the Nigger",
    3: "Jack the Cotton Picker",
};

export type TeamMemberId = keyof typeof TeamData;

export enum TabValues {
    Register = "Register",
    Address = "Address",
    Details = "Details",
}

export const currentUserId: TeamMemberId = 2;
