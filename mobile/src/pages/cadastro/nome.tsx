import React, {useContext, useState} from 'react';
import { View, Text, KeyboardAvoidingView, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';

export default function Nome({ navigation }: {navigation: any}) {
    const { user, saveUser } = useContext(RegisterContext);
    const [ nameValidation, setNameValidation ] = useState(false);
    const image = "./../../../assets/images/cadastro/bem-vindo.png";

    const handleInput = (value: string) => {
        setNameValidation(isValid(value));
        saveUser({
            ...user,
            name: value
        } as User);
    }

    function isValid(pVal: string): boolean { 
        var reValid = /[A-z][ ][A-z]/; 
        return reValid.test(pVal); 
    }

    return (
        <KeyboardAvoidingView style={styles.mainContainer}>
            <Header pageNumber={1} totalPages={9} navigation={navigation}></Header>
            <Image style={styles.imageRegister} source={require(image)} />      
            <KeyboardAvoidingView style={styles.container}>         
                <View>
                    <Text style={styles.labelText}>Qual seu nome completo?</Text>
                    <TextInput style={styles.inputView} onChangeText={handleInput}></TextInput>  
                    {nameValidation && <Footer navigation={navigation} goTo="Data"></Footer>} 
                </View>      
            </KeyboardAvoidingView>            
        </KeyboardAvoidingView>
    );
}