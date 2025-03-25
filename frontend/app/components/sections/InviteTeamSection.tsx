import { CheckCircle } from "lucide-react";

import ExampleTeamTable from "../tables/ExampleTeamTable";

export default function InviteTeamSection() {
    return (
        <div className="select-none px-2 lg:px-16">
            <h2 className="mb-16 text-center text-5xl font-bold text-pink-500">
                Seamless Team Collaboration
            </h2>

            <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
                <div className="grid auto-rows-auto gap-6 sm:w-1/2">
                    <p className="text-lg font-semibold italic">
                        Transform how your team works together. Our platform
                        connects teams of any size with powerful collaboration
                        tools that streamline workflows and boost productivity.
                    </p>

                    <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                            <div className="mt-1">
                                <CheckCircle className="size-5 text-emerald-500" />
                            </div>
                            <span>
                                Effortless onboarding with one-click email
                                invitations and secure authentication
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="mt-1">
                                <CheckCircle className="size-5 text-emerald-500" />
                            </div>
                            <span>
                                Customizable role-based permissions that protect
                                sensitive project data
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="mt-1">
                                <CheckCircle className="size-5 text-emerald-500" />
                            </div>
                            <span>
                                Real-time notifications and detailed activity
                                feeds to keep everyone aligned
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="mt-1">
                                <CheckCircle className="size-5 text-emerald-500" />
                            </div>
                            <span>
                                Enhanced visibility with team dashboards,
                                progress tracking, and performance metrics
                            </span>
                        </li>
                    </ul>
                </div>
                <ExampleTeamTable />
            </div>
        </div>
    );
}
