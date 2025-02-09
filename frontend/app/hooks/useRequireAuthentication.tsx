import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { useAuth } from "~/context/auth";

export function useRequireAuthentication() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
}
