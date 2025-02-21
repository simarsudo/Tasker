import { TabValues } from "@/common/common";
import { CompanyRegistrationFormProps } from "@/common/types";

import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const COMPANYSIZE = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

const formSchema = z.object({
    companyName: z.string().nonempty({ message: "Company name is required" }),
    website: z
        .string()
        .nonempty({ message: "Website link is required" })
        .url({ message: "Invalid URL" }),
    emailDomain: z.string().nonempty({ message: "Domain name is required" }),
    companySize: z.string().refine((val) => val !== "", {
        message: "Company size is required",
    }),
});

export default function RegisterCompanyForm({
    setCurrentTab,
    companyInfo,
    setCompanyInfo,
}: CompanyRegistrationFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: companyInfo.companyName,
            website: companyInfo.website,
            emailDomain: companyInfo.emailDomain,
            companySize: companyInfo.companySize,
        },
    });

    function handleSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        setCurrentTab(TabValues.Address);
        setCompanyInfo({ ...companyInfo, ...values });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Register Company</CardTitle>
                <CardDescription>
                    Enter your company details to get started.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Tasker Corp. Private Ltd."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Website Link</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://tasker.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="emailDomain"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Domain</FormLabel>
                                        <FormControl>
                                            <Input disabled {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="companySize"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Size</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select company size" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {COMPANYSIZE.map((size) => (
                                                    <SelectItem
                                                        key={size}
                                                        value={size}
                                                    >
                                                        {size} employees
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full mt-2">
                                Next
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex items-center gap-3">
                <span className="flex-shrink-0 self-baseline mt-1">
                    <Info className="h-4 w-4 text-destructive" />
                </span>
                <CardDescription>
                    Employees with the same email domain will be automatically
                    added to your company.
                </CardDescription>
            </CardFooter>
        </Card>
    );
}
