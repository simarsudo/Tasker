import { Dispatch, SetStateAction } from "react";

import { getCookieValue } from "@/common/common";

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
import { useToast } from "@/hooks/use-toast";
import { makeRequest } from "@/lib/utils";
import { selectedTab } from "@/routes/create-project";
import { useNavigate } from "@remix-run/react";
import { z } from "zod";

type Props = {
    setCurrentTab: Dispatch<SetStateAction<selectedTab>>;
};

const formSchema = z.object({
    projectName: z.string().min(3, {
        message: "Project name must be at least 3 characters long.",
    }),
    projectDescription: z.string().min(10, {
        message: "Project description must be at least 10 characters long.",
    }),
});

export default function CreateProjectForm({ setCurrentTab }: Props) {
    const form = useFormValidation(formSchema, {
        projectDescription: "",
        projectName: "",
    });
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        makeRequest("/create-project", {
            method: "POST",
            body: JSON.stringify(values),
        }).then((r) => {
            const currentProject = getCookieValue("currentProject");
            if (r.ok && currentProject) {
                const dashboardLink = `/dashboard/projects/${currentProject}`;
                navigate(dashboardLink, { replace: true });
                // TODO: Handle null condition for currentProject
            } else {
                toast({
                    title: "Oops!",
                    description:
                        "Something went wrong. Maybe try turning it off and on again?",
                    variant: "destructive",
                });
            }
        });
    };

    return (
        <Card className="w-full">
            <CardHeader className="w-full">
                <CardTitle className="text-2xl">Create Project</CardTitle>
                <CardDescription>
                    Let's create your first project by filling out the details
                    below.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="projectName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="projectDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Project Description
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-1/2 self-end">Create</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
