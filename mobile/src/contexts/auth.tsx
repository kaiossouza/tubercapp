import React, {createContext, useState} from 'react';
import { login } from '../services/api';
import { User } from './../models/user';
import { View, Image, ActivityIndicator } from 'react-native';
import { getCurrentEntry, getUser, setDiary } from '../services/storage';
import DiaryEntry from '../models/Diary';

interface AuthContextData {
    signed: boolean,
    user: User | null,
    screenTitle: string,
    handleLogin(email: string, password: string): Promise<void>,
    handleLogout(): Promise<void>,
    setscreenTitle(name: string): void,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [screenTitle, setscreenTitle] = useState("Tuberc");
    
    async function handleLogin(email: string, password: string) {
        setLoading(true);
        getUser(email, password)
            .then(user => {
                setUser(user as User);
                setLoading(false);
            });
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
            screenTitle: screenTitle,
            handleLogin,
            handleLogout,
            setscreenTitle,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;