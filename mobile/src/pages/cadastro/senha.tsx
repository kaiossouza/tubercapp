import React, {useContext} from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import {TextInput} from 'react-native-paper';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';

export default function Senha({ navigation }) {
    const { user, saveUser } = useContext(RegisterContext);

    function handleInput(value: string) {
        saveUser({
            ...user,
            password: value
        } as User);
    }

    return (
        <View style={styles.mainContainer}>
            <Header  pageNumber={5} totalPages={7}  navigation={navigation}></Header>
            <KeyboardAvoidingView style={styles.container}>            
                <Text style={styles.labelText}>Crie sua senha:</Text>
                <TextInput label="Senha" secureTextEntry={true} style={styles.inputView} onChangeText={handleInput}></TextInput>
                <Footer navigation={navigation} goTo="Tratamento"></Footer>              
            </KeyboardAvoidingView>            
        </View>
    );
}