import React, {createContext, useState} from 'react';
import { login } from '../services/api';
import { User } from './../models/user';
import { View, ActivityIndicator } from 'react-native';

interface AuthContextData {
    signed: boolean,
    user: User | null,
    handleLogin(email: string, password: string): Promise<void>,
    handleLogout(): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    
    async function handleLogin(email: string, password: string) {
        setLoading(true);
        var response = await login(email, password);
        setUser(response.user);
        setLoading(false);
    }

    async function handleLogout() {
        setUser(null);
    }

    if (loading) {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1,}}>
                <ActivityIndicator size="large" color="#82B1B6" />
            </View>
        )
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