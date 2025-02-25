import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";

import Navbar from "@/components/common/Navbar";
import CreateProjectForm from "@/components/forms/CreateProjectForm";
import InviteMembers from "@/components/forms/InviteMembers";
import FormWrapper from "@/components/wrappers/FormWrapper";

export const enum selectedTab {
    CreateProject = "create-project",
    InviteProject = "invite-project",
}

export default function CreateProject() {
    const [currentTab, setCurrentTab] = useState(selectedTab.CreateProject);

    return (
        <div>
            <Navbar />
            <div className="flex h-full w-full justify-center p-4">
                <FormWrapper>
                    <CreateProjectForm setCurrentTab={setCurrentTab} />
                </FormWrapper>
            </div>
            <Toaster />
        </div>
    );
}

// <div>
//     <Navbar />
//     <div className="flex h-full w-full justify-center p-4">
//         <FormWrapper>
//             <Tabs value={currentTab} className="space-y-4">
//                 <TabsList className="w-full">
//                     <TabsTrigger
//                         className="w-1/2 cursor-default"
//                         value={selectedTab.CreateProject}
//                     >
//                         Create Project
//                     </TabsTrigger>
//                     <TabsTrigger
//                         className="w-1/2 cursor-default"
//                         value={selectedTab.InviteProject}
//                     >
//                         Invite Member
//                     </TabsTrigger>
//                 </TabsList>
//                 <TabsContent value={selectedTab.CreateProject}>
//                     <CreateProjectForm setCurrentTab={setCurrentTab} />
//                 </TabsContent>
//                 <TabsContent value={selectedTab.InviteProject}>
//                     <InviteMembers setCurrentTab={setCurrentTab} />
//                 </TabsContent>
//             </Tabs>
//         </FormWrapper>
//     </div>
//     <Toaster />
// </div>;
