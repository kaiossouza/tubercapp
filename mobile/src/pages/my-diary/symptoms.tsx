import React, {useState} from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFeather from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-paper';
import { Card, Avatar } from 'react-native-elements';
import RadioButton from '../../components/radioButton';
import FabButton from '../../components/fabButton';
import {
  useFonts,
  Cabin_400Regular
} from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';
IconFontisto.loadFont();
IconFeather.loadFont();

const Symptoms = () => {
    let symptomsImage = require('../../../assets/symptoms-image.png');

    let [fontsLoaded] = useFonts({
      Cabin_400Regular,
    });
    var listCheckResult: any[] = [];
    
    var symptoms = [{
        name: "Febre vespertina"
      },
      {
        name: "Cansaço/fadiga"
      },
      {
        name: "Falta de ar"
      },
      {
        name: "Expelimento de catarro"
      },
      {
        name: "Dor no peito"
      },
      {
        name: "Falta de ar"
      },
      {
        name: "Expelimento de catarro"
      },
      {
        name: "Falta de ar"
      },
      {
        name: "Expelimento de catarro"
      },];

      symptoms.map((symptom, index) => (
        listCheckResult.push( { state: useState(false) })
        ));
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
          <Card containerStyle={styles.card}>
              <Animated.ScrollView
              decelerationRate="fast"
              bounces={false}
              scrollToOverflowEnabled={true}
              scrollEventThrottle={1}>
              <View style={styles.symptomsTitleContent}>
                <Text style={styles.titleMedicine}>
                    Sintomas
                </Text>
                <FabButton 
                    style={{ fontSize: 5, left: 100, top: 5}} 
                />
              </View>
              <Divider style={styles.divider}/>
                  {
                      symptoms.map((symptom, index) => {
                          let result = () => {listCheckResult[index].state[0] ? listCheckResult[index].state[1](false) : listCheckResult[index].state[1](true)};
                          return(
                            <View style={styles.option}>
                                <RadioButton checked={listCheckResult[index].state[0]} onPress={result}/>
                                <View style={styles.symptomsInfo}>
                                  <Text style={styles.optionName}>{symptom.name}</Text>
                                </View>
                                <View style={styles.image}>
                                    <Avatar size="small" activeOpacity={0.7} source={symptomsImage} />
                                </View>
                            </View>
                          )
                      })
                  }
              </Animated.ScrollView>
          </Card>
      )
    }
}

const styles = StyleSheet.create({
  divider:{
      height: 3,
      marginBottom: 20,
      marginTop: 20,
  },
  option:{
      marginLeft: 20,
      marginTop: 15,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center'
  },
  card:{
      height: 430,
      marginTop: 20,
      borderRadius: 20
  },
  titleMedicine:{
      fontSize: 20,
      marginTop: 10,
      alignSelf: 'center',
      textAlign: 'center',
  },
  optionName:{
      fontFamily: 'Cabin_400Regular',
      fontStyle: 'normal',
      fontSize: 19,
      marginLeft: 20
  },
  symptomsTitleContent:{
    flexDirection:'row', 
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image:{
    flex: 0.3,
    alignItems: 'center',
  },
  symptomsInfo:{
    flex: 1
  }
});

export default Symptoms;