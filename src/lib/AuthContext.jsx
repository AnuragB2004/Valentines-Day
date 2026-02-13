import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Simplified auth - no authentication required for this app
    const [user] = useState(null);
    const [isAuthenticated] = useState(false);
    const [isLoadingAuth] = useState(false);

    const login = () => {
        // No-op - authentication not needed
        console.log('Authentication not required for this app');
    };

    const logout = () => {
        // No-op - authentication not needed
        console.log('Authentication not required for this app');
    };

    const redirectToLogin = () => {
        // No-op - authentication not needed
        console.log('Authentication not required for this app');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isLoadingAuth,
            login,
            logout,
            redirectToLogin
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
