import React, { useContext } from 'react';
import { StyleSheet, Linking } from 'react-native';
import { createDrawerNavigator,  DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar} from 'react-native-paper';

import Home from '../pages/home/home';
import Godfather from '../pages/godfather/godfather';
import MyDiaryRoute from './mydiary.routes';
import Settings from '../pages/settings/index';
import News from '../pages/news';
import AuthContext from '../contexts/auth';
import Exames from '../pages/exames/index';
import MinhaClinica from '../pages/clinica/index';
import Duvidas from '../pages/duvidas/index';

IconFontisto.loadFont();
IconFoundation.loadFont();
IconEntypo.loadFont();

const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

function CustomDrawerContent({ props, navigation } : { props: any, navigation: any }) {
    const { handleLogout } = useContext(AuthContext);
    return (
      <DrawerContentScrollView {...props} style={{flex: 1}}>
        <DrawerItem style={styles.drawerStyle} icon={() => (<IconFontisto name="close-a" size={20} color="#adb5bd"/>)} label="" onPress={() => navigation.closeDrawer()} />
        <DrawerItem icon={() => (<IconFontisto name="bar-chart" size={13}/>)} labelStyle={{fontSize: 20}} label="Relatório" onPress={() => {navigation.navigate("Home")}}/>
        <DrawerItem icon={() => (<IconFontisto name="heart-alt" size={15}/>)} labelStyle={{fontSize: 20}} label="Exames" onPress={() => {navigation.navigate('Exames')}}/>
        <DrawerItem icon={() => (<IconFontisto name="doctor" size={20}/>)} labelStyle={{fontSize: 20}} label="Minha Clínica" onPress={() => {navigation.navigate('MinhaClinica')}}/>
        <DrawerItem icon={() => (<IconEntypo name="help" size={20}/>)} labelStyle={{fontSize: 20}} label="Dúvidas" onPress={() => {navigation.navigate('Duvidas')}}/>
        <DrawerItem icon={() => (<IconFontisto name="phone" size={20}/>)} style={{borderBottomWidth: 2, borderBottomColor: "#e9ecef"}} labelStyle={{fontSize: 20}} label="Ligue SUS" onPress={() => Linking.openURL(`tel:${136}`)}/>
        <DrawerItem icon={() => (<IconFontisto name="spinner-cog" size={15}/>)} labelStyle={{fontSize: 15}} label="Configurações" onPress={() => {navigation.navigate("Settings")}}/>
        <DrawerItem icon={() => (<IconFontisto name="close" size={15}/>)} labelStyle={{fontSize: 15}} label="Sair" onPress={handleLogout}/>
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
                drawerContent={(props: any) => <CustomDrawerContent {...props} navigation= {props.navigation} />}>
                    <Drawer.Screen name="Home" component={MyTabs}/>
                    <Drawer.Screen name="Settings" component={Settings} />
                    <Drawer.Screen name="Exames" component={Exames}/>
                    <Drawer.Screen name="MinhaClinica" component={MinhaClinica}/>
                    <Drawer.Screen name="Duvidas" component={Duvidas}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

function MyTabs(props: any) {
    const { screenTitle } = useContext(AuthContext);
    
    return (
       <NavigationContainer independent={true}>
          <Appbar.Header style={{backgroundColor:"#82B1B6"}}>
            <Appbar.Action  color="#fff" icon={require('../../assets/dots.png')} onPress={() => props.navigation.openDrawer()} />  
            <Appbar.Content titleStyle={{color: "#fff", alignSelf: 'flex-start'}} title="TUBERC" />
            <Appbar.Action style={{alignSelf: 'center'}} color='#fff' icon={require('../../assets/setting.png')} onPress={() => props.navigation.navigate('Settings')} />
          </Appbar.Header>
          <Tab.Navigator tabBarPosition="bottom"  tabBarOptions={{activeTintColor: '#fff', pressColor: '#47A8B2', showLabel: false, showIcon: true,
                  inactiveTintColor: '#fff', style: {backgroundColor: '#82B1B6'}, indicatorStyle: { backgroundColor: '#fff'}}}>
              <Tab.Screen name="Início" options={{ tabBarIcon: () => ( <IconFoundation name="home" color='#fff' size={25}/> )}} component={Home}/>
              <Tab.Screen name="Padrinho" options={{ tabBarIcon: () => ( <IconFontisto name="person" color='#fff' size={20}/> )}} component={Godfather} />
              <Tab.Screen name="News" options={{ tabBarIcon: () => ( <IconFontisto name="world" color='#fff' size={20}/> )}} component={News} />
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