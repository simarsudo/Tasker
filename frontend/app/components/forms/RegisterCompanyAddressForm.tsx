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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    address: z.string().nonempty({ message: "Address is required" }),
    city: z.string().nonempty({ message: "City is required" }),
    state: z.string().nonempty({ message: "State is required" }),
    zipCode: z.string().nonempty({ message: "Zip code is required" }),
});

export default function RegisterCompanyAddressForm({
    setCurrentTab,
    companyInfo,
    setCompanyInfo,
}: CompanyRegistrationFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: companyInfo.address,
            city: companyInfo.city,
            state: companyInfo.state,
            zipCode: companyInfo.zipCode,
        },
    });

    function handleSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        setCurrentTab(TabValues.Details);
        setCompanyInfo({ ...companyInfo, ...values });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Company Address</CardTitle>
                <CardDescription>
                    Enter the address details of the company
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="zipCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Zip Code</FormLabel>
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
                                        setCurrentTab(TabValues.Register);
                                    }}
                                >
                                    Back
                                </Button>
                                <Button className="mt-2 w-1/2" type="submit">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
            {/* <CardFooter /> */}
        </Card>
    );
}
