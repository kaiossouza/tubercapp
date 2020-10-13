import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Linking } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import { Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import { Divider } from 'react-native-paper';
import tubercAssets from '../../../assets/assets';
import { getNews } from '../../services/googleapi';

IconEntypo.loadFont();
IconEvilIcons.loadFont();

Icon.loadFont();
IconFontisto.loadFont();

const assets = new tubercAssets('../../../assets/');
const pillsImage = assets.pills;
const setBottom = assets.setBottom;
const yuri = assets.yuri;
const thinkingImage = assets.thinkingImage;
const medicineImage = assets.medicineImage;
const symptonsImage = assets.symptonsImage;
const tuberculose = assets.tuberculose;

export default function News({ navigation }){
    //const [ items, setItems ] = useState<any | null>(null);

    // try{
    //     getNews("tuberculose").then(
    //         res => {
    //             console.log(res);
    //             setItems(res.data.items);
    //         }
    //     ).catch(err => console.log(err));
    // } catch(err) {
    //     console.log(err);
    // }

    var newsList = [];
    var items = [ { 
            title: "Favelas e periferias do Rio de Janeiro sofrem com a tuberculose",
            link: "https://portal.fiocruz.br/noticia/favelas-e-periferias-do-rio-de-janeiro-sofrem-com-tuberculose",
            picture: require('../../../assets/noticia3.jpg')
        }, { 
            title: "Fiocruz oferece novo medicamento contra tuberculose",
            link: "https://portal.fiocruz.br/noticia/fiocruz-oferece-novo-medicamento-contra-tuberculose",
            picture: require('../../../assets/noticia1.jpg')
        }, { 
            title: "Tuberculose: medicamento produzido por Farmanguinhos facilita adesão ao tratamento",
            link: "https://portal.fiocruz.br/noticia/tuberculose-medicamento-produzido-por-farmanguinhos-facilita-adesao-ao-tratamento",
            picture: require('../../../assets/noticia2.jpg')
        }, { 
            title: "Atividades marcam a semana de luta contra a tuberculose na Fiocruz",
            link: "https://portal.fiocruz.br/noticia/atividades-marcam-semana-de-luta-contra-tuberculose-na-fiocruz",
            picture: require('../../../assets/tuberculose.jpg')
        },
    ];

    if(!!items) {
        var results = items ?? [];
        for (let i = 0; i < results.length; i++) {
            var newsCardData = results[i];
            newsList.push(
                <View style={styles.card}>
                    <View style={styles.content}>
                        <View style={styles.imageNews}>
                            <Avatar size="large" activeOpacity={0.7} avatarStyle={{borderRadius: 10}} source={newsCardData.picture} />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.titleNews}>{newsCardData.title}</Text>
                            <Text style={styles.descriptionNews} onPress={() => {Linking.openURL(newsCardData.link)}}>Saiba mais</Text>
                        </View>
                        <View style={styles.menu}>
                            <IconEntypo color="#7d8597" size={20} name="dots-three-vertical"/>
                        </View>
                    </View>
                </View>    
            );
        }
    }

    return (
        <ScrollView style={{backgroundColor:'#82B1B6', flex: 1}}>
                <View style={styles.labelView}>
                    <Text style={styles.labelText}>Últimas Notícias</Text>
                </View>
                { newsList }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    labelText: {
        color:'#FFF',
        fontSize:24
    },
    labelView: {
        flexDirection: 'column',
        flex: 1,
        paddingLeft:40,
        paddingBottom:10
    },
    avatar:{
        alignSelf: 'center',
        marginTop: 10
    },
    progressBar:{
      flex: 1,
      marginTop: 15,
      marginHorizontal: 20,
      width: '70%',
      height: 15,
      alignSelf:'center',
      borderRadius: 5,
    },
    appName:{
      alignSelf:'center',
      marginTop: 10,
      paddingTop: 15,
      fontSize: 25,
      color: '#fff'
    },
    downArrow:{
      tintColor: '#fff',
      width: 15,
      height: 15,
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 5
    },
    cards:{
      marginVertical: 20
    },

    card:{
      margin: 10,
      height: 110,
      backgroundColor: '#fff',
      borderRadius: 20,
      width: 350,
      alignSelf: 'center',
    },
    content:{
        flexDirection: 'row',
        flex: 2,
        
    },
    contentDiary:{
      flexDirection: 'row',
      flex: 2,
      alignContent: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      marginLeft: 30
    },
    image:{
        flex: 0.3,
        alignItems: 'center',
        paddingTop: 15,
        paddingLeft: 10
    },
    imageNews:{
      flex: 0.3,
      alignItems: 'center',
      paddingTop: 15,
      paddingLeft: 20
    },
    imagesDiary:{
      flexDirection: 'row',
    },
    cardContent:{
        flex: 1,
        paddingLeft: 20,
        paddingTop: 15
    },
    cardContentMedicine:{
      flex: 1,
      paddingLeft: 20,
      paddingTop: 15
    },
    cardContentDiary:{
      flex: 1,
      paddingLeft: 20,
      paddingTop: 20
    },
    menu:{
        flex: 0.2,
        alignItems: 'center',
        paddingTop: 17,
    },
    title:{
        color: 'black',
        fontSize: 15,
        paddingBottom: 3
    },
    titleNews:{
      color: '#666666',
      fontSize: 14,
    },
    description: {
        color: '#7d8597',
        paddingBottom: 2
    },
    descriptionDiary: {
      color: '#7d8597',
      paddingBottom: 2,
      fontSize: 12
    },
    descriptionNews: {
      color: '#7d8597',
      left: 150,
    },
    divider:{
        height: 3,
        width: '80%',
        alignSelf: 'center',
        marginTop: 5,
        opacity: 0.5
    },
    footer:{
        flexDirection: 'row',
        flex: 1,
        width: 350,
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    schedule: {
        color: '#7d8597',
        alignSelf: 'center',
        paddingRight: 170
    },
    scheduleMedicine:{
      color: '#7d8597',
        alignSelf: 'center',
        paddingRight: 80,
        fontSize: 13
    },
    status: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    statusMedicine:{
      flexDirection: 'row',
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    }
});