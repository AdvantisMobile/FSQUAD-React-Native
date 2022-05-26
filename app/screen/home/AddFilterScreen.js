import React from 'react';
import { View, Text, PermissionsAndroid, SafeAreaView, Slider, ImageBackground, Dimensions, Image, TouchableOpacity, TextInput, ScrollView, FlatList, Modal, ProgressViewIOS, Platform, StyleSheet } from 'react-native';


// import Modal from "react-native-modalbox";

import Swiper from 'react-native-swiper'

import { Achromatomaly, Toaster, Achromatopsia, Aden, AdenCompat, BoxBlur,Lofi, Invert, Inkwell, Brannan, Sepia, Brooklyn, Normal, Clarendon, DarkenBlend, Deuteranomaly, HardLightBlend, Grayscale, Technicolor, ToasterCompat, Temperature, GaussianBlur, } from 'react-native-image-filter-kit';

// import { TouchableOpacity } from 'react-native-gesture-handler';
import SharedClass from '../../utils/SharedClass'
import { colors, fonts, localImages ,ApiUrl} from '../../utils/constant'
import {Button} from 'native-base'
import Ionicon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp,  
  } from 'react-native-responsive-screen';
  import overlayPng from '../../assets/images/gridoverlay.jpg';
  import Video from 'react-native-video'

const colorYellow = "#FDBA12";
const { height, width } = Dimensions.get("window")
export default class AddFilterScreen extends React.Component {
    

    constructor(props) {
        super(props);
        this.sharedClass = new SharedClass();
        this.state = {
            isModalOpen: false,
            activeIndex: 0,
            sliderIndex: 0,
            images: [],
            selectedImages :[],
            filterType: [],
            tempImage1: null,
            tempImageArray: [],
            filters: [
                { uri: null, name: "Orignal", type: "Normal" },
                { uri: null, name: "Toaster", type: "ToasterCompat" },
                { uri: null, name: "Technicolor", type: "Technicolor" },
                { uri: null, name: "Grayscale", type: "Grayscale" },
                { uri: null, name: "Sepia", type: "Sepia" },
                { uri: null, name: "Invert", type: "Invert" },
                { uri: null, name: "Inkwell", type: "Inkwell" },
                { uri: null, name: "Achro", type: "Achromatomaly" },
                { uri: null, name: "Acrospia", type: "Achromatopsia" },
                { uri: null, name: "Aden", type: "Aden" },
                { uri: null, name: "AdenCom", type: "AdenCompat" },
                { uri: null, name: "Brannan", type: "Brannan" },
                { uri: null, name: "Brooklyn", type: "Brooklyn" },
                { uri: null, name: "Clarendon", type: "Clarendon" },
                { uri: null, name: "DarkenBlend", type: "DarkenBlend" },
                { uri: null, name: "Deutyi", type: "Deuteranomaly" },
                { uri: null, name: "Temperature", type: "Temperature" },
                { uri: null, name: "HardLightBlend", type: "HardLightBlend" },

            ],
            filtersImage: [
                { uri: null, name: "Orignal", type: "Normal" },
                { uri: null, name: "Toaster", type: "ToasterCompat" },
                { uri: null, name: "Technicolor", type: "Technicolor" },
                { uri: null, name: "Grayscale", type: "Grayscale" },
                { uri: null, name: "Sepia", type: "Sepia" },
                { uri: null, name: "Invert", type: "Invert" },
                { uri: null, name: "Inkwell", type: "Inkwell" },
                { uri: null, name: "Achro", type: "Achromatomaly" },
                { uri: null, name: "Acrospia", type: "Achromatopsia" },
                { uri: null, name: "Aden", type: "Aden" },
                { uri: null, name: "AdenCom", type: "AdenCompat" },
                { uri: null, name: "Brannan", type: "Brannan" },
                { uri: null, name: "Brooklyn", type: "Brooklyn" },
                { uri: null, name: "Clarendon", type: "Clarendon" },
                { uri: null, name: "DarkenBlend", type: "DarkenBlend" },
                { uri: null, name: "Deutyi", type: "Deuteranomaly" },
                { uri: null, name: "Temperature", type: "Temperature" },
                { uri: null, name: "HardLightBlend", type: "HardLightBlend" },

            ],
        };
    }
    async componentDidMount() {
       
        const { navigation,route } = this.props;
        console.log(navigation,route.params)
        var data = route.params.images
        this.setState({
            selectedImages: data
        },()=>console.log('data>>',this.state.selectedImages))
        let datavalue = []
        let filterType = []
        for (let index = 0; index < data.length; index++) {
            datavalue.push({ uri: data[index].croppedPath ? data[index].croppedPath : data[index].path , type: 'Normal' })
            filterType.push({
                type: 'Normal'
            })

        }
        console.log('data value>>',datavalue)
        this.setState({
            tempImageArray: datavalue,
            filterType: filterType
        },()=>console.log('temp>>>',this.state.tempImageArray))
        console.log(data)

    }
    componentWillReceiveProps(nextProps) {
        // @ts-ignore
        const { activeIndex } = this.state;
        if (activeIndex > 0) {
            this.swiper.scrollBy(activeIndex * -1); //offset
        }
    }

    onMomentumScrollEnd(e, state, context) {
        this.setState({ activeIndex: state.index })
    }


    segmentClicked = (index) => {
        this.setState({
            activeIndex: index
        });

        // @ts-ignore
        const { activeIndex } = this.state;
        if (activeIndex > 0) {
            this.swiper.scrollBy(activeIndex * -1); //offset
        }
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
        this.props.navigation.goBack();
    };
    getSelectedImages(image, current) {
        // console.log(image, current, 'Inshad')
        // this.setState({
        //     images: image
        // })
    }
    onNextScreen() {
        let message = {}
        if (this.state.selectedImages.length == 0) {
            message.message = 'Please Select Image'
            message.type = 'info'
            this.sharedClass.ShowSnakBar(message)
            return
        } else {
            console.log(this.state.tempImageArray)
            //this.props.navigation.navigate('AddRecipePost', { images: this.state.tempImageArray })
             this.props.navigation.navigate('AddRecipePost', { images: this.state.selectedImages })

        }
    }
    saveExtractImage(uri) {
        console.log('extraxt', uri)
        let dalavalue = this.state.tempImageArray
        let activeIndex = this.state.sliderIndex
        dalavalue[activeIndex].uri = uri
        this.setState(
            { tempImageArray: dalavalue }
        )

    }

    selectType(type) {
        console.log(type, this.state.sliderIndex)
        let dalavalue = this.state.tempImageArray
        let activeIndex = this.state.sliderIndex
        dalavalue[activeIndex].type = type
        this.setState({
            tempImageArray: dalavalue
        })
        console.log('dalavalue', dalavalue, this.state.tempImage1)


    }

    getImage2 = (item, index) => {
       // var item = {"type": "Brannan"}

        var post = this.state.selectedImages[this.state.sliderIndex]
        console.log('selectedd images>>>',this.state.selectedImages)

        console.log('post>>>',post)

        switch (item.type) {
            case "Achromatomaly":
                // code block
                console.log('reached getImage2----')
                return (

                    <View onPress={() => { this.selectType(item.type) }}  >
                        <Achromatomaly extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)}
                    image={
                        <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style={{width:'100%',height:'100%'}}/>
                    } />
                        <Text style={{ textAlign: 'center', fontSize: 12 }}>{item.name}</Text>
                    </View>


                )
                break;
            case "Achromatopsia":
                // code block
                return (

                    <TouchableOpacity onPress={() => { this.selectType(item.type) }} >
                        <Achromatopsia image={
                        <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style={{width:'100%',height:'100%'}}/>
                    } />
                        <Text style={{ textAlign: 'center', fontSize: 12 }}>{item.name}</Text>
                    </TouchableOpacity>

                )
                break;
           
            default:
            // code block
        }
    }
    getImage(post) {
       var item= {'type':"Normal"}
        //console.log(item, this.state.tempImage1)

        if (item.type == "Achromatomaly") {
            return (

                <Achromatomaly extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)}
                    image={
                        <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:width*1.3,position:'absolute',zIndex:20}} />
                    } />


            )
        }
        else if (item.type == "Achromatopsia") {
            return (

                <Achromatopsia extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)} image={
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:width*1.3,position:'absolute',zIndex:20}} />
                } />

            )
        }
        else if (item.type == "Aden") {
            return (

                <Aden extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)} image={
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:width*1.3,position:'absolute',zIndex:20}} />
                } />

            )
        }
        else if (item.type == "AdenCompat") {
            return (

                <AdenCompat extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)} image={
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:width*1.3,position:'absolute',zIndex:20}} />
                } />

            )
        }
        else if (item.type == "Brannan") {
            return (

                <Brannan extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)} image={
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:width*1.3,position:'absolute',zIndex:20}} />
                } />

            )
        }
        else if (item.type == "Brooklyn") {
            return (

                <Brooklyn extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)} image={
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode='contain' style ={{width:width-80,height:height/2,position:'absolute',zIndex:20}} />
                } />

            )
        }
        else if (item.type == "Normal") {
            return (

                <Normal extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)} image={
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:width*1.3,position:'absolute',zIndex:20}} />
                } />

            )
        }
        else if (item.type == "Clarendon") {
            return (

                <Clarendon extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)} image={
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:width*1.3,position:'absolute',zIndex:20}} />
                } />

            )
        }
        else if (item.type == "Sepia") {
            return (

                <Sepia extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)} image={
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:width*1.3,position:'absolute',zIndex:20}} />
                } />

            )
        }
        else if (item.type == "Deuteranomaly") {
            return (

                <Deuteranomaly extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)} image={
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:width*1.3,position:'absolute',zIndex:20}} />
                } />

            )
        }
        else if (item.type == "Grayscale") {
            return (

                <Grayscale extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)} image={
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:width*1.3,position:'absolute',zIndex:20}} />
                } />

            )
        }
        else if (item.type == "Technicolor") {
            return (

                <Technicolor extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)} image={
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:width*1.3,position:'absolute',zIndex:20}} />
                } />

            )
        }
        else if (item.type == "ToasterCompat") {
            return (

                <ToasterCompat extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)} image={
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:width*1.3,position:'absolute',zIndex:20}} />
                } />

            )
        }
        else if (item.type == "Temperature") {
            return (

                <Temperature extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)} image={
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:width*1.3,position:'absolute',zIndex:20}} />
                } />

            )
        }
        else if (item.type == "Invert") {
            return (

                <Invert extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)} image={
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:width*1.3,position:'absolute',zIndex:20}} />
                } />

            )
        }
        else if (item.type == "Inkwell") {
            return (

                <Inkwell extractImageEnabled={true} onExtractImage={({ nativeEvent }) => this.saveExtractImage(nativeEvent.uri)} image={
                    <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={post.resize && post.resize !== null ? post.resize : 'cover'} style ={{width:'100%',height:width*1.3,position:'absolute',zIndex:20}} />
                } />

            )
        }
    }
    render() {
        // @ts-ignore
        const { isModalOpen } = this.state;

        return (
            <View style={{ flex: 1,backgroundColor:'black',justifyContent:'space-between',flexDirection:'column' }}>

                <View style={{ marginTop: 0, height: width*1.3}}>
                <Swiper ref='swiper' 
                        showsButtons={true} 
                        scrollEnabled={true} 
                        autoplay ={false} 
                        index = {this.state.indexVal ? this.state.indexVal : 0}
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
                
                    <View key = {key} style={{backgroundColor:'black',height:width*1.6,width:'100%',height:'100%',justifyContent:'center',alignSelf:'center',flex:1}}>
                         
                         
                         {/* <Button onPress={()=>this.state.indexVal ? this.refs.swiper.scrollBy(this.state.indexVal+1) : this.setState({indexVal:1},()=>this.refs.swiper.scrollBy(1)) } transparent style={{right:30, top:30, zIndex:12,position:"absolute"}}>
                            <Text style={{fontSize:20, color:"white",fontWeight:"bold"}}>Save</Text>
                        </Button> */}
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
                                height: width*1.3,
                                    }}
                                />
                                :
                         
                                 
                    <View style={{flex:1,justifyContent:'flex-start',alignContent:'flex-start',flexDirection:'column'}}> 
                    {/* {this.getImageSize(post.path)  } */}
                        
                        {this.getImage(post)}
                   
                       {/* { this.getImage2(post)} */}

                
                   
                    </View>
                          
                            
                            }    
               

                      </View>
                  );
                })}
            </Swiper> 
            <Button transparent style={{left:25, top:30, zIndex:12,position:"absolute"}} onPress={()=>{
                        this.setState({selectedImages:[]},()=>this.props.navigation.goBack())
                    }}>
                         <Text style={{fontSize:20, color:"white",fontWeight:"bold"}}>Back</Text>
                    </Button>
                        <Text style={{alignSelf:'center',left:'42%', top:30,fontSize:20, color:"white",fontWeight:"800",position:"absolute"}}>Add filters</Text>                    
                    <Button onPress={()=>this.onNextScreen()} transparent style={{right:30, top:30, zIndex:12,position:"absolute"}}>
                         <Text style={{fontSize:20, color:"white",fontWeight:"bold"}}>Save</Text>
                    </Button>
                </View>

                <View style={{width:'100%',height:width/1.2,backgroundColor:'black',marginTop:20,bottom:0,flex:1}}>
                  { this.state.filters.length > 0 && this.state.selectedImages.length > 0 &&
                  
                  <FlatList data={this.state.filters}
                  
                  contentContainerStyle={{alignItems:'flex-start',flexDirection:'row',justifyContent:'flex-start',left:'-280%'}}
                    horizontal = {true}
                   renderItem={({ item, index }) => {
                       // console.log('item', item.friend_details_opposite.first_name)

                       return (
                           <TouchableOpacity>
                           <View style={{ width: width*0.4,height:(width*0.4)*1.38, marginBottom:5,padding:5,top:30 }} >
                               {/* {this.getImage2(item,index)} */}
                           </View>
                           </TouchableOpacity>
                       )
                   }} />
                  
                  }
                </View>



            </View>
        )

    }
}
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
