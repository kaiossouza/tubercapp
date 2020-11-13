import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    avatar:{
        alignSelf: 'center',
        marginTop: 10
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
    smallImage:{
      width:150,
      height:150,
      marginBottom:5
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
    cardNoResults:{
      marginBottom: 20,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    card:{
      margin: 10,
      height: "auto",
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
      flex: 1,
      alignContent: 'center',
      alignSelf: 'center',
      justifyContent: "space-between",
      alignItems: "center",
      width: "80%"
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
      justifyContent: "space-between",
      flex: 1
    },
    cardContent:{
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: "center"
    },
    cardContentRow:{
      flex: 1,
      flexDirection: 'column',
      width: "100%",
      alignSelf: "center"
  },
    cardContentMedicine:{
      flex: 1,
      paddingLeft: 20,
      paddingTop: 15
    },
    cardContentDiary:{
      flex: 1,
      paddingTop: 20,
      alignItems: "flex-end"
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
      fontWeight: 'bold'
    },
    dateTitleFeeling:{
      color: 'black',
      fontSize: 15,
      paddingBottom: 3,
      paddingTop: 10,
      flex: 1,
      textAlign: "center",
    },
    comment:{
      color: 'black',
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
      paddingTop: 3,
      flex: 1,
      fontWeight: 'bold',
      alignSelf: "center"

    },
    commentResult:{
      color: 'black',
      fontSize: 13,
      paddingBottom: 3,
      flex: 1,
      alignSelf: "center",
    },
    commentResultList: {
      color: 'black',
      fontSize: 13,
      paddingBottom: 3,
      flex: 1,
      alignSelf: "center",
      textAlign: "center"
    },
    resultContent:{
      width: "80%",
      flex: 1, 
      alignSelf: "center"
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
    subDivider:{
      height: 3,
      width: '70%',
      alignSelf: 'center',
      marginTop: 5,
      opacity: 0.5
    },
    footer:{
        flexDirection: 'row',
        flex: 1,
        width: "100%",
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
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