import React, {useState} from 'react';
import { Card } from 'react-native-elements';
import { StyleSheet, Text, Dimensions, View, Animated } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import IconFeather from 'react-native-vector-icons/Feather';
import CardInfo from '../../components/card-info';
import CardDay from '../../components/card-day';

IconFeather.loadFont();

const days = [{day: 1, dayName: 'Seg'}, {day: 2, dayName: 'Ter'},{day: 3, dayName: 'Quar'},{day: 4, dayName: 'Qui'},{day: 5, dayName: 'Sex'},{day: 6, dayName: 'Sab'},{day: 7, dayName: 'Dom'},{day: 8, dayName: 'Seg'},{day: 9, dayName: 'Ter'},{day: 10, dayName: 'Quar'}];
const content = [{key: 'feel'},{key: 'medicines'},{key: 'sympthons'}]
const {width} = Dimensions.get("window");

const DiaryResume = ({navigation}) => {
    return (
        <View style={styles.content}>
            <Card containerStyle={styles.month}>
                <View style={styles.monthContent}>
                    <Text style={styles.monthName}> Agosto </Text> 
                    <IconFeather style={styles.monthIcon} size={20}  name="calendar"/>    
                </View>
            </Card>
            <FlatList style={styles.cards} horizontal showsHorizontalScrollIndicator={false}
                    data={days} 
                    renderItem = {({ item }) => {
                            return( 
                                <CardDay itemDay={item.day} itemName={item.dayName}/>
                            )
                    } }
            />
            <FlatList
            style={{ maxHeight: 340,  top: 147}}
            data={content} 
            renderItem = {({ item }) => { 
                return(
                    <CardInfo />
                ) }}
            />
        </View>
    );
}

export default DiaryResume;

const styles = StyleSheet.create({
    cardDay:{
        backgroundColor: '#fff',
        width: 50,
        height: 80,
        borderRadius: 30,
        margin: 7,
    },
    cards:{
        flex: 1,
        maxHeight: 90,
        marginHorizontal: 15,
        position: 'absolute',
        top: 55
    },
    day:{
        alignSelf: 'center',
        fontFamily: 'Arial',
        width: 30,
        textAlign: 'center',
        fontSize: 20,
    },
    dayName:{
        fontSize: 13,
        alignSelf: 'center',
        textAlign: 'center',
        width: 30,
    },
    content:{
        height: 480,
    },
    month:{
        maxWidth: 150,
        maxHeight: 40,
        borderRadius: 30,
        justifyContent: 'center',
        marginLeft: 20,
        position: 'absolute'
    },
    monthName:{
        fontSize: 20,
        margin: 0,
        padding: 0,
        alignSelf: 'center',
        textAlign: 'center',
    },
    monthContent:{
        flexDirection:'row', 
        justifyContent: 'space-between',
    },
    monthIcon:{
        alignSelf: 'center',
        textAlign: 'center',
    },
});