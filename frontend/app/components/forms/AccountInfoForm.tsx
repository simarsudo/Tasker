import { SignupTabValues } from "@/common/common";
import { SignupFormProps } from "@/common/types";

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

import useFormValidation from "@/hooks/use-form-validation";
import { Link } from "@remix-run/react";
import { z } from "zod";

const formSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, {
            message: "Password should be at least 8 characters.",
        }),
        confirmPassword: z.string().min(8, {
            message: "Password should be at least 8 characters.",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

interface AccountInfoFormProps extends SignupFormProps {
    cardHeader?: string;
    cardDescription?: string;
}

function AccountInfoForm({
    setCurrentTab,
    signupData,
    setSignupData,
    cardHeader,
    cardDescription,
}: AccountInfoFormProps) {
    const form = useFormValidation(formSchema, signupData);

    const nextTab = (values: z.infer<typeof formSchema>) => {
        setSignupData((prev) => {
            return { ...prev, ...values };
        });
        setCurrentTab(SignupTabValues.PersonalInfo);
    };

    return (
        <div className="w-full max-w-sm">
            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            {cardHeader ? cardHeader : "Sign up"}
                        </CardTitle>
                        <CardDescription>
                            {cardDescription
                                ? cardDescription
                                : "Please enter your email and password"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(nextTab)}>
                                <div className="flex flex-col gap-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={
                                                            !!signupData.email
                                                        }
                                                        placeholder="john@Doe.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Confirm Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
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
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default AccountInfoForm;
