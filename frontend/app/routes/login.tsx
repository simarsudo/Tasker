import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/SignupForm";

export default function Page() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="account">Login</TabsTrigger>
                    <TabsTrigger value="password">Sign up</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <LoginForm />
                </TabsContent>
                <TabsContent value="password">
                    <SignupForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
