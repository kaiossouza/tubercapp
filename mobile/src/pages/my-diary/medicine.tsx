import React, {useContext, useState} from 'react';
import { Text, View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Divider, Modal, TextInput } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Fontisto';
import IconFeather from 'react-native-vector-icons/Feather';
import { Card, Avatar } from 'react-native-elements';
import RadioButton from '../../components/radioButton';
import { AntDesign } from '@expo/vector-icons';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';
import AuthContext from '../../contexts/auth';
import DatePicker from 'react-native-datepicker';
import { User } from '../../models/user';
import DiaryEntry from '../../models/Diary';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { parse } from 'react-native-svg';
Icon.loadFont();
IconFeather.loadFont();
const {height} = Dimensions.get("window");

export default function Medicine() {
    const { user, updateUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date());
    const [medicine, setMedicine] = useState<string>("[]");
    const [modalVisible, setModalVisible] = useState(false);
    const [availableMedicine, setAvailableMedicine] = useState<string>("[]");
    const [medicineInput, setMedicineInput] = useState<string>("");

    let [fontsLoaded] = useFonts({
        Cabin_400Regular,
    });
    
    //var fixedMedicines = [ "Etambutol (Dose 1)", "Isoniazida (Dose 1)", "Etionamida (Dose 1)" ];

    function saveMedicine(m: string) {
        let medicineList = JSON.parse(medicine) as string[];
        if(medicineList.includes(m)){
          let filteredMedicine = medicineList.filter(s => s != m);
          setMedicine(JSON.stringify(filteredMedicine));
        } else {
          let filteredMedicine = medicineList;
          filteredMedicine.push(m);
          setMedicine(JSON.stringify(filteredMedicine));
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
        
        var parsedAvailableMedicine = JSON.parse(availableMedicine ?? "[]") as string[];
        if(entry.length > 0) {
            setMedicine(JSON.stringify(entry[0].medicine));
            // if(entry[0].availableMedicine) {
            //     setAvailableMedicine(JSON.stringify(entry[0].availableMedicine));
            //     updateAvailableMedicine(entry[0].availableMedicine);
            // } else {                
            //     updateAvailableMedicine(parsedAvailableMedicine);
            // }
            setDate(selectedDate); 
        } else { 
            //updateAvailableMedicine(parsedAvailableMedicine);
            setMedicine("[]");
            setDate(selectedDate); 
        }  

        if(parsedAvailableMedicine.length > 0) {
            if(entry.length > 0) {
                //setMedicine(JSON.stringify(entry[0].medicine));
                if(entry[0].availableMedicine && entry[0].availableMedicine.length > 0) {
                    setAvailableMedicine(JSON.stringify(entry[0].availableMedicine));
                    updateAvailableMedicine(entry[0].availableMedicine);
                } else {                
                    //updateAvailableMedicine(parsedAvailableMedicine);
                }
                //setDate(selectedDate); 
            } else { 
                updateAvailableMedicine(parsedAvailableMedicine);
                //setMedicine("[]");
                //setDate(selectedDate); 
            }  
        }
    };

    function updateMedicine(medicine: string) {
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
  
          if(entry.medicine.includes(medicine)){
            entry.medicine = entry.medicine.filter(s => s != medicine);
          } else {
            entry.medicine.push(medicine);
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
            saveMedicine(medicine);
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
                setMedicine(JSON.stringify(entry[0].medicine));
                if(entry[0].availableMedicine && entry[0].availableMedicine.length > 0) {
                    setAvailableMedicine(JSON.stringify(entry[0].availableMedicine));
                }
            } else { 
                setMedicine("[]");
                //setAvailableMedicine("[]");
            }
            setLoading(false);
        }
    }

    function openEdition() {
        setModalVisible(!modalVisible);
    }

    function createMedicine() {
        var parsedAvailableMedicine = JSON.parse(availableMedicine ?? "[]") as string[];
        parsedAvailableMedicine.push(medicineInput);
        updateAvailableMedicine(parsedAvailableMedicine);
    }

    function deleteMedicine(medicine: string) {
        var parsedAvailableMedicine = JSON.parse(availableMedicine ?? "[]") as string[];
        updateAvailableMedicine(parsedAvailableMedicine.filter(m => m != medicine));
        saveMedicine(medicine);
    }

    function updateAvailableMedicine(availableMedicine: string[]) {
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
  
          entry.availableMedicine = availableMedicine;
  
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
              //alert(JSON.stringify(availableMedicine));
            setAvailableMedicine(JSON.stringify(availableMedicine));
            setLoading(false);
          });
        }
      }
    
    if (!fontsLoaded || loading) {
        return <AppLoading />;
    } else {
        if(!modalVisible) {
            return (
                    <Card containerStyle={styles.card}>                    
                        <Animated.ScrollView
                            contentContainerStyle={{ height: height * 0.8 }}
                            decelerationRate="fast"
                            bounces={false}
                            scrollToOverflowEnabled={true}
                            scrollEventThrottle={1}>
                        <View style={styles.medicineTitleContent}>
                            <Text style={styles.titleMedicine}>
                                Medicamentos
                            </Text>       
                            <TouchableOpacity onPress={() => openEdition()}>
                                <AntDesign name="edit" size={20} color="#82B1B6"></AntDesign>
                            </TouchableOpacity>       
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
                                (JSON.parse(availableMedicine ?? "[]") as string[]).map((m) => {
                                    let medicineList = JSON.parse(medicine) as string[];
                                    let checked = medicineList.includes(m);    
                                    return(
                                        <View style={styles.option}>
                                            <RadioButton checked={checked} onPress={() => updateMedicine(m)}/>
                                            <View style={styles.medicineInfo}>
                                                <Text style={styles.optionName}>{m}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </Animated.ScrollView>
                    </Card>
                    );
        } else {
            return (
                <View>
                    <Card containerStyle={styles.card}>                    
                        <Animated.ScrollView
                            contentContainerStyle={{ height: height * 0.8 }}
                            decelerationRate="fast"
                            bounces={false}
                            scrollToOverflowEnabled={true}
                            scrollEventThrottle={1}>
                        <View style={styles.medicineTitleContent}>
                            <Text style={styles.titleMedicine}>
                                Medicamentos
                            </Text>  
                            <TouchableOpacity onPress={() => openEdition()} >
                                <AntDesign name="checkcircleo" size={20} color="#82B1B6"></AntDesign>
                            </TouchableOpacity>                          
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
                                (JSON.parse(availableMedicine ?? "[]") as string[]).map((m) => {
                                    let medicineList = JSON.parse(medicine) as string[];
                                    let checked = medicineList.includes(m);    
                                    return(
                                        <View style={styles.editOption}>
                                            <View style={styles.medicineInfo}>
                                                <Text style={styles.optionName}>{m}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => deleteMedicine(m)} style={{paddingLeft: 20}}>
                                                <AntDesign name="delete" size={20} color="#FF0000"></AntDesign>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                            <View style={styles.editOption}>
                                <TextInput style={styles.medicineInfo} onChangeText={setMedicineInput}></TextInput>  
                                <TouchableOpacity onPress={() => createMedicine()}>
                                    <AntDesign name="pluscircleo" size={20} color="#82B1B6" style={{paddingLeft: 30}}></AntDesign>
                                </TouchableOpacity> 
                            </View>
                        </Animated.ScrollView>
                    </Card>
                </View>);
        }
    }
};

const styles = StyleSheet.create({
    dateComponent: {
        width: 350,
        padding: 30
    },
    
    divider:{
        height: 3,
        marginBottom: 20,
        marginTop: 20,
    },
    component:{
        padding: 8,
        flexDirection: 'row',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
    },
    checkboxText:{
        alignSelf: 'center',
        marginRight: 70,
        justifyContent: 'flex-start',
    },
    checkbox:{
        position:'absolute',
        alignSelf:'flex-end',
    },
    checkboxList:{
        borderColor: '#A9A9A9',
        borderWidth: 0.5,
        marginHorizontal: 20,
    },
    diaryText:{
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
    },
    nameList:{
        marginHorizontal: 20,
        backgroundColor:'#7B68EE',
        alignItems: 'flex-start',
    },
    nameListText:{
        fontSize: 15,
    },
    option:{
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    editOption:{
        paddingEnd: 10,
        marginTop: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    options:{
        marginTop: 40,
    },
    screen:{
        backgroundColor:'#fff', 
        flex: 1,
    },

    item: {
        marginVertical: moderateScale(7, 2),
        flexDirection: 'row',
        marginTop: 30,
     },
     itemIn: {
         marginLeft: 20
     },
     itemOut: {
        alignSelf: 'flex-end',
        marginRight: 20
     },
     balloon: {
        maxWidth: moderateScale(250, 2),
        paddingHorizontal: moderateScale(10, 2),
        paddingTop: moderateScale(5, 2),
        paddingBottom: moderateScale(7, 2),
        borderRadius: 20,
     },
     arrowContainer: {
         position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         zIndex: -1,
         flex: 1
     },
     arrowLeftContainer: {
         justifyContent: 'flex-end',
         alignItems: 'flex-start'
     },
    
     arrowRightContainer: {
         justifyContent: 'flex-end',
         alignItems: 'flex-end',
     },
    
     arrowLeft: {
         left: moderateScale(-6, 0.5),
     },
    
     arrowRight: {
         right:moderateScale(-6, 0.5),
     },
     avatarBot: {
         marginTop: 20,
         marginRight: 15,
     },
     message: {
        marginTop: 15,
        alignSelf: 'center',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
     },
     textMessage: {
        paddingTop: 5, 
        color: 'white', 
        fontSize: 15, 
        fontWeight: 'bold', 
        fontStyle: 'normal', 
        fontFamily: 'Cabin_400Regular'
     },


     card:{
        maxHeight : height * 0.8,
        borderRadius: 20
    },
    titleMedicine:{
        flex: 2,
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 20
    },
    divider2:{
        height: 3,
        marginBottom: 20,
        marginTop: 20,
    },
    optionName:{
        fontFamily: 'Cabin_400Regular',
        fontStyle: 'normal',
        fontSize: 19,
    },
    medicineTitleContent:{
        flexDirection:'row', 
        alignItems: 'center',
        marginTop: 10
    },
    medicineInfo:{
        flex: 1,
        paddingLeft: 20,
        backgroundColor: '#FFF'
    },
    optionDescription:{
        color: '#7d8597'
    },
    image:{
        flex: 0.3,
        alignItems: 'center'
    },
});