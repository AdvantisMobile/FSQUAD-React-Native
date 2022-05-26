import React, { useState, useEffect, Component } from 'react'
import {ImageBackground, TouchableOpacity, ScrollView, StatusBar, Image, View, Text, StyleSheet, SafeAreaView, Dimensions, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { actions } from "../../reduxActionAndReducer/reducer";
import { colors, fonts, localImages } from '../../utils/constant'
import SharedClass from '../../utils/SharedClass'
import InputBox from '../../component/InputBox'
import AppIntroSlider from 'react-native-app-intro-slider';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
import Button, { ButtonWithoutShadow } from '../../component/Button'
import { API_BASE_URL, put_like_api, get_post_home_api,send_friend_req_api,login_api } from '../../api';
var { height, width } = Dimensions.get('window');



const slides = [
    {
        key: 'somethun',
        title: 'Rewards',
        text: 'Create tasks to reward your kids',
        backgroundColor: '#59b2ab',
        index: 0
    },
    {
        key: 'somethun-dos',
        title: 'Title 2',
        text: 'Other cool stuff',
        backgroundColor: '#febe29',
        index: 1
    },
    {
        key: 'somethun1',
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\nLorem ipsum bla bla bla',
        backgroundColor: '#22bcb5',
        index: 2
    }
];
class FavScreen extends Component {
    constructor(props) {
        super(props);
        this.sharedClass = new SharedClass();
        this.state = {
            screenHeight: height,
            countryCode: 'IN',
            callingCode: '+91',
            withCountryNameButton: false,
            withFlag: true,
            withEmoji: false,
            withFilter: true,
            withAlphaFilter: false,
            withCallingCode: false,
            phone: '',
            password: '',
            secureTextEntry:true,
            loader:false,
            
                data:[{Image:localImages.fav1,Name:"Sam Dsouza",Profile:'https://image.shutterstock.com/image-photo/portrait-smiling-red-haired-millennial-260nw-1194497251.jpg'},
                {Image:localImages.fav2,Name:"Merry",Profile:'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'},
                {Image:localImages.fav3,Name:"Serina",Profile:'https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg'}]
            
        }


    }
    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight });
    };

    _renderItem = ({ item }) => {
        return (
            <SafeAreaView>
                <View style={styles.slide}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Image source={item.image} />
                    <Text style={styles.text}>{item.text}</Text>
                </View>

            </SafeAreaView>

        );
    }
    _onDone = () => {
        // User finished the FavScreen. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
    }

    onSelect = (country) => {
        console.log(country)
        // setCountryCode(country.cca2)
        // setCallingCode("+" + country.callingCode[0])
        this.setState({
            callingCode: '+' + country.callingCode[0],
            countryCode: country.cca2
        })
    }


  onLogin = async () => {
   
    let message = {}

    
    if(!this.state.phone){
        message.message = 'Please Enter Email Or Phone'
        message.type = 'info'
        this.sharedClass.ShowSnakBar(message)
        return
    }
    else  if (!this.state.password) {
        message.message = 'Please enter paswword'
        message.type = 'info'
        this.sharedClass.ShowSnakBar(message)
        return
        //return alert('Please Enter Alpbhabets');
    }

    //setLoader(true)
    //console.log(loder)
 this.setState({
    loader:true
 })
    const data = {
       
            "username": this.state.phone.trim(),
            "password": this.state.password.trim(),
            "device_registrartion_id": 'hhdhdfd',
            "device_type": Platform.OS=='android' ? "A" : "I"
         
    }
    console.log("token in home page ", data)
    try {
      const result = await login_api(data);
      console.log(result)
      this.setState({
        loader: false
      })
      if (result.status == "SUCCESS") {

        this.props.setLoggedInUserDetails(result.result)
        this.props.setLoggedInUserAuthToken(result.result.user_token)
        this.props.setLoggedInUserStatus('home')
      }
      else {
        // console.log("wdfwdfefd",responseJson)
      }
    } catch (error) {
        this.setState({
            loader: false
          })
    //   console.log("ERROR IN OFFER FETCH API", error);
    }
    //props.navigation.navigate('CreateProfilePage')
  }
    render() {
        //alert()
        const scrollEnabled = Platform.OS=='ios'?true: this.state.screenHeight > height;
        return(
            <SafeAreaView>
                <ScrollView>
                <View style={{flex:1,backgroundColor:'#333'}} >
                    <ImageBackground style={{width:width,alignItems:'center',height:width/2-35,backgroundColor:'#000'}} source={localImages.imagebg} >
                
                        <View style={{width:width,height:width/2-35,backgroundColor:'#111',opacity:0.8}} >
                            <View style={{width:width,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20}} >
                                <Image style={{width:width/8.58,height:height/20.56}} source={localImages.logo} />
                                <Image style={{width:width/12.73,height:height/33.98}} source={localImages.send}/>
                            </View>
                            <Image style={{width:width/2.32,height:height/26.96,alignSelf:'center',marginTop:30}} source={localImages.wanna} />
                            <View style={{width:width-5,alignSelf:'center',height:30,borderTopLeftRadius:30,borderTopEndRadius:30,marginTop:width/3-112,backgroundColor:'#fff'}} >
                                <View style={{width:width-5,alignSelf:'center',height:30,borderTopLeftRadius:30,borderTopEndRadius:30,backgroundColor:'#fff'}} >
                                <View style={{width:width-5,alignSelf:'center',height:30,borderTopLeftRadius:30,borderTopEndRadius:30,backgroundColor:'#fff'}} >

                                </View>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={{width:width-5,alignSelf:'center',height:height,backgroundColor:'#fff'}} >
                        {this.state.data.map((data,key)=>{
                            return(
                                <View style={{marginVertical:10}} >
                                <ImageBackground source={data.Image} style={{width:width/1.23,justifyContent:'flex-end',borderRadius:10,alignSelf:'center',height:height/4,backgroundColor:'#000'}} >
                                    <View style={{width:width/1.23,justifyContent:'flex-end',opacity:0.65,borderRadius:10,alignSelf:'center',height:height/4,backgroundColor:'#000'}} >
                                   

                                  
                                    <View style={{flexDirection:'row',alignItems:'center',margin:10}} >
                                        <Image style={{width:50,height:50,borderRadius:100}} source={{uri:data.Profile}} />
                                        <Text style={{color:'#fff',fontWeight:'bold',marginLeft:10,fontSize:18}} >{data.Name}</Text>
                                    </View>

                                    </View>    
                                </ImageBackground>
                                </View>
                            )
                        })}
                    </View>
                </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

}

const mapStateToProps = (state) => {
    console.log("check store data", state.localStates);
    return {
        loginStatus: state.localStates.loginStatus,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInUserAuthToken: token => {
            dispatch(actions.setLoggedInUserAuthToken(token));
          },
          setLoggedInUserDetails: userDetails => {
            dispatch(actions.setLoggedInUserDetails(userDetails));
          },
          setLoggedInUserStatus: loginStatus => {
            dispatch(actions.setLoggedInUserStatus(loginStatus));
          },
          setLoggedInUserType: loginType => {
            dispatch(actions.setLoggedInUserType(loginType));
          },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(FavScreen)

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors.authBackGroud,
    },
    scrollview: {
        flexGrow: 1,
        ///  marginBottom:90
    },
    mainContent: {
        flexGrow: 1,
        justifyContent: "space-between",
        padding: 10,
    },
    inputBoxStyle: {
        // backgroundColor: 'transparent',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        justifyContent: 'center',
        //alignItems: 'center',
        borderRadius: 8
    },
    card: {
        // shadowColor: colors.greenText1,
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.30,
        // shadowRadius: 4.65,
        // elevation: 8,
        // justifyContent: 'center',
        // alignItems: 'center'


        shadowColor: colors.loginshadow,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.27,
        shadowRadius: 6,

        elevation: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLine:{
        marginTop:20,
        color:colors.blueText,
        fontSize:17,
        fontFamily:Platform.OS=='ios'?fonts.regular:fonts.regular,
        fontStyle:Platform.OS=='ios'?'normal':null,
        fontWeight:Platform.OS=='ios'?'normal':null
    }
});