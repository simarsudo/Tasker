import { useEffect, useState } from "react";

import { UNEXPECTED_ERROR_MESSAGE } from "@/common/ErrorMsgs";
import { getCookieValue } from "@/common/common";

import { AlertCircle, Loader } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
import useFormValidation from "@/hooks/use-form-validation";
import { makeRequest } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "app/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
});

export default function Page() {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState({
        hasError: false,
        message: "",
    });
    const navigate = useNavigate();
    const form = useFormValidation(loginSchema, {
        email: "",
        password: "",
    });

    useEffect(() => {
        const currentProject = getCookieValue("currentProject");
        if (isAuthenticated && currentProject) {
            const dashboardLink = `/dashboard/projects/${currentProject}`;
            navigate(dashboardLink, { replace: true });
        }
        // TODO: Handle null condition for currentProject
    }, []);

    const handleLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
        setLoading(true);

        try {
            const response = await makeRequest("/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsAuthenticated(true);
                const currentProject = getCookieValue("currentProject");
                const dashboardLink = `/dashboard/projects/${currentProject}`;
                navigate(dashboardLink, { replace: true });
            } else {
                setLoginError({
                    hasError: true,
                    message: data.error,
                });
            }
        } catch (e) {
            setLoginError({
                hasError: true,
                message: UNEXPECTED_ERROR_MESSAGE,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(
                                        handleLoginSubmit,
                                    )}
                                >
                                    <div className="flex flex-col gap-6">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="John@Doe.com"
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
                                                    <FormLabel>
                                                        Password
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
                                        <Button
                                            disabled={loading}
                                            type="submit"
                                            className="w-full"
                                        >
                                            {loading ? (
                                                <Loader className="ml-2 h-5 w-5 animate-spin" />
                                            ) : (
                                                <span>Login</span>
                                            )}
                                        </Button>
                                    </div>
                                    {loginError.hasError ? (
                                        <Alert
                                            variant="destructive"
                                            className="mt-4"
                                        >
                                            <div className="grid grid-cols-[auto,1fr] items-start gap-2">
                                                <AlertCircle className="h-5 w-5" />
                                                <AlertDescription>
                                                    {loginError.message}
                                                </AlertDescription>
                                            </div>
                                        </Alert>
                                    ) : (
                                        ""
                                    )}
                                    <div className="mt-4 text-center text-sm">
                                        Don't have an account?{" "}
                                        <Link
                                            to="/signup"
                                            className="underline"
                                        >
                                            Signup
                                        </Link>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
