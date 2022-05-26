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
import {View,Text,TextInput,Button,ScrollView,FlatList,TouchableHighlight,SafeAreaView,PermissionsAndroid,TouchableOpacity,StyleSheet,Image,Dimensions,StatusBar,ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import { colors, fonts, localImages } from '../../utils/constant'
import { register_api,matchOtp_api } from '../../api';
import { actions } from "../../reduxActionAndReducer/reducer";

// import {RegisterStep3} from '../../redux/action/action_creater';
// import {Images} from '../../styles/AppStyles';
const colorYellow = "#FDBA12";
const width =Dimensions.get("window").width;
const height =Dimensions.get('window').height;

class SignUpScreen3 extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
          switchbarVisible:false,
          selectUserType:"BL",
          user:'',
          nickName:''

        }
    }

    static  getDerivedStateFromProps(nextProps, prevState) {
       if(nextProps.user_acc_type == "PRO" && nextProps.user_registration_complete == "Y"){
           nextProps.navigation.navigate("DrawerStack")
       }
       else if(nextProps.user_professional_account_type == "BU" ){
           nextProps.navigation.navigate("SelectBusiness")
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

    GotoStep3= async()=>{
        const data = JSON.stringify({
            user_id: this.state.user.id, 
            mode:"S3", 
            professional_account_type:this.state.selectUserType 
        })
        try {
            const result = await register_api(data);
            console.log(result)
            debugger
            if (result.status == "SUCCESS") {
           

            if(result.result.account_type=='PRO' && result.registration_complete=='Y'){
                this.props.setLoggedInUserDetails(result.result)
                this.props.setLoggedInUserAuthToken(result.result.user_token)
                this.props.setLoggedInUserStatus('home')
            }else{
                this.props.navigation.navigate('SelectBusinessHours',{user:result.result})
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
       // this.props.RegisterStep3(data);
    }
    render(){
       console.log("Manish",this.props.user_professional_account_type)
        return(
            <View style={{flex:1,backgroundColor:'black'}} >
                {/* Header */}
               <View style={{width:width,height:height/3,backgroundColor:colorYellow,borderBottomLeftRadius:25,borderBottomRightRadius:25}} >
                  <View>
                   <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignUpScreen2')} >
                       <Image style={{width:30,height:30,margin:10}} source={localImages.left_arrow_white} />
                   </TouchableOpacity>
</View>
                   <View style={{flex:1,padding:20}} >
                      <Text style={{color:'#fff',fontSize:30}} >Welcome, {'\n'}{this.state.user.first_name} {this.state.user.last_name}</Text>
                   </View>
                   <View style={{width:width-50,alignSelf:'center',alignItems:'flex-end'}} >
                       <View style={{flexDirection:'row'}} >
        <Text style={{textAlign:'right',fontSize:16,marginBottom:15,color:'#fff'}} >{this.state.user.name?this.state.user.name:'djdjdjdjj'}</Text>
                            {/* <Image style={{width:20,height:20,marginHorizontal:10}}  source={localImages.pencil} /> */}
                       </View>
                   </View>
               </View>

               <Text style={{textAlign:'center',marginVertical:10,color:colorYellow,fontSize:18,paddingHorizontal:20}} >Which professional account suits you?</Text>
               <View style={{flex:1,backgroundColor:'#111',paddingVertical:5,alignItems:'center',justifyContent:'center'}} >

                   <TouchableOpacity onPress={() => {this.setState({selectUserType:"BL"})}} style={{borderColor:colorYellow,borderWidth: this.state.selectUserType == "BL" ?  1 : 0,padding:5}} >
                   <TouchableOpacity style={{width:50,height:50,alignSelf:'center',borderRadius:100,alignItems:'center',justifyContent:'center',backgroundColor:colorYellow}} >
                       <Image style={{width:25,height:25}} source={localImages.blog} />
                   </TouchableOpacity>
                   <Text style={{width:width-50,alignSelf:'center',color:colorYellow,fontSize:20,textAlign:'center'}} >Food Blogger, Influencer, Public Figure/Celebrity</Text>
                   </TouchableOpacity>


                   <TouchableOpacity onPress={() => {this.setState({selectUserType:"BU"})}} style={{borderColor:colorYellow,borderWidth: this.state.selectUserType == "BL" ?  0 : 1,padding:5}} >
                   <TouchableOpacity style={{width:50,height:50,marginTop:10,alignSelf:'center',borderRadius:100,alignItems:'center',justifyContent:'center',backgroundColor:colorYellow}} >
                       <Image style={{width:25,height:25}} source={localImages.business} />
                   </TouchableOpacity>
                   <Text style={{width:width-50,alignSelf:'center',color:colorYellow,fontSize:20,textAlign:'center'}} >Business Account - If You Sell or Promote Products</Text>
                   </TouchableOpacity>

                 
               </View>

               
                <View style={{width:width-50,marginTop:20,marginBottom:height/10,alignSelf:'center',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
                       <View style={{flexDirection:'row',alignItems:'center',}} >
                           <Image style={{width:width/11.73,height:height/34.28}} source={localImages.invite} />
                           <Text style={{color:colorYellow,marginHorizontal:10,fontSize:18,}} >Invite Friends</Text>
                       </View>


                       <TouchableOpacity onPress={() => this.GotoStep3()} style={{width:50,height:50,alignSelf:'flex-end',backgroundColor:colorYellow,borderRadius:100,alignItems:'center',justifyContent:'center'}} >
                         <Image style={{width:30,height:30}} source={localImages.arrow_right_white} />
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen3);
