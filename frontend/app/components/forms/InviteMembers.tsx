import { Dispatch, SetStateAction } from "react";

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
import { selectedTab } from "@/routes/create-project";
import { useNavigate } from "@remix-run/react";
import { z } from "zod";

type Props = {
    setCurrentTab: Dispatch<SetStateAction<selectedTab>>;
};

const formSchema = z.object({
    email: z
        .string()
        .nonempty({ message: "Please provide an email address." })
        .email({ message: "The email address entered is not valid." }),
});

export default function InviteMembers({ setCurrentTab }: Props) {
    const navigate = useNavigate();
    const form = useFormValidation(formSchema, {
        email: "",
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Invite Team Member</CardTitle>
                <CardDescription>
                    Enter the email of the team member you want to invite.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Team member email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex w-2/3 gap-2 self-end">
                                <Button
                                    onClick={() => navigate("/dashboard")}
                                    type="button"
                                    className="w-1/2"
                                >
                                    Skip
                                </Button>
                                <Button className="w-1/2" type="submit">
                                    Invite
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
