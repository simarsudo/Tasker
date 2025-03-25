import { CalendarCheck, ClipboardList, Users } from "lucide-react";

import BenifitsCard from "../cards/BenifitsCard";

export default function IntroSection() {
    return (
        <section className="grid min-h-screen w-full select-none place-content-center pt-24 text-center md:pt-0">
            <div className="flex flex-col gap-16 2xl:gap-[5rem]">
                <h1 className="bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 bg-clip-text text-6xl font-extrabold text-transparent">
                    Take Control of Your Workflow with Tasker
                </h1>
                <p className="text-center font-mono text-lg font-semibold text-sidebar-primary-foreground 2xl:text-xl">
                    Boost productivity with Tasker – your ultimate platform for
                    seamless task management
                </p>
                <div className="flex w-full flex-col items-center justify-center gap-8 text-center md:flex-row md:items-start lg:gap-16">
                    <BenifitsCard
                        Icon={ClipboardList}
                        description={"Organize tasks and projects with ease."}
                        pointerTitle="Efficient Organization"
                        pointerBGClassName="bg-pink-500"
                        pointerClassName="text-pink-500 stroke-white"
                        hoverShadowClassName="shadow-pink-500 hover:shadow-pink-500"
                        hoverOutlineClassName="hover:outline hover:outline-pink-500"
                    />

                    <BenifitsCard
                        Icon={Users}
                        description={"Collaborate with your team in real-time."}
                        pointerTitle="Seamless Collaboration"
                        pointerBGClassName="bg-purple-500"
                        pointerClassName="text-purple-500 stroke-white"
                        hoverShadowClassName="shadow-purple-500 hover:shadow-purple-500"
                        hoverOutlineClassName="hover:outline hover:outline-purple-500"
                    />

                    <BenifitsCard
                        Icon={CalendarCheck}
                        description={"Stay on top of deadlines effortlessly."}
                        pointerTitle="Timely Deadlines"
                        pointerBGClassName="bg-emerald-500"
                        pointerClassName="text-emerald-500 stroke-white"
                        hoverShadowClassName="shadow-emerald-500 hover:shadow-emerald-500"
                        hoverOutlineClassName="hover:outline hover:outline-emerald-500"
                    />
                </div>
            </div>
        </section>
    );
}
