import { CircleCheckBig, CircleGauge, Shapes } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { TaskPriority, TaskStatus, lucidIconType } from "./types";

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

export enum SignupTabValues {
    AccountInfo = "AccountInfo",
    PersonalInfo = "PersonalInfo",
}

export enum TabValues {
    Register = "Register",
    Address = "Address",
    Details = "Details",
}

export function getCookieValue(name: string): string | null {
    const cookies = document.cookie.split(";").reduce(
        (acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
        },
        {} as Record<string, string>,
    );

    // Check both the exact name and lowercase version
    return cookies[name] || cookies[name.toLowerCase()] || null;
}

export const MemberRoles = ["admin", "member"];

export enum UserRoles {
    Admin = "admin",
    Member = "member",
}

export enum ColumnNames {
    NotStarted = TaskStatus.NotStarted,
    InProgress = TaskStatus.InProgress,
    Completed = TaskStatus.Completed,
}

// Map priority to specific predefined classes
export const priorityColorClasses: Record<TaskPriority, string> = {
    [TaskPriority.High]: "bg-red-500",
    [TaskPriority.Medium]: "bg-yellow-500",
    [TaskPriority.Low]: "bg-green-500",
};

export const ColumnProperties: Record<TaskPriority, { color: string }> = {
    [TaskPriority.High]: {
        color: "bg-rose-500",
    },
    [TaskPriority.Medium]: {
        color: "bg-yellow-500",
    },
    [TaskPriority.Low]: {
        color: "bg-gray-500",
    },
};

export enum TasksViewMode {
    BoardMode = "Board mode",
    TableMode = "Table mode",
}
