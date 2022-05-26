import React, { useState, useEffect, Component } from 'react'
import { TouchableOpacity, ScrollView, StatusBar, Image, View, Text, StyleSheet, SafeAreaView, Dimensions, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { actions } from "../../reduxActionAndReducer/reducer";
import { colors, fonts, localImages } from '../../utils/constant'
import SharedClass from '../../utils/SharedClass'
import InputBox from '../../component/InputBox'
import AppIntroSlider from 'react-native-app-intro-slider';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
import Button, { ButtonWithoutShadow } from '../../component/Button'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { register_api,matchOtp_api } from '../../api';
import { useRoute } from '@react-navigation/native'
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
class OtpScreen extends Component {
    constructor(props) {
        super(props);
        // const route = useRoute();
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
            otp:''
        }


    }
    async componentDidMount() {
        const { navigation,route } = this.props;
        console.log(navigation,route.params)
         var data = JSON.parse(route.params.phonedata)
        var token = data.token
        console.log('device_token', data)
        this.setState({ token: token })
        var username = data.username
        var loginData=data.loginData
        this.setState({ 
            username: username,
            loginData: loginData
        })
        console.log("device registration id", this.props)
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
        // User finished the LoginScreen. Show real app through
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

    GotoStep0= async ()=> {
        const data = JSON.stringify({
            "username": this.state.loginData,
            "device_registrartion_id": 'dkkdk', //this.state.token, 
            "mode": "S0"
        })
        console.log('data', data)
        try {
            const result = await register_api(data);
            console.log(result)
            // this.setState({
            //   loader: false
            // })
            if (result.status == "SUCCESS") {
               this.props.navigation.navigate('SignUpScreen1',{user_id:result.result.id})
              // this.GotoStep0()
          }else{
              let message={}
            message.message = result.error.message.meaning
            message.type = 'error'
            this.sharedClass.ShowSnakBar(message)
            //   message.message = 'Please enter correct otp'
            //   message.type = 'error'
            //   this.sharedClass.ShowSnakBar(message)
            //   return
          }
          } catch (error) {
            //   this.setState({
            //       loader: false
            //     })
          //   console.log("ERROR IN OFFER FETCH API", error);
          }
        // this.props.RegisterStep0(data);
    }
    
  onLogin = async () => {
   
    let message = {}

    
    if(!this.state.otp){
        message.message = 'Please Enter otp'
        message.type = 'info'
        this.sharedClass.ShowSnakBar(message)
        return
    }
    
 this.setState({
    loader:true
 })
 var phonedata = JSON.stringify({
    "username": this.state.username,
    "verifycode": this.state.otp
})
    console.log("token in home page ", phonedata)
    try {
      const result = await matchOtp_api(phonedata);
      console.log(result)
      this.setState({
        loader: false
      })
      if (result.status == "SUCCESS") {
        // this.props.navigation.navigate('SignUpScreen1')
        this.GotoStep0()
    }else{
        message.message = 'Please enter correct otp'
        message.type = 'error'
        this.sharedClass.ShowSnakBar(message)
        return
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
        return (
            <View style={styles.container}>

                <SafeAreaView style={styles.mainContainer}>
                    <StatusBar barStyle="dark-content" backgroundColor={colors.statusBarColor} />
                    <View style={{ flex: 1 }}>
                        <ScrollView
                            style={{ flex: 1 }}
                            contentContainerStyle={styles.scrollview}
                            scrollEnabled={scrollEnabled}
                            onContentSizeChange={this.onContentSizeChange}
                        >
                            <View style={[styles.mainContent, { alignItems: 'center' }]}>

                                <View style={{ alignItems: 'center', marginBottom: 30 }}>
                                    <View style={[styles.card,{ backgroundColor:colors.yellow, width:width,height:250, justifyContent:'center', alignItems:'center', marginBottom:30, borderBottomLeftRadius:30, borderBottomRightRadius:30}]}>
                                        <Image source={localImages.logo1} style={{ height: 150, width: 150 }} />
                                        {/* <Text style={[styles.robotoRegularText, { marginLeft: 20, fontSize: 19, color: colors.blubutton }]}>Money Parenting Made Zimble</Text> */}
                                    </View>
                                    <Text style={styles.textLine}>Please enter verification code </Text>
                                    <SmoothPinCodeInput
                                    cellSize={55}
                                    codeLength={4}
                                    value={this.state.otp}
                                    cellStyle={{
                                        borderWidth: 1,
                                        //borderRadius: 25,

                                        // shadowColor: '#000',
                                        // shadowOffset: {
                                        //     width: 2,
                                        //     height: 4,
                                        // },
                                        // shadowOpacity: 0.30,
                                        // shadowRadius: 4.65,
                                        // elevation: 8,
                                        marginTop: 40
                                    }}
                                    cellStyleFocused={{
                                        borderBottomWidth: 1.5,

                                    }}
                                    textStyle={{
                                        color: '#3E455B',
                                        fontSize: 20
                                    }}
                                    autoFocus
                                    onTextChange={password => this.setState({ otp: password })} />
                                    
                                  


                                    <View style={{ width: width, alignItems:'center' }}>
                                        <Button
                                            height={60}
                                            backgroundColor={colors.ornageButton}
                                            width={width - 130}
                                            borderRadius={8}
                                            marginTop={50}
                                            label="Verify"
                                            labelColor={colors.inputBox}
                                            onAction={()=>{this.onLogin()}}
                                            fontSize={17}
                                            fontFamily={Platform.OS=='ios'?fonts.regular:fonts.semiBold}
                                            
                                            fontStyle={Platform.OS=='ios'?'normal':null}
                                            fontWeight={Platform.OS=='ios'?'700':null}
                                        ></Button>
                                        {/* <Button
                                            height={60}
                                            backgroundColor={colors.inputBox}
                                            width={width - 130}
                                            borderRadius={8}
                                            marginTop={20}
                                            label="Skip to explore"
                                            labelColor={colors.blueText}
                                            onAction={()=>{}}
                                            fontFamily={Platform.OS=='ios'?fonts.regular:fonts.semiBold}
                                            fontSize={17}
                                            fontStyle={Platform.OS=='ios'?'normal':null}
                                            fontWeight={Platform.OS=='ios'?'700':null}
                                        ></Button> */}
                                    </View>
                                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                        {/* <Text style={styles.textLine}>You don't have an account? </Text> */}
                                        <ButtonWithoutShadow
                                            height={60}
                                            backgroundColor={colors.transparentBackground}
                                            width={70}
                                            borderRadius={8}
                                            marginTop={20}
                                            label="Resend"
                                            labelColor={colors.ornageButton}
                                            onAction={()=>{}}
                                            fontFamily={Platform.OS=='ios'?fonts.regular:fonts.semiBold}
                                            fontStyle={Platform.OS=='ios'?'normal':null}
                                            fontWeight={Platform.OS=='ios'?'700':null}
                                            fontSize={17}
                                        ></ButtonWithoutShadow>
                                    </View>


                                </View>
                            </View>

                        </ScrollView>

                    </View>

                </SafeAreaView>

            </View>
           

        );
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
export default connect(mapStateToProps, mapDispatchToProps)(OtpScreen)

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