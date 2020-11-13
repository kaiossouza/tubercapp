import React, {useContext} from 'react';
import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import { Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import { Divider } from 'react-native-paper';
import tubercAssets from '../../../assets/assets';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import AuthContext from './../../contexts/auth';
import moment from 'moment';
import { checkIfFilled } from '../../models/Diary';

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

export default function Home({navigation} : { navigation: any }){    
    const { user } = useContext(AuthContext);
    const firstNameTrim = user ? user.name.substring(0, user.name.indexOf(" ")) : null;
    const firstUserName = user ? (firstNameTrim ? firstNameTrim : user.name) : "";
    const now = moment(new Date());
    const duration = moment.duration(now.diff(user?.treatmentStart));
    const treatmentDuration: number = user?.treatmentDuration ? user?.treatmentDuration : 0;
    const percentDuration = parseInt(duration.asDays().toString()) / treatmentDuration;
    const percentIntDuration = parseInt((percentDuration * 100).toString()) ;
    const imageProfile =  <Avatar size="large" rounded  containerStyle={styles.avatar} source={{ uri: user?.picture}}/>;
    const imageProfileNull = <Avatar size="large" rounded  containerStyle={styles.avatar} source={require('./../../../assets/logo.png')}/>;
    
    function feeling(feedback: number) {
        if(feedback == 1){
            return (
                <View style={styles.cardContent}>
                    <Image style={styles.smallLogo} source={require('../../../assets/happy.png')}></Image>
                    <Text style={styles.commentBlack} >Você está se sentindo bem!</Text>
                </View>);
        } else if(feedback == 2) {
            return (
                <View style={styles.cardContent}>
                    <Image style={styles.smallLogo} source={require('../../../assets/sad.png')}></Image>
                    <Text style={styles.commentBlack} >Você não está se sentindo muito bem.</Text>
                </View>);
        } else {
            return (
                <View style={styles.cardContent}>
                    <Image style={styles.smallLogo} source={require('../../../assets/blue.png')}></Image>
                    <Text style={styles.commentBlack} >Você não está bem. Que tal ligar para o seu médico?</Text>
                </View>);
        }
    }

    function symptoms(symptoms: string[]) {
        if(symptoms.length > 0){
            return (
                <View style={styles.cardContentRow}>
                    <Text style={styles.commentBlackBold} >Sintomas: </Text>
                    <Text style={styles.commentBlackBold} >{symptoms.join(", ")}.</Text>
                </View>);
        } else {
            return (
                <View style={styles.cardContentRow}>
                    <Text style={styles.commentBlackBold} >Sintomas: </Text>
                    <Text style={styles.commentBlackBold} >nenhum registrado.</Text>
                </View>);
        }
    }

    function medicine(medicine: string[]) {
        if(medicine.length > 0){
            return (
                <View style={styles.cardContentRow}>
                    <Text style={styles.commentBlackBold} >Medicamentos: </Text>
                    <Text style={styles.commentBlackBold} >{medicine.join(", ")}.</Text>
                </View>);
        } else {
            return (
                <View style={styles.cardContentRow}>
                    <Text style={styles.commentBlackBold} >Medicamentos: </Text>
                    <Text style={styles.commentBlackBold} >ainda não preenchido.</Text>
                </View>);
        }
    }

    function resume() {
        let date = new Date();
        let entry = user?.diary.filter((e) => {
            let eDate = new Date(e.date.toString());
            if(eDate.toISOString) {                
                return eDate.toISOString().split('T')[0] == date.toISOString().split('T')[0];
            } else {
                return false;
            }
        }) ?? [];

        let dateStr = date.toISOString().split('T')[0];
        let formattedDate = `${dateStr.split('-')[2]}/${dateStr.split('-')[1]}/${dateStr.split('-')[0]}`;
        var filled = entry.length > 0 && checkIfFilled(entry[0]);

        if(filled) {
            return (<View>
                <View style={styles.cards}>
                    <Text style={styles.dateTitle}>Seu resumo de hoje, {formattedDate}</Text>
                    <View style={styles.card}>
                        { feeling(entry[0].feedback) }
                        { symptoms(entry[0].simptoms) }
                        { medicine(entry[0].medicine) }
                    </View>                     
                </View>
            </View>);
        } else {
            return (
                <View style={styles.cards}>
                    <Text style={styles.dateTitle}>Seu resumo de hoje, {date.toDateString()}</Text>
                    <Image style={styles.logo} source={require('../../../assets/hander-pana.png')}></Image>
                    <Text style={styles.comment} >Você ainda não preencheu nada hoje, corre lá no seu diário!</Text>
                </View>);
        }
    } 
    
    return (
        <ScrollView style={{backgroundColor:'#82B1B6', flex: 1}}>
            <View style={styles.infoUser}>
                {user?.picture ? imageProfile : imageProfileNull}
                <Text style={styles.appName}>{firstUserName}</Text>
            </View>
            <Image style={styles.downArrow} source={require('../../../assets/setBottom.png')}/>
            <View>
              <Progress done={percentIntDuration}/>
            </View>
            { resume() }
        </ScrollView>
    );
};


const Progress = ({done} : {done: any}) => {
	const [style, setStyle] = React.useState({});
	
	setTimeout(() => {
        const newStyle = {
            opacity: 1,
            width: `${done}%`,
            height: 30,
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }
		setStyle(newStyle);
	}, 200);
	
	return (
		<View style={styles.progress}>
        <LinearGradient
        colors={['#47A8B2', '#69afb8']}
        style={style}
        >
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 15,
            color: '#fff',
          }}>
          {done}%
        </Text>
      </LinearGradient>
		</View>
	)
}