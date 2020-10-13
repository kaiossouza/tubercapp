import React, {ReactText, useContext, useState} from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';
import {Picker} from '@react-native-community/picker';
import { Checkbox, RadioButton } from 'react-native-paper';

export default function Genero({ navigation }) {
    const { user, saveUser } = useContext(RegisterContext);
    const [gender, setGender] = useState<ReactText | null>(null);

    function handleInput(index: Number) {
        saveUser({
            ...user,
            gender: index
        } as User);
    }
    
    return (
        <View style={styles.mainContainer}>
            <Header  pageNumber={3} totalPages={9}  navigation={navigation}></Header>
            <KeyboardAvoidingView style={styles.container}>            
                <Text style={styles.labelText}>Com qual gênero você se identifica?</Text> 

                <View style={{
                    flexDirection:'column',

                }}>
                    <Picker
                    selectedValue={gender?.toString()}
                    onValueChange={(itemValue, itemIndex) => {
                        setGender(itemValue);
                        handleInput(itemIndex + 1);
                    }}>
                        <Picker.Item label="Masculino" value="1" />
                        <Picker.Item label="Feminino" value="2" />
                        <Picker.Item label="Outros" value="3" />
                        <Picker.Item label="Não informar" value="4" />
                    </Picker>
                </View>

                <Footer navigation={navigation} goTo="Email"></Footer>              
            </KeyboardAvoidingView>            
        </View>
    );
}