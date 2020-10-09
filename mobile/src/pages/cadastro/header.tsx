import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

export default function Header({ navigation, pageNumber = 1, totalPages = 1 }) {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => { navigation.navigate('Login') }} style={styles.header}>
                    <AntDesign name="leftcircleo" size={20} color="#82B1B6"></AntDesign>
                    <Text style={styles.headerText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.headerText}>{pageNumber}/{totalPages}</Text>
            </View>            
        </View>
    );
}