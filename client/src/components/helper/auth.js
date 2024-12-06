import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token);
            setLoading(false);
        };

        checkAuthStatus();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-12 text-blue-500">
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};