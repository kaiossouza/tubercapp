import React from 'react';
import {StyleSheet} from 'react-native';
import { createDrawerNavigator,  DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFoundation from 'react-native-vector-icons/Foundation';
import { NavigationContainer } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { Appbar} from 'react-native-paper';

import Home from '../pages/home/home';
import Godfather from '../pages/godfather/godfather';
import MyDiary from '../pages/my-diary/index';
import MyDiaryRoute from './mydiary.routes';
import MyDiaryTabs from './mydiary.routes';
import Settings from '../pages/settings/index';
import MedicineSetting from '../pages/my-diary/medicine-setting';
import tubercAssets from '../../assets/assets';

IconFontisto.loadFont();
IconFoundation.loadFont();

const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const assets = new tubercAssets('../../assets/');

function CustomDrawerContent({ props } : { props: any }) {
    return (
      <DrawerContentScrollView {...props} style={{flex: 1}}>
         {/* <DrawerItemList {...props} />  */}
        <DrawerItem style={styles.drawerStyle} icon={() => (<IconFontisto name="close-a" size={20} color="#adb5bd"/>)} label="" onPress={() => props.navigation.closeDrawer()} />
        {/* <DrawerItem style={{alignSelf: 'center', flex: 1, marginLeft:70, marginTop: -30}} icon={() => (
            <Avatar size="large" rounded activeOpacity={0.7} style={styles.avatar} source={require('./../../content/images/yuri.jpg')}/>
            )} label=""/> */}
        <DrawerItem icon={() => (<IconFontisto name="bar-chart" size={20}/>)} labelStyle={{fontSize: 20}} label="Relatório" onPress={() => props.navigation.navigate("Home")}/>
        <DrawerItem icon={() => (<IconFontisto name="heart-alt" size={20}/>)} labelStyle={{fontSize: 20}} label="Exames" onPress={() => props.navigation.navigate("Home")}/>
        <DrawerItem icon={() => (<IconFontisto name="doctor" size={20}/>)} labelStyle={{fontSize: 20}} label="Minha Clínica" onPress={() => props.navigation.navigate("Home")}/>
        <DrawerItem icon={() => (<IconFontisto name="phone" size={20}/>)} style={{borderBottomWidth: 2, borderBottomColor: "#e9ecef"}} labelStyle={{fontSize: 20}} label="Ligue SUS" onPress={() => props.navigation.navigate("Home")}/>
        <DrawerItem icon={() => (<IconFontisto name="spinner-cog" size={15}/>)} labelStyle={{fontSize: 15}} label="Configurações" onPress={() => props.navigation.navigate("Settings")}/>
        <DrawerItem icon={() => (<IconFontisto name="close" size={15}/>)} labelStyle={{fontSize: 15}} label="Sair" onPress={() => props.navigation.navigate("Login")}/>
        <DrawerItem
          label="TUBERC by Fio Cruz"
          onPress={() => props.navigation.toggleDrawer()}
        />
      </DrawerContentScrollView>
    );
  }

  export default function DrawerRoutes() {
    return (
        <NavigationContainer independent>
            <Drawer.Navigator 
                drawerType='slide'
                drawerContent={props => <CustomDrawerContent {...props} />}>
                    <Drawer.Screen name="Home" component={MyTabs}/>
                    <Drawer.Screen name="Settings" component={Settings} />
                    <Drawer.Screen name="Padrinho" component={Godfather}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

function MyTabs(props) {
     return (
       <NavigationContainer independent={true}>
          <Appbar.Header style={{backgroundColor:"#82B1B6"}}>
            <Appbar.Action  color="#fff" icon={require('../../assets/dots.png')} onPress={() => props.navigation.openDrawer()} />  
            <Appbar.Content titleStyle={{color: "#fff", alignSelf: 'flex-start'}} title="Tuberc" />
            <Appbar.Action style={{alignSelf: 'center'}} color='#fff' icon={require('../../assets/setting.png')} onPress={() => props.navigation.navigate('Settings')} />
          </Appbar.Header>
          <Tab.Navigator tabBarPosition="bottom"  tabBarOptions={{activeTintColor: '#fff', pressColor: '#47A8B2', showLabel: false, showIcon: true,
                  inactiveTintColor: '#fff', style: {backgroundColor: '#82B1B6'}, indicatorStyle: { backgroundColor: '#fff'}}}>
              <Tab.Screen name="Início" options={{ tabBarIcon: () => ( <IconFoundation name="home" color='#fff' size={25}/> )}} component={Home}/>
              <Tab.Screen name="Padrinho" options={{ tabBarIcon: () => ( <IconFontisto name="person" color='#fff' size={20}/> )}} component={Godfather} />
              <Tab.Screen name="Meu Diário" options={{ tabBarIcon: () => ( <IconFontisto name="prescription" color='#fff' size={20}/> )}} component={MyDiaryRoute}/>
          </Tab.Navigator>
        </NavigationContainer>
     );
 }

 const styles = StyleSheet.create({
    drawerStyle: {
        fontSize: 10, 
        margin: 0, 
        padding: 0
    },

    avatar: {
        width: 70, 
        height:  70
    }
 });