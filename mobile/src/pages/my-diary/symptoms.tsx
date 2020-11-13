import React, {useContext, useState} from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFeather from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-paper';
import { Card, Avatar, CheckBox } from 'react-native-elements';
import RadioButton from '../../components/radioButton';
import FabButton from '../../components/fabButton';
import {
  useFonts,
  Cabin_400Regular
} from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';
import AuthContext from '../../contexts/auth';
import DiaryEntry from '../../models/Diary';
import { User } from '../../models/user';
import DatePicker from 'react-native-datepicker';
IconFontisto.loadFont();
IconFeather.loadFont();

const Symptoms = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date());
    const [symptomsJson, setSymptoms] = useState<string>("[]");

    var fixedSymptoms = [ "Cansaço/fadiga", "Dor no peito", "Emagrecimento", "Expelimento de catarro", "Falta de ar", "Febre", "Tosse" ];

    let [fontsLoaded] = useFonts({
      Cabin_400Regular,
    });

    function saveSymptom(symptom: string) {
      let symptoms = JSON.parse(symptomsJson) as string[];
      if(symptoms.includes(symptom)){
        let filteredSymptoms = symptoms.filter(s => s != symptom);
        setSymptoms(JSON.stringify(filteredSymptoms));
      } else {
        let filteredSymptoms = symptoms;
        filteredSymptoms.push(symptom);
        setSymptoms(JSON.stringify(filteredSymptoms));
      }
    }

    function changeDate(date: any) {
        let selectedDate = new Date(`${date.split('/')[1]}/${date.split('/')[0]}/${date.split('/')[2]}`);  

        let userFromStorage = { ...user } as User;
        let entry = userFromStorage.diary.filter((e) => {
            let eDate = new Date(e.date.toString());
            if(eDate.toISOString) { 
                return eDate.toISOString().split('T')[0] == selectedDate.toISOString().split('T')[0];
            } else {
                return false;
            }
        });
        
        if(entry.length > 0) {
            setSymptoms(JSON.stringify(entry[0].simptoms));
            setDate(selectedDate); 
        } else { 
          setSymptoms("[]");
          setDate(selectedDate); 
        }           
    };
    
    function updateSymptoms(symptom: string) {
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
        } else {
          entry.date = date;
        }

        if(entry.simptoms.includes(symptom)){
          entry.simptoms = entry.simptoms.filter(s => s != symptom);
        } else {
          entry.simptoms.push(symptom);
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
          saveSymptom(symptom);
          setLoading(false);
        });
      }
    }

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
              setSymptoms(JSON.stringify(entry[0].simptoms));
            } else { 
              setSymptoms("[]");
            }
            setLoading(false);
        }
    }

    if (!fontsLoaded || loading) {
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
              </View>
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
                  {
                      fixedSymptoms.map((symptom) => {
                        let symptoms = JSON.parse(symptomsJson) as string[];
                        let checked = symptoms.filter(s => s == symptom).length > 0;                       
                        return(
                          <View style={styles.option}>
                            <RadioButton checked={checked} onPress={() => updateSymptoms(symptom)}/>
                            <View style={styles.symptomsInfo}>
                              <Text style={styles.optionName}>{symptom}</Text>
                            </View>
                          </View>
                        );
                      })
                  }
              </Animated.ScrollView>
          </Card>
      )
    }
}

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