import React, {useContext, useState} from 'react';
import { Text, KeyboardAvoidingView, Image } from 'react-native';
import {TextInput} from 'react-native-paper';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';

export default function Senha({ navigation } : { navigation: any}) {
    const { user, saveUser } = useContext(RegisterContext);
    const [ passwordIsValid, setValidPassword ] = useState(false);
    const image = "./../../../assets/images/cadastro/tratamento.png";

    function handleInput(value: string) {
        setValidPassword(isValid(value));
        saveUser({
            ...user,
            password: value
        } as User);
    }

    function isValid(pVal: string): boolean { 
        var reValid = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/; 
        return reValid.test(pVal); 
    }

    return (
        <KeyboardAvoidingView style={styles.mainContainer}>
            <Header  pageNumber={5} totalPages={9}  navigation={navigation}></Header>
            <Image style={styles.imageRegister} source={require(image)} />      
            <KeyboardAvoidingView style={styles.container}>            
                <Text style={styles.labelText}>Crie sua senha:</Text>
                <Text style={styles.labelInfo}>No mínimo: 1 letra maiúscula, 1 letra minúscula, 1 caractere especial, 8 caracteres e 1 número</Text>
                <TextInput label="Senha" secureTextEntry={true} style={styles.inputView} onChangeText={handleInput}></TextInput>
                { passwordIsValid && <Footer navigation={navigation} goTo="Tratamento"></Footer> }           
            </KeyboardAvoidingView>            
        </KeyboardAvoidingView>
    );
}