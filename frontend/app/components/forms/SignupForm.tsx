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

function LoginForm() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

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
                        <form onSubmit={handleSignupSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        ref={emailRef}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        ref={passwordRef}
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Sign up
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Already have an account?{" "}
                                <a
                                    href="#"
                                    className="underline underline-offset-4"
                                >
                                    Login
                                </a>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default LoginForm;
