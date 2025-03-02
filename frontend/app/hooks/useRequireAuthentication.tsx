import { useEffect } from "react";

import { useAuth } from "@/context/auth";
import { useNavigate } from "@remix-run/react";

export function useRequireAuthentication() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
}
