import { useState } from "react";

import { SignupTabValues } from "@/common/common";
import { SignupData } from "@/common/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AccountInfoForm from "@/components/forms/AccountInfoForm";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import PageWithNavbarWrapper from "@/components/wrappers/PageWithNavbarWrapper";
import { useAuth } from "@/context/auth";
import { useToast } from "@/hooks/use-toast";
import { makeRequest } from "@/lib/utils";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useRevalidator } from "@remix-run/react";
import * as cookie from "cookie";

type Props = {};

export const loader: LoaderFunction = async ({ request }) => {
    const cookies = cookie.parse(request.headers.get("Cookie") || "");
    const authToken = cookies["token"];
    const url = new URL(request.url);
    const invitationToken = url.searchParams.get("token");

    if (authToken) {
        throw new Error("User already logged in");
    }

    const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/get-invitation-details?token=${invitationToken}`,
        {
            method: "GET",
        },
    );

    return {
        invitationData: await response.json(),
        invitationToken: invitationToken,
    };
};

export function ErrorBoundary() {
    const revalidator = useRevalidator();
    const { setIsAuthenticated } = useAuth();
    const { toast } = useToast();

    const logout = () => {
        makeRequest("/auth/logout", {
            method: "POST",
        }).then((response) => {
            if (response.ok || response.status === 401) {
                setIsAuthenticated(false);
                revalidator.revalidate();
            } else {
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: "Please refresh the page or try again later.",
                    variant: "destructive",
                });
            }
        });
    };

    return (
        <PageWithNavbarWrapper className="grid place-content-center text-center">
            <p className="text-lg font-semibold">You are already signed in.</p>
            <p>
                Please{" "}
                <span
                    onClick={logout}
                    className="cursor-pointer font-semibold text-purple-600 underline underline-offset-2"
                >
                    Log out
                </span>{" "}
                to use an invite link.
            </p>
        </PageWithNavbarWrapper>
    );
}

export default function invite({}: Props) {
    const { invitationData, invitationToken } = useLoaderData<typeof loader>();
    const [currentTab, setCurrentTab] = useState(SignupTabValues.AccountInfo);
    const [signupData, setSignupData] = useState({
        email: invitationData.email || "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        contactNumber: "",
    });

    return (
        <PageWithNavbarWrapper className="grid place-content-center">
            <div>
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
                            requestURL="/join-team-using-invite-link"
                            token={invitationToken}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </PageWithNavbarWrapper>
    );
}
