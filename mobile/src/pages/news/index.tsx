import React, { Component, useContext, useState } from 'react';
import { Text, View, StyleSheet, Image, Linking } from 'react-native';
import { ActivityIndicator, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import { Avatar } from 'react-native-elements';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import { Divider } from 'react-native-paper';
import tubercAssets from '../../../assets/assets';
import { getNews } from '../../services/googleapi';
import { GoogleApiItem } from '../../models/news';
import AuthContext from '../../contexts/auth';

IconEntypo.loadFont();
IconEvilIcons.loadFont();

Icon.loadFont();
IconFontisto.loadFont();

export default class News extends Component {
    state = {
      newsList: [],
      loading: true
    };

    async componentDidMount() {
      getNews().then(
        res => {
            this.setState({
              newsList: res.data.items,
              loading: false
            });
        }
      ).catch(err => console.log(err));
    }

    renderItem(data: any){
      let newsCardData = data.item;
      let Image_Http_URL = { 
        uri: newsCardData.pagemap?.cse_image[0].src 
      };

      if(newsCardData.link != "https://portal.fiocruz.br/" && !newsCardData.link.includes("https://portal.fiocruz.br/busca")){
        return (        
            <View style={styles.card}>          
              <Text style={styles.titleNews}>{newsCardData.title}</Text>          
              <TouchableOpacity style={styles.descriptionNews} onPress={() => {Linking.openURL(newsCardData.link)}}>
                <Text>19/09/20</Text>
                <Text>Saiba mais</Text>            
              </TouchableOpacity> 
            </View>);
      } else {
        return (<View></View>);
      }
    }

    loadMore() {
      const { newsList, loading } = this.state;
      var oldList = newsList;
      
      if(!loading) {
        this.setState({
          newsList: [],
          loading: true
        });
      }

      getNews(newsList.length + 1).then(
        res => {
            for(let i = 0; i < res.data.items.length; i++) {
              var item = res.data.items[0];
              oldList.push(item as never);
            }

            this.setState({
              newsList: oldList,
              loading: false
            });
        }
      ).catch(err => {
          this.setState({
            newsList: oldList,
            loading: false
          });
        }
      );
    }

    render() {
      const { newsList, loading } = this.state;   

      if(!loading) {
        return (
          <ScrollView style={{backgroundColor:'#82B1B6', flex: 1}}>
            <View style={styles.labelView}>
              <Text style={styles.labelText}>ÚLTIMAS NOTÍCIAS</Text>
            </View>
            <FlatList data={newsList} renderItem={this.renderItem} keyExtractor={(item) => item['title']}></FlatList>
            <TouchableOpacity style={styles.labelPlus} onPress={() => this.loadMore()}>
              <Text style={styles.labelPlusText}>CARREGAR MAIS</Text>
            </TouchableOpacity>
          </ScrollView>);
      } else {
        return <ActivityIndicator />
      }        
    };
};

News.contextType = AuthContext;

const styles = StyleSheet.create({
    labelText: {
        color:'#FFF',
        fontSize:14
    },
    labelPlusText: {
      color:'#666666',
      fontSize:14,
    },
    labelPlus: {
        padding: 10,
        margin: 10,
        width: "95%",
        backgroundColor: '#fff',
        borderRadius: 15,
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
    },
    labelView: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        paddingBottom:10,
        paddingTop:20
    },
    cardDate:{
      color: '#666666',
      fontSize: 14,
      justifyContent: 'flex-start'
    },
    card:{
      padding: 10,
      margin: 10,
      width: "95%",
      backgroundColor: '#fff',
      borderRadius: 15,
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
      fontSize: 18,
      padding: 5
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
      flex: 1,
      flexDirection: 'row',
      color: '#7d8597',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 2
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
    },
    listItemContainer: {
        borderStyle: 'solid',
        borderColor: '#fff',
        borderBottomWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    pokeItemHeader: {  
        color: '#fff',
        fontSize: 24,
    },
    pokeImage: {
        backgroundColor: 'transparent',
        height: 50,
        width: 50
    }
});