import React from 'react';
import { Text, View, StyleSheet, ScrollView} from 'react-native';
import { Appbar } from 'react-native-paper';
import IconFeather from 'react-native-vector-icons/Feather';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';
import { PieChart } from 'react-native-svg-charts';

IconFeather.loadFont();

export default function Relatorio({navigation, name} : {navigation: any, name: string}){
    let [fontsLoaded] = useFonts({
        Cabin_400Regular,
    });
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);
    const pieData = data
    .filter((value) => value > 0)
    .map((value, index) => ({
        value,
        svg: {
            fill: randomColor(),
            onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
    }))

      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
            <View style={{backgroundColor:'#fff', flex: 1}}>
                <Appbar.Header style={{backgroundColor:"#ffff"}}>
                    <Appbar.Action  color="#7d8597" icon={require('../../../assets/goback.png')} onPress={() => navigation.goBack()} />  
                    <Appbar.Content titleStyle={{color: "#7d8597", alignSelf: 'flex-start'}} title="Relatório" />
                </Appbar.Header>
                <View style={styles.screen}>
                   <PieChart style={{ height: 200 }} data={pieData} />
                </View>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    screen:{
        backgroundColor:'#fff',
        justifyContent: "center", 
        flex: 1, 
    },
});