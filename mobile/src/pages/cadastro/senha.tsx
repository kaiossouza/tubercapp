import React, {useContext} from 'react';
import { Text, KeyboardAvoidingView, Image } from 'react-native';
import {TextInput} from 'react-native-paper';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';

export default function Senha({ navigation } : { navigation: any}) {
    const { user, saveUser } = useContext(RegisterContext);
    const image = "./../../../assets/images/cadastro/tratamento.png";

    function handleInput(value: string) {
        saveUser({
            ...user,
            password: value
        } as User);
    }

    return (
        <KeyboardAvoidingView style={styles.mainContainer}>
            <Header  pageNumber={5} totalPages={9}  navigation={navigation}></Header>
            <Image style={styles.imageRegister} source={require(image)} />      
            <KeyboardAvoidingView style={styles.container}>            
                <Text style={styles.labelText}>Crie sua senha:</Text>
                <TextInput label="Senha" secureTextEntry={true} style={styles.inputView} onChangeText={handleInput}></TextInput>
                <Footer navigation={navigation} goTo="Tratamento"></Footer>              
            </KeyboardAvoidingView>            
        </KeyboardAvoidingView>
    );
}