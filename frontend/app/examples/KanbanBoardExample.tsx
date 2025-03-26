import { Frame } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { FollowerPointerBG } from "@/components/wrappers/FollowingPointerWrapper";

export default function KanbanBoardExample() {
    return (
        <div className="max-w-[calc(100vw-1rem)] rounded-md bg-neutral-950 pb-2 shadow-md shadow-violet-500 outline outline-violet-500 sm:w-1/2 sm:max-w-[34rem]">
            <FollowerPointerBG
                bgClassName="bg-pink-500"
                pointerClassName="stroke-white text-pink-500"
                title="Agile Project Dashboard"
            >
                <h4 className="mt-2 flex items-center gap-2 px-4 text-lg font-semibold">
                    <div className="rounded bg-primary p-1 text-white">
                        <Frame className="size-4" />
                    </div>
                    <span>Project Skyrim</span>
                </h4>
                <div className="relative h-72 w-full overflow-hidden rounded-lg bg-neutral-950">
                    <div className="flex h-full w-full gap-4 p-4">
                        {/* To Do Column */}
                        <div className="flex min-w-48 flex-col rounded-lg border bg-neutral-900 p-3">
                            <h3 className="mb-2 text-center font-mono text-lg font-semibold text-gray-300">
                                To Do
                            </h3>
                            <div className="mb-2 rounded bg-emerald-500 p-2 text-xs text-white shadow">
                                <p>Research competitors</p>
                            </div>
                            <div className="mb-2 rounded bg-yellow-500 p-2 text-xs text-white shadow">
                                <p>Prepare marketing strategy</p>
                            </div>
                            <div className="mb-2 rounded bg-red-500 p-2 text-xs text-white shadow">
                                <p>Fix critical bugs</p>
                            </div>
                        </div>

                        {/* In Progress Column */}
                        <div className="flex min-w-48 flex-col rounded-lg border bg-neutral-900 p-3">
                            <h3 className="mb-2 text-center font-mono text-lg font-semibold text-gray-300">
                                In Progress
                            </h3>
                            <div className="mb-2 rounded bg-blue-500 p-2 text-xs text-white shadow">
                                <p>Design wireframes</p>
                            </div>
                            <div className="mb-2 rounded bg-purple-500 p-2 text-xs text-white shadow">
                                <p>Develop API endpoints</p>
                            </div>
                        </div>

                        {/* Completed Column */}
                        <div className="flex min-w-48 flex-col rounded-lg border bg-neutral-900 p-3">
                            <h3 className="mb-2 text-center font-mono text-lg font-semibold text-gray-300">
                                Completed
                            </h3>
                            <div className="mb-2 rounded bg-red-500 p-2 text-xs text-white shadow">
                                <p>Submit project report</p>
                            </div>
                            <div className="mb-2 rounded bg-teal-500 p-2 text-xs text-white shadow">
                                <p>Finalize requirements</p>
                            </div>
                            <div className="mb-2 rounded bg-emerald-500 p-2 text-xs text-white shadow">
                                <p>Team onboarding</p>
                            </div>
                        </div>
                    </div>
                </div>
            </FollowerPointerBG>
        </div>
    );
}
