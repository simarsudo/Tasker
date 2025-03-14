import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import AddTaskForm from "@/components/forms/AddTaskForm";

type Props = {};

export default function AddTaskDialog({}: Props) {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Add task</Button>
                </DialogTrigger>
                <DialogContent className="max-w-96">
                    <DialogHeader>
                        <DialogTitle>Create a New Task</DialogTitle>
                        <DialogDescription>
                            Please complete the form to add a new task.
                        </DialogDescription>
                        <div>
                            <Separator className="my-1" />
                        </div>
                        <div>
                            <AddTaskForm />
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}
