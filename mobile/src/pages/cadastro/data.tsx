import React, {useContext, useState} from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Image } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';
import DatePicker from 'react-native-datepicker';

export default function Data({ navigation } : { navigation: any }) {
    const { user, saveUser } = useContext(RegisterContext);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(true);
    const [mode, setMode] = useState('date');
    const image = "./../../../assets/images/cadastro/alarme.png";

    function handleInput(value: Date) {
        saveUser({
            ...user,
            nasc: value
        } as User);
    }

    // const onChange = (_event: any, selectedDate: any) => {
    //     const currentDate = selectedDate || date;
    //     setShow(Platform.OS === 'ios');
    //     setDate(currentDate);
    //     handleInput(date);
    //     setShow(false);
    // };

    // const showDatepicker = () => {
    //     setShow(true);
    //     setMode('date');
    // };

    var changeDate = (date: any) => {
        setDate(date);
        handleInput(date);
    };

    return (
        <View style={styles.mainContainer}>
            <Header pageNumber={2} totalPages={9}  navigation={navigation}></Header>
            <Image style={styles.imageRegister} source={require(image)} />      
            <KeyboardAvoidingView style={styles.container}>            
                <Text style={styles.labelText}>Qual a sua data de nascimento?</Text>
                {/* {show && ( <DateTimePicker testID="dateTimePicker"
                value={date}
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={onChange}
                onTouchCancel={() => setShow(false)}
                onTouchStart={() => setShow(false)}
                /> )} */}
                <DatePicker 
                    format="DD/MM/YYYY"
                    style={styles.dateComponent}
                    date={date}
                    onDateChange={changeDate}
                />
                <Footer navigation={navigation} goTo="Genero"></Footer>              
            </KeyboardAvoidingView>            
        </View>
    );
}