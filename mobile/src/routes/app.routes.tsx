import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/home/home';
import DrawerRoutes from './home.routes';
import Login from '../pages/login/login';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => {
    return (
        <AppStack.Navigator headerMode='none'>            
            <AppStack.Screen name="Home" component={DrawerRoutes} />
        </AppStack.Navigator>
    );
}

export default AppRoutes;