import React, {useContext, useState} from 'react';
import { StyleSheet, Text, Dimensions, View, TouchableOpacity } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import CardInfo from '../../components/card-info';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';
import { Agenda } from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import AuthContext from '../../contexts/auth';
import { DiarySummary } from '../../models/Diary';

IconFeather.loadFont();
const {height} = Dimensions.get("window");

const timeToString = (time: any) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};  

const DiaryResume = () => {
    const { user } = useContext(AuthContext);

    let [fontsLoaded] = useFonts({
        Cabin_400Regular,
    });

    const [items, setItems] = useState<any>({});

    function getDayResume(searchDate: Date) {
        var date = new Date(searchDate);
        if(user?.diary) {
            let entry = user?.diary.filter((e) => {
                let eDate = new Date(e.date.toString());
                if(eDate.toISOString) {                
                    return eDate.toISOString().split('T')[0] == date.toISOString().split('T')[0];
                } else {
                    return false;
                }
            });

            if(entry.length > 0) {
                var resume = new DiarySummary();
                if(entry[0].feedback == 1) {
                    resume.feedback = "bem";
                }

                if(entry[0].feedback == 2) {
                    resume.feedback = "mais ou menos";
                }
                 
                if(entry[0].feedback == 3) {
                    resume.feedback = "mal";
                }

                if(entry[0].medicine){
                    resume.medicine = entry[0].medicine.join(", ");
                }

                if(entry[0].simptoms){
                    resume.symptoms = entry[0].simptoms.join(", ");
                }

                return {
                    ...resume,
                    name: 'Item for ' + date.toISOString(),
                    height: Math.max(50, Math.floor(Math.random() * 150))
                };
            }
            
            return {
                name: 'Item for ' + date.toISOString(),
                height: Math.max(50, Math.floor(Math.random() * 150))
            };
        } 
        
        return {
            name: 'Item for ' + date.toISOString(),
            height: Math.max(50, Math.floor(Math.random() * 150))
        };
    }

    const loadItems = (day: any) => {
      setTimeout(() => {
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          //alert(time);
          if (!items[strTime]) {
            items[strTime] = [];
            items[strTime].push(getDayResume(time));
            // const numItems = Math.floor(Math.random() * 3 + 1);
            // for (let j = 0; j < numItems; j++) {
            //   items[strTime].push({
            //     name: 'Item for ' + strTime + ' #' + j,
            //     height: Math.max(50, Math.floor(Math.random() * 150)),
            //   });
            // }
          }
        }
        const newItems: any = {};
        Object.keys(items).forEach((key) => {
          newItems[key] = items[key];
        });
        setItems(newItems);
      }, 1000);
    };

    const renderItem = (item: any) => {
        return (
            <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
                <CardInfo feedback={item.feedback} medicine={item.medicine} symptoms={item.symptoms} />
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