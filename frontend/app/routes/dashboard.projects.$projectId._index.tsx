import { DashboardOutlet } from "@/common/types";

import AddTaskDialog from "@/components/dialogs/AddTaskDialog";
import { useOutletContext } from "react-router-dom";

export default function Project() {
    const context = useOutletContext<DashboardOutlet>();

    return (
        <div>
            <div className="flex items-center justify-between">
                <p>Project Name</p>
                <AddTaskDialog />
            </div>
        </div>
    );
}
