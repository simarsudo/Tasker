import { ElementType, ReactNode } from "react";

import { useDraggable } from "@dnd-kit/core";

type Props = {
    element?: ElementType;
    id: number;
    children: ReactNode;
};
export function DraggableWrapper(props: Props) {
    const Element = props.element || "div";
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: props.id,
    });

    return (
        <Element
            className={isDragging ? "opacity-50" : ""}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
            {props.children}
        </Element>
    );
}
