import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft:40,
      paddingRight:40,
      backgroundColor: '#fff',
    },

    picContainer:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
    },

    button:{
        width:"60%",
        margin:20
    },
    
    textButton:{
        color:'#fff',
        textAlign:'center',
        fontSize:15,
    },

    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
      },

      loadingContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#82B1B6',
      },
    
    labelText: {
        color:'#82B1B6',
        fontSize:18,
        textAlign: 'left'
    }, 

    headerText: {
        color:'#82B1B6',
        fontSize:18,
        textAlign: 'left',
        paddingLeft:10
    },

    footerText: {
        color:'#82B1B6',
        fontSize:18,
        textAlign: 'right',
        paddingRight:10
    },
    
    inputView:{
        width:"100%",
        backgroundColor: '#fff'
    },

    header:{
        flexDirection: 'row',
        paddingTop: 60,
        paddingLeft:40,
        paddingRight:40,
        backgroundColor: '#fff'
    },

    headerContainer:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignContent: 'center'
    },

    footer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 40,
        paddingLeft:40,
        backgroundColor: '#fff'
    },

    picFooter:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 40,
        paddingEnd:40,
        backgroundColor: '#fff'
    },

    inputText:{
        height:50,
        color:"white"
    },

    pictureView: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    loginBtn:{
        width:"50%",
        backgroundColor:"#82B1B6",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    
    image: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#82B1B6",
        margin:40
    },
    imageRegister: {
        width: '100%',
        height: '60%',
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignSelf: "center",
    },
    dateComponent: {
        width: 350
    },
    labelInfo:{
        color:'#82B1B6',
        fontSize:11,
        textAlign: 'left',
        marginBottom: 10
    }
  });
  