import React, {useContext, useState} from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';

export default function Data({ navigation } : { navigation: any }) {
    const { user, saveUser } = useContext(RegisterContext);
    const [date, setDate] = useState(new Date(1598051730000));

    function handleInput(value: Date) {
        saveUser({
            ...user,
            nasc: value
        } as User);
    }

    const onChange = (_event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        handleInput(date);
    };
    
    return (
        <View style={styles.mainContainer}>
            <Header pageNumber={2} totalPages={9}  navigation={navigation}></Header>
            <KeyboardAvoidingView style={styles.container}>            
                <Text style={styles.labelText}>Qual a sua data de nascimento?</Text>
                <DateTimePicker testID="dateTimePicker"
                value={date}
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
                <Footer navigation={navigation} goTo="Genero"></Footer>              
            </KeyboardAvoidingView>            
        </View>
    );
}