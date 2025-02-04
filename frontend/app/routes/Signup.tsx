import { useState } from "react";

import { CurrentTab, SignupData } from "@/common/types";
import AccountInfoForm from "~/components/forms/AccountInfoForm";
import PersonalInfoForm from "~/components/forms/PersonalInfoForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const initialSignupData = (): SignupData => ({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
});

export default function Signup() {
    const [currentTab, setCurrentTab] = useState<CurrentTab>("account-info");
    const [signupData, setSignupData] = useState<SignupData>(initialSignupData);

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <Tabs value={currentTab} className="w-96">
                <div className="flex justify-center">
                    <TabsList>
                        <TabsTrigger
                            className="cursor-default"
                            value="account-info"
                        >
                            Account Information
                        </TabsTrigger>
                        <TabsTrigger
                            className="cursor-default"
                            value="personal-info"
                        >
                            Personal Information
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="account-info">
                    <AccountInfoForm
                        signupData={signupData}
                        setSignupData={setSignupData}
                        setCurrentTab={setCurrentTab}
                    />
                </TabsContent>
                <TabsContent value="personal-info">
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
