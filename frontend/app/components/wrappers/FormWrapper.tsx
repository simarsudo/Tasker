import React from "react";

import clsx from "clsx";

interface FormWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, className }) => {
    return (
        <div className={clsx("max-w-md w-80 sm:w-96 m-2", className)}>
            {children}
        </div>
    );
};

export default FormWrapper;
