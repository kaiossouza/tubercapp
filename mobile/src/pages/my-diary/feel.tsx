
import React, {useContext, useState} from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Fontisto';
import IconFeather from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-elements';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';
import AuthContext from '../../contexts/auth';
import { getCurrentEntry, setDiary } from '../../services/storage';
import DiaryEntry from '../../models/Diary';
import DatePicker from 'react-native-datepicker';
import { User } from '../../models/user';

Icon.loadFont();
IconFeather.loadFont();

export default function Feel({ navigation } : { navigation: any }){
    const { user, updateUser } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(true);

    let [ fontsLoaded ] = useFonts({
        Cabin_400Regular,
    });

    const [ feedback, setFeedback ] = useState(0);

    if(loading) {
        if(!user?.diary) {
            let userFromStorage = { ...user } as User;
            userFromStorage.diary = [ new DiaryEntry() ];
            updateUser(userFromStorage).then(() => {
                setLoading(false);
            });
        } else {
            let userFromStorage = { ...user } as User;
            
            let entry = userFromStorage.diary.filter((e) => {
                let eDate = new Date(e.date.toString());
                if(eDate.toISOString) {                
                    return eDate.toISOString().split('T')[0] == date.toISOString().split('T')[0];
                } else {
                    return false;
                }
            });
            
            if(entry.length > 0) {
                setFeedback(entry[0].feedback);
            } else { 
                setFeedback(0);
            }
            setLoading(false);
        }
    }

    var changeDate = (date: any) => {
        let selectedDate = new Date(`${date.split('/')[1]}/${date.split('/')[0]}/${date.split('/')[2]}`);       

        let userFromStorage = { ...user } as User;
        //alert(userFromStorage.diary.length);
        let entry = userFromStorage.diary.filter((e) => {
            let eDate = new Date(e.date.toString());
            if(eDate.toISOString) { 
                console.log(`${eDate.toISOString().split('T')[0]} |||||||| ${selectedDate.toISOString().split('T')[0]} ||||||| ${e.feedback}`);               
                return eDate.toISOString().split('T')[0] == selectedDate.toISOString().split('T')[0];
            } else {
                return false;
            }
        });
        
        if(entry.length > 0) {
            setFeedback(entry[0].feedback);
            setDate(selectedDate); 
        } else { 
            setFeedback(0);
            setDate(selectedDate); 
        }           
    };

    let saveFeedback = function(feedback: number) {
        //alert(date);
        if(date) {
            setLoading(true);
            let userFromStorage = { ...user } as User;
            let entriesForSelectedDate = userFromStorage.diary.filter((e) => {
                let eDate = new Date(e.date.toString());
                return eDate.toISOString().split('T')[0] == date.toISOString().split('T')[0];
            });

            let entry = new DiaryEntry();
            
            if(entriesForSelectedDate.length > 0) {
                entry = entriesForSelectedDate[0];
                entry.feedback = feedback;
            } else {
                entry.date = date;
                entry.feedback = feedback;
            }


            let remainingEntries = userFromStorage.diary.filter((e) => {
                let eDate = new Date(e.date.toString());
                return eDate.toISOString().split('T')[0] != date.toISOString().split('T')[0];
            });

            if(remainingEntries.length > 0) {
                remainingEntries.push(entry);
            } else {
                remainingEntries = [ entry ];
            }

            userFromStorage.diary = remainingEntries;

            updateUser(userFromStorage).then(() => {
                setFeedback(feedback);
                setLoading(false);
            });
        }
    }
    
    if (!fontsLoaded || loading) {
        return <AppLoading />;
    } else
        return (            
            <Card containerStyle={styles.card}>
                <Text style={styles.titleFeel}>
                    Como você está?
                </Text>
                <Divider style={styles.divider}/>
                <DatePicker 
                    format="DD/MM/YYYY"
                    style={styles.dateComponent}
                    date={date}
                    onDateChange={changeDate}
                    locale={'pt-BR'}
                    confirmBtnText="OK"
                    cancelBtnText="Cancelar"
                />                
                <View style={styles.options}>
                    <TouchableWithoutFeedback onPress={() => saveFeedback(1)}>
                        <View style={styles.option}>
                            { 
                                feedback == 1 ? <Icon color="#DB9E06" size={35} name="slightly-smile" />  : 
                                <Icon color="black" size={35} name="slightly-smile" /> 
                            } 
                            <Text style={styles.optionName}>
                                Estou bem!
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => saveFeedback(2)}>
                        <View style={styles.option}>
                            { 
                                feedback == 2 ? <Icon color="#DB9E06" size={35} name="neutral" />  : 
                                        <Icon color="black" size={35} name="neutral" />
                            }
                            <Text style={styles.optionName}>
                                Mais ou menos!
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => saveFeedback(3)}>
                        <View  style={styles.option}>
                            { 
                                feedback == 3 ? <Icon color="#DB9E06" size={35} name="frowning" />  : 
                                        <Icon color="black" size={35} name="frowning" />
                            }
                            <Text style={styles.optionName}>
                                Não me sinto bem!
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    dateComponent: {
        width: 350
    },

    divider:{
        height: 3,
        marginBottom: 20,
        marginTop: 20,
    },

    option:{
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },

     card:{
         height: 430,
         marginTop: 20,
         borderRadius: 20
     },

     divider2:{
        height: 1,
        marginTop: 20,
        width: 350,
        alignSelf:'center',
        backgroundColor: '#9c9c9c',
    },
    titleFeel:{
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
    },

    logo:{
        alignSelf: 'center',
        marginTop: 20
    },

    optionName:{
        fontFamily: 'Cabin_400Regular',
        fontStyle: 'normal',
        fontSize: 20,
        marginLeft: 10
    },
    
    options:{
        marginTop: 45,
        alignSelf: 'center',
        justifyContent: 'center'
    }
});