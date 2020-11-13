
import React from 'react';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MyDiary from '../pages/my-diary/index';

IconFontisto.loadFont();
const Stack = createStackNavigator();

export default function MyDiaryRoute() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Meu Diário" component={MyDiary}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}