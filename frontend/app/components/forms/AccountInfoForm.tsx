import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "app/components/ui/card";
import { Link } from "@remix-run/react";
import { SignupData } from "@/common/types";

interface Props {
    setCurrentTab: React.Dispatch<
        React.SetStateAction<"account-info" | "personal-info">
    >;
    signupData: SignupData;
    setSignupData: React.Dispatch<React.SetStateAction<SignupData>>;
    handleInputChange: (
        ref: React.RefObject<HTMLInputElement>,
        name: string,
    ) => void;
}

function AccountInfoForm({
    setCurrentTab,
    signupData,
    handleInputChange,
}: Props) {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const nextTab = (e: React.FormEvent<HTMLFormElement>) => {
        // TODO: Handle confirmPassword false state
        e.preventDefault();
        setCurrentTab("personal-info");
    };

    return (
        <div className="w-full max-w-sm">
            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Sign up</CardTitle>
                        <CardDescription>
                            Please enter your email and password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={nextTab}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        ref={emailRef}
                                        value={signupData.email}
                                        onChange={() =>
                                            handleInputChange(emailRef, "email")
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        ref={passwordRef}
                                        value={signupData.password}
                                        onChange={() =>
                                            handleInputChange(
                                                passwordRef,
                                                "password",
                                            )
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirmPassword">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        required
                                        ref={confirmPasswordRef}
                                        value={signupData.confirmPassword}
                                        onChange={() =>
                                            handleInputChange(
                                                confirmPasswordRef,
                                                "confirmPassword",
                                            )
                                        }
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Next
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Already have an account?{" "}
                                <Link to="/login" className="underline">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default AccountInfoForm;
