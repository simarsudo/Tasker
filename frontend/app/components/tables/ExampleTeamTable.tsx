import { CheckCircle, Frame } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { FollowerPointerBG } from "@/components/wrappers/FollowingPointerWrapper";

export default function ExampleTeamTable() {
    return (
        <div className="h-min rounded-md bg-neutral-950 pb-2 shadow-md shadow-violet-500 outline outline-violet-500 sm:w-1/2">
            <FollowerPointerBG
                bgClassName="bg-cyan-500"
                pointerClassName="stroke-cyan-600 text-sky-500"
                title="Easy Task Tracking"
            >
                <h4 className="flex items-center gap-2 px-2 py-2 text-lg font-semibold">
                    <div className="rounded bg-primary p-1 text-white">
                        <Frame className="size-4" />
                    </div>
                    <span>Project Skyrim</span>
                </h4>
                <Table>
                    <TableCaption>
                        Team tasks and assignments overview
                    </TableCaption>
                    <TableHeader className="px-4">
                        <TableRow>
                            <TableHead>Task Name</TableHead>
                            <TableHead>Assignee</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Customer interviews</TableCell>
                            <TableCell>Alejandro Luna</TableCell>
                            <TableCell>
                                <Badge className="rounded bg-red-500 text-white hover:bg-red-600">
                                    High
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className="whitespace-nowrap rounded bg-blue-500 text-white hover:bg-blue-600">
                                    In progress
                                </Badge>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>User data</TableCell>
                            <TableCell>Kai Nani</TableCell>
                            <TableCell>
                                <Badge className="rounded bg-red-500 text-white hover:bg-red-600">
                                    High
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className="whitespace-nowrap rounded bg-blue-500 text-white hover:bg-blue-600">
                                    In progress
                                </Badge>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Create roadmap</TableCell>
                            <TableCell>Dave Jung</TableCell>
                            <TableCell>
                                <Badge className="rounded bg-green-500 text-white hover:bg-green-600">
                                    Low
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className="rounded bg-purple-500 text-white hover:bg-purple-600">
                                    Review
                                </Badge>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Design mockups</TableCell>
                            <TableCell>Emily Carter</TableCell>
                            <TableCell>
                                <Badge className="rounded bg-yellow-400 text-white hover:bg-yellow-500">
                                    Medium
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className="rounded bg-gray-500 text-white hover:bg-gray-600">
                                    Pending
                                </Badge>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Code review</TableCell>
                            <TableCell>Michael Lee</TableCell>
                            <TableCell>
                                <Badge className="rounded bg-red-500 text-white hover:bg-red-600">
                                    High
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className="rounded bg-green-500 text-white hover:bg-green-600">
                                    Completed
                                </Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </FollowerPointerBG>
        </div>
    );
}
