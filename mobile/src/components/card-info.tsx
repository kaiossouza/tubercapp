import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconEvilIcons from 'react-native-vector-icons/EvilIcons'
import { Divider } from 'react-native-paper';

IconEntypo.loadFont();
IconEvilIcons.loadFont();

const pillsImage = '../../assets/pills.png';

const CardInfo = ({}) => {
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <View style={styles.image}>
                    <Avatar size="medium" activeOpacity={0.7} source={require(pillsImage)} />
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>Nome do Medicamento</Text>
                    <Text style={styles.description}>X mg, y capsulas</Text>
                    <Text style={styles.description}>Descrição</Text>
                </View>
                <View style={styles.menu}>
                    <IconEntypo color="#7d8597" size={20} name="dots-three-vertical"/>
                </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.footer}>
                <Text style={styles.schedule}>
                    12:00PM
                </Text>
                <View style={styles.status}>
                        <IconEvilIcons name="check" size={25} color="#1a936f"/>
                </View>
            </View>
        </View> 
    )
}

export default CardInfo;


const styles = StyleSheet.create({
    card:{
        margin: 10,
        height: 140,
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 350,
        alignSelf: 'center',
    },
    content:{
        flexDirection: 'row',
        flex: 2,
    },
    image:{
        flex: 0.3,
        alignItems: 'center',
        paddingTop: 15,
        paddingLeft: 10
    },
    cardContent:{
        flex: 1,
        paddingLeft: 20,
        paddingTop: 15
    },
    menu:{
        flex: 0.2,
        alignItems: 'center',
        paddingTop: 17,
    },
    title:{
        color: 'black',
        fontSize: 15,
        paddingBottom: 3
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
