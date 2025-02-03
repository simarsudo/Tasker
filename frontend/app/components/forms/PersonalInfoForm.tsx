import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "app/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useRef } from "react";
import { SignupData } from "@/common/types";

type Props = {
    setCurrentTab: React.Dispatch<
        React.SetStateAction<"account-info" | "personal-info">
    >;
    signupData: SignupData;
    setSignupData: React.Dispatch<React.SetStateAction<SignupData>>;
    handleSignupSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (
        ref: React.RefObject<HTMLInputElement>,
        name: string,
    ) => void;
};

function PersonalInfoForm({
    handleSignupSubmit,
    setCurrentTab,
    signupData,
    handleInputChange,
}: Props) {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const contactNumberRef = useRef<HTMLInputElement>(null);

    return (
        <div className="w-full max-w-sm">
            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Sign up</CardTitle>
                        <CardDescription>
                            Please enter your personal information below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignupSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstname">
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstname"
                                        type="text"
                                        placeholder="John"
                                        required
                                        ref={firstNameRef}
                                        value={signupData.firstName}
                                        onChange={() =>
                                            handleInputChange(
                                                firstNameRef,
                                                "firstName",
                                            )
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastname">Last Name</Label>
                                    <Input
                                        id="lastname"
                                        type="text"
                                        placeholder="Doe"
                                        required
                                        ref={lastNameRef}
                                        value={signupData.lastName}
                                        onChange={() =>
                                            handleInputChange(
                                                lastNameRef,
                                                "lastName",
                                            )
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="contactNumber">
                                        Contact Number
                                    </Label>
                                    <Input
                                        id="contact"
                                        type="tel"
                                        required
                                        ref={contactNumberRef}
                                        value={signupData.contactNumber}
                                        onChange={() =>
                                            handleInputChange(
                                                contactNumberRef,
                                                "contactNumber",
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() =>
                                            setCurrentTab("account-info")
                                        }
                                        type="button"
                                        className="w-1/4"
                                    >
                                        <ChevronLeft />
                                        <span>Back</span>
                                    </Button>
                                    <Button type="submit" className="w-3/4">
                                        Sign up
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                By signing up you agree to our Terms of Service
                                and Privacy Policy.
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default PersonalInfoForm;
