import React, {createContext, useState} from 'react';
import login, { User } from '../services/api';

interface AuthContextData {
    signed: boolean,
    user: User | null,
    handleLogin(): Promise<void>,
    handleLogout(): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    
    async function handleLogin() {
        const response = await login();
        login().then(() => {
            setUser(response);
        });
        
    }

    async function handleLogout() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user: user,
            handleLogin,
            handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;