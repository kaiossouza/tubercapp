import React from 'react';
import { View} from 'react-native';
import { Appbar } from 'react-native-paper';
import tubercAssets from '../../../assets/assets';
import MyDiaryRoute from './../../routes';

const assets = new tubercAssets('../../../assets/');
export default function MedicineSettings({navigation}){
    return(
        <View style={{backgroundColor:'#fff', flex: 1}}>
            <Appbar.Header style={{backgroundColor:"#ffff"}}>
                <Appbar.Action  color="#7d8597" icon={require('../../../assets/goback.png')} onPress={() => navigation.goBack()} />  
                <Appbar.Content titleStyle={{color: "#7d8597", alignSelf: 'flex-start'}} title="Medicamentos" />
            </Appbar.Header>
       </View>
    );
}