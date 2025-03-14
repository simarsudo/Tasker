import React from "react";

import { UserRoles } from "@/common/common";

import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { makeRequest } from "@/lib/utils";
import { useParams } from "@remix-run/react";

type Props = {
    userID: number;
    fullName: string;
    role: UserRoles;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onRoleChange?: () => void; // Add this prop
};

export default function ChangeRoleDialogForm({
    userID,
    fullName,
    role,
    setDialogOpen,
    onRoleChange,
}: Props) {
    const params = useParams();

    const handleSubmit = () => {
        makeRequest("/change-user-role", {
            method: "POST",
            body: JSON.stringify({
                projectID: Number(params.projectId),
                userID,
                role,
            }),
        }).then((r) => {
            if (r.ok) {
                // Call onRoleChange when the request is successful
                if (onRoleChange) {
                    console.log("Called");
                    onRoleChange();
                }
                setDialogOpen(false);
            } else {
                console.log("WTF");
            }
        });
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Confirm role change?</DialogTitle>
                <DialogDescription className="mt-2">
                    Are you sure you want to change the role of{" "}
                    <span className="font-semibold capitalize">
                        {fullName}{" "}
                    </span>
                    to
                    <span className="font-semibold capitalize"> {role}</span>?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
                <Button
                    type="button"
                    onClick={() => setDialogOpen(false)}
                    variant="outline"
                >
                    Cancel
                </Button>
                <Button onClick={handleSubmit} type="submit">
                    Confirm
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}
