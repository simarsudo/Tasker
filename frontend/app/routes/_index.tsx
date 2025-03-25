import IntroSection from "@/components/sections/IntroSection";
import InviteTeamSection from "@/components/sections/InviteTeamSection";
import MouseFollowAnimationWrapper from "@/components/wrappers/MouseFollowAnimationWrapper";
import PageWithNavbarWrapper from "@/components/wrappers/PageWithNavbarWrapper";

export default function Index() {
    return (
        <MouseFollowAnimationWrapper>
            <PageWithNavbarWrapper className="w-full items-start px-4 pt-0 sm:pt-0">
                <div className="flex max-w-7xl flex-col gap-12 sm:gap-0">
                    <IntroSection />
                    <InviteTeamSection />
                </div>
                <div className="relative z-10 mt-16 grid gap-8 px-4 sm:px-16">
                    {/* <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Manage Tasks
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Track tasks and meet deadlines.
                        </p>
                    </div> */}
                </div>
            </PageWithNavbarWrapper>
        </MouseFollowAnimationWrapper>
    );
}
