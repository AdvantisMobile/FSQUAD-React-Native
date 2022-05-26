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
//import SwitchBar from '../../assets/component/SwitchBar';
import SwitchBar from '../../component/SwitchBar'
import { colors, fonts, localImages } from '../../utils/constant'
// import { RegisterStep2 } from '../../redux/action/action_creater';
import AwesomeAlert from 'react-native-awesome-alerts';
import { register_api,matchOtp_api } from '../../api';
import { actions } from "../../reduxActionAndReducer/reducer";
const colorYellow = "#FDBA12";
const width = Dimensions.get("window").width;
const height = Dimensions.get('window').height;
class SignUpScreen2 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            switchbarVisible: false,
            nickName: this.props.user_name?this.props.user_name:'dsdshdshsd', nickName_Rename: false,
            name_editable: false,
            user:''

        }
    }
    componentDidMount() {
        const { navigation,route } = this.props;
        console.log(navigation,route.params)
        this.setState({
            user:route.params.user,
            nickName:route.params.user.name
        })
        console.log("_data_in_SignUP_page_2", this.props)
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user_acc_type == "PER" && nextProps.user_registration_complete == "Y") {
            nextProps.navigation.navigate("DrawerStack")

        }
        else if (nextProps.user_acc_type == "PRO" && nextProps.user_registration_complete == "N") {
            nextProps.navigation.replace("SignUp3")
        }
    }


    GotoStep2= async()=> {

        const data = JSON.stringify({
            "is_post_private": this.state.switchbarVisible ? "Y" : "N",
            "nickname": this.state.nickName,
            "user_id": this.state.user.id,
            "mode": "S2"
        })
        try {
            const result = await register_api(data);
            console.log(result)
            // this.setState({
            //   loader: false
            // })
            if (result.status == "SUCCESS") {
           

            if(this.state.user.account_type=='PER'){
                this.props.setLoggedInUserDetails(result.result)
                this.props.setLoggedInUserAuthToken(result.result.user_token)
                this.props.setLoggedInUserStatus('home')
            }else{
                this.props.navigation.navigate('SignUpScreen3',{user:result.result})
            }
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

        // this.props.RegisterStep2(data);
    }
    _updatename = () => {
        // var data = new FormData();
        // data.append("token", this.props.user_token)
        // data.append("bio", "Default")
        // data.append("user_name", this.state.name)
        // console.log("form data", data)
        // let h = new Headers();
        // h.append('Accept', 'application/json');
        // h.append('Authorization', this.props.user_token)

        // try {

        //     fetch('http://18.220.123.51/api/update-user-profile', {
        //         method: 'POST',
        //         headers: h,
        //         body: data
        //     }, () => console.log("body_data>>>>>", body)
        //     ).then((response) => response.json())
        //         .then((responseJson) => {
        //             console.log("Edit_profile_resp==>", responseJson)
        //             if (responseJson.status == "SUCCESS") {
        //                 alert(responseJson.status)
        //                 //    this.props.navigation.navigate("Profile")
        //             }
        //             else {
        //                 console.log("error_in_edit_profile")
        //             }

        //         })
        //         .catch((error) => {
        //             console.log("error in edit page", error)
        //             alert(error)
        //         });
        // }
        // catch (e) {
        //     console.log("error", e)
        //     alert('Please check your network connection')
        // }
    }
    render() {
        console.log("ddwdw", this.props.user_acc_type, "efde", this.props.user_registration_complete)
        return (
            
            <View style={{ flex: 1,backgroundColor:'black' }} >
               
                <View style={{ width: width, height: height / 3, backgroundColor: colorYellow, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }} >
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{marginTop:30}}>
                        <Image style={{ width: 30, height: 30, margin: 10 }} source={localImages.left_arrow_white} />
                    </TouchableOpacity>

                    <View style={{ flex: 1, padding: 20 }} >
                        <Text style={{ color: '#fff', fontSize: 30 }} >Welcome, {'\n'}{this.state.user?this.state.user.first_name:''} {this.state.user?this.state.user.last_name:''}</Text>
                    </View>
                    
                         <View  style={{position:'absolute', bottom:10, right:20}}>
                         <View style={{ flexDirection: 'row' ,}} >
                            {
                                this.state.name_editable == true ?
                                    <TextInput ref={this.man}
                                        value={this.state.nickName}
                                        onChangeText={(text) => this.setState({ nickName: text })}
                                        style={{
                                            textAlign: 'right', fontSize: 16, marginBottom: 15,
                                            color: '#fff'
                                        }} ></TextInput>
                                    :
                                    <Text style={{
                                        textAlign: 'right', fontSize: 16 , marginBottom: 15,
                                        color: '#fff'
                                    }}>{this.state.nickName}</Text>
                            }
                            <TouchableOpacity
                                onPress={() => { this.setState({ name_editable: true }) }}
                            >
                                <Image style={{ width: 20, height: 20, marginHorizontal: 10 }} source={localImages.pencil} />

                            </TouchableOpacity>

                        </View>

                         </View>
                    </View>
                


                <View style={{ flex: 1 }} >
                    <View style={{ width: width - 50, marginTop: height / 10, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        <Text style={{ color: colorYellow, fontSize: 25 }} >Private Account</Text>
                        <SwitchBar source={localImages.swtRound} onPress={() => this.state.switchbarVisible ? this.setState({ switchbarVisible: false }) : this.setState({ switchbarVisible: true })} color={this.state.switchbarVisible ? colorYellow : "#ccc"} position={this.state.switchbarVisible ? 'right' : "left"} />


                       

                    </View>
                </View>
                <View style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Image style={{ width: width / 11.73, height: height / 34.28 }} source={localImages.invite} />
                        <Text style={{ color: colorYellow, marginHorizontal: 10, fontSize: 18 }} >Invite Friends</Text>
                    </View>
                </View>


                <View style={{
                    width: width - 40, marginTop: height / 25,
                   
                     marginBottom: height / 10,
                    flexDirection: 'row', justifyContent: 'flex-end'
                }} >
                    <TouchableOpacity onPress={() => this.GotoStep2()} 
                    style={{ 
                      
                         width: 50, height: 50, backgroundColor: colorYellow, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }} >
                        <Image style={{ width: 30, height: 30, }} source={localImages.arrow_right_white} />
                    </TouchableOpacity>
                </View>

                <AwesomeAlert
                    show={this.props.isLoading}
                    showProgress={true}
                />
            </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen2);
