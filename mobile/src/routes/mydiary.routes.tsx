
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

IconFontisto.loadFont();

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

import MedicineSettings from '../pages/my-diary/medicine-setting';
import MyDiary from '../pages/my-diary/index';

export default function MyDiaryRoute() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator >
            {/* tabBarOptions={{ tabStyle: {display: 'none'} }}> */}
                <Stack.Screen name="Meu Diário" component={MyDiary}/>
                <Stack.Screen name="MedicineSettings" component={MedicineSettings}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}