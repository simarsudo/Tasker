import { useOutletContext } from "react-router-dom";

type ProjectContextType = {
    // Define the type of your context value here
    projectId: string;
};

export default function Project() {
    const context = useOutletContext<ProjectContextType>();

    return <div>Dashboard Project: {context.projectId}</div>;
}
