import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import IconFeather from 'react-native-vector-icons/Feather';
import { Avatar, ListItem } from 'react-native-elements';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';

IconFeather.loadFont();

export default function Settings({navigation} : {navigation: any}){
    let [fontsLoaded] = useFonts({
        Cabin_400Regular,
    });
    const list = [
        {
          name: 'Meus Dados',
          iconName: 'info',
        },
        {
          name: 'Meu Tratamento',
          iconName: 'clipboard',
        },
        {
            name: 'Contato',
            iconName: 'phone',
        },
        {
            name: 'Alarmes',
            iconName: 'clock',
        },
        {
            name: 'Ajuda',
            iconName: 'help-circle',
        },
      ]
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
                    <Avatar size="xlarge" rounded activeOpacity={0.7} source={require('../../../assets/yuri.jpg')}
                            containerStyle={styles.avatar} />
                            {/* showEditButton={true}/> */}
                    {/* <Badge size={40} style={{position: 'absolute', backgroundColor: '#e9ecef', color: '#6c757d', top: 130, right: 130}}>
                        <IconFeather size={20} rounded={true} name='edit-2'/>
                    </Badge> */}
                    <Text style={styles.userName}>Yuri Lima</Text>
                    <Text style={styles.userCode}>2017200628</Text>
                    <View style={styles.options}>
                        {
                            list.map((l, i) => (
                            <ListItem
                                key={i}
                                leftIcon={<IconFeather name={l.iconName} size={25}/>}
                                title={l.name}
                                chevron
                                bottomDivider
                            />
                            ))
                        }
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
    avatar:{
        alignSelf: 'center',
        marginTop: 20,
    },
    userName:{
        alignSelf:'center',
        marginTop: 10,
        fontSize: 20,
        fontFamily: 'Cabin_400Regular'
    },
    userCode:{
        alignSelf:'center',
        marginTop: 5,
        fontSize: 15,
        fontFamily: 'Cabin_400Regular',
        color: '#7d8597'
    },
    divider:{
        height: 2,
    },
    options:{
        marginTop: 20,
        marginLeft: 10,
    },
});