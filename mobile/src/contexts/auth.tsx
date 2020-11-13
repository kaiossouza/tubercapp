import React, {createContext, useState} from 'react';
import { User } from './../models/user';
import { View, Image } from 'react-native';
import * as DB from '../services/storage';

interface AuthContextData {
    signed: boolean,
    user: User | null,
    handleLogin(email: string, password: string): Promise<void>,
    handleLogout(): Promise<void>,
    addUser(user: User): Promise<void>,
    updateUser(user: User): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [signed, setSigned] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    
    async function addUser(user: User) {
        var res = await DB.addUser(user);
        if(!res) {
            alert("Erro. Não foi possível salvar cadastro.");
        } else {
            alert("Cadastro realizado com sucesso!");
            setUser(res);
            setSigned(true);
        }
    }

    async function updateUser(user: User) {
        var res = await DB.updateUser(user);
        if(!res) {
            alert("Erro. Não foi possível salvar informações.");
        } else {
            setUser(res);
            setSigned(true);
        }
    }
    
    async function handleLogin(email: string, password: string) {
        setLoading(true);

        var user = await DB.getUser(email, password);

        if(user) {
            setUser(user as User);
            setSigned(true);
        } else {
            alert("E-mail ou senha incorreto(s).");
        }

        setLoading(false);
    }

    async function handleLogout() {
        setUser(null);
        setSigned(false);
    }

    if (loading) {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#82B1B6'}}>
                <Image
                    style={{width: 100, height: 100, borderRadius:10}}
                    source={{uri: 'https://media.giphy.com/media/Hb3p6zmoUgRRUKPJi5/giphy.gif'}} />
            </View>
        )
    } else {
        return (
            <AuthContext.Provider value={{
                signed: !!user,
                user: user,
                handleLogin,
                handleLogout,
                addUser,
                updateUser
            }}>
                {children}
            </AuthContext.Provider>
        );
    }
};

export default AuthContext;