
import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Dimensions, Animated } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Fontisto';
import IconFeather from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-elements';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';
import { getCurrentEntry, setDiary } from '../../services/storage';
import DiaryEntry from '../../models/Diary';

Icon.loadFont();
IconFeather.loadFont();
const {height} = Dimensions.get("window");

export default function Feel(){
    let [fontsLoaded] = useFonts({
        Cabin_400Regular,
    });

    const [ feedback, setFeedback ] = useState(0);

    getCurrentEntry().then(entry => {
        setFeedback(entry.feedback);
    });

    let saveFeedback = function(feedback: number) {
        getCurrentEntry().then(entry => {
            entry.feedback = feedback;
            //alert(JSON.stringify(entry));
            setDiary(entry as DiaryEntry).then(e => {
                setFeedback(e.feedback);
            });            
        });
    }
    
    if (!fontsLoaded) {
        return <AppLoading />;
    } else
        return (
            <Card containerStyle={styles.card}>
                <Animated.ScrollView
                    contentContainerStyle={{ height: height * 0.8 }}
                    decelerationRate="fast"
                    bounces={false}
                    scrollToOverflowEnabled={true}
                    scrollEventThrottle={1}>
                <Text style={styles.titleFeel}>
                    Como você está?
                </Text>
                <Divider style={styles.divider}/>
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
                </Animated.ScrollView>
            </Card>
    );
};

const styles = StyleSheet.create({
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
         maxHeight: height * 0.8,
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
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: -height * 0.1
    }
});