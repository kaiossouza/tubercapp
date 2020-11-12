import React, {useState, useContext} from 'react';
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Appbar, Button,TextInput } from 'react-native-paper';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import RegisterContext from '../../contexts/register';
import AuthContext from '../../contexts/auth';
import { User } from '../../models/user';
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';
import moment from 'moment';

export default function Settings({navigation} : {navigation: any}){
    let [fontsLoaded] = useFonts({
        Cabin_400Regular,
    });
    const [ image, setImage ] = useState<any | null>(null);
    const [ base64, setBase64 ] = useState<string | null>("");
    const { user } = useContext(AuthContext);

    //NAO FUNCIONA, MUDAR PARA UM METODO ASYNC STORAGE
    const { saveUser } = useContext(RegisterContext);

    const [ name, setName ] = useState(user?.name);
    const [ email, setEmail ] = useState(user?.email);
    const [ dateNasc, setDateNasc ] = useState(user?.nasc);
    const [ treatment, setTreatment ] = useState(user?.treatmentDuration);
    const [ gender, setGender ] = useState(user?.gender);
    const [ emailGodFather, setEmailGodFather ] = useState(user?.emailGodFather);
    const [ treatmentDate, setTreatmentDate ] = useState(user?.treatmentStart);
    const [ nascValidation, setNascValidation ] = useState(true);
    const [ durationValidation, setDurationValidation ] = useState(true);
    const [ emailValidation, setEmailValidation ] = useState(true);
    const [ nameValidation, setNameValidation ] = useState(true);
    const [ treatmentDateValidation, setTreatmentDateValidation] = useState(true);
    const [ emailGodFatherValidation, setEmailGodFatherValidation ] = useState(true);
    const [ clickSave, setClickSave ] = useState(true);

    const changeNameInput = (value: string) => {
        setNameValidation(nameIsValid(value));
        setName(value);
    }
    const changeEmailInput = (value: string) => {
        setEmailValidation(emailIsValid(value));
        setEmail(value);
    }
    const changeNascInput = (value: any) => {
        setNascValidation(nascIsValid(value));
        setDateNasc(value);
    }
    const changeTreatmentInput = (value: string) => {
        var numberValue: number = Number(value);
        setDurationValidation(durationIsValid(numberValue));
        setTreatment(numberValue);
    }
    const changeGenderInput = (value: number) => {
        setGender(value);
    }
    const changeEmailGodFatherInput = (value: string) => {
        setEmailGodFatherValidation(emailIsValid(value));
        setEmailGodFather(value);
    }
    const changeTreatmentDateInput = (value: any) => {
        setTreatmentDateValidation(treatmentDateIsValid(value));
        setTreatmentDate(value);
    }

    function saveName () {
        saveUser({
            ...user,
            name: name
        } as User);
    }

    function saveEmail () {
        saveUser({
            ...user,
            email: email
        } as User);
    }

    function saveEmailGodFather () {
        saveUser({
            ...user,
            emailGodFather: emailGodFather
        } as User);
    }

    function saveNasc () {
        saveUser({
            ...user,
            nasc: dateNasc
        } as User);
    };
    
    function saveTreatmentDate() {
        saveUser({
            ...user,
            treatmentStart: treatmentDate
        } as User);
    };

    function saveGender() {
        saveUser({
            ...user,
            gender: gender
        } as User);
    }

    function saveTreatment() {
        saveUser({
            ...user,
            treatmentDuration: treatment
        } as User);
    }

    async function _pickImage() {
        try {
          let result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if (!result.cancelled) {
            setImage(result.uri);
            setBase64(result.base64 ?? "");
          }
        } catch (E) {
          console.log(E);
        }
    };

    async function save() {
        setClickSave(true);
        if(isValid()){
            saveName();
            saveEmail();
            saveNasc();
            saveTreatment();
            saveGender();
            saveEmailGodFather();
            saveTreatmentDate();
            navigation.goBack();
        }
    }

    function isValid(): boolean{
        return emailValidation && nameValidation && nascValidation && emailGodFatherValidation && treatmentDateValidation;
    }

    function nascIsValid(pVal: Date): boolean { 
        var dateNow = moment();
        var date = moment(pVal);
        var dateMax = dateNow.subtract(30, "days");
        return date > dateMax ? false : true;
    }

    function durationIsValid(pVal: number): boolean { 
        return pVal >= 30 ? true : false
    }

    function emailIsValid(email: string): boolean {
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        return reg.test(email) ? true : false;
    } 

    function nameIsValid(pVal: string): boolean { 
        var reValid = /[A-z][ ][A-z]/; 
        return reValid.test(pVal); 
    }

    function treatmentDateIsValid(pVal: Date): boolean { 
        var dateNow = moment();
        var date = moment(pVal);
        return date > dateNow ? false : true;
    }

      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
        <View style={{backgroundColor:'#fff', flex: 1}}>
            <Appbar.Header style={{backgroundColor:"#ffff"}}>
                <Appbar.Action  color="#7d8597" icon={require('../../../assets/goback.png')} onPress={() => navigation.goBack()} />  
                <Appbar.Content titleStyle={{color: "#7d8597", alignSelf: 'flex-start'}} title="Configuração" />
            </Appbar.Header>
            <ScrollView style={styles.screen}>
                <KeyboardAvoidingView style={styles.picContainer}>
                    { image ? <Image source={{ uri: image }} style={styles.image} /> : <Image source={require('../../../assets/logo.png')} style={styles.image} /> }   
                    <Button mode="contained" onPress={_pickImage} style={styles.button} labelStyle={styles.textButton}>Escolher foto</Button>              
                </KeyboardAvoidingView>   
                <View style={styles.box}>
                    <Text style={styles.labelText}>Nome Completo</Text>
                    { !nameValidation && (name ? name.trim().length >= 0 : true) && clickSave && <Text style={styles.labelInfo}>Digite o nome completo corretamente</Text> }
                    <TextInput style={styles.inputView} value={name} selectionColor="#CCCC" onChangeText={changeNameInput}></TextInput> 
                </View>
                <View style={styles.box}>
                    <Text style={styles.labelText}>E-mail</Text>
                    { !emailValidation && (email ? email.trim().length > 0 : false) && clickSave && <Text style={styles.labelInfo}>O e-mail que você digitou não está correto</Text> }
                    <TextInput style={styles.inputView} value={email} autoCompleteType="email" keyboardType="email-address" textContentType="emailAddress" selectionColor="#CCCC" onChangeText={changeEmailInput}></TextInput> 
                </View>
                <View style={styles.box}>
                    <Text style={styles.labelText}>Data de Nascimento</Text>
                    { !nascValidation && clickSave && <Text style={styles.labelInfo}>Informe a data correta</Text> }
                    <DatePicker 
                        format="DD MMM YYYY"
                        style={styles.dateComponent}
                        date={dateNasc}
                        onDateChange={changeNascInput}
                        locale={'pt-br'}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.labelText}>Duração do Tratamento</Text>
                    { !durationValidation && clickSave && <Text style={styles.labelInfo}>Informe a duração correta</Text> }
                    <TextInput keyboardType="number-pad" style={styles.inputView} value={treatment?.toString() ? treatment.toString() : ""} onChangeText={changeTreatmentInput}></TextInput>
                </View>
                <View style={styles.box}>
                    <Text style={styles.labelText}>Gênero</Text>
                    <View style={{
                        flexDirection:'column',
                    }}>
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue, itemIndex) => {
                            changeGenderInput(itemIndex + 1);
                        }}>
                            <Picker.Item label="Masculino" value="1" />
                            <Picker.Item label="Feminino" value="2" />
                            <Picker.Item label="Outros" value="3" />
                            <Picker.Item label="Não informar" value="4" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={styles.labelText}>E-mail do Padrinho</Text>
                    { !emailGodFatherValidation && (emailGodFather ? emailGodFather.trim().length > 0 : true) && clickSave && <Text style={styles.labelInfo}>O e-mail que você digitou não está correto</Text> }
                    <TextInput autoCompleteType="email" keyboardType="email-address" textContentType="emailAddress" style={styles.inputView} onChangeText={changeEmailGodFatherInput} value={emailGodFather}></TextInput>  
                </View>
                <View style={styles.box}>
                    <Text style={styles.labelText}>Data do início do tratamento</Text>
                    { !treatmentDateValidation && clickSave && <Text style={styles.labelInfo}>Informe a data correta</Text> }
                    <DatePicker 
                        format="DD MMM YYYY"
                        style={styles.dateComponent}
                        date={treatmentDate}
                        onDateChange={changeTreatmentDateInput}
                        locale={'pt-br'}
                    />
                </View>
                <View style={styles.footer}>
                    <Button mode="contained" style={styles.buttonSave} onPress={save} labelStyle={styles.textButton}>Salvar</Button>              
                </View>
            </ScrollView>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    screen:{
        paddingBottom:20,
        backgroundColor:'#fff'
    },
    userName:{
        alignSelf:'center',
        marginTop: 10,
        fontSize: 20,
        fontFamily: 'Cabin_400Regular'
    },
    picContainer:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
    }, 
    image: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#82B1B6",
        marginRight:40,
        marginLeft:40
    },
    button:{
        width:"60%",
        marginTop:20
    },
    buttonSave:{
        width:"40%"
    },
    textButton:{
        color:'#fff',
        textAlign:'center',
        fontSize:15,
    },
    labelText: {
        color:'#82B1B6',
        fontSize:15,
        textAlign: 'left'
    }, 
    inputView:{
        width:"100%",
        backgroundColor: '#fff'
    },
    box:{
        flex: 1,
        width: "80%",
        alignSelf: "center",
        marginBottom: 25
    },
    dateComponent: {
        width: 350
    },
    footer:{
        margin: 30,
        alignItems: "flex-end"
    },
    labelInfo:{
        color:'#f05454',
        fontSize:11,
        textAlign: 'left',
        justifyContent: "flex-start",
    }
});