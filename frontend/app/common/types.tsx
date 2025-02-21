import {
    Dispatch,
    ForwardRefExoticComponent,
    RefAttributes,
    SetStateAction,
} from "react";

import { LucideProps } from "lucide-react";

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
