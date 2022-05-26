import {StyleSheet,Dimensions} from "react-native";
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp,  
} from 'react-native-responsive-screen';
const SCREEN_WIDTH = Dimensions.get('window').width //414
const SCREEN_HEIGHT = Dimensions.get('window').height //896

const styles = StyleSheet.create({
    AnimatableImage: 
    {position:'absolute', 
    width: 200,
    height:200,
    marginLeft:'26%'
    ,marginTop:hp('40%')},

    hideIcon :{
     marginLeft:'-2.5%'
    ,width:SCREEN_WIDTH*0.047
    ,height:SCREEN_WIDTH*0.047
    },

    hideIconView :{
     alignItems:'center'
    ,position:'absolute'
    ,marginTop:hp('12%')
    ,marginLeft:wp('82%')
    ,borderRadius:30
    ,borderWidth:4
    ,borderColor:'white'
    ,padding:14,
    backgroundColor:'black'
  },
    
    rightSideIcons : {
      marginLeft:'7.5%'
      ,backgroundColor:'rgba(0,0,0,.4)',
      backgroundColor:'grey',
      borderColor:'white',
      borderWidth:4
    },

    addFriend :{
      color:"white"
      ,marginTop:10
      ,marginLeft:0
      ,transform:[{rotateY:'180deg'}]
    },
     bottomIconsView :{
       marginBottom:hp('0')
       ,paddingBottom:hp('0')
       ,flexDirection:'row'
       ,marginLeft:wp('1%')
       ,padding:hp('2%')
       ,width:'100%'
       ,justifyContent:'space-between'
       ,alignItems:'flex-start'
      },
      /************** Borrowed Modal Stuff */

      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      modalView: {
        justifyContent: 'flex-end',
        top:hp('70%'),
        margin: 0,
      },
    
});

export default styles;
