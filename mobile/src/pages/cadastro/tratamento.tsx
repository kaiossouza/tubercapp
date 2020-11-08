import React, {useContext, useState} from 'react';
import { View, Text, KeyboardAvoidingView, Image, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';
import DatePicker from 'react-native-datepicker';


export default function Tratamento({ navigation }) {
    const { user, saveUser } = useContext(RegisterContext);
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(true);
    const [mode, setMode] = useState('date');
    const image = "./../../../assets/images/cadastro/alarme.png";

    function handleDateInput(value: Date) {
        saveUser({
            ...user,
            treatmentStart: value
        } as User);
    }

    // const onChange = (_event: any, selectedDate: any) => {
    //     const currentDate = selectedDate || date;
    //     setShow(Platform.OS === 'ios');
    //     setDate(currentDate);
    //     handleDateInput(date);
    //     setShow(false);
    // };

    // const showDatepicker = () => {
    //     setShow(true);
    //     setMode('date');
    // };
    
    var changeDate = (date: any) => {
        setDate(date);
        handleDateInput(date);
    };

    return (
        <View style={styles.mainContainer}>
            <Header  pageNumber={6} totalPages={9}  navigation={navigation}></Header>
            <Image style={styles.imageRegister} source={require(image)} />      
            <KeyboardAvoidingView style={styles.container}>    
                <Text style={styles.labelText}>Quando seu tratamento inicia/iniciou?</Text>
                {/* {show && ( <DateTimePicker testID="dateTimePicker"
                value={date}
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={onChange}
                /> )}          */}
                <DatePicker 
                    format="DD/MM/YYYY"
                    style={styles.dateComponent}
                    date={date}
                    onDateChange={changeDate}
                />
                <Footer navigation={navigation} goTo="Duracao"></Footer>              
            </KeyboardAvoidingView>            
        </View>
    );
}