import React, {useState} from 'react';
// import { Card, Avatar } from 'react-native-elements';
import { StyleSheet, Text, Dimensions, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import IconFeather from 'react-native-vector-icons/Feather';
import CardInfo from '../../components/card-info';
import CardDay from '../../components/card-day';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';
import { Agenda } from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';

IconFeather.loadFont();

const days = [{day: 1, dayName: 'Seg'}, {day: 2, dayName: 'Ter'},{day: 3, dayName: 'Quar'},{day: 4, dayName: 'Qui'},{day: 5, dayName: 'Sex'},{day: 6, dayName: 'Sab'},{day: 7, dayName: 'Dom'},{day: 8, dayName: 'Seg'},{day: 9, dayName: 'Ter'},{day: 10, dayName: 'Quar'}];
const content = [{key: 'feel'},{key: 'medicines'},{key: 'sympthons'}]
const {width} = Dimensions.get("window");

const timeToString = (time: any) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};  

const DiaryResume = () => {
    let [fontsLoaded] = useFonts({
        Cabin_400Regular,
    });

    const [items, setItems] = useState({});

    const loadItems = (day: any) => {
      setTimeout(() => {
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          if (!items[strTime]) {
            items[strTime] = [];
            const numItems = Math.floor(Math.random() * 3 + 1);
            for (let j = 0; j < numItems; j++) {
              items[strTime].push({
                name: 'Item for ' + strTime + ' #' + j,
                height: Math.max(50, Math.floor(Math.random() * 150)),
              });
            }
          }
        }
        const newItems = {};
        Object.keys(items).forEach((key) => {
          newItems[key] = items[key];
        });
        setItems(newItems);
      }, 1000);
    };
    const renderItem = (item) => {
        return (
            <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
                <CardInfo />
            </TouchableOpacity>
        );
    };

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            // <View style={styles.content}>
            //     <Card containerStyle={styles.month}>
            //         <View style={styles.monthContent}>
            //             <Text style={styles.monthName}> Agosto </Text> 
            //             <IconFeather style={styles.monthIcon} size={20}  name="calendar"/>    
            //         </View>
            //     </Card>
            //     <FlatList style={styles.cards} horizontal showsHorizontalScrollIndicator={false}
            //             data={days} 
            //             renderItem = {({ item }) => {
            //                     return( 
            //                         <CardDay itemDay={item.day} itemName={item.dayName}/>
            //                     )
            //             } }
            //     />
            //     <FlatList
            //     style={{ maxHeight: 340,  top: 147}}
            //     data={content} 
            //     renderItem = {({ item }) => { 
            //         return(
            //             <CardInfo />
            //         ) }}
            //     />
            // </View>

            <View style={{flex: 1}}>
                <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={Date.now()}
                renderItem={renderItem}
                />
            </View>
        );
    }
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
        fontFamily: 'Cabin_400Regular',
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