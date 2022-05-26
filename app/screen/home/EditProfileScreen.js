


import React from 'react';
import { View, Text, Image, Dimensions,StatusBar,FlatList,StyleSheet, ImageBackground,Platform, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { colors, fonts, localImages, ApiUrl } from '../../utils/constant'
import { API_BASE_URL, put_like_api, post_details_api, put_comment_api, send_friend_req_api } from '../../api';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { Thumbnail,Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ImageCropper from 'react-native-simple-image-cropper';

import ImagePicker from 'react-native-image-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SharedClass from '../../utils/SharedClass'
import AwesomeAlert from 'react-native-awesome-alerts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import overlayPng from '../../assets/images/overlay.png';

const { width, height } = Dimensions.get('screen')

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
 const isIOS = Platform.OS === 'ios'
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 80 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
class EditProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.sharedClass = new SharedClass();
        this.state = {
            avatarSource: null,
            loader: false,
            preview: false,
            name: "",
            // f_name: "",
            // l_name: "",
            user_name: '',
            email: "",
            mobile: "",
            password: "",
            img: false,
            bio: '',
            dummy: false,
            dummycover: false,
            coverPhoto: '',

        }
    }
    componentDidMount() {
        this.fetch_userDetails();
        console.log("data from redux", this.props)
        if(this.props.route&&this.props.route.params && this.props.route.params.openCoverCamera)
        {
            this.OpenCameraForCover()
        }
        if(this.props.route&&this.props.route.params && this.props.route.params.openDpCamera)
        {
            this.OpenCamera()
        }
    }
    fetch_userDetails() {
        try {

            this.setState({ loader: true })
            fetch('http://18.220.123.51/api/my-details', {
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
                    console.log("userPending_Req", response)
                    if (response.status == "SUCCESS") {
                        this.setState({
                            name: response.result.name,
                            f_name: response.result.first_name,
                            l_name: response.result.last_name,
                            email: response.result.email,
                            mobile: response.result.mobile,
                            avatarSource: response.result.profile_pic ? response.result.profile_pic : null,
                            avatarSourceCopy: response.result.profile_pic ? response.result.profile_pic : null,
                            img: true,
                            password: response.result.password,
                            coverPhoto: response.result.cover_pic ? response.result.cover_pic : null,
                            coverPhotoCopy : response.result.cover_pic ? response.result.cover_pic : null,
                            bio: response.result.bio ? response.result.bio : null

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

    OpenCameraForCover = () => {
        const options = {
            title: 'Select Cover',
            customButtons: [{ name: 'delete', title: 'Delete Cover' }],
            quality: .7,
            maxWidth: width,
            maxHeight: height*0.35,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
                this.setState({
                    coverPhoto: ApiUrl.prfile_img+'../../assets/images/defaultCover',
                    coverPhotoCopy: ApiUrl.prfile_img+'../../assets/images/defaultCover',
                    croppedImage:'',
                    dummycover: true,
                    preview:false
                }, () => this.Save(true));
            }
            
            else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    coverPhoto: source.uri,
                    dummycover: true,
                    preview:true
                }, () => { console.log("Image_state_in_crop_img_picker", this.state.dummy) });
            }
        });
    }
    OpenCamera = () => {
        const options = {
            title: 'Select Avatar',
            quality: .7,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                         } 
                else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source.uri,
                    dummy: true,
                    dpPreview:true
                }, () => { console.log("Image_state_in_crop_img_picker", this.state.dummy) });
            }
        });
    }
    Save(donotNavigate) {
        let message = {}
        // if (!this.state.dummy) {
        //     message.message = 'Please Sekecr profile picture'
        //     message.type = 'info'
        //     this.sharedClass.ShowSnakBar(message)
        //     return
        // }

        // if (this.state.dummy) {
        this.setState({ loader: true })
        var data = new FormData();
        data.append("token", this.props.loginuserToken)
        //   data.append("profile_pic",this.state.avatarSource)
        data.append("bio", this.state.bio ? this.state.bio : 'default')
        //  data.append("first_name",this.state.f_name)
        //  data.append("last_name",this.state.l_name,)
        // data.append("user_name", this.state.name)
        // data.append("new_password",this.state.password)

        if (this.state.email) {
            data.append('email', this.state.email)
        }


        // data.append("confirm_password",this.state.password)
        if (this.state.name) {
            data.append("user_name", this.state.name)
        }

        // if(this.state.email){
        //     data.append('email', this.state.mobile)
        // }

        if (this.state.mobile) {
            data.append('mobile', this.state.mobile)
        }

        // if(this.state.password){
        //     data.append('new_password', this.state.password)
        // }

        // if(this.state.password){
        //     data.append('confirm_password', this.state.password)
        // }
        if (this.state.dummy) {
            data.append("profile_pic", { name: "Screenshot_20200419-053501.jpg", type: "image/jpeg", uri: (this.state.croppedDpImage?this.state.croppedDpImage :this.state.coverPhoto) })
        }

        if (this.state.dummycover) {
            data.append("cover_pic", { name: "Screenshot_20200419-053503.jpg", type: "image/jpeg", uri: (this.state.croppedImage?this.state.croppedImage :this.state.coverPhoto) })
        }

        console.log("form data", data)
        let h = new Headers();
        h.append('Accept', 'application/json');
        h.append('Authorization', this.props.user_token)

        try {

            fetch('http://18.220.123.51/api/update-user-profile', {
                method: 'POST',
                headers: h,
                body: data
            }, () => console.log("body_data>>>>>", body)
            ).then((response) => response.json())

                .then((responseJson) => {
                    this.setState({ loader: false })
                    console.log("Edit_profile_resp==>", responseJson)
                    if (responseJson.status == "SUCCESS") {
                        message.message = 'Profile Updated successdully'
                        message.type = 'success'
                        this.sharedClass.ShowSnakBar(message)
                        !donotNavigate&&this.props.navigation.goBack()
                        //alert(responseJson.status)
                        //    this.props.navigation.navigate("Profile")
                    }
                    else {
                        console.log("error_in_edit_profile")
                    }

                })
                .catch((error) => {
                    console.log("error in edit page", error)
                    alert(error)
                });
        }
        catch (e) {
            this.setState({ loader: false })
            console.log("error", e)
            alert('Please check your network connection')
        }
        // }
        // else {
        //     alert("profile pic select is mendetory.")
        //     this.setState({ dummy: false })
        // }
    }

    renderNavBar = () => (
        <View style={styles.navContainer}>
    <View style={styles.statusBar} />

          <View style={styles.navBar}>
            <Icon name ='chevron-back' size={40} color={colors.white} onPress={() => this.props.navigation.goBack()} />
            <TouchableOpacity style={styles.iconRight} >
            <MaterialCommunityIcons name ='pencil-box'  size={45} color={colors.white} onPress={()=>this.OpenCameraForCover()}  />
            </TouchableOpacity>
            
          </View>
        </View>
      );
       
       renderContent = () => {
        return (
          <View style={styles.body,{backgroundColor:'black',height:'100%'}}>
            <KeyboardAwareScrollView style={{height:'100%',paddingBottom:120,backgroundColor:'black'}}>
          <View style={{flexDirection:'column',backgroundColor:'black'}}>
            <View style={{paddingBottom:20,backgroundColor:'black',flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
            <Thumbnail  style ={{left:4,top:12, padding:60,borderRadius:70,backgroundColor:'rgba(0,0,0,.4)',backgroundColor:'grey',borderColor:'white',borderWidth:4}} medium 
            source={this.state.dummy ?
                 //Using coverPhotoCopy here coz, need this case to deal with 'Cancel' button
                { uri:  (this.state.croppedDpImage?this.state.croppedDpImage :ApiUrl.prfile_img +this.state.avatarSourceCopy)} :  
                this.state.avatarSource ? ({uri:ApiUrl.prfile_img +this.state.avatarSource}): {uri:'https://image.shutterstock.com/image-vector/person-icon-260nw-282598823.jpg'} }
            />
              <TouchableOpacity onPress={()=>this.OpenCamera()} style={{backgroundColor:'white',top:'82%',left:'25%',borderWidth:2,borderRadius:20,borderColor:'white',padding:2,position:'absolute'}} >
      <Icon name ='camera'  size={26} color={colors.black}  />
      </TouchableOpacity>
           </View>
           <View style={{ flexDirection: 'row', marginVertical: 10 }} >
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain', marginHorizontal: 15 }} source={localImages.userEdit} />
                                <View >
                                    <Text style={{ color: colors.yellow, fontSize: 16 }} >Username</Text>
                                    <TextInput onChangeText={(text) => this.setState({ name: text })} style={{ width: width - 100, color:colors.white,fontWeight:'900',fontSize:18}}
                                        value={this.state.name}  underlineColorAndroid={colors.yellow} placeholder="username" placeholderTextColor={colors.light_gray} />
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row', marginVertical: 10 }} >
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain', marginHorizontal: 15 }} source={localImages.emailEdit} />
                                <View >
                                    <Text style={{ color: colors.yellow, fontSize: 16 }} >E-mail</Text>
                                    <TextInput autoCompleteType="off" onChangeText={(text) => this.setState({ email: text })}
                                        style={{ width: width - 100,color:colors.white,fontWeight:'900',fontSize:18 }}
                                        keyboardType = 'email-address'
                                        value={this.state.email} underlineColorAndroid={colors.yellow} placeholder="E-mail" placeholderStyle={{ fontSize: 14, color:colors.light_gray }} />
                                </View>
                            </View>




                            <View style={{ flexDirection: 'row', marginVertical: 10 }} >
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain', marginHorizontal: 15 }} source={localImages.mobileEdit} />
                                <View >
                                    <Text style={{ color: colors.yellow, fontSize: 16 }} >Mobile</Text>
                                    <TextInput style={{ width: width - 100 , color:colors.white,fontWeight:'900',fontSize:18}}
                                        value={this.state.mobile} keyboardType = "phone-pad"
                                        onChangeText={(text) => this.setState({ mobile: text })}
                                        underlineColorAndroid={colors.yellow} placeholder="Enter contact number" placeholderTextColor={colors.light_gray} />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginVertical: 10 }} >
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain', marginHorizontal: 15 }} source={localImages.panelEdit} />
                                <View >
                                    <Text style={{ color: colors.yellow, fontSize: 16 }} >Enter Bio</Text>
                                    <TextInput onChangeText={(text) => this.setState({ bio: text })}
                                        style={{ width: width - 100,color:colors.white,fontWeight:'900',fontSize:18 }}
                                        value={this.state.bio}
                                        multiline={true}
                                        secureTextEntry={false}
                                        underlineColorAndroid={colors.yellow} placeholder="Enter Bio" placeholderTextColor={colors.gray}  />
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => this.Save()} style={{ width: 80, height: 40, alignSelf: 'flex-end', margin: 20, backgroundColor: colors.yellow, alignItems: 'center', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }} >Save</Text>
                            </TouchableOpacity>

      
           </View>
            </KeyboardAwareScrollView>
          </View>
        );
      };
    //   OpenCameraForCover = () => {
    //     const options = {
    //         title: 'Select Cover',
    //         quality: .7,
    //         maxWidth: 500,
    //         maxHeight: 500,
    //         storageOptions: {
    //             skipBackup: true,
    //             path: 'images',
    //         },
    //     };

    //     ImagePicker.showImagePicker(options, (response) => {
    //         console.log('Response = ', response);

    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         } else {
    //             const source = { uri: response.uri };

    //             // You can also display the image using data:
    //             // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    //             this.setState({
    //                 preview: true,
    //                 coverPhoto: source.uri,
    //                 dummycover: true
    //             }, () => { console.log("Image_state_in_crop_img_picker", this.state.dummy) });
    //         }
    //     });
    // }
    setCropperParams = cropperParams => {
        this.setState(prevState => ({
          ...prevState,
          cropperParams,
        }));
      };

      handlePress = async () => {
          console.log('handle pressedd')
        const { cropperParams } = this.state;

        this.setState({
            preview:false
        })
     
        const cropSize = {
          width: width,
          height: height*0.35,
        };
     
        const cropAreaSize = {
          width: width,
          height: height*0.35,
        };
     
        try {
            console.log('cropper params',cropperParams)
          const result = await ImageCropper.crop({
            ...cropperParams,
            imageUri: this.state.coverPhoto,
            cropSize,
            cropAreaSize,
          });
          console.log('result>>>>',result)
          this.setState(prevState => ({
            ...prevState,
            croppedImage: result,
          }));
          this.Save(true)
        } catch (error) {
          console.log('error----',error);
        }
      };

      handleDpPress = async () => {
        console.log('handle pressedd')
      const { cropperParams } = this.state;
      const cropSize = {
        width: width,
        height: height*0.35,
      };
   
      const cropAreaSize = {
        width: width,
        height: height*0.35,
      };
   
      try {
        const result = await ImageCropper.crop({
          ...cropperParams,
          imageUri: this.state.avatarSource,
          cropSize,
          cropAreaSize,
        });
        console.log('result>>>>',result)
        this.setState(prevState => ({
          ...prevState,
          croppedDpImage: result,
          dpPreview:false
        }));
        this.Save(true)
      } catch (error) {
        console.log('error----',error);
      }
    };

    render() {
        const Overlay = (
            <Image
              style={{
                height: width,
                width: width,
              }}
              source={overlayPng}
              resizeMode="contain"
            />
          );
        if(this.state.preview){
            return(
                <View style={{flex:1,justifyContent:'flex-start',alignContent:'flex-start',flexDirection:'column'}}> 
                    <ImageCropper
                        //imageUri={'https://picsum.photos/id/48/900/500'}
                        imageUri={this.state.coverPhoto}
                        // style={{paddingTop:0,paddingBottom:0}}
                        cropAreaWidth={width}
                        cropAreaHeight={height*0.35}
                        containerColor="black"
                        areaColor="white"
                        setCropperParams={this.setCropperParams}
                    />
                    <Button transparent style={{left:25, top:30, zIndex:12}} onPress={()=>this.setState({preview:false})}>
                         <Text style={{fontSize:20, color:"white",fontWeight:"bold"}}>Cancel</Text>
                    </Button>
                        <Text style={{alignSelf:'center',left:8, top:30,fontSize:20, color:"white",fontWeight:"500"}}>Preview</Text>                    
                    <Button onPress={this.handlePress} transparent style={{right:30, top:30, zIndex:12,position:"absolute"}}>
                         <Text style={{fontSize:20, color:"white",fontWeight:"bold"}}>Save</Text>
                    </Button>

                    </View>
    
       
        
            )
        }
        if(this.state.dpPreview){
            return(
                <View style={{flex:1,justifyContent:'flex-start',alignContent:'flex-start',flexDirection:'column'}}> 
                    <ImageCropper
                        //imageUri={'https://picsum.photos/id/48/900/500'}
                        imageUri={this.state.avatarSource}
                        // style={{paddingTop:0,paddingBottom:0}}
                        cropAreaWidth={width}
                        cropAreaHeight={width}
                        containerColor="black"
                        areaColor="white"
                        setCropperParams={this.setCropperParams}
                        areaOverlay={Overlay}
                    />
                    <Button transparent style={{left:25, top:30, zIndex:12}} onPress={()=>this.setState({dpPreview:false})}>
                         <Text style={{fontSize:20, color:"white",fontWeight:"bold"}}>Cancel</Text>
                    </Button>
                        <Text style={{alignSelf:'center',left:8, top:30,fontSize:20, color:"white",fontWeight:"500"}}>Preview</Text>                    
                    <Button onPress={this.handleDpPress} transparent style={{right:30, top:30, zIndex:12,position:"absolute"}}>
                         <Text style={{fontSize:20, color:"white",fontWeight:"bold"}}>Save</Text>
                    </Button>

                    </View>
    
       
        
            )
        }
         return(
             
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : 'height'} style={{position:'absolute',backgroundColor:'black',top:0,width:'100%',height:'100%'}}>
            <ReactNativeParallaxHeader
              headerMinHeight={HEADER_HEIGHT}
              headerMaxHeight={height*0.35}
              extraScrollHeight={20}
              navbarColor= {colors.black}
              titleStyle={styles.titleStyle}
              //title={this.title()}
              backgroundImage={this.state.dummycover ?
                //Using coverPhotoCopy here coz, need this case to deal with 'Cancel' button
                { uri:  (this.state.croppedImage ?this.state.croppedImage :ApiUrl.prfile_img +this.state.coverPhotoCopy)} :  
                this.state.coverPhoto ? ({uri:ApiUrl.prfile_img +this.state.coverPhoto}): localImages.defaultCover }
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
          </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    contentContainer: {
      flexGrow: 1,
      backgroundColor:'black'
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