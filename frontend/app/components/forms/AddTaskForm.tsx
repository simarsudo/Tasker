import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import useFormValidation from "@/hooks/use-form-validation";
import { format } from "date-fns";
import { z } from "zod";

type Props = {
    teamMembers: {
        id: number;
        fullName: string;
    }[];
};

const formSchema = z.object({
    taskName: z.string().min(5, "Task name must be at least 5 characters."),
    taskDescription: z
        .string()
        .min(20, "Task description must be at least 20 characters."),
    assignedTo: z.string().nonempty("Task must be assigned to a team member."),
    lastDate: z.date({ required_error: "A last date is required." }),
});

export default function AddTaskForm({ teamMembers }: Props) {
    const form = useFormValidation(formSchema, {
        taskName: "",
        taskDescription: "",
        assignedTo: "",
        lastDate: new Date(),
    });

    function handleSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid gap-2 text-left"
            >
                <FormField
                    control={form.control}
                    name="taskName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="assignedTo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Assign To</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose team member" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teamMembers.map((teamMember) => {
                                            return (
                                                <SelectItem
                                                    key={teamMember.id}
                                                    value={`${teamMember.id}`}
                                                >
                                                    {teamMember.fullName}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastDate"
                    render={({ field }) => (
                        <FormItem className="mt-2 flex flex-col justify-center gap-1">
                            <FormLabel>Last date</FormLabel>
                            <Popover modal>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button variant={"outline"}>
                                            {format(field.value, "PPP")}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date <
                                            new Date(
                                                new Date().setDate(
                                                    new Date().getDate() - 1,
                                                ),
                                            )
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="taskDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task Description</FormLabel>
                            <FormControl>
                                <Textarea className="min-h-48" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="ml-auto mt-4 w-1/3" type="submit">
                    Create task
                </Button>
            </form>
        </Form>
    );
}
