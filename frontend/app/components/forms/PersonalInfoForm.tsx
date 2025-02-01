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

type Props = {
    firstNameRef: React.RefObject<HTMLInputElement>;
    lastNameRef: React.RefObject<HTMLInputElement>;
    phoneNumberRef: React.RefObject<HTMLInputElement>;
    handleSignupSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function PersonalInfoForm({
    firstNameRef,
    lastNameRef,
    phoneNumberRef,
    handleSignupSubmit,
}: Props) {
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
                                        type="firstname"
                                        placeholder="John"
                                        required
                                        ref={firstNameRef}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="LastName">Last Name</Label>
                                    <Input
                                        id="LastName"
                                        type="LastName"
                                        placeholder="Doe"
                                        required
                                        ref={lastNameRef}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="contact">
                                        Contact Number
                                    </Label>
                                    <Input
                                        id="contact"
                                        type="contact"
                                        required
                                        ref={phoneNumberRef}
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Sign up
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                By Signing up you agree to our Terms of Service
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
