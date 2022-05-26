
import React from 'react';
import { StyleSheet, View,StatusBar, Text, Image, Dimensions, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { colors, fonts, localImages, ApiUrl } from '../../utils/constant'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import OptionsMenu from "react-native-options-menu";
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { Thumbnail } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('screen')

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
 const isIOS = Platform.OS === 'ios'
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 80 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: '',
            userDetails: ''
        }
        const data = JSON.stringify({
            token: this.props.user_token
        })
        // this.props.user_profile(data);
    }

    componentDidMount() {
        // this.requestCameraPermission();
        //this.fetch_userDetails()
        this.props.navigation.addListener(
            "focus",
            () => {
                //   alert(this.state.defaultAddress)
                this.fetch_userDetails()
            }
        );


    }

 
 renderNavBar = () => (
  <View style={styles.navContainer}>
    <View style={styles.statusBar} />
    <View style={styles.navBar}>
      <Icon name ='menu' size={40} color={colors.white} onPress={() => this.props.navigation.toggleDrawer()} />
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('EditProfileScreen',{openCoverCamera:true})} style={styles.iconRight,{backgroundColor:'white',borderWidth:2,borderRadius:16,borderColor:'white',padding:5}} >
      <Icon name ='camera'  size={22} color={colors.black}  />
      </TouchableOpacity>
      
    </View>
    {/* <Icon name ='camera' style={styles.iconRight,{left:'100%',top:250,marginRight:30}}  size={20} color={colors.white} onPress={()=>this.OpenCameraForCover()}  /> */}

  </View>
);
 
 renderContent = () => {
  return (
    <View style={styles.body,{backgroundColor:'black',height:'100%'}}>
      <ScrollView style={{height:'100%',paddingBottom:120}}>
    <View style={{flexDirection:'column'}}>
      <View style={{paddingBottom:20,flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
      <Thumbnail  style ={{left:4,top:12, padding:60,borderRadius:70,backgroundColor:'rgba(0,0,0,.4)',backgroundColor:'grey',borderColor:'white',borderWidth:4}} medium 
      source={{ uri: this.state.userDetails && this.state.userDetails.profile_pic ? ApiUrl.prfile_img + this.state.userDetails.profile_pic : 'https://image.shutterstock.com/image-vector/person-icon-260nw-282598823.jpg' }}
      />
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('EditProfileScreen',{openDpCamera:true})} style={{backgroundColor:'white',top:'82%',left:'25%',borderWidth:2,borderRadius:20,borderColor:'white',padding:2,position:'absolute'}} >
      <Icon name ='camera'  size={26} color={colors.black}  />
      </TouchableOpacity>

      <View>
        <Text style={{top:30,fontSize:20,color:'white',left:30,fontWeight:'bold',width:'100%',textAlign:'center'}}>{this.state.userDetails && this.state.userDetails.first_name + " " +this.state.userDetails.last_name }</Text>
        <Text style={{top:35,fontSize:12,color:'white',left:32,fontWeight:'bold'}}>{this.state.userDetails && "@" + this.state.userDetails.name}</Text>
        <Text onPress={()=>this.props.navigation.navigate('EditProfileScreen')} style={{padding:4,borderRadius:10,borderWidth:1,borderColor:colors.light_gray,alignSelf:'flex-start',top:52,fontSize:14,color:colors.yellow,right:wp('-40'),fontWeight:'bold'}}>Edit profile</Text>
      </View>
      {/* {this.state.userDetails && this.state.userDetails.bio ? <View style={{ width: width - 30, alignSelf: 'center', minHeight: 20, maxHeight: 120, padding: 10, backgroundColor: '#D8EEF3' }} >
                                <Text style={{ textAlign: 'center', color: '#009BBE' }} >{this.state.userDetails && this.state.userDetails.bio ? this.state.userDetails.bio : ''}</Text>
                            </View> : null} */}
                            
     </View>
     <Text numberOfLines={5} style={{fontWeight:'500',borderRadius:10, borderWidth:4,marginBottom:12,padding:10,top:12,left:10, width:width*0.95,borderColor:"grey",textAlign: "left", color:this.state.userDetails && this.state.userDetails.bio ? colors.white :colors.light_gray,fontSize:15 }} >{this.state.userDetails && this.state.userDetails.bio ? this.state.userDetails.bio : 'Bio not available'}</Text>
    
    
     <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }} >
                           

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('FriendReq')} style={{ shadowOpacity: 2, shadowColor: 'grey', width: width * 30 / 100, height: width * 20 / 100, borderColor: '#ccc', borderWidth: 0.5, backgroundColor: colors.black, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} >
                                    <Text style={{ fontSize: 25, color: colors.yellow, fontWeight: 'bold' }} >{this.state.totalFriend ? this.state.totalFriend :0 }</Text>
                                    <Text style={{ fontSize: 13,padding:2, color: colors.yellow, fontWeight: '200',fontWeight: 'bold' }}>Squad</Text>
                                </TouchableOpacity >

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('FriendReq')} style={{ shadowOpacity: 2, shadowColor: 'grey', width: width * 30 / 100, height: width * 20 / 100, borderColor: '#ccc', borderWidth: 0.5, backgroundColor: colors.black, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} >
                                    <Text style={{ fontSize: 25, color: colors.yellow, fontWeight: 'bold' }} >{this.state.totalFriend ? this.state.totalFriend :0 }</Text>
                                    <Text style={{ fontSize: 13,padding:2, color: colors.yellow, fontWeight: '200',fontWeight: 'bold' }}>Squad</Text>
                                </TouchableOpacity >

                                <View style={{ shadowOpacity: 2, shadowColor: 'grey', width: width * 30 / 100, height: width * 20 / 100, borderColor: '#ccc', borderWidth: 0.5, backgroundColor: colors.black, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} >
                                    <Text style={{ fontSize: 25, color: colors.yellow, fontWeight: 'bold' }} >6</Text>
                                    <Text style={{ fontSize: 13, padding:2,color: colors.yellow, fontWeight: '200', textAlign: 'center',fontWeight: 'bold' }}>Wanna Cook it</Text>
                                </View>
                            </View>

                        <Text style={{ fontSize: 22, color: colors.yellow, fontWeight: '700', margin: 15 }}>{this.state.myPost&&this.state.myPost.length + " Posts"}</Text>

                <View style={{ alignItems: 'flex-start',backgroundColor:'black',margin:2 }} >
                    <FlatList numColumns={3} data={this.state.myPost} renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("PostDetails", { id: item.id })} style={{ width: width / 3, marginHorizontal:1, height: width / 3 }} >
                                {item.post_deafult_image && <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: ApiUrl.PostImage + item.post_deafult_image.image }} />}
                            </TouchableOpacity>
                        )
                    }} />
                </View>

     </View>
      </ScrollView>
    </View>
  );
};
 
 title = () => {
  return (
    <View style={styles.body}>
      <Text style={{color: 'white', fontSize: 22,fontWeight:'800'}}></Text>
    </View>
  );
};

    fetch_userDetails() {
        try {

            this.setState({ loader: true })
            fetch('http://18.220.123.51/api/user-profile', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: this.props.loginuserToken
                })
            }).then((response) => response.json())
                .then((response) => {
                    this.setState({ loader: false })
                    console.log("user profile res", response)
                    if (response.status == "SUCCESS") {
                        console.log('my details',response)
                        this.setState({
                            userDetails: response.result.userDetails,
                            myPost : response.result.myPost

                        })
                    }
                    else {
                        this.setState({ loader: false })
                        console.log("error", response)
                    }

                })
                .catch((error) => {
                    this.setState({ loader: false })
                    console.log("error", error)
                    alert(error)
                });
        }
        catch (e) {
            this.setState({ loader: false })
            console.log("error", e)
            alert('Please check your network connection')
        }
    }
    render() {

        console.log("sdnhvjkxfjkhbviuighu", this.state.userDetails, this.state.userDetails.cover_pic,)
        // source={{ uri: ApiUrl.prfile_img + this.state.userDetails.cover_pic }}
        if (!this.state.loader) {
        return(
            <>
            <StatusBar barStyle="dark-content" />
            <ReactNativeParallaxHeader
              headerMinHeight={HEADER_HEIGHT}
              headerMaxHeight={height*0.35}
              extraScrollHeight={20}
              navbarColor= {colors.black}
              titleStyle={styles.titleStyle}
              title={this.title()}
              backgroundImage={ this.state.userDetails.cover_pic ?{ uri: ApiUrl.prfile_img + this.state.userDetails.cover_pic }:localImages.defaultCover}
              backgroundImageScale={1.2}
              renderNavBar={this.renderNavBar}
              renderContent={this.renderContent}
              containerStyle={styles.container}
              contentContainerStyle={styles.contentContainer}
              innerContainerStyle={styles.container}
              scrollViewProps={{
                onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
                onScrollEndDrag: () => console.log('onScrollEndDrag'),
              }}
            />
          </>
        )
            }
        else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'black' }} >
                    <ActivityIndicator size={20} />
                </View>
            )
        }
        
        if (!this.state.loader) {
            return (
                <SafeAreaView style={{backgroundColor:'rgba(0,0,0,1)'}}>
                    <View style={{backgroundColor:'rgba(0,0,0,1)',height:'100%',paddingBottom:20}} >
                        <ScrollView style={{backgroundColor:'#000',paddingBottom:30}}>
                            <View style={{ width: width, height: 50, backgroundColor: '#000', borderBottomColor: colors.gray, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }} >
                                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} >
                                    <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={localImages.filter_menu} />
                                </TouchableOpacity>
                                <Text style={{ color: colors.yellow, fontSize: 19, fontWeight: 'bold' }} >{this.props.user_name}</Text>
                                <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={localImages.send2} />
                            </View>

                            {this.state.userDetails && this.state.userDetails.cover_pic ? <ImageBackground style={{ backgroundColor: colors.yellow, width: width, height: height / 3, alignItems: 'flex-end', justifyContent: 'flex-end' }} source={{ uri: ApiUrl.prfile_img + this.state.userDetails.cover_pic }}  >
                                <View style={{ width: width, height: 50, padding: 15, backgroundColor: '#000', borderTopLeftRadius: 30, borderTopRightRadius: 30 }} >

                                    <View style={{ flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center', marginTop: -70 }} >
                                        <Image style={{ borderRadius: 50,borderColor:'white',borderWidth:4, width: 100, height: 100, alignItems: 'flex-end', justifyContent: 'center', Color: 'red' }} imageStyle={{ borderRadius: 100 }}
                                            
                                            source={{ uri: this.state.userDetails && this.state.userDetails.profile_pic ? ApiUrl.prfile_img + this.state.userDetails.profile_pic : 'https://image.shutterstock.com/image-vector/person-icon-260nw-282598823.jpg' }}
                                        >
                                        </Image>

                                    </View>
                                    <Text style={{ color: colors.blue, fontSize: 16, fontWeight: 'bold', position:'absolute', top:10 , left:10}} >{this.state.userDetails.first_name} {this.state.userDetails.last_name}</Text>
                                </View>
                            </ImageBackground> :
                                <View style={{ backgroundColor: colors.yellow, width: width, height: height / 3, alignItems: 'flex-end', justifyContent: 'flex-end' }} source={{ uri: ApiUrl.prfile_img + this.state.userDetails ? this.state.userDetails.cover_pic : '' }}  >
                                    <View style={{ width: width, height: 50, padding: 15, backgroundColor: '#000', borderTopLeftRadius: 30, borderTopRightRadius: 30 }} >
                                        <View style={{ flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center', marginTop: -40 }} >





                                            <Image style={{ borderRadius: 50,borderColor:'white',borderWidth:4, width: 100, height: 100, alignItems: 'flex-end', justifyContent: 'center', Color: 'red' }} imageStyle={{ borderRadius: 100 }}
                                                // source={{uri:ApiUrl.prfile_img+this.state.avatarSource ? this.state.avatarSource : 'https://image.shutterstock.com/image-vector/person-icon-260nw-282598823.jpg'}} >
                                                source={{ uri: this.state.userDetails && this.state.userDetails.profile_pic ? ApiUrl.prfile_img + this.state.userDetails.profile_pic : 'https://image.shutterstock.com/image-vector/person-icon-260nw-282598823.jpg' }}
                                            >
                                            </Image>




                                        </View>
                                        <Text style={{ color: colors.blue, fontSize: 16, fontWeight: 'bold' }} >{this.state.userDetails.first_name} {this.state.userDetails.last_name}</Text>
                                    </View>
                                </View>

                            }

                            {this.state.userDetails && this.state.userDetails.bio ? <View style={{ width: width - 30, alignSelf: 'center', minHeight: 20, maxHeight: 120, padding: 10, backgroundColor: '#D8EEF3' }} >
                                <Text style={{ textAlign: 'center', color: '#009BBE' }} >{this.state.userDetails && this.state.userDetails.bio ? this.state.userDetails.bio : ''}</Text>
                            </View> : null}

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }} >
                                <View style={{ shadowOpacity: 2, shadowColor: 'rgba(0,0,0,.6)', width: width * 20 / 100, height: width * 20 / 100, borderColor: '#ccc', borderWidth: 0.5, backgroundColor: colors.yellow, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }} >
                                    <Text style={{ fontSize: 25, color: colors.white, fontWeight: 'bold', }} >80</Text>
                                    <Text style={{ fontSize: 13,padding:2, color: colors.white, fontWeight: 'bold'  }}>Posts</Text>
                                </View>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('FriendReq')} style={{ shadowOpacity: 2, shadowColor: 'blue', width: width * 20 / 100, height: width * 20 / 100, borderColor: '#ccc', borderWidth: 0.5, backgroundColor: colors.white, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }} >
                                    <Text style={{ fontSize: 25, color: colors.yellow, fontWeight: 'bold' }} >{this.state.totalFriend ? this.state.totalFriend :0 }</Text>
                                    <Text style={{ fontSize: 13,padding:2, color: colors.yellow, fontWeight: '200',fontWeight: 'bold' }}>Squad</Text>
                                </TouchableOpacity >

                                <View style={{ shadowOpacity: 2, shadowColor: 'blue', width: width * 20 / 100, height: width * 20 / 100, borderColor: '#ccc', borderWidth: 0.5, backgroundColor: colors.white, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} >
                                    <Text style={{ fontSize: 25, color: colors.yellow, fontWeight: 'bold' }} >6</Text>
                                    <Text style={{ fontSize: 11, padding:2,color: colors.yellow, fontWeight: '200', textAlign: 'center',fontWeight: 'bold' }}>Wanna Cook it</Text>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate("EditProfileScreen")} style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: width / 2.50, height: 40, alignSelf: 'center', backgroundColor: colors.blue, marginVertical: 10 }} >

                                <Text style={{ color: colors.white }}>Edit Profile</Text>
                                {/* <OptionsMenu
                      button={localImages.arrow_dropdown}
                      buttonStyle={{ width: 12, height: 12, margin: 7.5, resizeMode: "contain" }}
                      destructiveIndex={1}
                      options={["Edit","See FriendList"]}
                      actions={[()=> this.props.navigation.navigate("EditProfileScreen") , ()=> this.props.navigation.navigate("FriendReq")]} />  */}
                            </TouchableOpacity>

                            <Text style={{ fontSize: 18, color: colors.blue, fontWeight: '200', margin: 15 }} >My Posts</Text>

                            <View style={{ alignItems: 'center',backgroundColor:'black' }} >
                                <FlatList numColumns={3} data={this.state.myPost} renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("PostDetails", { id: item.id })} style={{ width: width / 3, marginHorizontal:1, height: width / 3 }} >
                                            {item.post_deafult_image && <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: ApiUrl.PostImage + item.post_deafult_image.image }} />}
                                        </TouchableOpacity>
                                    )
                                }} />
                            </View>

                        </ScrollView>
                    </View>
                </SafeAreaView>
            )
        }
        else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'black' }} >
                    <ActivityIndicator size={20} />
                </View>
            )
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
    },
    navContainer: {
      height: HEADER_HEIGHT,
      marginHorizontal: 10,
    },
    statusBar: {
      height: STATUS_BAR_HEIGHT,
      backgroundColor: 'transparent',
    },
    navBar: {
      height: NAV_BAR_HEIGHT,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'transparent',
    },
    titleStyle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
  });