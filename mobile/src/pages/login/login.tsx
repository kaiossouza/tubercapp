import React, {useState, useContext} from 'react';
import {View, Image, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import AuthContext from '../../contexts/auth';
import styles from './styles';

export default function Login({ navigation } : { navigation: any }) {
  const { signed, user, handleLogin } = useContext(AuthContext);  
  const [ credentials, setCredentials ] = useState({
    email: "",
    senha: ""
  });
  const [ emailValidate, setEmailValidate ] = useState(false);
  const [ passwordValidate, setPasswordValidate ] = useState(false);
  const [ clickLogin, setClickLogin ] = useState(false);

  const login = () => {
    setClickLogin(true);
    validateInputs(credentials.email, credentials.senha);
    if(emailValidate && passwordValidate) {
      handleLogin(credentials.email, credentials.senha);
    }
  }

  const handleEmailChange = (value: string) => {
    setCredentials(prevState => ({
      ...prevState,
      email: value
    }));
  }

  const handlePasswordChange = (value: string) => {
    setCredentials(prevState => ({
      ...prevState,
      senha: value
    }));
  }

  function validateInputs(email: string, senha: string) {
    setPasswordValidate(passwordIsValid(senha));
    setEmailValidate(emailIsValid(email));
  }

  function emailIsValid(email: string): boolean {
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return reg.test(email) ? true : false;
  } 
  
  function passwordIsValid(pVal: string): boolean { 
    var reValid = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/; 
    return reValid.test(pVal); 
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.png')} style={styles.logo}></Image>
      <Text style={styles.labelText}>Tuberc</Text>
      { !emailValidate && credentials.email.trim().length > 0 && clickLogin && <Text style={styles.labelInfo}>O e-mail que você digitou não está correto</Text> }
      { !passwordValidate && credentials.senha.trim().length > 0 &&  clickLogin && <Text style={styles.labelInfo}>A senha que você digitou não está correta</Text> }
      <TextInput label="E-mail" value={credentials.email} onChangeText={handleEmailChange} style={styles.inputView}></TextInput>
      <TextInput 
        label="Senha" 
        value={credentials.senha} 
        onChangeText={handlePasswordChange} 
        style={styles.inputView} 
        secureTextEntry={true}></TextInput>
      <Button mode="contained" onPress={login} style={styles.button} labelStyle={styles.textButton}>Entrar</Button>
      <TouchableOpacity onPress={() => { navigation.navigate('Cadastro') }}>
          <Text style={styles.touchableText}>Não tem uma conta?</Text>
      </TouchableOpacity>
    </View>
  );
}