import React, {useContext} from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import {TextInput} from 'react-native-paper';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';

export default function Padrinho({ navigation }) {
    const { user, saveUser } = useContext(RegisterContext);

    function handleInput(value: string) {
        saveUser({
            ...user
        } as User);
    }

    return (
        <View style={styles.mainContainer}>
            <Header  pageNumber={8} totalPages={9}  navigation={navigation}></Header>
            <KeyboardAvoidingView style={styles.container}>            
                <Text style={styles.labelText}>Qual o e-mail do seu padrinho?</Text>
                <TextInput autoCompleteType="email" keyboardType="email-address" textContentType="emailAddress" style={styles.inputView} onChangeText={handleInput}></TextInput>  
                <Footer navigation={navigation} goTo="Foto"></Footer>              
            </KeyboardAvoidingView>            
        </View>
    );
}