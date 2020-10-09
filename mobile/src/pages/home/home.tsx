import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import { Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import { Divider } from 'react-native-paper';
import tubercAssets from '../../../assets/assets';

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

export default function Home({navigation}){
    return (
        <ScrollView style={{backgroundColor:'#82B1B6', flex: 1}}>
            <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>
              <View style={{position: 'absolute', right: 70}}>
                <Avatar size="large" rounded  containerStyle={styles.avatar} source={require('../../../assets/yuri.jpg')}/>
              </View>
              <Text style={styles.appName}>Yuri</Text>
            </View>
            <Image style={styles.downArrow} source={require('../../../assets/setBottom.png')}/>
            <View>
              <ProgressBar progress={0.5} color={'#fff'} style={styles.progressBar}></ProgressBar>
            </View>

            <View style={styles.cards}>

              <View style={styles.card}>
                <View style={styles.contentDiary}>
                    <View style={styles.imagesDiary}>
                        <Avatar containerStyle={{marginHorizontal: 12, marginVertical: 20}} size="small" activeOpacity={0.7} source={require('../../../assets/thinking-image.png')} />
                        <Avatar containerStyle={{marginHorizontal: 12, marginVertical: 20}} size="small" activeOpacity={0.7} source={require('../../../assets/medicine-image.png')} />
                        <Avatar containerStyle={{marginHorizontal: 12, marginVertical: 20}} size="small"  avatarStyle={{tintColor: '#A9A9A9', opacity: 0.7}} source={require('../../../assets/symptoms-image.png')} />
                    </View>
                    <View style={styles.cardContentDiary}>
                        <Text style={styles.title}>2/3</Text>
                        <Text style={styles.descriptionDiary}>PREENCHIDOS</Text>
                    </View>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.footer}>
                    <Text style={styles.schedule}>
                        MEU DIÁRIO
                    </Text>
                    <View style={styles.status}>
                            <IconEvilIcons name="close-o" size={25} color="red"/>
                    </View>
                </View>
              </View> 

              <View style={styles.card}>
                <View style={styles.content}>
                    <View style={styles.image}>
                        <Avatar size="medium" activeOpacity={0.7} source={require('../../../assets/pills.png')} />
                    </View>
                    <View style={styles.cardContentMedicine}>
                        <Text style={styles.title}>Nome do Medicamento</Text>
                        <Text style={styles.description}>X mg, y capsulas</Text>
                    </View>
                    <View style={styles.menu}>
                        <Icon color="#7d8597" size={20} name="bell"/>
                    </View>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.footer}>
                    <Text style={styles.scheduleMedicine}>
                        PRÓXIMO MEDICAMENTO
                    </Text>
                    <View style={styles.statusMedicine}>
                            <IconEvilIcons name="clock" size={25}/>
                            <Text>19:00</Text>
                    </View>
                </View>
              </View> 

              <View style={styles.card}>
                <View style={styles.content}>
                    <View style={styles.imageNews}>
                        <Avatar size="large" activeOpacity={0.7} avatarStyle={{borderRadius: 10}} source={require('../../../assets/tuberculose.jpg')} />
                    </View>
                    <View style={styles.cardContent}>
                        <Text style={styles.titleNews}>Pesquisas buscam novas técnicas de diagnóstico e investigam causas da tuberculose resistente ...</Text>
                        <Text style={styles.descriptionNews}>saiba mais</Text>
                    </View>
                    <View style={styles.menu}>
                        <IconEntypo color="#7d8597" size={20} name="dots-three-vertical"/>
                    </View>
                </View>
              </View> 
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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