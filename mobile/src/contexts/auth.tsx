import React, {createContext, useState} from 'react';
import { login } from '../services/api';
import LoginResponse from './../interfaces/login-response.interface';
import { User } from './../models/user';

interface AuthContextData {
    signed: boolean,
    user: User | null,
    handleLogin(email: string, password: string): Promise<void>,
    handleLogout(): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    
    async function handleLogin(email: string, password: string) {
        var response = await login(email, password);
        setUser(response.user);
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