import React, {useContext, useState} from 'react';
import { Text, KeyboardAvoidingView, Image } from 'react-native';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';
import DatePicker from 'react-native-datepicker';


export default function Tratamento({ navigation } : { navigation: any }) {
    const { user, saveUser } = useContext(RegisterContext);
    const [date, setDate] = useState(new Date(1598051730000));
    const image = "./../../../assets/images/cadastro/alarme.png";

    function handleDateInput(value: Date) {
        saveUser({
            ...user,
            treatmentStart: value
        } as User);
    }

    var changeDate = (date: any) => {
        setDate(date);
        handleDateInput(date);
    };

    return (
        <KeyboardAvoidingView style={styles.mainContainer}>
            <Header  pageNumber={6} totalPages={9}  navigation={navigation}></Header>
            <Image style={styles.imageRegister} source={require(image)} />      
            <KeyboardAvoidingView style={styles.container}>    
                <Text style={styles.labelText}>Quando seu tratamento inicia/iniciou?</Text>
                <DatePicker 
                    format="DD MMM YYYY"
                    style={styles.dateComponent}
                    date={date}
                    onDateChange={changeDate}
                    locale={'pt-br'}
                />
                <Footer navigation={navigation} goTo="Duracao"></Footer>              
            </KeyboardAvoidingView>            
        </KeyboardAvoidingView>
    );
}