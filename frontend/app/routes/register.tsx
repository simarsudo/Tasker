import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Navbar from "@/components/common/Navbar";
import RegisterCompanyAddressForm from "@/components/forms/RegisterCompanyAddressForm";
import RegisterCompanyDetailsForm from "@/components/forms/RegisterCompanyDetailsForm";
import RegisterCompanyForm from "@/components/forms/RegisterCompanyForm";

enum TabValues {
    Register = "Register",
    Address = "Address",
    Details = "Details",
}

export default function Register() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="grid h-full m-4 place-content-center">
                <div className="max-w-md w-96">
                    <Tabs defaultValue={TabValues.Address}>
                        <TabsList className="w-full my-2">
                            <TabsTrigger
                                className="w-1/3"
                                value={TabValues.Register}
                            >
                                {TabValues.Register}
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-1/3"
                                value={TabValues.Address}
                            >
                                {TabValues.Address}
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-1/3"
                                value={TabValues.Details}
                            >
                                {TabValues.Details}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value={TabValues.Register}>
                            <RegisterCompanyForm />
                        </TabsContent>
                        <TabsContent value={TabValues.Address}>
                            <RegisterCompanyAddressForm />
                        </TabsContent>
                        <TabsContent value={TabValues.Details}>
                            <RegisterCompanyDetailsForm />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
