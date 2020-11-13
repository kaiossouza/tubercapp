import React, {useState} from 'react';
import { StyleSheet, Text, Dimensions, View, TouchableOpacity } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import CardInfo from '../../components/card-info';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';
import { Agenda } from 'react-native-calendars';

IconFeather.loadFont();
const {height} = Dimensions.get("window");

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
            <View style={{flex: 1}}>
                <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={Date.now()}
                renderItem={renderItem}
                style={styles.agenda}
                />
            </View>
        );
    }
}

export default DiaryResume;

const styles = StyleSheet.create({
    agenda: {
        flex: 1,
        borderRadius: 20,
        maxHeight: height * 0.8,
        height: height * 0.8,
        marginTop: 15
    }
});