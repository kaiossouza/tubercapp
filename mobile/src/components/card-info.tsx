import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconEvilIcons from 'react-native-vector-icons/EvilIcons'
import { Divider } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

IconEntypo.loadFont();
IconEvilIcons.loadFont();

const pillsImage = '../../assets/pills.png';

const CardInfo = ({ feedback, medicine, symptoms } : { feedback: string, medicine: string, symptoms: string }) => {    

    function renderIcon() {
        let filled = feedback || medicine || symptoms;
        if(filled) {
            return (<AntDesign name="checkcircleo" size={20} color="#46FF33"></AntDesign>);
        } else {
            return (<AntDesign name="closecircleo" size={20} color="#FF0000"></AntDesign>);
        }
    }

    function renderTitle() {
        let filled = feedback || medicine || symptoms;
        if(filled) {
            return (<Text style={styles.title}>Diário registrado:</Text>);
        } else {
            return (<Text style={styles.title}>Sem registro.</Text>);
        }
    }

    function renderSection(title: string, text: string) {
        if(text) {
            return (<Text style={styles.title}>{title}{text}.</Text>);
        } else {
            return null;
        }
    }

    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <View style={styles.image}>
                    { renderIcon() }
                </View>
                <View style={styles.cardContent}>
                    { renderTitle() }
                    { renderSection("Você estava se sentindo ", feedback) }
                    { renderSection("Medicamentos: ", symptoms) }
                    { renderSection("Sintomas: ", medicine) }
                </View>
            </View>
        </View> 
    )
}

export default CardInfo;


const styles = StyleSheet.create({
    card:{
        margin: 10,
        //height: 100,
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 350,
        alignSelf: 'center',
        padding:15
    },
    content:{
        flexDirection: 'row',
        //flex: 2,
    },
    image:{
        flex: 0.2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0,
        paddingLeft: 5
    },
    cardContent:{
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 20,
        paddingTop: 0
    },
    menu:{
        flex: 0.2,
        alignItems: 'center',
        paddingTop: 17,
    },
    title:{
        color: 'black',
        fontSize: 15,
    },
    description: {
        color: '#7d8597',
        paddingBottom: 2
    },
    divider:{
        height: 3,
        width: '80%',
        alignSelf: 'center',
        marginTop: 5,
        opacity: 0.5
    },
    footer:{
        flexDirection: 'row',
        flex: 1,
        width: 350,
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    schedule: {
        color: '#7d8597',
        alignSelf: 'center',
        paddingRight: 170
    },
    status: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    }
});
