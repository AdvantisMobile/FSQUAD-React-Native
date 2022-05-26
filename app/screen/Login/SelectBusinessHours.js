


import React ,{useState} from 'react';
import {View,Text,TextInput,Button,ScrollView,FlatList,TouchableHighlight,SafeAreaView,PermissionsAndroid,KeyboardAvoidingView,TouchableOpacity,StyleSheet,Image,Dimensions,StatusBar,ImageBackground} from 'react-native';
import { connect } from 'react-redux';
//import DatePicker from 'react-native-datepicker';
import SwitchBar from '../../component/SwitchBar'
import Icon from 'react-native-vector-icons/Ionicons'
import Moment from 'moment';
//import {RegisterStep4} from '../../redux/action/action_creater';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors, fonts, localImages } from '../../utils/constant'
import { register_api,matchOtp_api } from '../../api';
import { actions } from "../../reduxActionAndReducer/reducer";
import SharedClass from '../../utils/SharedClass'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const colorYellow = "#FDBA12";
const {width,height,fontScale,} =Dimensions.get('window');
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp,  
  } from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native-paper';

  const {height: SCREEN_HEIGHT} = Dimensions.get('window');
   const isIOS = Platform.OS === 'ios'
  const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
  const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
  const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 80 : 64) : 64;
  const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;


class BusinessHour extends React.PureComponent{

    
    constructor(props){
        super(props);
        this.sharedClass = new SharedClass();
        this.state={
            user:'',
            nickName:'',
          switchbarVisible:false,selectUserType:"Blogger",Time:""
          ,data:
          [{day:"Sunday",startTime:"01:00",endTime:"02:00",visible:false},
          {day:"Monday",startTime:"01:00",endTime:"02:00",visible:true},
          {day:"Tuesday",startTime:"01:00",endTime:"02:00",visible:true},
          {day:"Wednesday",startTime:"01:00",endTime:"02:00",visible:true},
          {day:"Thrusday",startTime:"01:00",endTime:"02:00",visible:true},
          {day:"Friday",startTime:"01:00",endTime:"02:00",visible:true},
          {day:"Saturday",startTime:"01:00",endTime:"02:00",visible:true},
          ],



          SUN_from_time : "" ,SUN_to_time:"",
          MON_from_time : "" ,MON_to_time:"",
          TUE_from_time : "" ,TUE_to_time:"",
          WED_from_time : "" ,WED_to_time:"",
          THE_from_time : "" ,THE_to_time:"",
          FRI_from_time : "" ,FRI_to_time:"",
          SAT_from_time : "" ,SAT_to_time:"",

         BusinessWebsite:'',BusinessAddress:''
          
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

  findTime(d){
    Moment.locale('en');
    var time = Moment(d).format('H:mm');
    const {index,data} = this.state;
    if(index == 0+"from"){
        data[0].startTime = time
        this.setState({ShowDatePicker:false,SUN_from_time:time})
    }
    else if(index == 1+"from"){
        data[1].startTime = time
        this.setState({ShowDatePicker:false,MON_from_time:time})
    }
    else if(index == 2+"from"){
        data[2].startTime = time
        this.setState({ShowDatePicker:false,TUE_from_time:time})
    }
    else if(index == 3+"from"){
        data[3].startTime = time
        this.setState({ShowDatePicker:false,WED_from_time:time})
    }
    else if(index == 4+"from"){
        data[4].startTime = time
        this.setState({ShowDatePicker:false,THE_from_time:time})
    }
    else if(index == 5+"from"){
        data[5].startTime = time
        this.setState({ShowDatePicker:false,FRI_from_time:time})
    }
    else if(index == 6+"from"){
        data[6].startTime = time
        this.setState({ShowDatePicker:false,SAT_from_time:time})
    }
    // to time
    else if(index == 0+"to"){
        data[0].endTime = time
        this.setState({ShowDatePicker:false,})
    }
    else if(index == 1+"to"){
        data[1].endTime = time
        this.setState({ShowDatePicker:false})
    }
    else if(index == 2+"to"){
        data[2].endTime = time
        this.setState({ShowDatePicker:false})
    }
    else if(index == 3+"to"){
        data[3].endTime = time
        this.setState({ShowDatePicker:false})
    }
    else if(index == 4+"to"){
        data[4].endTime = time
        this.setState({ShowDatePicker:false})
    }
    else if(index == 5+"to"){
        data[5].endTime = time
        this.setState({ShowDatePicker:false})
    }
    else if(index == 6+"to"){
        data[6].endTime = time
        this.setState({ShowDatePicker:false})
    }
  }
  GotoStep4=async ()=>{

    let message = {}
    if (!this.state.BusinessAddress) {
        message.message = 'Please Enter bussiness address'
        message.type = 'info'
        this.sharedClass.ShowSnakBar(message)
        return

    }

      const data = JSON.stringify({
        "user_id": this.state.user.id, 
        "mode":"S4", 
        "business_address":this.state.BusinessAddress, 
        "SUN_from_time":this.state.data[0].startTime, 
        "SUN_to_time":this.state.data[0].endTime, 
        "MON_from_time":this.state.data[1].startTime, 
        "MON_to_time":this.state.data[1].endTime, 
        "TUE_from_time":this.state.data[2].startTime, 
        "TUE_to_time":this.state.data[2].endTime, 
        "WED_from_time":this.state.data[3].startTime, 
        "WED_to_time":this.state.data[3].endTime, 
        "THE_from_time":this.state.data[4].startTime, 
        "THE_to_time":this.state.data[4].endTime, 
        "FRI_from_time":this.state.data[5].startTime, 
        "FRI_to_time":this.state.data[5].endTime, 
        "SAT_from_time":this.state.data[6].startTime, 
        "SAT_to_time":this.state.data[6].endTime, 
      })
      try {
        const result = await register_api(data);
        console.log(result)
        debugger
        if (result.status == "SUCCESS") {
       

            this.props.setLoggedInUserDetails(result.result)
            this.props.setLoggedInUserAuthToken(result.result.user_token)
            this.props.setLoggedInUserStatus('home')
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

      //this.props.RegisterStep4(data)
      
  }
  HideShow(index){
    const {data} = this.state;
    if(index == 0){
        if(data[0].visible == true  ){
            data[0].visible = false
            this.setState({dummy:"0f"})
        }
        else{
            data[0].visible = true
            this.setState({dummy:"0t"})
        }
    }
    else if(index == 1){
        if(data[1].visible == true  ){
            data[1].visible = false
            this.setState({dummy:"1f"})
        }
        else{
            data[1].visible = true
            this.setState({dummy:"1t"})
        }
    }
    else if(index == 2){
        if(data[2].visible == true  ){
            data[2].visible = false
            this.setState({dummy:"2f"})
        }
        else{
            data[2].visible = true
            this.setState({dummy:"2t"})
        }
    }
    else if(index == 3){
        if(data[3].visible == true  ){
            data[3].visible = false
            this.setState({dummy:"3f"})
        }
        else{
            data[3].visible = true
            this.setState({dummy:"3t"})
        }
    }
    else if(index == 4){
        if(data[4].visible == true  ){
            data[4].visible = false
            this.setState({dummy:"4f"})
        }
        else{
            data[4].visible = true
            this.setState({dummy:"4t"})
        }
    }
    else if(index == 5){
        if(data[5].visible == true  ){
            data[5].visible = false
            this.setState({dummy:"5f"})
        }
        else{
            data[5].visible = true
            this.setState({dummy:"5t"})
        }
    }
    else if(index == 6){
        if(data[6].visible == true  ){
            data[6].visible = false
            this.setState({dummy:"6f"})
        }
        else{
            data[6].visible = true
            this.setState({dummy:"6t"})
        }
    }
     
  }
    render(){
       // var flag = this.props.navigation.getParam("flag");
       // console.log("swdw",flag)
        return(
            <View style={{flex:1,backgroundColor:'black'}} >
                        <KeyboardAvoidingView behavior={isIOS ? 'padding':'height'}  style={{flex:1,backgroundColor:'#000'}}>

              <KeyboardAwareScrollView >
               <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'black',width:width,height:50,paddingLeft:10,top:'5%'}} >
                   <Image style={{width:25,height:25}} source={localImages.back_arrow_yellow} />
                  <TouchableOpacity 
                  onPress={()=>{ this.props.navigation.goBack(null)}}
                  >
                  <Text style={{color:colorYellow,fontSize:16,marginHorizontal:5}} >Back</Text>

                  </TouchableOpacity>
               </View>
              
               <View style={{flex:1,backgroundColor:'black',top:50}} >
                  <Text style={{fontWeight:'bold',fontSize:18,color:colorYellow,margin:10}} >Business Hours</Text>
                  <View style={{width:width-40,alignSelf:'center'}} >
                  {this.state.data ?   <FlatList data={this.state.data} renderItem={({item,index})=>{
                          return(
                            <View>
                            <View style={{flexDirection:'row',alignItems:'center',marginVertical:5,justifyContent:'space-between',paddingHorizontal:10}} >
                              <Text style={{color:colorYellow}} >{item.day}</Text>
                              <SwitchBar onPress={() => this.HideShow(index)}  color={item.visible ?  colorYellow : "#ccc" }  position={item.visible ?  "right" : "left" } source={localImages.swtRound1} />
                            </View>
  
          {item.visible ?  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20,marginTop:10}} >
                              <TouchableOpacity onPress={() => this.setState({ShowDatePicker:true,index:index+"from"})}  style={{width:width/3,height:40,flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',backgroundColor:'#fff'}} >
                                 <Text>{item.startTime}</Text>
                                <Icon name="md-arrow-dropdown" color="#111" size={20} />
                              </TouchableOpacity>
  
                              <TouchableOpacity onPress={() => this.setState({ShowDatePicker:true,index:index+"to"})} style={{width:width/3,height:40,flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',backgroundColor:'#fff'}} >
                                <Text>{item.endTime}</Text>
                                <Icon name="md-arrow-dropdown" color="#111" size={20} />
                              </TouchableOpacity>
                            </View> : null }

                          </View>
                         )
                     }} />
                     : null }
                  </View>

                  <Text style={{fontWeight:'bold',fontSize:18,color:colorYellow,margin:10}} >Business Website URL</Text>
                  <TextInput onChangeText={(text) => this.setState({BusinessWebsite:text})} color='white' style={{width:width-50,height:40,color:'white',alignSelf:'center',borderColor:'#333',borderWidth:1,paddingLeft:10}} placeholder="http://example.com" />


                  <Text style={{fontWeight:'bold',marginTop:20,fontSize:18,color:colorYellow,margin:10}} >Business Address</Text>
                  <TextInput onChangeText={(text)=> this.setState({BusinessAddress:text})} color='white' style={{width:width-50,color:'white',height:100,marginBottom:50,alignSelf:'center',borderColor:'#333',borderWidth:1,paddingLeft:10}} placeholder="4 Villas near dummy dummy " />



                </View>
                </KeyboardAwareScrollView>
                </KeyboardAvoidingView>

                
                <DateTimePickerModal
                isVisible={this.state.ShowDatePicker}
                mode="time"
                is24Hour={false}
                isDarkModeEnabled={false}
                onConfirm={((data) => this.findTime(data))}
                
                  onCancel={()=>this.setState({
                    ShowDatePicker:false
                  })}
                />
                {/* <Example/> */}
            
                {/* <DatePicker
                       
                        // date={this.state.date}
                        ref={(ref)=>this.datePickerRef=ref}
                        mode="time"
                        placeholder=" date"
                        // format="YYYY-MM-DD"
                        minDate="1960-01-01"
                        maxDate="2020-10-01"
                        showIcon={false}
                        hideText={true}
                        confirmBtnText="Confirm"
                        disabled={false}
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        
                        // ... You can check the source to find the other keys.
                        }}
                        
                        onDateChange={(date) => { this.setState({date: date})}}
                    /> */}
                    {/* <Text>{this.state.date}</Text> */}

                    <TouchableOpacity onPress={() => this.GotoStep4()} style={{width:width,alignItems:'center',justifyContent:'center',alignSelf:'center',height:80,backgroundColor:'#fff', paddingBottom:10}} >
                      <Text >Next</Text>
                    </TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(BusinessHour);
