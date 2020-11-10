import React, {useContext, useState} from 'react';
import { Text, KeyboardAvoidingView, Image } from 'react-native';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

export default function Tratamento({ navigation } : { navigation: any }) {
    const { user, saveUser } = useContext(RegisterContext);
    const [date, setDate] = useState(new Date(1598051730000));
    const [dataValidation, setDataValidation] = useState(false);
    const image = "./../../../assets/images/cadastro/alarme.png";

    function handleDateInput(value: Date) {
        setDataValidation(isValid(value));
        saveUser({
            ...user,
            treatmentStart: value
        } as User);
    }

    var changeDate = (date: any) => {
        setDate(date);
        handleDateInput(date);
    };

    function isValid(pVal: Date): boolean { 
        var dateNow = moment();
        var date = moment(pVal);
        return date > dateNow ? false : true;
    }

    return (
        <KeyboardAvoidingView style={styles.mainContainer}>
            <Header  pageNumber={6} totalPages={9}  navigation={navigation}></Header>
            <Image style={styles.imageRegister} source={require(image)} />      
            <KeyboardAvoidingView style={styles.container}>    
                <Text style={styles.labelText}>Qual a data inicial do tratamento?</Text>
                <Text style={styles.labelInfo}>A data inicial deve ser no máximo a data de hoje</Text>
                <DatePicker 
                    format="DD MMM YYYY"
                    style={styles.dateComponent}
                    date={date}
                    onDateChange={changeDate}
                    locale={'pt-br'}
                />
                { dataValidation && <Footer navigation={navigation} goTo="Duracao"></Footer>}         
            </KeyboardAvoidingView>            
        </KeyboardAvoidingView>
    );
}