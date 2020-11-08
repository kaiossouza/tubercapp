import React, {createContext, useState} from 'react';
import { User } from '../models/user';

interface RegisterContextData {
    user: User | null,
    saveUser(_user: User): void
}

const RegisterContext = createContext<RegisterContextData>({} as RegisterContextData);

export const RegisterProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    
    const saveUser = (_user: User) => {
        setUser(_user);
    }

    return (
        <RegisterContext.Provider value={{
            user: user,
            saveUser
        } as RegisterContextData}>
            {children}
        </RegisterContext.Provider>
    );
};

export default RegisterContext;