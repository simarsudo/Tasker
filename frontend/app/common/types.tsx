import {
    Dispatch,
    ForwardRefExoticComponent,
    RefAttributes,
    SetStateAction,
} from "react";

import { SignupTabValues, TabValues, UserRoles } from "@/common/common";

import { LucideProps } from "lucide-react";

export type lucidIconType = ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export type columnType = { columnId: number; columnName: string }[];

// Signup page URL-> /signup
export type SignupData = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
};

export type SignupFormProps = {
    signupData: SignupData;
    setCurrentTab: Dispatch<SetStateAction<SignupTabValues>>;
    setSignupData: Dispatch<SetStateAction<SignupData>>;
};

// Registration form URL -> /register
export type CompanyInfo = {
    companyName: string;
    website: string;
    emailDomain: string;
    companySize: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    contactPersonName: string;
    contactPersonRole: string;
    contactPersonEmail: string;
    contactPersonPhone: string;
};

export type CompanyInfoDispatch = Dispatch<SetStateAction<CompanyInfo>>;

export type CompanyRegistrationFormProps = {
    setCurrentTab: Dispatch<SetStateAction<TabValues>>;
    companyInfo: CompanyInfo;
    setCompanyInfo: CompanyInfoDispatch;
};

export type UserProjects = {
    id: number;
    projectName: string;
}[];

export type UserData = {
    fullName: string;
    email: string;
    role: string;
};

export type DashboardOutlet = {
    userEmail: string;
    userRole: UserRoles;
    projectId: number;
};

export type TaskStatus = "Not Started" | "In progress" | "Finished";

export type TaskPriority = "High" | "Medium" | "Low";

export type TaskRow = {
    id: number;
    taskName: string;
    taskDescription: string;
    assignedToName: string;
    createdAt: string;
    dueDate: string;
    createdByName: string;
    status: TaskStatus;
    priority: TaskPriority;
};
