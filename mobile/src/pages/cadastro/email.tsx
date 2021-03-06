import React, {useContext, useState} from 'react';
import { Text, KeyboardAvoidingView, Image } from 'react-native';
import {TextInput} from 'react-native-paper';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';

export default function Email({ navigation } : {navigation: any}) {
    const { user, saveUser } = useContext(RegisterContext);
    const [ emailValidate, setEmailValidate ] = useState(false);
    const image = "./../../../assets/images/cadastro/dados.png";

    function handleInput(value: string) {
        setEmailValidate(isValid(value));
        saveUser({
            ...user,
            email: value
        } as User);
    }

    function isValid(email: string): boolean {
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        return reg.test(email) ? true : false;
    } 

    return (
        <KeyboardAvoidingView style={styles.mainContainer}>
            <Header  pageNumber={4} totalPages={9}  navigation={navigation}></Header>
            <Image style={styles.imageRegister} source={require(image)} />      
            <KeyboardAvoidingView style={styles.container}>            
                <Text style={styles.labelText}>Qual seu e-mail?</Text>
                <TextInput autoCompleteType="email" keyboardType="email-address" textContentType="emailAddress" style={styles.inputView} onChangeText={handleInput}></TextInput>  
                {emailValidate && <Footer navigation={navigation} goTo="Senha"></Footer>}            
            </KeyboardAvoidingView>            
        </KeyboardAvoidingView>
    );
}