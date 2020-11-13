import React, { useContext } from 'react';
import { Text, View, StyleSheet, ScrollView} from 'react-native';
import { Appbar } from 'react-native-paper';
import IconFeather from 'react-native-vector-icons/Feather';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';
import { BarChart, PieChart } from 'react-native-svg-charts';
import AuthContext from '../../contexts/auth';
import moment from 'moment';
import Animated from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

IconFeather.loadFont();

export class ChartData {
    value: number;
    label: string;

    constructor(value: number, label: string) {
        this.value = value;
        this.label = label;
    }
}

export default function Relatorio({navigation, name} : {navigation: any, name: string}){
    const { user } = useContext(AuthContext);

    let [fontsLoaded] = useFonts({
        Cabin_400Regular,
    });

    function overallProgress() {
        let date = user?.treatmentStart.toString() ?? " / / ";
        let treatmentStart = moment(new Date(`${date.split('/')[1]}/${date.split('/')[0]}/${date.split('/')[2]}`));
        const now = moment(new Date());
        const duration = moment.duration(now.diff(treatmentStart));
        const treatmentDuration: number = user?.treatmentDuration ? user?.treatmentDuration : 0;
        const percentDuration = parseInt(duration.asDays().toString()) / treatmentDuration;
        const percentIntDuration = parseInt((percentDuration * 100).toString());

        let data = [ 
            { value: percentIntDuration, label: "Dias completos"}, { value: 100 - percentIntDuration, label: "Dias restantes"}
        ];

        const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);
        const pieData = data
            .filter((value) => value.value > 0)
            .map((value, index) => ({
                value: value.value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `${value.label} (${value.value}%)`
            }));

        return (
            <View style={styles.chart}>
                <View  style={styles.screen}>
                    <Text>Progresso Geral</Text>
                    <PieChart style={{ height: 200 }} data={pieData} />
                </View>
                <View  style={styles.screen}>
                    {
                        pieData.map((item) => {
                            return (<View>
                                    <AntDesign name="checkcircleo" size={20} color={item.svg.fill}></AntDesign>
                                    <Text>{item.key}</Text>
                                </View>)
                        })
                    }
                </View>
            </View>);
    }

    function diaryFrequency() {    
        var entries = user?.diary;
        
        if(entries) {
            let date = user?.treatmentStart.toString() ?? " / / ";
            let treatmentStart = moment(new Date(`${date.split('/')[1]}/${date.split('/')[0]}/${date.split('/')[2]}`));
            const now = moment(new Date());
            const duration = moment.duration(now.diff(treatmentStart));
            const filledDays = entries.length;
            const percentDuration = filledDays / parseInt(duration.asDays().toString());
            const percentIntDuration = parseInt((percentDuration * 100).toString());

            let data = [ 
                { value: percentIntDuration, label: "Diário preenchido"}, { value: 100 - percentIntDuration, label: "Diário vazio"}
            ];

            const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);
            const pieData = data
                .filter((value) => value.value > 0)
                .map((value, index) => ({
                    value: value.value,
                    svg: {
                        fill: randomColor(),
                        onPress: () => console.log('press', index),
                    },
                    key: `${value.label} (${value.value}%)`
                }));

            return (
                <View style={styles.chart}>
                    <View  style={styles.screen}>
                        <Text>Dias preenchidos no diário</Text>
                        <PieChart style={{ height: 200 }} data={pieData} />
                    </View>
                    <View  style={styles.screen}>
                        {
                            pieData.map((item) => {
                                return (<View>
                                        <AntDesign name="checkcircleo" size={20} color={item.svg.fill}></AntDesign>
                                        <Text>{item.key}</Text>
                                    </View>)
                            })
                        }
                    </View>
                </View>);
        } else { return (<></>); }
    }

    function commomSymptoms() {
        var entries = user?.diary.flatMap(e => e.simptoms);

        if(entries) {
            var counts = {} as any;

            for (var i = 0; i < entries.length; i++) {
                var num = entries[i];
                counts[num] = counts[num] ? counts[num] + 1 : 1;
            }

            var filterUnique = (value: any, index: number, self: any) => {
                return self.indexOf(value) === index;
            };

            var symptoms = entries.filter(filterUnique);
            const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);
            const pieData = symptoms
                .map((value, index) => ({
                    value: counts[value],
                    svg: {
                        fill: randomColor(),
                        onPress: () => console.log('press', index),
                    },
                    key: `${value} (${(counts[value]/(entries?.length ?? 0))*100}%)`
                }));

            return (<View style={styles.chart}>
                <View  style={styles.screen}>
                    <Text>Sintomas</Text>
                    <PieChart style={{ height: 200 }} data={pieData} />
                </View>
                <View style={styles.labels}>
                    {
                        pieData.map((item) => {
                            return (<View style={styles.label}>
                                    <AntDesign name="checkcircleo" size={20} color={item.svg.fill}></AntDesign>
                                    <Text>{item.key}</Text>
                                </View>)
                        })
                    }
                </View>
            </View>);
        } else { return (<></>); }
    }

    function medicineTaken() {    
        var entries = user?.diary;
        
        if(entries) {
            var daysWhereMedicationWasTaken = entries.filter(e => {
                let avMeds = e.availableMedicine?.length ?? 0;
                let medTaken = e.medicine?.length ?? 0;
                return avMeds == medTaken && medTaken > 0;
            }).length;
            let date = user?.treatmentStart.toString() ?? " / / ";
            let treatmentStart = moment(new Date(`${date.split('/')[1]}/${date.split('/')[0]}/${date.split('/')[2]}`));
            const now = moment(new Date());
            const duration = moment.duration(now.diff(treatmentStart));
            const percentDuration = daysWhereMedicationWasTaken / parseInt(duration.asDays().toString());
            const percentIntDuration = parseInt((percentDuration * 100).toString());

            let data = [ 
                { value: percentIntDuration, label: "Dias em que medicação foi tomada"}, { value: 100 - percentIntDuration, label: "Dias sem tomada de medicação"}
            ];

            const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);
            const pieData = data
                .filter((value) => value.value > 0)
                .map((value, index) => ({
                    value: value.value,
                    svg: {
                        fill: randomColor(),
                        onPress: () => console.log('press', index),
                    },
                    key: `${value.label} (${value.value}%)`
                }));

            return (
                <View style={styles.chart}>
                    <View  style={styles.screen}>
                        <Text>Dias em que toda a medicação foi tomada</Text>
                        <PieChart style={{ height: 200 }} data={pieData} />
                    </View>
                    <View  style={styles.screen}>
                        {
                            pieData.map((item) => {
                                return (<View>
                                        <AntDesign name="checkcircleo" size={20} color={item.svg.fill}></AntDesign>
                                        <Text>{item.key}</Text>
                                    </View>)
                            })
                        }
                    </View>
                </View>);
        } else { return (<></>); }
    }

      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
            <View style={{backgroundColor:'#fff', flex: 1}}>
                <Appbar.Header style={{backgroundColor:"#ffff"}}>
                    <Appbar.Action  color="#7d8597" icon={require('../../../assets/goback.png')} onPress={() => navigation.goBack()} />  
                    <Appbar.Content titleStyle={{color: "#7d8597", alignSelf: 'flex-start'}} title="Relatório" />
                </Appbar.Header>
                <Animated.ScrollView style={styles.screen}>
                   { overallProgress() }                   
                   { diaryFrequency() }
                   { commomSymptoms() }
                   { medicineTaken() }
                </Animated.ScrollView>
        </View>);
    }
}
const styles = StyleSheet.create({
    screen:{
        backgroundColor:'#fff', 
        flex: 1, 
    },
    chart:{
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor:'#fff'
    },
    labels:{
        flex: 1,
        flexDirection: 'column',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor:'#fff'
    },
    label:{
        flex: 1,
        flexDirection: 'row',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor:'#fff'
    },
});