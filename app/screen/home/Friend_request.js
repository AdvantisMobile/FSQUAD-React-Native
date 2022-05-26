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
import {View,Text,Image, Dimensions, SafeAreaView, ImageBackground, TextInput,TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {connect} from 'react-redux';
import { API_BASE_URL, put_like_api, post_details_api, put_comment_api, user_pending_requests_api } from '../../api';

const {width,height} = Dimensions.get('screen')
// import {user_pending_request} from '../../redux/action/action_creater';

import { colors, fonts, localImages ,ApiUrl} from '../../utils/constant'
import Icon from 'react-native-vector-icons/Ionicons';

class FriendRequest extends React.Component{
    constructor(props){
        super(props);
       //this.getPendingDetails();
    }

    componentDidMount() {
       
        console.log("token____", this.props.user_token)
        this.getPendingDetails()
        console.log("posts from redux", this.props.Posts)
        this.didFocusSubscription = this.props.navigation.addListener(
          "didFocus",
          () => {
            //   alert(this.state.defaultAddress)
            this.getPendingDetails()
    
    
    
            // this.checkNoSeller();
          }
        );
    
    
      }
    getPendingDetails=async ()=>{
        console.log('pending details called')
        const data = JSON.stringify({
            token:this.props.loginuserToken
        })
        try {
            const result = await user_pending_requests_api(data);
            console.log('pending friend req',result)
            this.setState({
                isLoading: false
            })
            if (result.status == "SUCCESS") {
                this.setState({
                    friendList: result.result,
                })

            }
            else {
                console.log("wdfwdfefd", result)
            }
        } catch (error) {
            this.setState({
                isLoading: false
            })
            console.log("ERROR IN OFFER FETCH API", error);
        }
        // this.props.user_pending_request(data);
    }
    accpt(id){
        
        try{
            console.log({
                token:this.props.loginuserToken,
                friend_id:id
            })
            fetch('http://18.220.123.51/api/user-accept-friend-requests', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify({
                    token:this.props.loginuserToken,
                    friend_id:id
                })
              }).then((response) => response.json())
              .then((responseJson) => {
                  console.log("userPending_Req",responseJson)
               if(responseJson.status == "SUCCESS"){
                  alert(responseJson.status)
                  this.getPendingDetails()
               }
               else{
                   console.log("error",responseJson)
               }
                         
              })
              .catch((error) => {
                 console.log("error",error)
                  alert(error)
              });
        }
        catch(e){
         console.log("error",e)
            alert('Please check your network connection')
        }
    }
    reject(id){
        try{
            fetch('http://18.220.123.51/api/user-cancel-friend-requests', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify({
                    token:this.props.loginuserToken,
                    friend_id:id
                })
              }).then((response) => response.json())
              .then((responseJson) => {
                  console.log("userPending_Req",responseJson)
               if(responseJson.status == "SUCCESS"){
                alert(responseJson.status)
                this.getPendingDetails()
               }
               else{
                   console.log("error",responseJson)
               }
                         
              })
              .catch((error) => {
                 console.log("error",error)
                  alert(error)
              });
        }
        catch(e){
         console.log("error",e)
            alert('Please check your network connection')
        }
    }
    render(){
        console.log("FriendReqData",this.props.FriendReqData)
        return(
            <SafeAreaView>
                <ScrollView>
                <View style={{width:width,height:50,backgroundColor:'#fff',borderBottomColor:colors.gray,borderBottomWidth:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10}} >
                    <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} >
                      <Image style={{width:25,height:25,resizeMode:'contain'}} source={localImages.filter_menu} />
                    </TouchableOpacity>
                    <Image style={{width:45,height:45,resizeMode:'contain'}} source={localImages.logo} />
                    <Image style={{width:20,height:20,resizeMode:'contain'}} source={localImages.send2} />
                </View>

                <FlatList data={this.props.FriendReqData} renderItem={({item,index})=>{
                    return(
                        <View style={{width:width,padding:10,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >
                            <Image style={{width:30,height:30}} source={localImages.person} />
                            <View>
                                <View style={{flexDirection:'row'}} >
                                 <Text style={{fontWeight:'bold'}} >{item.user_details.first_name} {item.user_details.last_name} </Text>
                                 <Text> sent friend request </Text>
                             </View>
                               <View style={{flexDirection:'row',width:width-80}} >
                                   <TouchableOpacity onPress={()=>this.accpt(item.user_details.id)} style={{marginRight:10,width:80,height:25,alignItems:'center',justifyContent:'center',backgroundColor:'#9660F9',borderRadius:5}} >
                                       <Text style={{color:colors.white}} >Accept</Text>
                                   </TouchableOpacity>

                                   <TouchableOpacity onPress={()=>this.reject(item.user_details.id)} style={{marginHorizontal:10,width:80,height:25,alignItems:'center',justifyContent:'center',borderColor:'#9660F9',borderWidth:1,borderRadius:5}} >
                                         <Text style={{color:'#360098',fontWeight:'bold'}} >Deny</Text>
                                    </TouchableOpacity>
                               </View>
                            </View>
                             <Icon style={{marginRight:10}} name="md-more" size={30} />
                        </View>
                    )
                }} />

                </ScrollView>

            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("check store data", state.localStates);
    return {
        loginStatus: state.localStates.loginStatus,
        userDetails: state.localStates.userDetails,
        loginuserToken: state.localStates.loginuserToken
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInUserAuthToken: token => {
            dispatch(actions.setLoggedInUserAuthToken(token));
        },
        setIntroStatsStatus: token => {
            dispatch(actions.setIntroStatsStatus(token));
        },
    };
};
 
 export default connect(mapStateToProps, mapDispatchToProps)(FriendRequest);