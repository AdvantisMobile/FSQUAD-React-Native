import React, { useState, useEffect, Component } from 'react'
import {Alert,ImageBackground, TouchableOpacity,KeyboardAvoidingView,TextInput, ScrollView, StatusBar, Image, View, Text, StyleSheet, SafeAreaView, Dimensions, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { actions } from "../../reduxActionAndReducer/reducer";
import { colors, fonts, localImages } from '../../utils/constant'
import SharedClass from '../../utils/SharedClass'
import InputBox from '../../component/InputBox'
import AppIntroSlider from 'react-native-app-intro-slider';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
import Button, { ButtonWithoutShadow } from '../../component/Button'
import {register_api, API_BASE_URL, put_like_api, get_post_home_api, send_friend_req_api, login_api } from '../../api';

import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import InstagramLogin from 'react-native-instagram-login'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp,  
  } from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native-paper';
  const { width, height } = Dimensions.get('screen')

  const {height: SCREEN_HEIGHT} = Dimensions.get('window');
   const isIOS = Platform.OS === 'ios'
  const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
  const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
  const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 80 : 64) : 64;
  const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;



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
class LoginScreen extends Component {
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
            secureTextEntry: true,
            loader: false,
            errorMessage :''
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


    onLogin = async () => {

        let message = {}


        if (!this.state.phone) {
            message.message = 'Please Enter Email Or Phone'
            message.type = 'info'
            this.sharedClass.ShowSnakBar(message)
            return
        }
        else if (!this.state.password) {
            message.message = 'Please enter paswword'
            message.type = 'info'
            this.sharedClass.ShowSnakBar(message)
            return
            //return alert('Please Enter Alpbhabets');
        }

        //setLoader(true)
        //console.log(loder)
        this.setState({
            loader: true
        })
        const data = {

            "username": this.state.phone.trim(),
            "password": this.state.password.trim(),
            "device_registrartion_id": 'hhdhdfd',
            "device_type": Platform.OS == 'android' ? "A" : "I"

        }
        console.log("token in home page ", data)
        try {
            const result = await login_api(data);
            console.log(result)
            this.setState({
                loader: false,
                errorMessage :''

            })
            if (result.status == "SUCCESS") {

                this.props.setLoggedInUserDetails(result.result)
                this.props.setLoggedInUserAuthToken(result.result.user_token)
                this.props.setLoggedInUserStatus('home')
            }
            else if (result.status == "ERROR"){
               
                let errorMessage = result.error.message.meaning;
                // this.sharedClass.ShowSnakBar(errorMessage)
                this.setState({
                    loader: false,
                    errorMessage :errorMessage
                })
            }
            else {
                // console.log("wdfwdfefd",responseJson)
                this.sharedClass.ShowSnakBar("error logging in")
                this.setState({
                    loader: false,
                    errorMessage :errorMessage
                })

            }
        } catch (error) {
            this.sharedClass.ShowSnakBar(error)

            this.setState({
                loader: false
            })
            //   console.log("ERROR IN OFFER FETCH API", error);
        }
        //props.navigation.navigate('CreateProfilePage')
    }

    _onSignInWithSocial(self, socialType) {
        // self.setState({isLoading: true})
        if (socialType === "facebook") { if(Platform.OS==='android') {
            // LoginManager.setLoginBehavior("web_only")
          
          }
            LoginManager.logInWithPermissions(['public_profile', 'email']).then(
                function (result) {
                    if (result.isCancelled) {
                        self.cancelLoader()
                        Alert.alert(
                            'Fsquad',
                            "Login cancelled",
                            [
                                { text: 'OK' },
                            ]
                        )
                    } else {
    
                        AccessToken.getCurrentAccessToken().then((data) => {
                            // self.cancelLoader()
                            const { accessToken } = data;
                            let token = accessToken.toString();
                            setTimeout(() => {
                                //  alert("token",token)
                                console.log(token)
                                self.facebookLoginDone(token, socialType);
                            }, 200)
                        })
                    }
                },
                function (error) {
                  console.log(error)
                    self.setState({ isLoading: false, blur: 1 })
                    Alert.alert(
                        'Fsquad',
                        "Facebook Login Failed.",
                        [
                            { text: 'OK', onPress: () => console.log("Facebook Login Failed.") },
                        ]
                    )
                }
            );
        } else if (socialType == "twitter") {
            // this._twitterSignIn(socialType)
        }
    }
    
    
    cancelLoader() {
        this.setState({ isLoading: false })
    }
    
    
    _callSocialAPI(phonedata,reqData) {
    
      console.log('parameter', JSON.stringify(phonedata))
      var temp_api = 'http://18.220.123.51/api/social-login'
      console.log("__temp_api", temp_api)
      try {
          fetch(temp_api, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(phonedata)
    
          }).then((response) => response.json())
              .then((response) => {
                  this.setState({
                      isLoading: false
                  })
                  console.log("userFriendList response=>", response)
                  if (response.status == "SUCCESS") {
                    this.props.setLoggedInUserDetails(response.result)
                    this.props.setLoggedInUserAuthToken(response.result.user_token)
                    this.props.setLoggedInUserStatus('home')
                    //this.props._LoginSocial(response.result)
                      // this.props.navigation.navigate('OTPPage', { phonedata })
                  }else if(response.error.message.message=="USER_NOT_FOUND"){
                    const data = JSON.stringify({
                      "username": phonedata.username,
                      "soicalType":"social",
                      "device_registrartion_id": 'dkkdk', //this.state.token, 
                      "mode": "S0"
                  })
                  console.log('data', data)
                  this.GotoStep0(data,reqData)
                 // this.props.navigation.navigate('SignUpScreen1')
                  //this.props.RegisterStep0(data);
    
                  }else if(response.error.message.message=="ALREADY_REGISTER"){
                    const data = JSON.stringify({
                      "username": phonedata.username,
                      "soicalType":"social",
                      "device_registrartion_id": 'dkkdk', //this.state.token, 
                      "mode": "S0"
                  })
                  console.log('data', data)
                  this.GotoStep0(data,reqData)
                  //this.props.navigation.navigate('SignUpScreen1')
                  // this.props.RegisterStep0(data);
    
                  }
                  // this.props.navigation.navigate('')
              })
              .catch((error) => {
                  this.setState({
                      isLoading: false
                  })
                  console.log("error", error)
                  alert(error)
              });
      }
      catch (e) {
          console.log("error", e)
          alert('Please check your network connection')
      }
    }
    
    GotoStep0= async (data,phonedata)=> {
        // const data = JSON.stringify({
        //     "username": this.state.loginData,
        //     "device_registrartion_id": 'dkkdk', //this.state.token, 
        //     "mode": "S0"
        // })
        console.log('data', data)
        try {
            const result = await register_api(data);
            console.log(result)
            // this.setState({
            //   loader: false
            // })
            if (result.status == "SUCCESS") {
               this.props.navigation.navigate('SignUpScreen1',{user_id:result.result.id, userData:phonedata,social:'yes'})
              // this.GotoStep0()
          }else{
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
    facebookLoginDone(token, socialType) {
        this.setState({ isLoading: true })
        return fetch('https://graph.facebook.com/v2.11/me?fields=id,email,name,first_name,last_name,picture.width(800).height(800),friends&access_token=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json()
                .then(facebookData => {
                    if (response.ok == true) {
    
                        var reqData = {
                            "id": facebookData.id ? facebookData.id : "",
                            "email_id": facebookData.email ? facebookData.email : "",
                            "firstName": facebookData.first_name ? facebookData.first_name : "",
                            "lastName": facebookData.last_name ? facebookData.last_name : "",
                            "photo": facebookData.picture.data.url ? facebookData.picture.data.url : "",
                            "src": socialType,
                            "username":facebookData.id,
                            "device_registrartion_id": this.state.token?this.state.token:'hhhh',
                            
                        }
    
                        var reqData2 = {
                         
                          "username":facebookData.id,
                          "device_registrartion_id": this.state.token?this.state.token:'hhhh',
                          
                      }
                        console.log("facebook_reqData=>",reqData)
                        // LoginManager.logOut();
                        this.customFacebookLogout(token)
                        if (reqData.id) {
                            this._callSocialAPI(reqData2,reqData);
                        } else {
                            this.setState({ isLoading: false }, () => {
                                Alert.alert(
                                    'Fsquad',
                                    "Please provide Facebook email permission to be able to login using Facebook",
                                    [
                                        { text: 'OK', onPress: () => console.log("Please provide Facebook email permission to be able to login using Facebook") },
                                    ]
                                )
                            });
                        }
                    }
                }))
            .catch((err) => {
                console.log(err)
                 console.log('Error in fetching data from facebook');
            })
    }


    customFacebookLogout = (token) => {
        var current_access_token =token;
        AccessToken.getCurrentAccessToken().then((data) => {
          current_access_token = data.accessToken.toString();
        }).then(() => {
          let logout =
          new GraphRequest(
            "me/permissions/",
            {
                accessToken: current_access_token,
                httpMethod: 'DELETE'
            },
            (error, result) => {
                if (error) {
                    console.log('Error fetching data: ' + error.toString());
                } else {
                    LoginManager.logOut();
                }
            });
          new GraphRequestManager().addRequest(logout).start();
        })
        .catch(error => {
          console.log(error)
        });      
      }


    render() {


        const scrollEnabled = Platform.OS == 'ios' ? true : this.state.screenHeight > height;

        return (
        
        
        <View style={{backgroundColor:'#223244',top:0,width:'100%',height:'100%'}}>
         {this.state.loader && <ActivityIndicator size="small" color={colors.yellow} style={{width:'100%',height:'10%',top:'50%',zIndex:30}}/>}
            <KeyboardAvoidingView behavior={isIOS ? 'padding':'height'}  style={{flex:1,backgroundColor:'#223244'}}>

                <KeyboardAwareScrollView style={{ flex: 1,top: IS_IPHONE_X ? hp('13') : hp('7'),width:'100%',height:'100%'}} showsVerticalScrollIndicator={false}>
                        
                        <ImageBackground source ={localImages.logoTitle} style ={{top: hp('-2') ,width :width/1.5,height:width/1.5,alignSelf:'center',zIndex:20}} resizeMode ='contain'/>

                        <View style={{ alignItems: 'center',justifyContent:'space-between'}}>
                                   
                             <View style={{ flexDirection: 'row' }}>
                                       
                                 <TextInput autoCompleteType="off" onChangeText={(text) => this.setState({ email: text, errorMessage: '' })}
                                    style={{ height:hp('8'), width: width - 70,color:colors.white,fontWeight:'500',fontSize:18, borderWidth: 2, borderColor: this.state.errorMessage ==='' ? colors.blue : 'red', padding:hp('1'), borderRadius:15}}
                                    placeholder="Email or Phone number" placeholderTextColor = {colors.light_gray}
                                    editable={true}
                                    value={this.state.phone}
                                    maxLength={400}
                                    // iconName="callPng"
                                    onIconClick={() => { }}
                                    onChangeText={(text) => {
                                        this.setState({
                                            phone: text,
                                            errorMessage:''
                                        })
                                    }}

                                    />
                                   
                             </View>
                                    
                             <View style={{ flexDirection: 'row',marginTop:10 }}>
                          

                                <TextInput autoCompleteType="off" onChangeText={(text) => this.setState({ email: text, errorMessage: '' })}
                                style={{ height : hp('8'),width: width - 70,color:colors.white,fontWeight:'500',fontSize:18,borderWidth: 2, borderColor:colors.blue, padding:hp('1'), borderRadius:15}}
                                value={this.state.phoneNo}   placeholder="Enter Password"
                                label="Enter Password" placeholderStyle={{ fontSize: 14, color:colors.light_gray }} 
                                placeholderTextColor = {colors.light_gray}
                                secureTextEntry={true}
                                editable={true}
                                value={this.state.password}
                                maxLength={400}
                                onIconClick={() => {this.setState({ secureTextEntry:!this.state.secureTextEntry})
                                }}
                                //  iconName="eye"
                                onChangeText={(text) => {this.setState({password: text,errorMessage:''})}}/>
                                  
                             </View>
                                    
                            {this.state.errorMessage !== ''&& <Text style={{color:'red',top:10,fontSize:20}}>{this.state.errorMessage}</Text>}

                             <View style={{ width: width, alignItems:'center' }}>
                                   
                                <Button
                                height={30}
                                backgroundColor={colors.yellow}
                                width={width - 230}
                                borderRadius={8}
                                marginTop={20}
                                label="Login"
                                labelColor={colors.inputBox}
                                onAction={() => { this.onLogin() }}
                                fontSize={17}
                                fontFamily={Platform.OS=='ios'?fonts.regular:fonts.semiBold}
                                fontStyle={Platform.OS=='ios'?'normal':null}
                                fontWeight={Platform.OS=='ios'?'700':null}>

                                </Button>
                                       
                             </View>

                            <View style={styles.SocialLogin_Block_Container} >
                                <TouchableOpacity onPress={() => this._onSignInWithSocial(this, 'facebook')} >
                                    <ImageBackground style={styles.fbImg} source={localImages.fb}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.instagramLogin.show()} >
                                    <ImageBackground style={styles.instaImg} source={localImages.insta}/>
                                </TouchableOpacity>

                                <InstagramLogin
                                    ref={ref => (this.instagramLogin = ref)}
                                    appId='236849821000726'
                                    appSecret='60e9018a0e4a4d15b4b9febb307e321f'
                                    redirectUrl='your-redirect-Url'
                                    scopes={['user_profile', 'user_media']}
                                    onLoginSuccess={this.setIgToken}
                                    onLoginFailure={(data) => console.log('instagram==>', data)}/>

                            </View>
                                    
                                    
                            <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center',marginTop: IS_IPHONE_X ? hp('5') : hp('1')}}>
                                <Text style={styles.textLine,{color:colors.yellow,alignSelf:'center',marginTop:hp('3')}}>You don't have an account? </Text>
                                <ButtonWithoutShadow
                                    height={hp('4')}
                                    backgroundColor={colors.white}
                                    width={wp('17')}
                                    borderRadius={8}
                                    marginTop={20}
                                    label="Sign up"
                                    labelColor={colors.ornageButton}
                                    onAction={() => { this.props.navigation.navigate('SignupScreen') }}
                                    fontFamily={Platform.OS == 'ios' ? fonts.regular : fonts.semiBold}
                                    fontStyle={Platform.OS == 'ios' ? 'normal' : null}
                                    fontWeight={Platform.OS == 'ios' ? '700' : null}
                                    fontSize={17}
                                ></ButtonWithoutShadow>
                            </View>
                                    


                         </View>

                    </KeyboardAwareScrollView>

             </KeyboardAvoidingView>
        </View>

        );


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
                                    <View style={[styles.card, { backgroundColor: colors.yellow, width: width, height: 250, justifyContent: 'center', alignItems: 'center', marginBottom: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }]}>
                                        <Image source={localImages.logo1} style={{ height: 150, width: 150 }} />
                                        {/* <Text style={[styles.robotoRegularText, { marginLeft: 20, fontSize: 19, color: colors.blubutton }]}>Money Parenting Made Zimble</Text> */}
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        {/* <View style={[styles.inputBoxStyle, { backgroundColor: colors.inputBox, height: 60, width: 60, marginRight: 10, justifyContent: 'center', alignItems: 'center' }]}>
                                            <CountryPicker countryCode={'SG'} theme={DARK_THEME}
                                                countryCode={this.state.countryCode}
                                                withFilter={this.state.withFilter}
                                                withAlphaFilter={this.state.withAlphaFilter}

                                                withFlag={this.state.withFlag}
                                                withCountryNameButton={this.state.withCountryNameButton}

                                                onSelect={this.onSelect}

                                            />
                                        </View> */}
                                        <InputBox
                                            height={60}
                                            backgroundColor={colors.inputBox}
                                            width={(width - 60)}
                                            borderRadius={30}
                                            marginTop={0}
                                            placeholder="Email or Phone number"
                                            label="Email or Phone number"
                                            labelColor={colors.labelColor}
                                            placeholderColor={colors.placeHolderColor}

                                            inputTextColor={colors.inputTextColor}
                                            secureTextEntry={false}
                                            // keyboardType={'numeric'}
                                            editable={true}
                                            value={this.state.phone}
                                            maxLength={400}
                                            // iconName="callPng"
                                            onIconClick={() => { }}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    phone: text
                                                })
                                            }}
                                        ></InputBox>
                                    </View>
                                    <InputBox
                                        height={60}
                                        backgroundColor={colors.inputBox}
                                        width={(width - 60)}
                                        borderRadius={30}
                                        marginTop={20}
                                        placeholder="Enter Password"
                                        label="Enter Password"
                                        labelColor={colors.labelColor}
                                        placeholderColor={colors.placeHolderColor}

                                        inputTextColor={colors.inputTextColor}
                                        secureTextEntry={this.state.secureTextEntry}
                                        // keyboardType={'numeric'}
                                        editable={true}
                                        value={this.state.password}
                                        maxLength={400}
                                        onIconClick={() => {
                                            this.setState({
                                                secureTextEntry: !this.state.secureTextEntry
                                            })
                                        }}
                                        // iconName="eye"
                                        onChangeText={(text) => {
                                            this.setState({
                                                password: text
                                            })
                                        }}
                                    ></InputBox>
                                    {/* <View  style={{width:width}}>
                                        <View style={{alignSelf:'flex-end'}}>
                                        <ButtonWithoutShadow
                                                height={60}
                                                backgroundColor={colors.transparentBackground}
                                                width={200}
                                                borderRadius={8}
                                                marginTop={10}
                                                label="Forgot Password?"
                                                labelColor={colors.blueText}
                                                onAction={()=>{}}
                                                fontSize={15}
                                                fontFamily={Platform.OS=='ios'?fonts.regular:fonts.italic}
                                                fontStyle={Platform.OS=='ios'?'italic':null}
                                                fontWeight={Platform.OS=='ios'?'normal':null}
                                                
                                            ></ButtonWithoutShadow>
                                        </View>
                                    </View> */}


                                    <View style={{ width: width, alignItems: 'center' }}>
                                        <Button
                                            height={60}
                                            backgroundColor={colors.ornageButton}
                                            width={width - 130}
                                            borderRadius={8}
                                            marginTop={20}
                                            label="Login"
                                            labelColor={colors.inputBox}
                                            onAction={() => { this.onLogin() }}
                                            fontSize={17}
                                            fontFamily={Platform.OS == 'ios' ? fonts.regular : fonts.semiBold}

                                            fontStyle={Platform.OS == 'ios' ? 'normal' : null}
                                            fontWeight={Platform.OS == 'ios' ? '700' : null}
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
                                    <View style={styles.SocialLogin_Block_Container} >
                                        <TouchableOpacity onPress={() => this._onSignInWithSocial(this, 'facebook')} >
                                            {/* <TouchableOpacity onPress={() => this.fbLogin()} > */}
                                            <ImageBackground style={styles.fbImg} source={localImages.fb} >
                                                {/* <Text  >Facebook</Text> */}
                                            </ImageBackground>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.instagramLogin.show()} >
                                            <ImageBackground style={styles.instaImg} source={localImages.insta} >
                                                {/* <Text  >Instagram</Text> */}
                                            </ImageBackground>
                                        </TouchableOpacity>
                                        <InstagramLogin
                                            ref={ref => (this.instagramLogin = ref)}
                                            appId='236849821000726'
                                            appSecret='60e9018a0e4a4d15b4b9febb307e321f'
                                            redirectUrl='your-redirect-Url'
                                            scopes={['user_profile', 'user_media']}
                                            onLoginSuccess={this.setIgToken}
                                            onLoginFailure={(data) => console.log('instagram==>', data)}
                                        />

                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.textLine}>You don't have an account? </Text>
                                        <ButtonWithoutShadow
                                            height={60}
                                            backgroundColor={colors.transparentBackground}
                                            width={70}
                                            borderRadius={8}
                                            marginTop={20}
                                            label="Sign up"
                                            labelColor={colors.ornageButton}
                                            onAction={() => { this.props.navigation.navigate('SignupScreen') }}
                                            fontFamily={Platform.OS == 'ios' ? fonts.regular : fonts.semiBold}
                                            fontStyle={Platform.OS == 'ios' ? 'normal' : null}
                                            fontWeight={Platform.OS == 'ios' ? '700' : null}
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

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
        flex: 1,
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
    textLine: {
        marginTop: 20,
        color: colors.blueText,
        fontSize: 17,
        fontFamily: Platform.OS == 'ios' ? fonts.regular : fonts.regular,
        fontStyle: Platform.OS == 'ios' ? 'normal' : null,
        fontWeight: Platform.OS == 'ios' ? 'normal' : null
    },
   
    SocialLogin_Block_Container: {
        flexDirection: 'row', marginTop: IS_IPHONE_X ? 40 : 10, alignItems: 'center', justifyContent: 'center',alignContent:'center',width:width
    },
    fbImg: {
        width: width / 5.85, height: height / 10.50, alignItems: 'flex-end', justifyContent: 'flex-end',
    },
    instaImg: {
        width: width / 5.65, height: height / 10.50, alignItems: 'flex-end', justifyContent: 'flex-end'
    },
});