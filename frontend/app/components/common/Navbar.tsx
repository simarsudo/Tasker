import { SidebarTrigger } from "@/components/ui/sidebar";

type Props = {};

export default function Navbar({}: Props) {
    return (
        <div className="flex h-10 w-full items-center border-b-2 px-4">
            <SidebarTrigger />
            <span className="ml-auto text-right text-lg font-semibold italic">
                Tasker
            </span>
        </div>
    );
}
