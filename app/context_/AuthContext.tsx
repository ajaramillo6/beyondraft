"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

// Define the shape
interface AuthContextProps {
    user: any;
    isAuthenticated: boolean;
    loading: boolean;
}

// Default values
const AuthContext = createContext<AuthContextProps>({
    user: null,
    isAuthenticated: false,
    loading: true,
});

// Context provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { user }: any = useKindeBrowserClient();
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !!user?.id;

    useEffect(() => {
        // Simulate loading delay to ensure 'user' state is resolved
        const timeout = setTimeout(() => setLoading(false), 1000);

        return () => clearTimeout(timeout);
    }, [user]);

    if (loading) {
        return (
            <div className="flex flex-col gap-6 h-screen w-screen items-center justify-center relative">
                <svg
                    className={`absolute w-[200px] h-[200px] transition-opacity duration-300 ${
                        loading ? "opacity-100" : "opacity-0"
                    }`}
                    viewBox="0 0 200 200"
                >
                    <line x1="10" y1="20" x2="70" y2="80" stroke="#d13131" strokeWidth="3" strokeLinecap="round" className="moving-dash" />
                    <line x1="90" y1="40" x2="150" y2="100" stroke="#d13131" strokeWidth="3" strokeLinecap="round" className="moving-dash" style={{ animationDuration: "0.65s" }} />
                    <line x1="30" y1="110" x2="90" y2="170" stroke="lightBlue" strokeWidth="3" strokeLinecap="round" className="moving-dash" style={{ animationDuration: "0.75s" }} />
                    <line x1="110" y1="130" x2="170" y2="190" stroke="lightBlue" strokeWidth="3" strokeLinecap="round" className="moving-dash" style={{ animationDuration: "0.85s" }} />
                    <line x1="50" y1="0" x2="110" y2="60" stroke="#316ed1" strokeWidth="3" strokeLinecap="round" className="moving-dash" />
                    <line x1="130" y1="60" x2="190" y2="120" stroke="lightBlue" strokeWidth="3" strokeLinecap="round" className="moving-dash" style={{ animationDuration: "0.65s" }} />
                </svg>

                {/* Main Image */}
                <div className="flex flex-col gap-5 items-center">
                    <Image
                        src="/1.svg"
                        alt="Beyondraft logo"
                        height={150}
                        width={150}
                        priority
                    />
                    <span className="text-lg font-bold">Beyondraft</span>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to access AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};