import React from "react";

import clsx from "clsx";

interface FormWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, className }) => {
    return (
        <div className={clsx("m-2 w-80 max-w-md sm:w-96", className)}>
            {children}
        </div>
    );
};

export default FormWrapper;
