import { useState } from "react";

import { UNEXPECTED_ERROR_MESSAGE } from "@/common/ErrorMsgs";
import { SignupTabValues } from "@/common/common";
import { SignupFormProps } from "@/common/types";

import { AlertCircle, ChevronLeft, Loader } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/context/auth";
import { makeRequest } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
    firstName: z
        .string()
        .min(3, { message: "First name should be at least 3 characters." })
        .max(20, {
            message: "First name should be at most 20 characters.",
        }),
    lastName: z
        .string()
        .min(3, { message: "Last name should be at least 3 characters." })
        .max(20, {
            message: "Last name should be at most 20 characters.",
        }),
    contactNumber: z
        .string()
        .min(10, {
            message: "Contact number should be at least 10 digits.",
        })
        .max(15, {
            message: "Contact number should be at most 15 digits.",
        })
        .regex(/^\+?[1-9]\d{1,14}$/, {
            message: "Invalid contact number.",
        }),
});

function PersonalInfoForm({
    setCurrentTab,
    signupData,
    setSignupData,
}: SignupFormProps) {
    const { setIsAuthenticated } = useAuth();
    const [signupError, setSignupError] = useState({
        hasError: false,
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: signupData,
    });
    const navigate = useNavigate();

    const handleSignupSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        const payloadData = {
            ...signupData,
            ...values,
        };

        setSignupData(payloadData);

        try {
            const response = await makeRequest("/auth/signup", {
                method: "POST",
                body: JSON.stringify(payloadData),
            });

            const data = await response.json();

            if (response.ok) {
                // TODO: Handle successful signup
                setIsAuthenticated(true);
                navigate("/dashboard");
            } else {
                // TODO: Handle multiple errors returned by server edge case
                setSignupError({ hasError: true, message: data.error });
            }
        } catch (error) {
            setSignupError({
                hasError: true,
                message: UNEXPECTED_ERROR_MESSAGE,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm">
            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Sign up</CardTitle>
                        <CardDescription>
                            Please enter your personal information below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSignupSubmit)}
                            >
                                <div className="flex flex-col gap-6">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    First Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Doe"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="contactNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Contact Number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => {
                                                setSignupData((prev) => {
                                                    return {
                                                        ...prev,
                                                        ...form.getValues(),
                                                    };
                                                });
                                                setCurrentTab(
                                                    SignupTabValues.AccountInfo,
                                                );
                                            }}
                                            type="button"
                                            className="w-1/4"
                                        >
                                            <ChevronLeft />
                                            <span>Back</span>
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="w-3/4"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span>Signing up...</span>
                                                    <Loader className="ml-2 h-5 w-5 animate-spin" />
                                                </>
                                            ) : (
                                                <span>Sign up</span>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                                {signupError.hasError ? (
                                    <Alert
                                        variant="destructive"
                                        className="mt-4"
                                    >
                                        <div className="grid grid-cols-[auto,1fr] items-start gap-2">
                                            <AlertCircle className="mt-1 h-5 w-5" />
                                            <AlertDescription>
                                                {signupError.message}
                                            </AlertDescription>
                                        </div>
                                    </Alert>
                                ) : (
                                    ""
                                )}
                                <div className="mt-4 text-center text-sm">
                                    {/* TODO: Add link to terms and service */}
                                    By signing up you agree to our Terms of
                                    Service and Privacy Policy.
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default PersonalInfoForm;
