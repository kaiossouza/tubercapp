import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    },
  
    inputView:{
      width:"80%",
      backgroundColor: '#fff',
      justifyContent:"center",
      margin:20
    },
  
    button:{
      width:"80%",
      margin:20
    },
  
    textButton:{
      color:'#fff',
      textAlign:'center',
      fontSize:15,
    },
  
    logo:{
      width:150,
      height:150,
      marginBottom:20
    },
  
    labelText: {
        color:'#82B1B6',
        fontSize:36
    },
  
    touchableText: {
      color:'#82B1B6',
    },
    labelInfo:{
      color:'#f05454',
      fontSize:11,
      textAlign: 'left',
      justifyContent: "flex-start",
      marginTop: 10,
    }
  });
  
  export default styles;