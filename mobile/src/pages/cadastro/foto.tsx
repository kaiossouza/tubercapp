import React, {useContext, useState} from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { CAMERA_ROLL, askAsync } from 'expo-permissions';
import { styles } from './styles';
import Header from './header';
import RegisterContext from '../../contexts/register';
import { ActivityIndicator, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import AuthContext from '../../contexts/auth';
import { User } from '../../models/user';
import { addUser, getUser } from '../../services/storage';


export default function Foto({ navigation }) {
    const { user, saveUser } = useContext(RegisterContext);
    const { handleLogin } = useContext(AuthContext);
    const [ image, setImage ] = useState<any | null>(null);
    const [ base64, setBase64 ] = useState<string | null>("");
    const [ loading, setLoading ] = useState(false);

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
            setBase64(result.base64 ?? "");
          }
        } catch (E) {
          console.log(E);
        }
    };

    async function storeUser() {
        try{
            setLoading(true);

            let currentUser = ({
                ...user,
                picture: base64
            } as User);

            addUser(currentUser)
                    .then((id) => {
                        getUser(user?.email ?? "", user?.password ?? "").then(user => {
                            saveUser(user);
                            setLoading(false);
                            handleLogin(user.email, user.password);
                        });
                    })
                    .catch((err) => {
                        alert(err);
                    });

        } catch(err) {
            setLoading(false); 
            alert(err);
        }
    }
    
    if(!loading) {
        return (
            <View style={styles.mainContainer}>
                <Header pageNumber={9} totalPages={9} navigation={navigation}></Header>
                <KeyboardAvoidingView style={styles.picContainer}>
                    <Text style={styles.labelText}>Quase lá! Escolha uma foto de perfil:</Text>
                    { image ? <Image source={{ uri: image }} style={styles.image} /> : <Image source={require('../../../assets/logo.png')} style={styles.image} /> }   
                    <Button mode="contained" onPress={_pickImage} style={styles.button} labelStyle={styles.textButton}>Escolher foto</Button>              
                </KeyboardAvoidingView>   
                <TouchableOpacity  onPress={storeUser} style={styles.picFooter}>                    
                    <Text style={styles.footerText}>Finalizar</Text>
                    <AntDesign name="rightcircle" size={20} color="#82B1B6"></AntDesign>
                </TouchableOpacity>         
            </View>
        );
    } else {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator></ActivityIndicator>
            </View>);
    }
}