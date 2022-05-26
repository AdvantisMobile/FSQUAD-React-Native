
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
import { View, StyleSheet, Text,Keyboard, PermissionsAndroid, SafeAreaView,KeyboardAvoidingView, Slider, ImageBackground, Dimensions, Image, TouchableOpacity, TextInput, ScrollView, FlatList, Modal, ProgressViewIOS } from 'react-native';
import { connect } from 'react-redux';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
const { width, height } = Dimensions.get('window');
const colorYellow = "#FDBA12";
import AwesomeAlert from 'react-native-awesome-alerts';
// import { add_post_0, getHomePost } from '../../redux/action/action_creater';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video'

import Swiper from 'react-native-swiper'

import {Button} from 'native-base'

import SharedClass from '../../utils/SharedClass'
import { colors, fonts, localImages ,ApiUrl} from '../../utils/constant'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import MentionInput from 'react-native-mention';
// Geocoder.init("AIzaSyBzAlXflCg86yKMXyK5TXXMv1Z5BQRqDh0");
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 80 : 64) : 64;
let tempArray = [{ Img: "" }]
let parmArray = []


class AddRecipePost extends React.Component {
    constructor(props) {
        super(props);
        this.sharedClass = new SharedClass();
        this.state = {

            PickerModalVisible: false, ImageSourceviewarray: [], filter_menu_visible: false,

            filter_img_index: 0, activeFilter: "f", filter_type: 'Normal',
            post_description: "", loc: "", btnNext: "Next",

            sliderIndex: 0,
            images: [],
            selectedImages:[],
            taggedUser:[],
            imageHeight: width*0.9,
            filters: [{ name: "Orignal", type: "Normal" },
            { name: "Toaster", type: "ToasterCompat" },
            { name: "Technicolor", type: "Technicolor" },
            { name: "Grayscale", type: "Grayscale" },
            { name: "Sepia", type: "Sepia" },
            { name: "Invert", type: "Invert" },
            { name: "Inkwell", type: "Inkwell" },
            { name: "Achro", type: "Achromatomaly" },
            { name: "Acrospia", type: "Achromatopsia" },
            { name: "Aden", type: "Aden" },
            { name: "AdenCom", type: "AdenCompat" },
            { name: "Brannan", type: "Brannan" },
            { name: "Brooklyn", type: "Brooklyn" },
            { name: "Clarendon", type: "Clarendon" },
            { name: "DarkenBlend", type: "DarkenBlend" },
            { name: "Deutyi", type: "Deuteranomaly" },
            { name: "Temperature", type: "Temperature" },
            { name: "HardLightBlend", type: "HardLightBlend" },

            ],
            Filterd_Img0: '', Filterd_Img1: '', Filterd_Img2: '', Filterd_Img3: '', Filterd_Img4: '',

            Img_blur0: 0, Img_blur1: 0, Img_blur2: 0, Img_blur3: 0, Img_blur4: 0


            , filter_type0: 'Normal', filter_type1: 'Normal', filter_type2: 'Normal', filter_type3: 'Normal', filter_type4: 'Normal'
            , Img_0: null, Img_1: null, Img_2: null, Img_3: null, Img_4: null, Img_5: null, Img_Source: "0"
            , Temp_Img_0: null, Temp_Img_1: null, Temp_Img_2: null, Temp_Img_3: null, Temp_Img_4: null, Temp_Img_5: null,
            Temp_Img_blur_0: null, Temp_Img_blur_1: null, Temp_Img_blur_2: null, Temp_Img_blur_3: null, Temp_Img_blur_4: null, Temp_Img_blur_5: null,

            currentLongitude: '', currentLatitude: '',
            TagPeopleModal: false, Friends: [],
            loader: false
        }


    }
    componentDidMount() {

        _this = this;

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', ()=>_this.setState({imageHeight:width*0.2}));
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidHide', ()=>_this.setState({imageHeight:width*0.9}));
        this.fetch_friendsList();
        const { navigation,route } = this.props;
        console.log(navigation,route.params)
        var data = route.params.images
        this.setState({
            images: data,
            selectedImages : data
        })
        this.requestCameraPermission();
        // this.GetFriendList();
        Geolocation.watchPosition((position) => {
            //Will give you the location on location change
            console.log("wfwfwfqwfwaff", position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            this.setState({ currentLatitude: currentLatitude, currentLongitude: currentLongitude })
            //  that.setState({ currentLongitude:currentLongitude });
            //Setting state Longitude to re re-render the Longitude Text
            //  that.setState({ currentLatitude:currentLatitude });
            //Setting state Latitude to re re-render the Longitude Text

            //  this.initUser(this.props.FbAccessToken);
        });

    }

    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION],
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');

            } else {
                // this.takePics()
                this.setState({ PickerModalVisible: false })
                console.log('Camera permission denied');

                LocationServicesDialogBox.checkLocationServicesIsEnabled({
                    message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
                    ok: "YES",
                    cancel: "NO",
                    enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
                    showDialog: true, // false => Opens the Location access page directly
                    openLocationServices: true, // false => Directly catch method is called if location services are turned off
                    preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
                    preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
                    providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
                }).then((success) => {
                    this.callLocation(this); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
                }).catch((error) => {
                    console.log(error.message); // error.message => "disabled"
                });


            }
        } catch (err) {
            console.warn(err);
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.postUpload == "Y") {
            nextProps.navigation.navigate("Home")
        }
    }

    componentDidUpdate() {

        if (this.props.postUpload == "Y") {
            const data = JSON.stringify({
                token: this.props.loginuserToken,
                offset: "0",
                limit: "10"
            })
            this.props.getHomePost(data);

        }


    }
    
    fetch_friendsList() {

        console.log("__token_in_frnd_list", this.props.loginuserToken)
        var data = JSON.stringify({

            "token": this.props.loginuserToken,

        })
        console.log("__data_in_frnd_list", data)
        var temp_api = 'http://18.220.123.51/api/fetch-friends'
        console.log("__temp_api", temp_api)
        try {
            fetch(temp_api, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then((response) => response.json())
                .then((response) => {
                    console.log("userFriendList response=>", response)
                    this.setState({
                        Friends: response.result
                    })
                })
                .catch((error) => {
                    console.log("error", error)
                    alert(error)
                });
        }
        catch (e) {
            console.log("error", e)
            alert('Please check your network connection')
        }
    }
    callLocation(that) {

        that.watchID = Geolocation.watchPosition((position) => {
            //Will give you the location on location change
            console.log("wfwfwfqwfwaff", position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            this.setState({ currentLatitude: currentLatitude, currentLongitude: currentLongitude })
            //  that.setState({ currentLongitude:currentLongitude });
            //Setting state Longitude to re re-render the Longitude Text
            //  that.setState({ currentLatitude:currentLatitude });
            //Setting state Latitude to re re-render the Longitude Text

            //  this.initUser(this.props.FbAccessToken);
        });

        //   Geocoder.from(41.89, 12.49)
        // .then(json => {
        // var addressComponent = json.results[0].address_components[0];
        // 	console.log("Addresss",addressComponent);
        // })
        // .catch(error => console.warn(error));


    }
    Add_Post() {
        const data = new FormData();
        if (this.state.selectedImages.length == 0) {
            message.message = 'Please Select Image'
            message.type = 'info'
            this.sharedClass.ShowSnakBar(message)
            return
        }
        data.append("token", this.props.loginuserToken);
        data.append("user_id", this.props.userDetails.id)
        data.append("post_description", this.state.post_description)
        data.append("location", "indore")
        data.append("latitude", "6565.4")
        data.append("longitude", "215.12")


        if(this.state.taggedUser){
            data.append("tag_friends",this.state.taggedUser.join(','))
        }
        


        // {this.state.Img_0 != null ?  this.state.Img_blur0 == 0 ? data.append("image","content://media/external/images/media/160369") : data.append("image","content://media/external/images/media/160369") : null }


        // if (this.state.selectedImages.length > 0) {
        //     data.append("post_images[0]", { name: "Screenshot_20200419-053501.jpg", type: "image/jpeg", uri: this.state.selectedImages[0].path })
        // }
        // if (this.state.selectedImages.length > 1) {
        //     data.append("post_images[1]", { name: "Screenshot_20200419-053502.jpg", type: "image/jpeg", uri: this.state.selectedImages[1].path })
        // }
        // if (this.state.selectedImages.length > 2) {
        //     data.append("post_images[2]", { name: "Screenshot_20200419-053503.jpg", type: "image/jpeg", uri: this.state.selectedImages[2].path })
        // }
        // if (this.state.selectedImages.length > 3) {
        //     data.append("post_images[3]", { name: "Screenshot_20200419-053504.jpg", type: "image/jpeg", uri: this.state.selectedImages[3].path })
        // }

        if (this.state.selectedImages.length > 0)
        {
           
            for (let index = 0; index < this.state.selectedImages.length; index++) {
                const element = this.state.selectedImages[index];
                if (element.path.toString().split('.').pop() === 'mp4')
                {
                    data.append(`post_images[${index}]`, {name : `post${index+1}.mp4`,type :"mp4", uri:element.croppedPath?element.croppedPath:element.path, resize:element.resize})
  
                }
                else
                data.append(`post_images[${index}]`, {name : `post${index+1}.jpg`,type :"image/jpg", uri:element.croppedPath?element.croppedPath:element.path, resize:element.resize})
                
            }
        }
      
        console.log("_Image_data_in_addRecipe_page", data)
       this.addPost(data)
        //  this.props.add_post_0(data);
        //  this.props.navigation.navigate("Home")

    }
    addPost(data) {

        try {
            this.setState({
                loader: true
            })
            fetch('http://18.220.123.51/api/add-post', {
                method: 'POST',
                body: data
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        loader: false
                    })
                    console.log("Resp_for_image_from_recipe_page", responseJson)
                    if (responseJson.status == "SUCCESS") {
                        //  ToastAndroid.show("Posted", ToastAndroid.SHORT);
                        console.log("sdsdad", responseJson.result)
                        this.props.navigation.navigate('Home')

                    }
                    else {
                        alert(responseJson.error.message.meaning)

                    }

                })
                .catch((error) => {
                    this.setState({
                        loader: false
                    })
                    console.log("wdfwdfefd", error)

                    //  alert(error)

                });
        }
        catch (e) {
            console.log("wdfwdfefd", e)

            alert('Please check your network connection')
        }
    }

    // pickModal = () => {
    //     return (
    //         <Modal visible={true} transparent={true} >
    //             <TouchableOpacity onPress={() => { this.setState({ PickerModalVisible: false }), this.props.navigation.navigate("Home") }} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', }} >
    //                 <View style={{ width: width, height: height / 2 + 100, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#000', opacity: 0.7 }} >
    //                     <Text style={{ color: color.white, fontSize: 20, fontWeight: 'bold' }} >Food Camera</Text>
    //                 </View>
    //                 <TouchableOpacity activeOpacity={1} style={{ width: width, height: height / 3 - 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#fff', marginBottom: 50 }} >
    //                     <TouchableOpacity onPress={() => this.OpenCamera()} style={{ alignItems: 'center', justifyContent: 'center' }} >
    //                         <Text>Take Photo</Text>
    //                         <Image style={{ width: 100, height: 100, resizeMode: 'center' }} source={Images.take_photo} />
    //                     </TouchableOpacity>

    //                     <TouchableOpacity onPress={() => this.OpenGallery()} style={{ alignItems: 'center', height: height / 3 - 50, justifyContent: 'center' }} >
    //                         <Text style={{ textAlign: 'center' }} >Choose From {'\n'} Gallery</Text>
    //                         <Image style={{ width: 100, height: 100, resizeMode: 'center' }} source={Images.take_from_gallery} />
    //                     </TouchableOpacity>
    //                     <TouchableOpacity onPress={() => this.pickSingleWithCamera(false, mediaType = 'video')} style={{ alignItems: 'center', height: height / 3 - 50, justifyContent: 'center' }} >
    //                         <Text style={{ textAlign: 'center' }} >Choose {'\n'} Video</Text>
    //                         <Image style={{ width: 100, height: 100, resizeMode: 'center' }} source={Images.take_photo} />
    //                     </TouchableOpacity>
    //                 </TouchableOpacity>
    //             </TouchableOpacity>
    //         </Modal>
    //     )
    // }


    OpenGallery = () => {
        ImagePicker.openPicker({
            // width: 200,
            // height: 200, compressImageMaxHeight: 400,
            mediaType: 'any', maxFiles: 4, multiple: true

            // compressImageMaxWidth: 400, cropping: true , multiple: true ,
            // showsSelectedCount:true
        })
            .then(response => {

                console.log("responseimage-------" + response)
                this.setState({ ImageSource: response })
                console.log("responseimagearray" + this.state.ImageSource)
                response.map((data, key) => {
                    console.log("wd", data)
                    if (key == 0) {
                        this.setState({ Img_0: data.path, Img_Source: "0" })
                    }
                    else if (key == 1) {
                        this.setState({ Img_1: data.path })
                    }
                    else if (key == 2) {
                        this.setState({ Img_2: data.path })
                    }
                    else if (key == 3) {
                        this.setState({ Img_3: data.path })
                    }
                    else if (key == 4) {
                        this.setState({ Img_4: data.path })
                    }
                    else if (key == 5) {
                        this.setState({ Img_5: data.path })
                    }
                })
                this.setState({ PickerModalVisible: false, filter_menu_visible: true })

                // response.forEach((item , key) => {
                //     console.log("sdiusjhdjisgdjhiesgdfijhgedf",key)
                //     let image = {
                //     uri: item.path,
                //     width: item.width,
                //     height: item.height,
                //     }

                //     tempArray.push(image)
                //     // parmArray.push(image)
                //     this.setState({ ImageSourceviewarray: tempArray })
                //     // console.log('savedimageuri====='+item.path);



                //     // console.log("imagpath==========" + tempArray[0])

                // })
                if (this.state.ImageSourceviewarray.length > 0) {

                }
            })
    }

    OpenCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            multiple: true,
            loadingLabelText: "Loading.."
        }).then(image => {
            if (image.path != null) {
                let img = {
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                }
                tempArray.push(img)
                this.setState({ PickerModalVisible: false })
            }
        });
    }
    SelectVideo = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            // cropping: true,
            multiple: true,
            mediaType: 'video',
            loadingLabelText: "Loading.."
        }).then(image => {
            console.log(image);
        });

    }
    // pickSingleWithCamera(cropping, mediaType='photo') {
    //     ImagePicker.openCamera({
    //       cropping: cropping,
    //       width: 500,
    //       height: 500,
    //       includeExif: true,
    //       mediaType,
    //     }).then(image => {
    //       console.log('received image', image);

    //         image= {uri: image.path, width: image.width, height: image.height, mime: image.mime},
    //         tempArray.push(image)
    //         this.setState({PickerModalVisible:false})

    //     }).catch(e => alert(e));
    //   }
    pickSingleWithCamera(cropping, mediaType = "video") {
        ImagePicker.openPicker({
            mediaType: "video", maxFiles: 4, multiple: true
        }).then((response) => {

            console.log("vdo_in_crop_picker", response);

            // tempArray.push(video)
            response.map((data, key) => {
                console.log("wd", data)
                if (key == 0) {
                    this.setState({ video0: data.path, Img_Source: "0" })
                }
                else if (key == 1) {
                    this.setState({ video1: data.path })
                }
                else if (key == 2) {
                    this.setState({ video2: data.path })
                }
                else if (key == 3) {
                    this.setState({ video3: data.path })
                }
                else if (key == 4) {
                    this.setState({ video4: data.path })
                }

            })
            this.setState({ PickerModalVisible: false })
        });
    }

    renderVideo(video) {
        console.log('rendering video');
        return (<View style={{ height: 300, width: 300 }}>
            <Video source={{ uri: video.uri, type: video.mime }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }}
                rate={1}
                paused={false}
                volume={1}
                muted={false}
                resizeMode={'cover'}
                onError={e => console.log(e)}
                onLoad={load => console.log(load)}
                repeat={true} />
        </View>);
    }

    renderImage(image) {
        return <Image style={{ width: 300, height: 300, resizeMode: 'contain' }} source={image} />
    }

    renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            return this.renderVideo(image);
        }

        return this.renderImage(image);
    }


    HitApi() {
        this.setState({ filter_menu_visible: false })
        let data = new FormData();
        data.append("token", this.props.loginuserToken);
        data.append("user_id", this.props.userDetails.id)
        data.append("post_description", this.state.post_description)
        data.append("location", this.state.loc)
        data.append("latitude", "154.000")
        data.append("longitude", "253.262")
        data.append("tag_friend[0]", "d")
        data.append("post_images[0]", "http://example//1com.png")

        console.log("formData", data);

        // this.props.add_post_0(data);
    }


    Next = () => {
        this.state.Img_1 != null && this.state.Img_Source == "0" ? this.setState({ Img_Source: "1" }) :
            this.state.Img_2 != null && this.state.Img_Source == "1" ? this.setState({ Img_Source: "2" }) :
                this.state.Img_3 != null && this.state.Img_Source == "2" ? this.setState({ Img_Source: "3" }) :
                    this.state.Img_4 != null && this.state.Img_Source == "3" ? this.setState({ Img_Source: "4" }) :
                        this.setState({ btnNext: "Done" })
    }

    Prev = () => {
        this.state.Img_Source == "0" ? this.setState({ Img_Source: "0" }) :
            this.state.Img_Source == "1" ? this.setState({ Img_Source: "0" }) :
                this.state.Img_Source == "2" ? this.setState({ Img_Source: "1" }) :
                    this.state.Img_Source == "3" ? this.setState({ Img_Source: "2" }) :
                        this.state.Img_Source == "4" ? this.setState({ Img_Source: "3" }) :
                            this.state.Img_Source == "5" ? this.setState({ Img_Source: "4" }) :

                                null

    }
    Done = () => {
        this.ParseImage();
    }
    ParseImage() {
        //    this.state.Img_blur0 == 0 ? this.setState({Filterd_Img0:this.state.Temp_Img_0}) : this.setState({Filterd_Img0:this.state.Temp_Img_blur_0})
        this.setState({ filter_menu_visible: false })
    }
    onTag=(user_id)=>{
      let tagUsers=this.state.taggedUser
      let index=tagUsers.indexOf(user_id)

      if(index>-1){
    let dataFilter=    tagUsers.filter(it=>it!=user_id)
        this.setState({
            taggedUser:dataFilter
        })
      }else{
        tagUsers.push(user_id)
        this.setState({
            taggedUser:tagUsers
        })
      }
    }

    render() {
        console.log("isl", this.props.isLoading)
        //   var flag = this.props.navigation.getParam("flag");

   
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : 'height'} style={{backgroundColor:'black',top:-0.5,width:'100%',height:'100%',flex:1}}>

                    {/* <View style={{ flexDirection: 'row', backgroundColor: '#fff', width: width, height: 50, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }} >
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image style={{ width: 25, height: 15, color: 'blue' }} source={localImages.backArrow} />
                        </TouchableOpacity>
                        <Text style={{ color: colorYellow, fontSize: 18, marginLeft: 15 }} >New Post</Text>
                        <Text onPress={() => this.Add_Post()} style={{ fontSize: 18, fontWeight: 'bold' }} >Share</Text>
                    </View> */}

                    <View style={{ width: width, height:  this.state && this.state.imageHeight, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#fff', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} >


                        {/* {this.state.PickerModalVisible ? null : <FlatList horizontal={true} data={tempArray}
                   renderItem={({item,index})=>{
                    return(
                       )
                   }}
                   />} */}
                        <Swiper ref='swiper' 
                        showsButtons={false} 
                        scrollEnabled={true} 
                        autoplay ={false} 
                        index = {this.state.sliderIndex ? this.state.sliderIndex : 0}
                        loop={false}  
                        onIndexChanged={(index) => { 
                            console.log("Index changed", index)
                            this.setState({sliderIndex:index},()=> {
                                console.log("Index way"); 
                            })
                        }} >
              {
                this.state.selectedImages.length > 0 &&
                this.state.selectedImages.map((post, key) => {
                    //  Image.getSize(post.path, (width,height) => {this.setState({width, height})})
                    //console.log('imgae width',this.state.width)
                  return (
                
                    <View key = {key} style={{backgroundColor:'black',width:'100%',height:'100%',justifyContent:'center',alignSelf:'center',flex:1}}>
              
                       { 
                   
                       post.path.toString().split('.').pop() === 'mp4' ?
                        
                       <Video
                            source={{uri:post.path}}
                            rate={1.0}
                            volume={1.0}
                            paused={!this.state.selectedImages.indexOf(post)}
                            muted={this.state.selectedImages.indexOf(post)}
                            resizeMode="cover"
                            repeat ={true}
                            style={{
                                width: '100%',
                                height: '100%',
                                    }}
                                />
                                :
                         
                                 
                    <View style={{flex:1,justifyContent:'flex-start',alignContent:'flex-start',flexDirection:'column'}}> 
                    {/* {this.getImageSize(post.path)  } */}

                   
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:'100%',position:'absolute',zIndex:-2}} />
                    
                    
                    <Button transparent style={{left:25, top:30, zIndex:12}} onPress={()=>{
                        this.setState({},()=>this.props.navigation.goBack())
                    }}>
                         <Text style={{fontSize:20, color:"white",fontWeight:"bold"}}>Back</Text>
                    </Button>
                        <Text style={{alignSelf:'center',left:8, top:20,fontSize:20, color:"white",fontWeight:"500"}}>New Post</Text>                    
                    <Button onPress={() => this.Add_Post()} transparent style={{right:30, top:30, zIndex:12,position:"absolute"}}>
                         <Text style={{fontSize:20, color:"white",fontWeight:"bold"}}>Save</Text>
                    </Button>
                   
                    </View>
                          
                            
                            }    
                   
                      </View>
                  );
                })}
            </Swiper> 

                    </View>
                                <ScrollView>

                    <View style={{ flex: 1, backgroundColor:'black',top:30,justifyContent:'space-between',alignItems:'center' }} >
                        <View style={{ width: width - 50, height: hp('13%'), marginTop: 10, justifyContent: 'center', alignSelf: 'center', paddingLeft: 20, borderColor: '#fff', borderWidth: 1, borderRadius: 10 }}>
                            <TextInput onChangeText={(text) => this.setState({ post_description: text })}
                                style={{ marginRight: 10, width: wp('78%'), height: hp('12%'), borderColor: '#fff', borderWidth: 0, borderRadius: 10, paddingBottom: 45,color:'white' }}
                                multiline={true}
                                multiple={true}
                                placeholder="Your Description here" placeholderTextColor="gray" />

                        </View>
                        <TouchableOpacity onPress={() => this.setState({ TagPeopleModal: true })} style={{ width: width - 50, height: 50, justifyContent: 'center', marginTop: 10, alignSelf: 'center', paddingLeft: 20, borderColor: '#fff', borderWidth: 1, borderRadius: 10,color:'white' }}  >
                            <Text style={{ color: 'gray' }} > {this.state.taggedUser.length?this.state.taggedUser.length+' Tagged User' :'Tag People'}</Text>
                        </TouchableOpacity>
                        <TextInput onChangeText={(text) => this.setState({ loc: text })} style={{ width: width - 50, height: 50, marginTop: 10, alignSelf: 'center', paddingLeft: 20, borderColor: '#fff', borderWidth: 1, borderRadius: 10,color:'white' }} placeholder="Add Location" placeholderTextColor="gray" />
                        {/* <TextInput style={{width:width-50,marginTop:10,alignSelf:'center',paddingLeft:20,borderColor:'#fff',borderWidth:1,borderRadius:10}}  placeholder="Tag People" placeholderTextColor="#fff" /> */}

                        {/* <View style={{width:width-50,paddingHorizontal:10,marginVertical:10,alignSelf:'center',justifyContent:'space-between',flexDirection:'row',alignItems:'center'}} >
                  <Text style={{color:'#fff',fontSize:16,marginTop:10}} >I cooked it !</Text>
                  <SwitchBar color="#fff"  source={Images.swtRound1}/>
                </View>


               <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}} >
                 <TouchableOpacity style={{backgroundColor:'#fff',borderRadius:15,width:width/3-10,alignItems:'center',justifyContent:'center'}} >
                   <Text style={{color:colorYellow,padding:10}} >Add Recipe</Text>
                 </TouchableOpacity>

                  <Text style={{fontSize:18,color:'#fff'}} >Or</Text>

                 <TouchableOpacity style={{backgroundColor:'#fff',borderRadius:15,width:width/2-20,alignItems:'center',justifyContent:'center'}} >
                     
                   <Text style={{color:colorYellow,padding:10}} >Tag Orignal Recipe</Text>
                 </TouchableOpacity>

               </View> */}

                        {/* <Text onPress={() => this.HitApi()} style={{color:color.blue,marginTop:20,fontSize:18,textAlign:'center'}} >Post</Text> */}
                    </View>
                    {/* {this.state.PickerModalVisible ? <this.pickModal /> : null} */}
                </ScrollView>
                {/* {this.state.filter_menu_visible ?   <this.FilterScreen/> : null } */}

                <AwesomeAlert
                    show={this.state.loader}
                    showProgress={true}
                />

                <Modal visible={this.state.TagPeopleModal} >
                    <View style={{ flex: 1 }} >
                        <TouchableOpacity onPress={() => this.setState({ TagPeopleModal: false })} style={{ alignSelf: 'flex-end', margin: 10, marginTop: 30 }}>
                            <Icon style={{}} name="md-close" size={30} />
                        </TouchableOpacity>
                        <FlatList data={this.state.Friends}
                           ItemSeparatorComponent={()=>{
                            return(
                                <View style={{borderBottomColor:color.blueText, borderBottomWidth:1,width:width }}></View>
                               )
                           }
                          
                          
                        
                        }
                            renderItem={({ item, index }) => {
                                // console.log('item', item.friend_details_opposite.first_name)

                                let userSetails=item.friend_details?item.friend_details:  item.friend_details_opposite 
                                return (
                                    <View style={{ width: width - 50, alignSelf: 'center', marginBottom:5 }} >
                                        <TouchableOpacity onPress={()=>this.onTag(item.user_id)} style={{ flexDirection: 'row', alignItems:'center' }}>
                                            {
                                               userSetails.profile_pice ?
                                                    <Image style={{ width: 30, height: 30, borderRadius: 15, }} source={{ uri: ApiUrl.prfile_img + userSetails.profile_pice}} />
                                                    : <Image style={{ width: 30, height: 30, borderRadius: 15, }} source={localImages.userDummy} />
                                            }
                                            <Text style={{marginLeft:10, color: color.blue,}}>{userSetails.first_name}</Text>
                                            <Text style={{marginLeft:2, color: color.blue,}}>{userSetails.last_name}</Text>
                                           {this.state.taggedUser.indexOf(item.user_id)>-1? <Image style={{ width: 20, height: 20, borderRadius: 15, position:'absolute', right:30 }} source={Images.tick} />:null}
                                            
                                        </TouchableOpacity>
                                    </View>
                                )
                            }} />
                    </View>
                </Modal>
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

const styles = StyleSheet.create({
    wrapper: {},
    paddingContainer: {
        flexDirection: 'column',
        padding: 16
    },
    btnActions: {
        fontWeight: 'bold',
        fontSize: 17,
        color: colors.white
    },
    marginContainer: {
        marginTop: 16
    },
    modal: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        flex: 1
    },
    scene: {
        flex: 1,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipePost);
