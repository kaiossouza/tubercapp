import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    avatar:{
        alignSelf: 'center',
        marginTop: 10,
    },
    logo:{
      width:300,
      height:300,
      marginBottom:20
    },
    smallLogo:{
      width:150,
      height:150,
      marginBottom:10
    },
    appName:{
      alignSelf:'center',
      marginTop: 5,
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 25,
      color: '#fff',
      justifyContent: "center",
      textAlign: "center"
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
      marginVertical: 20,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    card:{
      margin: 10,
      height: 110,
      backgroundColor: '#fff',
      borderRadius: 20,
      width: 350,
      alignSelf: 'center',
      flex: 1,
      flexDirection: 'column'
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
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
    },
    cardContentRow:{
      flex: 1,
      flexDirection: 'row',
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
    dateTitle:{
      color: 'white',
      fontSize: 15,
      paddingBottom: 3,
      //paddingLeft: 30,
      fontWeight: 'bold'
    },
    comment:{
      color: 'white',
      fontSize: 15,
      paddingBottom: 3,
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      width: '80%'
    },
    commentBlack:{
      color: 'black',
      fontSize: 15,
      paddingBottom: 3,
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      width: '80%'
    },
    commentBlackBold:{
      color: 'black',
      fontSize: 15,
      paddingBottom: 3,
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      width: '80%',
      fontWeight: 'bold'
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
    },
    progress: {
        backgroundColor: '#d8d8d8',
        borderRadius: 100,
        position: "relative",
        margin: 15,
        height: 30,
        width: 350,
        display: "flex",
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    infoUser: {
      flexDirection: 'column', 
      marginTop: 5, 
      justifyContent: "center", 
      alignItems: "center"
    }
});