import React, {useState, useContext} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import AuthContext from '../../contexts/auth';
import { NavigationContainer } from '@react-navigation/native';
import { login } from '../../services/api';

export default function Login({ navigation }) {
  const { signed, user, handleLogin } = useContext(AuthContext);  
  const [ credentials, setCredentials ] = useState({
    email: "",
    senha: ""
  });

  const login = () => {
    handleLogin(credentials.email, credentials.senha);
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

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.png')} style={styles.logo}></Image>
      <Text style={styles.labelText}>Tuberc</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  inputView:{
    width:"80%",
    backgroundColor: '#fff',
    justifyContent:"center",
    margin:20
  },

  button:{
    width:"80%",
    margin:20
  },

  textButton:{
    color:'#fff',
    textAlign:'center',
    fontSize:15,
  },

  logo:{
    width:150,
    height:150,
    marginBottom:20
  },

  labelText: {
      color:'#82B1B6',
      fontSize:36
  },

  touchableText: {
    color:'#82B1B6',
  }

});
