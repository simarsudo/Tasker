import { TeamMember, columns } from "@/common/tableDefs";

import { DataTable } from "@/components/common/DataTable";
import InviteTeamMemberDialog from "@/components/dialogs/InviteTeamMemberDialog";

export default function DashboardTeam() {
    const data: TeamMember[] = [
        {
            id: "1",
            email: "elder@gmail.com",
            fullName: "Simarjeet Singh",
            role: "Admin",
        },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Your Team Details</h3>
                <InviteTeamMemberDialog />
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
