import { CheckCircle } from "lucide-react";

import KanbanBoardExample from "@/examples/KanbanBoardExample";

type Props = {};

export default function TrackTaskAndDeadlinesSection({}: Props) {
    return (
        <div className="mt-8 select-none px-2 sm:my-28 lg:px-16">
            <h2 className="mb-16 text-center text-5xl font-bold text-cyan-500">
                Stay on Top of Tasks and Deadlines
            </h2>

            <div className="flex flex-col gap-8 md:flex-row">
                <KanbanBoardExample />

                <div className="grid auto-rows-auto sm:w-1/2">
                    <p className="text-lg font-semibold italic">
                        Never miss a deadline again. Our platform helps you
                        track tasks, set priorities, and stay organized, so you
                        can focus on what matters most.
                    </p>

                    <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                            <div className="mt-1">
                                <CheckCircle className="size-5 text-emerald-500" />
                            </div>
                            <span>
                                Create and assign tasks with due dates,
                                reminders, and priority levels to keep your team
                                aligned.
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="mt-1">
                                <CheckCircle className="size-5 text-emerald-500" />
                            </div>
                            <span>
                                Visualize deadlines with calendar and timeline
                                views to plan ahead effortlessly.
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="mt-1">
                                <CheckCircle className="size-5 text-emerald-500" />
                            </div>
                            <span>
                                Get notifications for upcoming deadlines and
                                task updates to stay on track.
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="mt-1">
                                <CheckCircle className="size-5 text-emerald-500" />
                            </div>
                            <span>
                                Track progress with task completion metrics and
                                performance insights for better decisions.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
