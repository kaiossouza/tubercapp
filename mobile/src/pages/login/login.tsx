import React, {useState, useContext} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import AuthContext from '../../contexts/auth';
import styles from './styles';

export default function Login({ navigation } : { navigation: any }) {
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