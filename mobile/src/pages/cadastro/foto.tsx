import React, {useContext, useState} from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { CAMERA_ROLL, askAsync } from 'expo-permissions';
import { styles } from './styles';
import Header from './header';
import RegisterContext from '../../contexts/register';
import { User } from '../../models/user';
import { Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

export default function Foto({ navigation }) {
    const { user, saveUser } = useContext(RegisterContext);
    const [ image, setImage ] = useState<string | null>(null);

    function componentDidMount() {
        getPermissionAsync();
    }
    
    async function getPermissionAsync() {
        if (Platform.OS !== 'web') {
            const { status } = await askAsync(CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Para escolher uma foto, permita que o Tuberc acesse seu rolo da câmera.');
            }
        }
    };
    
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
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
    };

    function registerUser() {
        saveUser({
            ...user,
            picture: image
        } as User);


    }
    
    return (
        <View style={styles.mainContainer}>
            <Header navigation={navigation}></Header>
            <KeyboardAvoidingView style={styles.picContainer}>
                <Text style={styles.labelText}>Quase lá! Escolha uma foto de perfil:</Text>
                { image ? <Image source={{ uri: image }} style={styles.image} /> : <Image source={require('../../../assets/logo.png')} style={styles.image} /> }   
                <Button mode="contained" onPress={_pickImage} style={styles.button} labelStyle={styles.textButton}>Escolher foto</Button>              
            </KeyboardAvoidingView>   
            <TouchableOpacity  onPress={registerUser}  style={styles.footer}>                    
                <Text style={styles.footerText}>Finalizar</Text>
                <AntDesign name="rightcircle" size={20} color="#82B1B6"></AntDesign>
            </TouchableOpacity>         
        </View>
    );
}