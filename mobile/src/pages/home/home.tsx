import React, {useState, useContext} from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
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

    function resultFillDiary(){
        let date = new Date();
        let entry = user?.diary.filter((e) => {
            let eDate = new Date(e.date.toString());
            if(eDate.toISOString) {                
                return eDate.toISOString().split('T')[0] == date.toISOString().split('T')[0];
            } else {
                return false;
            }
        }) ?? [];

        const feelImage =  <Avatar size="small" rounded  containerStyle={styles.avatar}  source={require('./../../../assets/thinking-image.png')}/>;
        const medicineImage =  <Avatar size="small" rounded  containerStyle={styles.avatar} source={require('./../../../assets/medicine-image.png')}/>;
        const sympthonImage =  <Avatar size="small" rounded  containerStyle={styles.avatar} source={ require('../../../assets/symptoms-image.png')}/>;    
        const feelImageGray =  <Avatar size="small" rounded  containerStyle={styles.avatar}  source={require('./../../../assets/thinking-image-gray.png')}/>;
        const medicineImageGray =  <Avatar size="small" rounded  containerStyle={styles.avatar} source={require('./../../../assets/medicine-image-gray.png')}/>;
        const sympthonImageGray =  <Avatar size="small" rounded  containerStyle={styles.avatar} source={ require('./../../../assets/sympthoms-image-gray.png')}/>;    
    
        var hasFeel: boolean = entry[0].feedback > 0;
        var hasMedicine: boolean = entry[0].medicine.length > 0;
        var hasSympthoms: boolean = entry[0].simptoms.length > 0;

        var resultDiary = 0;
        if(hasFeel) resultDiary++;
        if(hasMedicine) resultDiary++;
        if(hasSympthoms) resultDiary++;

        return (
            <>
                <View style={styles.imagesDiary}>
                    {hasFeel ? feelImage : feelImageGray}
                    {hasMedicine ? medicineImage : medicineImageGray}
                    {hasSympthoms ? sympthonImage : sympthonImageGray} 
                </View>
                <View style={styles.cardContentDiary}>
                    <Text style={styles.title}>{resultDiary}/3</Text>
                    <Text style={styles.descriptionDiary}>PREENCHIDOS</Text>
                </View>
            </>
        )
    }
    
    function feeling(feedback: number) {
        if(feedback == 1){
            return (
                <View style={styles.cardContent}>
                    <Image style={styles.smallImage} source={require('../../../assets/happy.png')}></Image>
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
                    <Text style={styles.commentBlackBold} >Sintomas</Text>
                    <View style={styles.resultContent}>
                        <Text style={styles.commentResultList} >{symptoms.join(", ")}.</Text>
                    </View>
                </View>);
        } else {
            return (
                <View style={styles.cardContentRow}>
                    <Text style={styles.commentBlackBold} >Sintomas</Text>
                    <Text style={styles.commentResult} >Nenhum registrado.</Text>
                </View>);
        }
    }

    function medicine(medicine: string[]) {
        if(medicine.length > 0){
            return (
                <View style={styles.cardContentRow}>
                    <Text style={styles.commentBlackBold} >Medicamentos</Text>
                    <View style={styles.resultContent}>
                        <Text style={styles.commentResultList} >{medicine.join(", ")}.</Text>
                    </View>
                </View>);
        } else {
            return (
                <View style={styles.cardContentRow}>
                    <Text style={styles.commentBlackBold} >Medicamentos</Text>
                    <Text style={styles.commentResult} >Ainda não preenchido.</Text>
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
            return (
                <View>
                    <Text style={styles.dateTitleFeeling}>Seu resumo de hoje, {formattedDate}</Text>
                    <View style={{flex: 1, width: "100%", marginBottom: 20}}>
                        { feeling(entry[0].feedback) }
                        <Divider style={styles.subDivider} />
                        { symptoms(entry[0].simptoms) }
                         <Divider style={styles.subDivider} />
                        { medicine(entry[0].medicine) }
                    </View>                     
                </View>
            );
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
            <View style={styles.card}>
                <View style={styles.contentDiary}>
                    {resultFillDiary()}
                </View>
                <Divider style={styles.divider} />
                <View style={styles.footer}>
                    
                    { resume() }

                </View>
              </View> 
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