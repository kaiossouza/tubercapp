import React, {createContext, useState} from 'react';
import { login } from '../services/api';
import { User } from './../models/user';
import { View, Image } from 'react-native';

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
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#82B1B6'}}>
                <Image
                    style={{width: 100, height: 100, borderRadius:10}}
                    source={{uri: 'https://media.giphy.com/media/Hb3p6zmoUgRRUKPJi5/giphy.gif'}} />
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