import React, {useContext, useState} from 'react';
import { View, Text, KeyboardAvoidingView, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';

export default function Duracao({ navigation }) {
    const { user, saveUser } = useContext(RegisterContext);
    const image = "./../../../assets/images/cadastro/hospital.png";

    function handleDurationInput(value: string) {
        saveUser({
            ...user,
            treatmentDuration: Number(value)
        } as User);
    }
    
    return (
        <View style={styles.mainContainer}>
            <Header  pageNumber={7} totalPages={9}  navigation={navigation}></Header>
            <Image style={styles.imageRegister} source={require(image)} />      
            <KeyboardAvoidingView style={styles.container}>    
                <Text style={styles.labelText}>Qual a duração prevista do seu tratamento (em dias)?</Text>
                <TextInput keyboardType="number-pad" style={styles.inputView} onChangeText={handleDurationInput}></TextInput>                    
                <Footer navigation={navigation} goTo="Padrinho"></Footer>              
            </KeyboardAvoidingView>            
        </View>
    );
}