import React, {useContext, useState} from 'react';
import { Text, KeyboardAvoidingView, Image } from 'react-native';
import { styles } from './styles';
import Header from './header';
import Footer from './footer';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';
import DatePicker from 'react-native-datepicker';

export default function Data({ navigation } : { navigation: any }) {
    const { user, saveUser } = useContext(RegisterContext);
    const [date, setDate] = useState(new Date());
    const image = "./../../../assets/images/cadastro/alarme.png";

    function handleInput(value: Date) {
        saveUser({
            ...user,
            nasc: value
        } as User);
    }

    var changeDate = (date: any) => {
        setDate(date);
        handleInput(date);
    };

    return (
        <KeyboardAvoidingView style={styles.mainContainer}>
            <Header pageNumber={2} totalPages={9}  navigation={navigation}></Header>
            <Image style={styles.imageRegister} source={require(image)} />      
            <KeyboardAvoidingView style={styles.container}>            
                <Text style={styles.labelText}>Qual a sua data de nascimento?</Text>
                <DatePicker 
                    format="DD MMM YYYY"
                    style={styles.dateComponent}
                    date={date}
                    onDateChange={changeDate}
                    locale={'pt-br'}
                />
                <Footer navigation={navigation} goTo="Genero"></Footer>              
            </KeyboardAvoidingView>            
        </KeyboardAvoidingView>
    );
}