import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRef } from "react";
import AccountInforForm from "~/components/forms/AccountInfoForm";
import PersonalInfoForm from "~/components/forms/PersonalInfoForm";

export default function Signup() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);

    const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        console.log(email, password);

        fetch("http://127.0.0.1:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <Tabs defaultValue="account-info" className="w-96">
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
                    <AccountInforForm
                        emailRef={emailRef}
                        passwordRef={passwordRef}
                        confirmPasswordRef={confirmPasswordRef}
                    />
                </TabsContent>
                <TabsContent value="personal-info">
                    <PersonalInfoForm
                        firstNameRef={firstNameRef}
                        lastNameRef={lastNameRef}
                        phoneNumberRef={phoneNumberRef}
                        handleSignupSubmit={handleSignupSubmit}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
