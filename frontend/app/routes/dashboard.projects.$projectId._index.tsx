import { DashboardOutlet } from "@/common/types";

import { useOutletContext } from "@remix-run/react";

export default function Project() {
    const context = useOutletContext<DashboardOutlet>();

    return (
        <div>
            <div className="flex items-center justify-between">
                <p>Project ID: {context.projectId}</p>
            </div>
        </div>
    );
}
