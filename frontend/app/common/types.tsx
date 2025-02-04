import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type lucidIconType = ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export type columnType = { columnId: number; columnName: string }[];

// Signup page
export type SignupData = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
};

export type CurrentTab = "account-info" | "personal-info";
