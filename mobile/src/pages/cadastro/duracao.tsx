import React, {useContext, useState} from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';

export default function Duracao({ navigation }) {
    const { user, saveUser } = useContext(RegisterContext);

    function handleDurationInput(value: string) {
        saveUser({
            ...user,
            treatmentDuration: Number(value)
        } as User);
    }
    
    return (
        <View style={styles.mainContainer}>
            <Header  pageNumber={7} totalPages={7}  navigation={navigation}></Header>
            <KeyboardAvoidingView style={styles.container}>    
                <Text style={styles.labelText}>Qual a duração prevista do seu tratamento?</Text>
                <TextInput keyboardType="number-pad" style={styles.inputView} onChangeText={handleDurationInput}></TextInput>                    
                <Footer navigation={navigation} goTo="Foto"></Footer>              
            </KeyboardAvoidingView>            
        </View>
    );
}