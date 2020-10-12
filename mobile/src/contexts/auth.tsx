import React, {createContext, useState} from 'react';
import { login } from '../services/api';
import { User } from '../models/user';

interface AuthContextData {
    signed: boolean,
    user: any | null,
    handleLogin(email: string, password: string): Promise<void>,
    handleLogout(): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<any | null>(null);
    
    async function handleLogin(email: string, password: string) {
        var response = await login(email, password);
        setUser(response);
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