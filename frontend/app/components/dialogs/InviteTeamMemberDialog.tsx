import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import useFormValidation from "@/hooks/use-form-validation";
import { makeRequest } from "@/lib/utils";
import { z } from "zod";

const MemberRole = ["admin", "member"];

const formSchema = z.object({
    email: z.string().email().nonempty(),
    role: z.string().refine((val) => val !== "", {
        message: "Please select a role",
    }),
});

export default function InviteTeamMemberDialog() {
    const form = useFormValidation(formSchema, { email: "", role: "" });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);

        makeRequest("/invite-team-member", {
            method: "POST",
            body: JSON.stringify(values),
        }).then((r) => {
            if (r.ok) {
                console.log("OK");
            } else {
                console.log("WTF");
            }
        });
    };

    return (
        <Dialog
            onOpenChange={() => {
                form.reset();
                form.clearErrors();
            }}
        >
            <DialogTrigger asChild>
                <Button>Invite member</Button>
            </DialogTrigger>
            <DialogContent className="w-[320px] rounded-lg sm:w-auto">
                <DialogHeader>
                    <DialogTitle>Invite member</DialogTitle>
                    <DialogDescription>
                        Enter the details to invite a new team member.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {MemberRole.map((role) => (
                                                    <SelectItem
                                                        key={role}
                                                        value={role}
                                                        className="capitalize"
                                                    >
                                                        {role}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="self-end" type="submit">
                                Invite
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
