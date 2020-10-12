
import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Fontisto';
import IconFeather from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-elements';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';

Icon.loadFont();
IconFeather.loadFont();

export default function Feel({navigation}){
    let [fontsLoaded] = useFonts({
        Cabin_400Regular,
    });
    const [option1, setOption1] = useState(false);
    const [option2, setOption2] = useState(false);
    const [option3, setOption3] = useState(false);

    let result1 = () => handlerOption1();
    let result2 = () => handlerOption2();
    let result3 = () => handlerOption3();
    
    var handlerOption1 = () => {
        if(option1){
            setOption1(false)
            setOption2(false)
            setOption3(false)
        }else{
            setOption1(true)
            setOption2(false)
            setOption3(false)
        };
    };

    var handlerOption2 = () => {
        if(option2){
            setOption1(false)
            setOption2(false)
            setOption3(false)
        }else{
            setOption1(false)
            setOption2(true)
            setOption3(false)
        }
    };

    var handlerOption3 = () => {
        if(option3){
            setOption1(false)
            setOption2(false)
            setOption3(false)
        }else{
            setOption1(false)
            setOption2(false)
            setOption3(true)
        }
    };
    if (!fontsLoaded) {
        return <AppLoading />;
    } else
        return (
            <Card containerStyle={styles.card}>
            <Text style={styles.titleFeel}>
                Como você está?
            </Text>
            <Divider style={styles.divider}/>
            <View style={styles.options}>
                <TouchableWithoutFeedback onPress={result1}>
                    <View style={styles.option}>
                        { 
                            option1 ? <Icon color="#DB9E06" size={35} name="slightly-smile" />  : 
                            <Icon color="black" size={35} name="slightly-smile" /> 
                        } 
                        <Text style={styles.optionName}>
                            Estou bem!
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={result2}>
                    <View style={styles.option}>
                        { 
                            option2 ? <Icon color="#DB9E06" size={35} name="neutral" />  : 
                                    <Icon color="black" size={35} name="neutral" />
                        }
                        <Text style={styles.optionName}>
                            Mais ou menos!
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={result3}>
                    <View  style={styles.option}>
                        { 
                            option3 ? <Icon color="#DB9E06" size={35} name="frowning" />  : 
                                    <Icon color="black" size={35} name="frowning" />
                        }
                        <Text style={styles.optionName}>
                            Não me sinto bem!
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    divider:{
        height: 3,
        marginBottom: 20,
        marginTop: 20,
    },

    option:{
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },

     card:{
         height: 430,
         marginTop: 20,
         borderRadius: 20
     },

     divider2:{
        height: 1,
        marginTop: 20,
        width: 350,
        alignSelf:'center',
        backgroundColor: '#9c9c9c',
    },
    titleFeel:{
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
    },

    logo:{
        alignSelf: 'center',
        marginTop: 20
    },

    optionName:{
        fontFamily: 'Cabin_400Regular',
        fontStyle: 'normal',
        fontSize: 20,
        marginLeft: 10
    },
    
    options:{
        marginTop: 45,
        alignSelf: 'center',
        justifyContent: 'center'
    }
});