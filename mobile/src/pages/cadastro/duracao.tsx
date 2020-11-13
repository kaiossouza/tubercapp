import React, {useContext, useState} from 'react';
import { View, Text, KeyboardAvoidingView, Image, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function Duracao({ navigation } : {navigation: any}) {
    const { user, saveUser } = useContext(RegisterContext);
    const [ durationIsValid, setValidDuration ] = useState(false);
    const image = "./../../../assets/images/cadastro/hospital.png";

    function handleDurationInput(value: string) {
        var numberValue: number = Number(value);
        setValidDuration(isValid(numberValue));
        saveUser({
            ...user,
            treatmentDuration: numberValue
        } as User);
    }

    function isValid(pVal: number): boolean { 
        return pVal >= 30 ? true : false
    }
    
    return (
        <KeyboardAvoidingView style={styles.mainContainer}>
            <Header  pageNumber={7} totalPages={9}  navigation={navigation}></Header>
            <Image style={styles.imageRegister} source={require(image)} />                 
                <KeyboardAvoidingView style={styles.container}>   
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                        <Text style={styles.labelText}>Qual a duração prevista do seu tratamento (em dias)?</Text>                    
                        <TextInput keyboardType="number-pad" style={styles.inputView} onChangeText={handleDurationInput}></TextInput>                    
                        { durationIsValid && <Footer navigation={navigation} goTo="Padrinho"></Footer> }
                    </TouchableWithoutFeedback>          
                </KeyboardAvoidingView>           
        </KeyboardAvoidingView>
    );
}