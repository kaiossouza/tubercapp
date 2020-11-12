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
    console.log(user);
    const firstNameTrim = user ? user.name.substring(0, user.name.indexOf(" ")) : null;
    const firstUserName = user ? (firstNameTrim ? firstNameTrim : user.name) : "";
    const now = moment(new Date());
    const duration = moment.duration(now.diff(user?.treatmentStart));
    const treatmentDuration: number = user?.treatmentDuration ? user?.treatmentDuration : 0;
    const percentDuration = parseInt(duration.asDays().toString()) / treatmentDuration;

    return (
        <ScrollView style={{backgroundColor:'#82B1B6', flex: 1}}>
            <View style={styles.infoUser}>
              <Avatar size="large" rounded  containerStyle={styles.avatar} source={{ uri: user?.picture }}/>
              <Text style={styles.appName}>{firstUserName}</Text>
            </View>
            {/* <Image style={styles.downArrow} source={require('../../../assets/setBottom.png')}/> */}
            <View>
              <Progress done={percentDuration * 100}/>
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