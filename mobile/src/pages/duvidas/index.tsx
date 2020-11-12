import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import IconFeather from 'react-native-vector-icons/Feather';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';

IconFeather.loadFont();

export default function Duvidas({navigation} : {navigation: any}){
    let [fontsLoaded] = useFonts({
        Cabin_400Regular,
    });

      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
            <View style={{backgroundColor:'#fff', flex: 1}}>
                <Appbar.Header style={{backgroundColor:"#ffff"}}>
                    <Appbar.Action  color="#7d8597" icon={require('../../../assets/goback.png')} onPress={() => navigation.goBack()} />  
                    <Appbar.Content titleStyle={{color: "#7d8597", alignSelf: 'flex-start'}} title="" />
                </Appbar.Header>
                <View style={styles.screen}>
                    <Image
                        style={{width: 300, height: 300}}
                        source={{uri: 'https://media.giphy.com/media/joXIntcoeqI3xuuktt/giphy.gif'}} /> 
                </View>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    screen:{
        paddingBottom:20,
        backgroundColor:'#fff',
        justifyContent: "center", 
        flex: 1, 
        alignSelf: "center"
    },
});