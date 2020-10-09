import React from 'react';
import { Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from './header';

export default function Footer({ navigation, goTo }) {
    return (
        <TouchableOpacity  onPress={() => { navigation.navigate(goTo) }}  style={styles.footer}>                    
            <Text style={styles.footerText}>Próxima</Text>
            <AntDesign name="rightcircle" size={20} color="#82B1B6"></AntDesign>
        </TouchableOpacity>
    );
}