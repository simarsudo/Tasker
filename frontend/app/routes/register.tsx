import { useState } from "react";

import { TabValues } from "@/common/common";
import { CompanyInfo } from "@/common/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Navbar from "@/components/common/Navbar";
import RegisterCompanyAddressForm from "@/components/forms/RegisterCompanyAddressForm";
import RegisterCompanyDetailsForm from "@/components/forms/RegisterCompanyDetailsForm";
import RegisterCompanyForm from "@/components/forms/RegisterCompanyForm";

const initialCompanyInfo = (): CompanyInfo => ({
    companyName: "",
    website: "",
    // TODO: Fix it
    emailDomain: "@google.com",
    companySize: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    contactPersonName: "",
    contactPersonRole: "",
    contactPersonEmail: "",
    contactPersonPhone: "",
});

export default function Register() {
    const [currentTab, setCurrentTab] = useState(TabValues.Register);
    const [companyInfo, setCompanyInfo] = useState(initialCompanyInfo());

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="m-4 grid h-full place-content-center">
                <div className="m-2 w-80 max-w-md sm:w-96">
                    <Tabs value={currentTab} defaultValue={currentTab}>
                        <TabsList className="my-2 w-full">
                            <TabsTrigger
                                className="w-1/3 cursor-default"
                                value={TabValues.Register}
                            >
                                {TabValues.Register}
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-1/3 cursor-default"
                                value={TabValues.Address}
                            >
                                {TabValues.Address}
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-1/3 cursor-default"
                                value={TabValues.Details}
                            >
                                {TabValues.Details}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value={TabValues.Register}>
                            <RegisterCompanyForm
                                setCurrentTab={setCurrentTab}
                                companyInfo={companyInfo}
                                setCompanyInfo={setCompanyInfo}
                            />
                        </TabsContent>
                        <TabsContent value={TabValues.Address}>
                            <RegisterCompanyAddressForm
                                setCurrentTab={setCurrentTab}
                                companyInfo={companyInfo}
                                setCompanyInfo={setCompanyInfo}
                            />
                        </TabsContent>
                        <TabsContent value={TabValues.Details}>
                            <RegisterCompanyDetailsForm
                                setCurrentTab={setCurrentTab}
                                companyInfo={companyInfo}
                                setCompanyInfo={setCompanyInfo}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
