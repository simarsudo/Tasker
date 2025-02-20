import { SidebarTrigger } from "@/components/ui/sidebar";

type Props = {
    showSidebarTrigger?: boolean;
};

export default function Navbar({ showSidebarTrigger = false }: Props) {
    return (
        <div className="h-10 w-full border-b-2 flex items-center px-4">
            {showSidebarTrigger && <SidebarTrigger />}
            <span className="text-right ml-auto italic text-lg font-semibold">
                Tasker
            </span>
        </div>
    );
}
