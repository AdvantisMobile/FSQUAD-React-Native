

// **************************************
// **************************************
// **************************************
// // Devloped by Manish Garkar 
//    Team :- tek4pro it solutions 
// // Mr Abhishek Gupta //
// **************************************
// **************************************
// **************************************


import React from 'react';
import { View, Text, TextInput, Button, ScrollView, Modal, ActivityIndicator, FlatList, TouchableHighlight, SafeAreaView, PermissionsAndroid, TouchableOpacity, StyleSheet, Image, Dimensions, StatusBar, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'
// import { SignUpStyles1, Images, color } from '../../styles/AppStyles';
import Moment from 'moment';
// import {RegisterStep1} from '../../redux/action/action_creater';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Value, color } from 'react-native-reanimated';
// import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { colors, fonts, localImages } from '../../utils/constant'
import SharedClass from '../../utils/SharedClass'
import InputBox from '../../component/InputBox'
import { register_api,matchOtp_api } from '../../api';
const width = Dimensions.get("window").width;
const height = Dimensions.get('window').height;
const colorYellow = 'red'
class SignUpScreen1 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.sharedClass = new SharedClass();
        this.state = {
            loginSignupVisible: false, dataMonth: ["Jan", "Feb", "Mar", "Apr"]
            , DatePickerVisible: false, date: '', month: '', day: '', year: '',
            AccType: 'Personal'
            , f_name: '',
            l_name: '',
            pass: '',
            cnfPass: '',
            user_id:'',
            social:false

        }
    }
    fnameValidate(f_name) {
        this.setState({ f_name: f_name })
        // this.state.f_nameStatus = this.validation(f_name).status;
        //  this.validation(f_name);
    }
    lnameValidation(l_name) {
        this.setState({ l_name: l_name })
        // this.state.f_nameStatus = this.validation(f_name).status;
        // this.lastValidation(l_name);
    }
    passwordValidation(pass) {
        this.setState({ pass: pass })
        // this.state.f_nameStatus = this.validation(f_name).status;
        // this.validatePassword(pass);
    }
    confpassValidation(cnfPass) {
        this.setState({ cnfPass: cnfPass })
        // this.state.f_nameStatus = this.validation(f_name).status;
        // this.confvalidatePassword(cnfPass);
    }
    // lnameValidate(userName) {
    //     this.setState({ userName: userName })
    //     this.state.userStatus = this.validation(userName).status;
    //     this.state.userErrorMessage = this.validation(userName).error;
    // }
    confvalidatePassword(cnfPass) {

        // var passwordRegex = /^ (?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        // var passwordRegex = /^([a-zA-Z0-9@*#]{6,15})$/ ;

        // if (pass == "" || pass == undefined || pass == null) {
        //     return { status: false, error: "*please enter the password." }
        // } 

        if (cnfPass.length == 1 | cnfPass.length > 15) {
            if (cnfPass.length < 6 || cnfPass.length > 15) {
                return alert('Password should be between 6 to 15 characters')
            }
        }
    }
    validatePassword(pass) {

        // var passwordRegex = /^ (?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        // var passwordRegex = /^([a-zA-Z0-9@*#]{6,15})$/ ;

        // if (pass == "" || pass == undefined || pass == null) {
        //     return { status: false, error: "*please enter the password." }
        // } 
        if (pass.length == 1 || pass.length > 15) {
            if (pass.length < 6 || pass.length > 15) {
                return alert('Password should be between 6 to 15 characters')
            }
        }


    }
    validation(f_name) {
        var nameregex = /^[a-zA-Z ]+$/
        if (!nameregex.test(f_name)) {
            return alert('Please Enter Alpbhabets');
        }
        else {
            return { f_nameStatus: true, error: '', valid: true };
        }
    }
    lastValidation(l_name) {
        var nameregex = /^[a-zA-Z ]+$/
        if (!nameregex.test(l_name)) {
            return alert('Please Enter Alpbhabets');
        }
        else {
            return { f_nameStatus: true, error: '', valid: true };
        }
    }

    componentDidMount() {
        const { navigation,route } = this.props;
        console.log(navigation,route.params)
        var today = new Date();
        var  date=today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
        this.setState({
            month : Moment(today).format('MMM'),
            day:Moment(today).format('DD'),
            year:Moment(today).format('YYYY'),
            user_id:route.params.user_id,
            f_name:route.params.userData && route.params.userData.firstName?route.params.userData.firstName:'',
            l_name:route.params.userData && route.params.userData.lastName?route.params.userData.lastName:'',
            social:route.params.social?true:false,
            pass:route.params.social?'12345678':'',
            cnfPass:route.params.social?'12345678':''
        })
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.Reg_Flag1 == "Y") {
            nextProps.navigation.navigate("SignUp2")
        }

    }
    findDateMonthYear(dataMonth) {
        this.setState({
            month: Moment(dataMonth).format('MMM'),
            day: Moment(dataMonth).format('DD'),
            year: Moment(dataMonth).format('YYYY')
        })
    }
    SelectUser(d) {
        this.setState({ AccType: d })
    }
    GotoStep1=async()=> {
        var nameregex = /^[a-zA-Z ]+$/
        let message = {}
        if (!this.state.f_name) {
            message.message = 'Please Enter First Name'
            message.type = 'info'
            this.sharedClass.ShowSnakBar(message)
            return
        }
        else if (!nameregex.test(this.state.f_name)) {
            message.message = 'First Name Must be Alpbhabets'
            message.type = 'info'
            this.sharedClass.ShowSnakBar(message)
            return
            //return alert('Please Enter Alpbhabets');
        }
        if (!this.state.l_name) {
            message.message = 'Please Enter Last Name'
            message.type = 'info'
            this.sharedClass.ShowSnakBar(message)
            return
        }
        else if (!nameregex.test(this.state.l_name)) {
            message.message = 'Last Name Must be Alpbhabets'
            message.type = 'info'
            this.sharedClass.ShowSnakBar(message)
            return
            //return alert('Please Enter Alpbhabets');
        }
        else if (this.state.pass.length < 6 || this.state.pass.length > 15) {

            message.message = 'Password should be between 6 to 15 characters'
            message.type = 'info'
            this.sharedClass.ShowSnakBar(message)
            return
            // return alert('Password should be between 6 to 15 characters')
        }
        else if (this.state.pass != this.state.cnfPass) {

            message.message = 'Password and confirm password must be same'
            message.type = 'info'
            this.sharedClass.ShowSnakBar(message)
            return
            // return alert('Password should be between 6 to 15 characters')
        }
     let data
        if (this.state.AccType == "Professional") {
             data = JSON.stringify({
                "user_id": this.state.user_id,
                "mode": "S1",
                "first_name": this.state.f_name,
                "last_name": this.state.l_name,
                "password": this.state.pass,
                "confirm_password": this.state.cnfPass,
                "dob": this.state.day + "-" + this.state.month + "-" + this.state.year,
                "account_type": "PRO"
            })
            // this.state.RegisterStep1(data);
        }
        else {
             data = JSON.stringify({
                "user_id": this.state.user_id,
                "mode": "S1",
                "first_name": this.state.f_name,
                "last_name": this.state.l_name,
                "password": this.state.pass,
                "confirm_password": this.state.cnfPass,
                "dob": this.state.day + "-" + this.state.month + "-" + this.state.year,
                "account_type": "PER"
            })
            // this.props.RegisterStep1(data);
        }
        try {
            const result = await register_api(data);
            console.log(result)
            // this.setState({
            //   loader: false
            // })
            if (result.status == "SUCCESS") {
               this.props.navigation.navigate('SignUpScreen2',{user:result.result})
              // this.GotoStep0()
          }else{
            //   message.message = 'Please enter correct otp'
            //   message.type = 'error'
            //   this.sharedClass.ShowSnakBar(message)
            //   return
          }
          } catch (error) {
              console.log(error)
            //   this.setState({
            //       loader: false
            //     })
          //   console.log("ERROR IN OFFER FETCH API", error);
          }
    }

    render() {
        console.log("name", this.props.Reg_Flag1)
        return (
            <SafeAreaView style={{backgroundColor:'black',alignItems:'center',justifyContent:'center'}}>
                <View style={{backgroundColor:'black',height:'100%'}}>
                    <ScrollView>
                        {/* <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{flexDirection:'row'}} >
                            <Image style={{height:25, width:25}} source={localImages.backylw} />
                            <Text style={[SignUpStyles1.dobStyle,{marginTop:0}]} >Back</Text>
                        </TouchableOpacity> */}


                        <View style={ { flexDirection: 'row', width: width, marginTop: 20 , marginLeft:20}} >

                            <InputBox
                                height={60}
                                backgroundColor={colors.inputBox}
                                width={(width - 50) / 2}
                                borderRadius={30}
                                marginTop={0}
                                placeholder="First Name"
                                label="First Name"
                                labelColor={colors.labelColor}
                                placeholderColor={colors.placeHolderColor}

                                inputTextColor={colors.inputTextColor}
                                secureTextEntry={false}
                                // keyboardType={'numeric'}
                                editable={true}
                                value={this.state.f_name}
                                maxLength={400}
                                // iconName="callPng"
                                onIconClick={() => { }}
                                onChangeText={(text) => {
                                    this.fnameValidate(text)
                                }}
                            ></InputBox>
                            <View style={{ marginLeft: 10 }}></View>
                            <InputBox
                                height={60}
                                backgroundColor={colors.inputBox}
                                width={(width - 50) / 2}
                                borderRadius={30}
                                marginTop={0}
                                placeholder="Last Name"
                                label="Last Name"
                                labelColor={colors.labelColor}
                                placeholderColor={colors.placeHolderColor}

                                inputTextColor={colors.inputTextColor}
                                secureTextEntry={false}
                                // keyboardType={'numeric'}
                                editable={true}
                                value={this.state.l_name}
                                maxLength={400}
                                // iconName="callPng"
                                onIconClick={() => { }}
                                onChangeText={(text) => {
                                    this.lnameValidation(text)
                                }}
                            ></InputBox>


                        </View>

                   {! this.state.social ?   <View style={{ alignItems: 'center' }}>

                            <InputBox
                                height={60}
                                backgroundColor={colors.inputBox}
                                width={width - 40}
                                borderRadius={30}
                                marginTop={20}
                                placeholder="Password"
                                label="Password"
                                labelColor={colors.labelColor}
                                placeholderColor={colors.placeHolderColor}

                                inputTextColor={colors.inputTextColor}
                                secureTextEntry={true}
                                // keyboardType={'numeric'}
                                editable={true}
                                value={this.state.pass}
                                maxLength={400}
                                // iconName="callPng"
                                onIconClick={() => { }}
                                onChangeText={(text) => {
                                    this.passwordValidation(text)
                                }}
                            ></InputBox>
                            <InputBox
                                height={60}
                                backgroundColor={colors.inputBox}
                                width={width - 40}
                                borderRadius={30}
                                marginTop={20}
                                placeholder="Confirm Password"
                                label="Confirm Password"
                                labelColor={colors.labelColor}
                                placeholderColor={colors.placeHolderColor}

                                inputTextColor={colors.inputTextColor}
                                secureTextEntry={true}
                                // keyboardType={'numeric'}
                                editable={true}
                                value={this.state.cnfPass}
                                maxLength={400}
                                // iconName="callPng"
                                onIconClick={() => { }}
                                onChangeText={(text) => {
                                    this.confpassValidation(text)
                                }}
                            ></InputBox>

                        </View>:null}
                        <Text style={SignUpStyles1.dobStyle} >Date of Birth</Text>

                        <View style={{ flexDirection: 'row',  marginLeft:20 }} >
                            <TouchableOpacity onPress={() => this.datePickerRef.onPressDate()} style={[SignUpStyles1.card,{justifyContent:'center', alignItems:'center', height:50, width:(width-60)/3}]} >
                                <Text style={SignUpStyles1.textLine} >{this.state.month}</Text>
                                
                            </TouchableOpacity>
                            <View style={{marginLeft:10}}></View>

                            <TouchableOpacity onPress={() => this.datePickerRef.onPressDate()} style={[SignUpStyles1.card,{justifyContent:'center', alignItems:'center', height:50, width:(width-60)/3}]} >
                                <Text style={SignUpStyles1.textLine} >{this.state.day}</Text>
                            </TouchableOpacity>
                            <View style={{marginLeft:10}}></View>
                            <TouchableOpacity onPress={() => this.datePickerRef.onPressDate()} style={[SignUpStyles1.card,{justifyContent:'center', alignItems:'center', height:50, width:(width-60)/3}]} >
                                <Text style={SignUpStyles1.textLine} >{this.state.year}</Text>
                            </TouchableOpacity>


                        </View>



                        <View style={SignUpStyles1.accType} >
                            <Text style={SignUpStyles1.dobStyle} >Account Type</Text>

                            <View style={{ alignItems: 'center', marginTop: 18 }} >

                                <View style={{ borderTopColor: '#ccc', borderTopWidth: 1, borderBottomColor: '#ccc', borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center', width: width / 3 + 20, height: height / 16 }} >
                                    <Text style={{ color: colors.yellow, fontSize: 22 }} >{this.state.AccType}</Text>
                                </View>
                                <ScrollView>
                                    <Text onPress={() => {
                                        this.state.AccType == "Professional" ?
                                            this.SelectUser("Personal") : this.SelectUser("Professional")
                                    }} style={{ color: '#888', fontSize: 16 }} >{
                                            this.state.AccType == "Professional" ? "Personal" : "Professional"}</Text>
                                </ScrollView>
                            </View>

                        </View>

                        <TouchableOpacity onPress={() => { this.GotoStep1() }} style={{ width: 50, height: 50, margin: 25, alignSelf: 'flex-end', backgroundColor: colors.yellow, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }} >
                            <Image style={{ width: 30, height: 30 }} source={localImages.arrow_right_white} />
                        </TouchableOpacity>






                        <DatePicker
                            date={this.state.date}
                            ref={(ref) => this.datePickerRef = ref}
                            mode="date"
                            placeholder=" date"
                            format="YYYY-MM-DD"
                            minDate="1960-01-01"
                            maxDate="2020-05-01"
                            showIcon={false}
                            hideText={true}
                            confirmBtnText="Confirm"
                            disabled={false}
                            cancelBtnText="Cancel"
                            style={{backgroundColor:'black',color:'black'}}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                // datePicker: {
                                //     color: 'black',
                                //     //ios_backgroundColor: 'white',
                                //     backgroundColor: 'black',
                                //   },
                                //   datePickerCon: {
                                //     color: 'white',
                                //     ios_backgroundColor: 'white',
                                //     backgroundColor: 'white',
                                //   },
                                dateInput: {
                                    marginLeft: 36
                                },
                               

                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ date: date }), this.findDateMonthYear(date) }}
                        />

                        <AwesomeAlert
                            show={this.props.isLoading}
                            showProgress={true}
                        />

                    </ScrollView>
                </View>

            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => ({
    // isLoading:state.auth.isLoading,
    // user_email:state.auth.user_email,
    // user_id:state.auth.user_id,
    // user_fname:state.auth.user_fname,
    // user_acc_type:state.auth.user_acc_type,
    // Reg_Flag1:state.auth.Reg_Flag1
});
const mapDispatchToProps = {
    // RegisterStep1
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen1);
const SignUpStyles1 = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    nameStyle: {
        width: (width - 60) / 2,
        height: 50
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
        backgroundColor: colors.white,
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
    dobStyle: {
        color: colors.yellow, fontSize: 15, fontWeight: 'bold', width: width - 50, alignSelf: 'center', marginVertical: 20
    },
    textLine: {
       // marginTop: 20,
        color: colors.blueText,
        fontSize: 17,
        fontFamily: Platform.OS == 'ios' ? fonts.regular : fonts.regular,
        fontStyle: Platform.OS == 'ios' ? 'normal' : null,
        fontWeight: Platform.OS == 'ios' ? 'normal' : null
    }
});