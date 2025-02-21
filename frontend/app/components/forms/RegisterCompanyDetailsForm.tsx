import { TabValues } from "@/common/common";
import { CompanyRegistrationFormProps } from "@/common/types";

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
import { z } from "zod";

const formSchema = z.object({
    contactPersonName: z.string().nonempty({ message: "Name is required" }),
    contactPersonRole: z.string().nonempty({ message: "Role is required" }),
    contactPersonEmail: z
        .string()
        .email({ message: "Invalid email address" })
        .nonempty({ message: "Email is required" }),
    contactPersonPhone: z
        .string()
        .nonempty({ message: "Phone number is required" }),
});

const formDefaultValues = {
    contactPersonName: "",
    contactPersonRole: "",
    contactPersonEmail: "",
    contactPersonPhone: "",
};

export default function RegisterCompanyDetailsForm({
    setCurrentTab,
    companyInfo,
    setCompanyInfo,
}: CompanyRegistrationFormProps) {
    const form = useFormValidation(formSchema, formDefaultValues);

    function handleSubmit(values: z.infer<typeof formSchema>) {
        console.log({ ...companyInfo, ...values });
        setCompanyInfo({ ...companyInfo, ...values });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">
                    Contact Person Details
                </CardTitle>
                <CardDescription>
                    Provide the details of the primary contact person in your
                    company.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="contactPersonName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contactPersonRole"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contactPersonEmail"
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
                                name="contactPersonPhone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-2">
                                <Button
                                    className="mt-2 w-1/2"
                                    onClick={() => {
                                        setCompanyInfo({
                                            ...companyInfo,
                                            ...form.getValues(),
                                        });
                                        setCurrentTab(TabValues.Address);
                                    }}
                                >
                                    Back
                                </Button>
                                <Button type="submit" className="w-1/2 mt-2">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
