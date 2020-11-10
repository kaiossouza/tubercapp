import React, {useContext} from 'react';
import { View, Text, KeyboardAvoidingView, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';

export default function Nome({ navigation }: {navigation: any}) {
    const { user, saveUser } = useContext(RegisterContext);
    const image = "./../../../assets/images/cadastro/bem-vindo.png";
    function handleInput(value: string) {
        saveUser({
            ...user,
            name: value
        } as User);
    }

    return (
        <View style={styles.mainContainer}>
            <Header pageNumber={1} totalPages={9} navigation={navigation}></Header>
            <Image style={styles.imageRegister} source={require(image)} />      
            <KeyboardAvoidingView style={styles.container}>         
                <View>
                    <Text style={styles.labelText}>Qual seu nome completo?</Text>
                    <TextInput style={styles.inputView} onChangeText={handleInput}></TextInput>  
                    <Footer navigation={navigation} goTo="Data"></Footer>        
                </View>      
            </KeyboardAvoidingView>            
        </View>
    );
}