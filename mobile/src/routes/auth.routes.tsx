import React from 'react';
import Login from '../pages/login/login';
import Cadastro from '../pages/cadastro/cadastro';

import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <AuthStack.Navigator headerMode='none'>
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Cadastro" component={Cadastro} />
        </AuthStack.Navigator>
    );
}

export default AuthRoutes;