import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("isAuthenticated") === "true";
        }
        return false;
    });

    useEffect(() => {
        localStorage.setItem("isAuthenticated", isAuthenticated.toString());
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
