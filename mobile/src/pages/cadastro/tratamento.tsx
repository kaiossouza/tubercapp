import React, {useContext, useState} from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';

export default function Tratamento({ navigation }) {
    const { user, saveUser } = useContext(RegisterContext);
    const [date, setDate] = useState(new Date(1598051730000));

    function handleDateInput(value: Date) {
        saveUser({
            ...user,
            treatmentStart: value
        } as User);
    }

    const onChange = (_event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        handleDateInput(date);
    };
    
    return (
        <View style={styles.mainContainer}>
            <Header  pageNumber={6} totalPages={9}  navigation={navigation}></Header>
            <KeyboardAvoidingView style={styles.container}>    
                <Text style={styles.labelText}>Quando seu tratamento inicia/iniciou?</Text>
                <DateTimePicker testID="dateTimePicker"
                value={date}
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />                
                <Footer navigation={navigation} goTo="Duracao"></Footer>              
            </KeyboardAvoidingView>            
        </View>
    );
}