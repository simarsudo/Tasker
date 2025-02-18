import { Trash2 } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";

type Props = {
    openDeleteAlertModel: boolean;
    setOpenDeleteAlertModel: React.Dispatch<React.SetStateAction<boolean>>;
    closeDeleteTaskModal: () => void;
    handleAction: () => void;
};

export const DeleteTaskModal = ({
    openDeleteAlertModel,
    setOpenDeleteAlertModel,
    closeDeleteTaskModal,
    handleAction,
}: Props) => {
    return (
        <AlertDialog open={openDeleteAlertModel}>
            <AlertDialogTrigger
                onClick={(e) => {
                    // close dialog box if clicked outside of modal
                    e.preventDefault();
                    setOpenDeleteAlertModel(true);
                }}
                asChild
            >
                <DropdownMenuItem>
                    <Trash2 />
                    <span>Delete</span>
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <div onClick={() => closeDeleteTaskModal()}>
                <AlertDialogContent
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e: React.KeyboardEvent) => {
                        if (e && e.key === "Escape") {
                            closeDeleteTaskModal();
                        }
                    }}
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the task and remove your data from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={(e) => handleAction()}
                            onKeyDown={(e) => {
                                if (e && e.key !== "Enter") return;
                                handleAction();
                                e.preventDefault();
                            }}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => handleAction()}
                            onKeyDown={(e) => {
                                if (e && e.key !== "Enter") return;
                                handleAction();
                                e.preventDefault();
                            }}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </div>
        </AlertDialog>
    );
};
