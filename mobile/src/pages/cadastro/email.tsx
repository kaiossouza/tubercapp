import React, {useContext} from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import {TextInput} from 'react-native-paper';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';

export default function Email({ navigation }) {
    const { user, saveUser } = useContext(RegisterContext);

    function handleInput(value: string) {
        saveUser({
            ...user,
            email: value
        } as User);
    }

    return (
        <View style={styles.mainContainer}>
            <Header  pageNumber={4} totalPages={7}  navigation={navigation}></Header>
            <KeyboardAvoidingView style={styles.container}>            
                <Text style={styles.labelText}>Qual seu e-mail?</Text>
                <TextInput autoCompleteType="email" keyboardType="email-address" textContentType="emailAddress" style={styles.inputView} onChangeText={handleInput}></TextInput>  
                <Footer navigation={navigation} goTo="Senha"></Footer>              
            </KeyboardAvoidingView>            
        </View>
    );
}