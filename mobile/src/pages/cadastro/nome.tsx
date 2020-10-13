import React, {useContext} from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import {TextInput} from 'react-native-paper';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';

export default function Nome({ navigation }) {
    const { user, saveUser } = useContext(RegisterContext);

    function handleInput(value: string) {
        saveUser({
            ...user,
            name: value
        } as User);
    }

    return (
        <View style={styles.mainContainer}>
            <Header pageNumber={1} totalPages={9} navigation={navigation}></Header>
            <KeyboardAvoidingView style={styles.container}>            
                <Text style={styles.labelText}>Qual seu nome?</Text>
                <TextInput style={styles.inputView} onChangeText={handleInput}></TextInput>  
                <Footer navigation={navigation} goTo="Data"></Footer>              
            </KeyboardAvoidingView>            
        </View>
    );
}