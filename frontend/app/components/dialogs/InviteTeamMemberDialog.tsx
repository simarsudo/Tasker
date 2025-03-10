import { useState } from "react";

import { MemberRoles } from "@/common/common";

import { Copy, CopyCheck } from "lucide-react";

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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import useFormValidation from "@/hooks/use-form-validation";
import { makeRequest } from "@/lib/utils";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email().nonempty(),
    role: z.string().refine((val) => val !== "", {
        message: "Please select a role",
    }),
});

type Props = {
    projectID: number;
};

export default function InviteTeamMemberDialog({ projectID }: Props) {
    const [inviteURL, setInviteURL] = useState("");
    const [error, setError] = useState("");
    const [linkCopied, setLinkCopied] = useState(false);
    const form = useFormValidation(formSchema, {
        email: "",
        role: "",
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const payload = { ...values, projectID: projectID };
        setError("");
        setInviteURL("");
        setLinkCopied(false);

        const response = await makeRequest("/invite-team-member", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
            setInviteURL(data.inviteURL);
        } else {
            setError(data.error);
        }
    };

    return (
        <Dialog
            onOpenChange={() => {
                form.reset();
                form.clearErrors();
                setError("");
                setInviteURL("");
            }}
        >
            <DialogTrigger asChild>
                <Button>Invite member</Button>
            </DialogTrigger>
            <DialogContent className="w-80 rounded-lg sm:w-96">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Invite member
                    </DialogTitle>
                    <DialogDescription className="text-center">
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
                                                {MemberRoles.map((role) => (
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
                {inviteURL !== "" ? (
                    <DialogFooter className="sm:justify-start">
                        <div className="flex w-full items-center justify-between gap-2">
                            <div className="grow space-x-2">
                                <a
                                    href={inviteURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-purple-600 underline"
                                >
                                    Invitation link
                                </a>
                                <span>send</span>
                            </div>
                            <p>
                                {linkCopied ? (
                                    <span>
                                        <TooltipProvider>
                                            <Tooltip delayDuration={0}>
                                                <TooltipTrigger className="cursor-default">
                                                    <CopyCheck />
                                                </TooltipTrigger>
                                                <TooltipContent side="right">
                                                    <p>Link Copied</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </span>
                                ) : (
                                    <span
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                inviteURL,
                                            );
                                            setLinkCopied(true);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <TooltipProvider>
                                            <Tooltip delayDuration={0}>
                                                <TooltipTrigger>
                                                    <Copy />
                                                </TooltipTrigger>
                                                <TooltipContent side="right">
                                                    <p>Copy link</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </span>
                                )}
                            </p>
                        </div>
                    </DialogFooter>
                ) : null}
                {error !== "" ? (
                    <DialogFooter>
                        <DialogDescription className="w-full text-destructive">
                            {error}
                        </DialogDescription>
                    </DialogFooter>
                ) : null}
            </DialogContent>
        </Dialog>
    );
}
