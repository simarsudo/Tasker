import { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { AlertCircle, Loader } from "lucide-react";

import { Link } from "@remix-run/react";
import { makeRequest } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { UNEXPECTED_ERROR_MESSAGE } from "@/common/ErrorMsgs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "app/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
});

export default function Page() {
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState({
        hasError: false,
        message: "",
    });
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

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
                navigate("/dashboard");
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
