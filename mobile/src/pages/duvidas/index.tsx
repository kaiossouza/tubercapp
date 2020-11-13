import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import IconFeather from 'react-native-vector-icons/Feather';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';
import List from "./list";
import {duvida1, duvida2, duvida3, duvida4, duvida5, duvida6, duvida7, duvida8, duvida9, duvida10, duvida11, duvida12} from './listsMock';

IconFeather.loadFont();

export default function Duvidas({navigation} : {navigation: any}){

    let [fontsLoaded] = useFonts({
        Cabin_400Regular,
    });

      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
            <ScrollView style={{backgroundColor:'#fff', flex: 1}}>
                <Appbar.Header style={{backgroundColor:"#ffff"}}>
                    <Appbar.Action  color="#7d8597" icon={require('../../../assets/goback.png')} onPress={() => navigation.goBack()} />  
                    <Appbar.Content titleStyle={{color: "#7d8597", alignSelf: 'flex-start'}} title="Dúvidas" />
                </Appbar.Header>
                <View style={styles.container}>
                    <List {...{ list: duvida1 }} />
                    <List {...{ list: duvida2 }} />
                    <List {...{ list: duvida3 }} />
                    <List {...{ list: duvida4 }} />
                    <List {...{ list: duvida5 }} />
                    <List {...{ list: duvida6 }} />
                    <List {...{ list: duvida7 }} />
                    <List {...{ list: duvida8 }} />
                    <List {...{ list: duvida9 }} />
                    <List {...{ list: duvida10 }} />
                    <List {...{ list: duvida11}} />
                    <List {...{ list: duvida12 }} />
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f6",
        padding: 16,
    },
});