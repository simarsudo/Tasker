import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import AccountInfoForm from "~/components/forms/AccountInfoForm";
import PersonalInfoForm from "~/components/forms/PersonalInfoForm";
import { SignupData } from "@/common/types";

export default function Signup() {
    const [currentTab, setCurrentTab] = useState<
        "account-info" | "personal-info"
    >("account-info");

    const [signupData, setSignupData] = useState<SignupData>({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        contactNumber: "",
    });

    const handleInputChange = (
        inputRef: React.RefObject<HTMLInputElement>,
        name: string,
    ) => {
        setSignupData((prev) => ({
            ...prev,
            [name]: inputRef.current?.value || "",
        }));
    };

    const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    // TODO: implement the forms with zod validation
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <Tabs value={currentTab} className="w-96">
                <div className="flex justify-center">
                    <TabsList>
                        <TabsTrigger value="account-info">
                            Account Information
                        </TabsTrigger>
                        <TabsTrigger value="personal-info">
                            Personal Information
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="account-info">
                    <AccountInfoForm
                        handleInputChange={handleInputChange}
                        signupData={signupData}
                        setSignupData={setSignupData}
                        setCurrentTab={setCurrentTab}
                    />
                </TabsContent>
                <TabsContent value="personal-info">
                    <PersonalInfoForm
                        handleInputChange={handleInputChange}
                        setCurrentTab={setCurrentTab}
                        signupData={signupData}
                        setSignupData={setSignupData}
                        handleSignupSubmit={handleSignupSubmit}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
