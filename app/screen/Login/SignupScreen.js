import React, { useState, useEffect, Component } from 'react'
import { TouchableOpacity,KeyboardAvoidingView, TextInput,ScrollView, StatusBar,ImageBackground, Image, View, Text, StyleSheet, SafeAreaView, Dimensions, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { actions } from "../../reduxActionAndReducer/reducer";
import { colors, fonts, localImages } from '../../utils/constant'
import SharedClass from '../../utils/SharedClass'
import InputBox from '../../component/InputBox'
import AppIntroSlider from 'react-native-app-intro-slider';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
import Button, { ButtonWithoutShadow } from '../../component/Button'
import { API_BASE_URL, put_like_api, get_post_home_api,send_friend_req_api,otp_api } from '../../api';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp,  
  } from 'react-native-responsive-screen';
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
            email: '', token: '', os: ''
            , text: '',

            countryCodeModal: false,
            countryCode: '',
            handleModal: false,
            handleModal1: false,

            ischeked: false,
            ischeked1: false,

            modalVisible: false,
            selectedCode: "+91",
            errorStatus: false,

            phoneNo: "",
            phoneNoBorderColor: 0,
            phoneNoStatus: false,
            phoneNoErrorMessage: '',

            phoneNo: '',
            phoneNo_status: false,
            isLoading: false,

            countryCode: 'IN',
            callingCode: '+91',
            withCountryNameButton: false,
            withFlag: true,
            withEmoji: false,
            withFilter: true,
            withAlphaFilter: false,
            withCallingCode: false
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
    if (!this.state.phoneNo && !this.state.email) {
        message.message = 'Please Phone number or email id'
        message.type = 'info'
        this.sharedClass.ShowSnakBar(message)
        return

    }
    if (this.state.phoneNo_status == true) {

        var phonedata = JSON.stringify({
            "username": this.state.callingCode + this.state.phoneNo,
            "token": this.state.token,
            "countryCode": this.state.callingCode,
            "loginData": this.state.phoneNo

        })


    }
    else {
        var phonedata = JSON.stringify({
            "username": this.state.email,
            "token": this.state.token,
            "loginData": this.state.email

        })
    }

    //setLoader(true)
    //console.log(loder)
 this.setState({
    loader:true
 })
 
    console.log("token in home page ", phonedata)
    try {
      const result = await otp_api(phonedata);
      console.log(result)
      this.setState({
        loader: false
      })
      if (result.status == "SUCCESS") {
        this.props.navigation.navigate('OtpScreen', { phonedata:phonedata })

        // this.props.setLoggedInUserDetails(result.result)
        // this.props.setLoggedInUserAuthToken(result.result.user_token)
        // this.props.setLoggedInUserStatus('home')
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

   

  getMobileno(phoneNo) {
    this.setState({ phoneNo: phoneNo, phoneNoBorderColor: 1, phoneNo_status: true });
    if (this.state.phoneNo.length > 10) {
        alert('Please enter valid phone number')
    }
}
renderContent = ()=>{
    return (
      <View style={styles.body,{backgroundColor:'#223244',height:'100%',width:'100%'}}>

            <KeyboardAwareScrollView
                            style={{ flexGrow: 1,top:-10,bottom:90}}
                            contentContainerStyle={styles.scrollview}
                           
                        >
                            <View style={[{ alignItems: 'center' }]}>
                                <View style={{ alignItems: 'center', marginBottom: 20,top:30 }}>
                                    {/* <View style={[{ backgroundColor:'#223244', width:width,height:250, justifyContent:'center', alignItems:'center', marginBottom:30}]}> */}
                                        {/* <Image source={localImages.logoTitle} resizeMode="contain" style={{ height: '50%', width:width - 90 }} /> */}
                                        {/* <Text style={[styles.robotoRegularText, { marginLeft: 20, fontSize: 19, color: colors.blubutton }]}>Money Parenting Made Zimble</Text> */}
                                    {/* </View> */}
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
                                   
                                        <TextInput autoCompleteType="off" onChangeText={(text) => this.setState({ email: text })}
                                        style={{ width: width - 70,color:colors.white,fontWeight:'500',fontSize:18, borderWidth: 2, borderColor:colors.blue, padding:20, borderRadius:15}}
                                        keyboardType = 'email-address'
                                        value={this.state.email}  placeholder="E-mail" placeholderStyle={{ fontSize: 14, color:colors.yellow }} 
                                        editable = {this.state.phoneNo =='' ? true : false} placeholderTextColor = {colors.light_gray}
                                        value={this.state.email}
                                        onChangeText={(text) => {
                                            this.setState({
                                                email: text
                                            })
                                        }}

                                        />
                                        {/* <InputBox
                                            height={60}
                                            backgroundColor={colors.inputBox}
                                            width={(width - 60)}
                                            borderRadius={30}
                                            marginTop={0}
                                            placeholder="Enter your email id"
                                            label="Enter your email id"
                                            labelColor={colors.labelColor}
                                            placeholderColor={colors.placeHolderColor}
                                            editable = {this.state.phoneNo =='' ? true : false}
                                            inputTextColor={colors.inputTextColor}
                                            secureTextEntry={false}
                                            keyboardType = 'email-address'
                                            value={this.state.email}
                                            maxLength={400}
                                            // iconName="callPng"
                                            onIconClick={()=>{}}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    email: text
                                                })
                                            }}
                                        ></InputBox> */}
                                    </View>
                                    <Text style={{color:colors.light_gray}}>OR </Text>
                                    <View style={{ flexDirection: 'row',marginTop:10 }}>
                                        <View style={[styles.inputBoxStyle, { backgroundColor: colors.inputBox, height: 60, width: 60, marginRight: 10, justifyContent: 'center', alignItems: 'center' }]}>
                                            <CountryPicker countryCode={'SG'} theme={DARK_THEME}
                                                countryCode={this.state.countryCode}
                                                withFilter={this.state.withFilter}
                                                withAlphaFilter={this.state.withAlphaFilter}

                                                withFlag={this.state.withFlag}
                                                withCountryNameButton={this.state.withCountryNameButton}

                                                onSelect={this.onSelect}

                                            />
                                        </View>

                                        <TextInput autoCompleteType="off" onChangeText={(text) => this.setState({ email: text })}
                                        style={{ width: width - 150,color:colors.white,fontWeight:'500',fontSize:18, borderWidth: 2, borderColor:colors.blue, padding:20, borderRadius:15}}
                                        keyboardType = 'phone-pad'
                                        value={this.state.phoneNo} placeholder="Phone Number" placeholderStyle={{ fontSize: 14, color:colors.light_gray }} 
                                        editable = {this.state.email =='' ? true : false} placeholderTextColor = {colors.light_gray}
                                        onChangeText={(text) => {
                                            this.getMobileno(text)
                                        }}

                                        />
                                        {/* <InputBox
                                            height={60}
                                            type= ''
                                            backgroundColor={colors.inputBox}
                                            width={(width - 130)}
                                            borderRadius={30}
                                            marginTop={0}
                                            keyboardType = "phone-pad"
                                            placeholder="Phone Number"
                                            label="Phone Number"
                                            labelColor={colors.labelColor}
                                            placeholderColor={colors.placeHolderColor}
                                            editable = {this.state.email =='' ? true : false}
                                            inputTextColor={colors.inputTextColor}
                                            secureTextEntry={false}
                                            // keyboardType={'numeric'}
                                            //editable={true}
                                            value={this.state.phoneNo}
                                            maxLength={400}
                                            // iconName="callPng"
                                            onIconClick={()=>{}}
                                            onChangeText={(text) => {
                                                this.getMobileno(text)
                                            }}
                                        ></InputBox> */}
                                    </View>
                                    

                                    <View style={{ width: width, alignItems:'center' }}>
                                        <Button
                                            height={30}
                                            backgroundColor={colors.ornageButton}
                                            width={width - 230}
                                            borderRadius={8}
                                            marginTop={20}
                                            label="Signup"
                                            labelColor={colors.inputBox}
                                            onAction={()=>{this.onLogin()}}
                                            fontSize={17}
                                            fontFamily={Platform.OS=='ios'?fonts.regular:fonts.semiBold}
                                            
                                            fontStyle={Platform.OS=='ios'?'normal':null}
                                            fontWeight={Platform.OS=='ios'?'700':null}
                                        ></Button>
                                       
                                    </View>
                                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                        <Text style={styles.textLine}>Already have an account? </Text>
                                        <ButtonWithoutShadow
                                            height={60}
                                            backgroundColor={colors.transparentBackground}
                                            width={70}
                                            borderRadius={8}
                                            marginTop={20}
                                            label="Login"
                                            labelColor={colors.ornageButton}
                                            onAction={()=>{this.props.navigation.navigate('LoginScreen')}}
                                            fontFamily={Platform.OS=='ios'?fonts.regular:fonts.semiBold}
                                            fontStyle={Platform.OS=='ios'?'normal':null}
                                            fontWeight={Platform.OS=='ios'?'700':null}
                                            fontSize={17}
                                        ></ButtonWithoutShadow>
                                    </View>


                                </View>
                            </View>

                        </KeyboardAwareScrollView>
        
      </View>
    );
  };
    render() {
        //alert()
        const scrollEnabled = Platform.OS=='ios'?true: this.state.screenHeight > height;
        return (

            <View  style={{backgroundColor:'#223244',top:0,width:'100%',height:'100%'}}>
          
            <KeyboardAvoidingView behavior={isIOS ? 'padding':'height'}  style={{flex:1,backgroundColor:'#223244'}}>

                        <KeyboardAwareScrollView
                            style={{ flex: 1,top: IS_IPHONE_X ? hp('13') : hp('7'),width:'100%',height:'100%'}}
                            //contentContainerStyle={styles.scrollview}
                            showsVerticalScrollIndicator={false}

                        >
       <ImageBackground source ={localImages.logoTitle} style ={{top: hp('-2') ,width :width/1.5,height:width/1.5,alignSelf:'center',zIndex:20}} resizeMode ='contain'/>

                                <View style={{ alignItems: 'center',justifyContent:'space-between'}}>
                                   
                                    <View style={{ flexDirection: 'row' }}>
                                       
                                        <TextInput autoCompleteType="off" onChangeText={(text) => this.setState({ email: text })}
                                        style={{ height:hp('8'), width: width - 70,color:colors.white,fontWeight:'500',fontSize:18, borderWidth: 2, borderColor:colors.blue, padding:hp('1'), borderRadius:15}}
                                        keyboardType = 'email-address'
                                        value={this.state.email} placeholder="E-mail" placeholderStyle={{ fontSize: 14 }} 
                                        editable = {this.state.phoneNo =='' ? true : false} placeholderTextColor = {colors.light_gray}
                                        value={this.state.email}
                                        onChangeText={(text) => {
                                            this.setState({
                                                email: text
                                            })
                                        }}

                                        />
                                        {/* <InputBox
                                            height={60}
                                            backgroundColor={colors.inputBox}
                                            width={(width - 60)}
                                            borderRadius={30}
                                            marginTop={0}
                                            placeholder="Enter your email id"
                                            label="Enter your email id"
                                            labelColor={colors.labelColor}
                                            placeholderColor={colors.placeHolderColor}
                                            editable = {this.state.phoneNo =='' ? true : false}
                                            inputTextColor={colors.inputTextColor}
                                            secureTextEntry={false}
                                            keyboardType = 'email-address'
                                            value={this.state.email}
                                            maxLength={400}
                                            // iconName="callPng"
                                            onIconClick={()=>{}}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    email: text
                                                })
                                            }}
                                        ></InputBox> */}
                                    </View>
                                    <Text style={{color:colors.yellow,fontWeight:'600',marginTop:hp('3')}}> OR </Text>
                                    <View style={{ flexDirection: 'row',marginTop:10 }}>
                                    <View style={[styles.inputBoxStyle, { backgroundColor: 'transparent',marginTop:hp('1'), height:hp('6') , width:hp('6') , marginRight: 6, justifyContent: 'center', alignItems: 'center' }]}>
                                            <CountryPicker countryCode={'SG'} theme={DARK_THEME}
                                                countryCode={this.state.countryCode}
                                                withFilter={this.state.withFilter}
                                                withAlphaFilter={this.state.withAlphaFilter}

                                                withFlag={this.state.withFlag}
                                                withCountryNameButton={this.state.withCountryNameButton}
                                                style = {{top:hp('3'),marginTo:hp('3')}}
                                                onSelect={this.onSelect}

                                            />
                                    </View>

                                        <TextInput autoCompleteType="off" onChangeText={(text) => this.setState({ email: text })}
                                        style={{ height : hp('8'),width: width - 110,color:colors.white,fontWeight:'500',fontSize:18,marginRight:wp('3'), borderWidth: 2, borderColor:colors.blue, padding:hp('1'), borderRadius:15}}
                                        keyboardType = 'phone-pad'
                                        value={this.state.phoneNo}  placeholder="Phone Number" placeholderStyle={{ fontSize: 14, color:colors.light_gray }} 
                                        editable = {this.state.email =='' ? true : false} placeholderTextColor = {colors.light_gray}
                                        onChangeText={(text) => {
                                            this.getMobileno(text)
                                        }}

                                        />
                                        {/* <InputBox
                                            height={60}
                                            type= ''
                                            backgroundColor={colors.inputBox}
                                            width={(width - 130)}
                                            borderRadius={30}
                                            marginTop={0}
                                            keyboardType = "phone-pad"
                                            placeholder="Phone Number"
                                            label="Phone Number"
                                            labelColor={colors.labelColor}
                                            placeholderColor={colors.placeHolderColor}
                                            editable = {this.state.email =='' ? true : false}
                                            inputTextColor={colors.inputTextColor}
                                            secureTextEntry={false}
                                            // keyboardType={'numeric'}
                                            //editable={true}
                                            value={this.state.phoneNo}
                                            maxLength={400}
                                            // iconName="callPng"
                                            onIconClick={()=>{}}
                                            onChangeText={(text) => {
                                                this.getMobileno(text)
                                            }}
                                        ></InputBox> */}
                                    </View>
                                    

                                    <View style={{ width: width, alignItems:'center' }}>
                                        <Button
                                            height={30}
                                            backgroundColor={colors.ornageButton}
                                            width={width - 230}
                                            borderRadius={8}
                                            marginTop={20}
                                            label="Signup"
                                            labelColor={colors.inputBox}
                                            onAction={()=>{this.onLogin()}}
                                            fontSize={17}
                                            fontFamily={Platform.OS=='ios'?fonts.regular:fonts.semiBold}
                                            
                                            fontStyle={Platform.OS=='ios'?'normal':null}
                                            fontWeight={Platform.OS=='ios'?'700':null}
                                        ></Button>
                                       
                                    </View>
                                    <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center',marginTop:hp('2'),marginBottom:0}}>
                                        <Text style={styles.textLine,{color:colors.yellow,alignSelf:'center',marginTop:hp('3')}}>Already have an account? </Text>
                                        <ButtonWithoutShadow
                                            height={hp('4')}
                                            backgroundColor={colors.blue}
                                            width={wp('17')}
                                            borderRadius={8}
                                            marginTop={20}
                                            label="Login"
                                            labelColor={colors.white}
                                            onAction={()=>{this.props.navigation.navigate('LoginScreen')}}
                                            fontFamily={Platform.OS=='ios'?fonts.regular:fonts.semiBold}
                                            fontStyle={Platform.OS=='ios'?'normal':null}
                                            fontWeight={Platform.OS=='ios'?'700':null}
                                            fontSize={17}
                                        ></ButtonWithoutShadow>
                                    </View>


                                </View>

                        </KeyboardAwareScrollView>

                    </KeyboardAvoidingView>
            </View>
        )
        return (

            <View  style={{flex:1,backgroundColor:'#223244',bottom:-150,top:0,width:'100%',height:'100%'}}>
                        <KeyboardAwareScrollView
                            style={{ flexGrow: 1,top:-10,bottom:90}}
                            contentContainerStyle={styles.scrollview}
                           
                        >
                            <View style={[{ alignItems: 'center' }]}>
                                <View style={{ alignItems: 'center', marginBottom: 20,top:30 }}>
                                    {/* <View style={[{ backgroundColor:'#223244', width:width,height:250, justifyContent:'center', alignItems:'center', marginBottom:30}]}> */}
                                        {/* <Image source={localImages.logoTitle} resizeMode="contain" style={{ height: '50%', width:width - 90 }} /> */}
                                        {/* <Text style={[styles.robotoRegularText, { marginLeft: 20, fontSize: 19, color: colors.blubutton }]}>Money Parenting Made Zimble</Text> */}
                                    {/* </View> */}
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
                                   
                                        <TextInput autoCompleteType="off" onChangeText={(text) => this.setState({ email: text })}
                                        style={{ width: width - 70,color:colors.white,fontWeight:'500',fontSize:18, borderWidth: 2, borderColor:colors.blue, padding:20, borderRadius:15}}
                                        keyboardType = 'email-address'
                                        value={this.state.email} underlineColorAndroid={colors.yellow} placeholder="E-mail" placeholderStyle={{ fontSize: 14, color:colors.yellow }} 
                                        editable = {this.state.phoneNo =='' ? true : false} placeholderTextColor = {colors.light_gray}
                                        value={this.state.email}
                                        onChangeText={(text) => {
                                            this.setState({
                                                email: text
                                            })
                                        }}

                                        />
                                        {/* <InputBox
                                            height={60}
                                            backgroundColor={colors.inputBox}
                                            width={(width - 60)}
                                            borderRadius={30}
                                            marginTop={0}
                                            placeholder="Enter your email id"
                                            label="Enter your email id"
                                            labelColor={colors.labelColor}
                                            placeholderColor={colors.placeHolderColor}
                                            editable = {this.state.phoneNo =='' ? true : false}
                                            inputTextColor={colors.inputTextColor}
                                            secureTextEntry={false}
                                            keyboardType = 'email-address'
                                            value={this.state.email}
                                            maxLength={400}
                                            // iconName="callPng"
                                            onIconClick={()=>{}}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    email: text
                                                })
                                            }}
                                        ></InputBox> */}
                                    </View>
                                    <Text style={{color:colors.light_gray}}>OR </Text>
                                    <View style={{ flexDirection: 'row',marginTop:10 }}>
                                        <View style={[styles.inputBoxStyle, { backgroundColor: colors.inputBox, height: 60, width: 60, marginRight: 10, justifyContent: 'center', alignItems: 'center' }]}>
                                            <CountryPicker countryCode={'SG'} theme={DARK_THEME}
                                                countryCode={this.state.countryCode}
                                                withFilter={this.state.withFilter}
                                                withAlphaFilter={this.state.withAlphaFilter}

                                                withFlag={this.state.withFlag}
                                                withCountryNameButton={this.state.withCountryNameButton}

                                                onSelect={this.onSelect}

                                            />
                                        </View>

                                        <TextInput autoCompleteType="off" onChangeText={(text) => this.setState({ email: text })}
                                        style={{ width: width - 150,color:colors.white,fontWeight:'500',fontSize:18, borderWidth: 2, borderColor:colors.blue, padding:20, borderRadius:15}}
                                        keyboardType = 'phone-pad'
                                        value={this.state.phoneNo} underlineColorAndroid={colors.yellow} placeholder="Phone Number" placeholderStyle={{ fontSize: 14, color:colors.light_gray }} 
                                        editable = {this.state.email =='' ? true : false} placeholderTextColor = {colors.light_gray}
                                        onChangeText={(text) => {
                                            this.getMobileno(text)
                                        }}

                                        />
                                        {/* <InputBox
                                            height={60}
                                            type= ''
                                            backgroundColor={colors.inputBox}
                                            width={(width - 130)}
                                            borderRadius={30}
                                            marginTop={0}
                                            keyboardType = "phone-pad"
                                            placeholder="Phone Number"
                                            label="Phone Number"
                                            labelColor={colors.labelColor}
                                            placeholderColor={colors.placeHolderColor}
                                            editable = {this.state.email =='' ? true : false}
                                            inputTextColor={colors.inputTextColor}
                                            secureTextEntry={false}
                                            // keyboardType={'numeric'}
                                            //editable={true}
                                            value={this.state.phoneNo}
                                            maxLength={400}
                                            // iconName="callPng"
                                            onIconClick={()=>{}}
                                            onChangeText={(text) => {
                                                this.getMobileno(text)
                                            }}
                                        ></InputBox> */}
                                    </View>
                                    

                                    <View style={{ width: width, alignItems:'center' }}>
                                        <Button
                                            height={30}
                                            backgroundColor={colors.ornageButton}
                                            width={width - 230}
                                            borderRadius={8}
                                            marginTop={20}
                                            label="Signup"
                                            labelColor={colors.inputBox}
                                            onAction={()=>{this.onLogin()}}
                                            fontSize={17}
                                            fontFamily={Platform.OS=='ios'?fonts.regular:fonts.semiBold}
                                            
                                            fontStyle={Platform.OS=='ios'?'normal':null}
                                            fontWeight={Platform.OS=='ios'?'700':null}
                                        ></Button>
                                       
                                    </View>
                                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                        <Text style={styles.textLine}>Already have an account? </Text>
                                        <ButtonWithoutShadow
                                            height={60}
                                            backgroundColor={colors.transparentBackground}
                                            width={70}
                                            borderRadius={8}
                                            marginTop={20}
                                            label="Login"
                                            labelColor={colors.ornageButton}
                                            onAction={()=>{this.props.navigation.navigate('LoginScreen')}}
                                            fontFamily={Platform.OS=='ios'?fonts.regular:fonts.semiBold}
                                            fontStyle={Platform.OS=='ios'?'normal':null}
                                            fontWeight={Platform.OS=='ios'?'700':null}
                                            fontSize={17}
                                        ></ButtonWithoutShadow>
                                    </View>


                                </View>
                            </View>

                        </KeyboardAwareScrollView>

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
    contentContainer: {
        flexGrow: 1,
        backgroundColor:'black'
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