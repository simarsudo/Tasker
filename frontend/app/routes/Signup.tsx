import { useEffect, useState } from "react";

import { SignupTabValues } from "@/common/common";
import { SignupData } from "@/common/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAuth } from "@/context/auth";
import { useNavigate } from "@remix-run/react";
import AccountInfoForm from "~/components/forms/AccountInfoForm";
import PersonalInfoForm from "~/components/forms/PersonalInfoForm";

const initialSignupData = (): SignupData => ({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
});

export default function Signup() {
    const { isAuthenticated } = useAuth();
    const [currentTab, setCurrentTab] = useState(SignupTabValues.AccountInfo);
    const [signupData, setSignupData] = useState(initialSignupData);
    const navigate = useNavigate();

    // TODO: Handle case if user has not finished comnpany registration - maybe ask user
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, []);

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <Tabs value={currentTab} className="w-96">
                <div className="flex justify-center">
                    <TabsList>
                        <TabsTrigger
                            className="cursor-default"
                            value={SignupTabValues.AccountInfo}
                        >
                            Account Information
                        </TabsTrigger>
                        <TabsTrigger
                            className="cursor-default"
                            value={SignupTabValues.PersonalInfo}
                        >
                            Personal Information
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value={SignupTabValues.AccountInfo}>
                    <AccountInfoForm
                        signupData={signupData}
                        setSignupData={setSignupData}
                        setCurrentTab={setCurrentTab}
                    />
                </TabsContent>
                <TabsContent value={SignupTabValues.PersonalInfo}>
                    <PersonalInfoForm
                        setCurrentTab={setCurrentTab}
                        signupData={signupData}
                        setSignupData={setSignupData}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
