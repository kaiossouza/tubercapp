import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerRoutes from './home.routes';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => {
    return (
        <AppStack.Navigator headerMode='none'>            
            <AppStack.Screen name="Home" component={DrawerRoutes} />
        </AppStack.Navigator>
    );
}

export default AppRoutes;