import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Dimensions, Image, SafeAreaView,ImageBackground
} from "react-native";
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp,  
  } from 'react-native-responsive-screen';
import GalleryView from "../../component/GalleryView/GalleryView";
import CameraView from "../../component/cameraView/CameraView";
import SharedClass from '../../utils/SharedClass'
import { colors, fonts, localImages ,ApiUrl} from '../../utils/constant'
import ImagePicker from 'react-native-image-crop-picker';
import ImageCropPicker from 'react-native-image-crop-picker'
import Swiper from 'react-native-swiper';
import Ionicon from 'react-native-vector-icons/Ionicons'
import ImageCropper from 'react-native-simple-image-cropper';
import {Button} from 'native-base'
import Video from 'react-native-video'
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import overlayPng from '../../assets/images/gridoverlay.jpg';
import ImageEditor from "@react-native-community/image-editor";
import ImageResizer from 'react-native-image-resizer';


const colorYellow = "#FDBA12";
const { width, height } = Dimensions.get('screen');

export default class AddRecipeNew extends React.Component {
    swiper;

    constructor(props) {
        super(props);
        this.sharedClass = new SharedClass();
        this.state = {
            isModalOpen: false,
            activeIndex: 0,
            images: [],
            precropImages :['','','','','',''],
            selectedImages : [],
            indexVal : 0,
            pickerOpen : false
        };

    }
    componentDidMount() {
   
        console.log("token____", this.props.user_token)
        console.log("posts from redux", this.props.Posts)
        this.didFocusSubscription = this.props.navigation.addListener(
          "focus",
          () => {

            !this.state.pickerOpen && this.openPicker()
    
          }
        );
    
    
      }

      openPicker = () => {
          this.setState({pickerOpen : true})
          var pickedImages = []
          var pickedImages = this.state.selectedImages
          console.log('slec pickedImages images',pickedImages);
          
         ImagePicker.openPicker({
            width: width,
            multiple:true,
            height: height,
            cropping: false
          }).then(image => {
            console.log('selected images',image);
           
                image.forEach(ele => {
                    pickedImages.push(ele);
                })
            
          
            console.log('pickedImages images',pickedImages);
            this.setState({
                selectedImages : pickedImages,
                pickerOpen :  false
            }, () => { console.log("ImagePicker")});
          }).catch(err => {
            this.setState({
                pickerOpen :  false
            }, () => { console.log("ImagePicker",err)});
              this.props.navigation.goBack()
           });
        this.setState({
            activeIndex: 0,
            images: []

        },()=>{
        //   this.GetPost()
        })
       
      }

      setCropperParams = cropperParams => {
        console.log("Cropper Params", cropperParams);
        this.setState(prevState => ({
          ...prevState, 
          cropperParams,
        }));
      };

    componentWillReceiveProps(nextProps) {
        // @ts-ignore
        // const { activeIndex } = this.state;
        // if (activeIndex > 0) {
        //     this.swiper.scrollBy(activeIndex * -1); //offset
        // }
    }

    onMomentumScrollEnd(e, state, context) {
        // this.setState({ activeIndex: state.index })
    }


    segmentClicked = (index) => {
        this.setState({
            activeIndex: index
        });


    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
        this.props.navigation.navigate('Home');
    };
    getSelectedImages(image, current) {
        console.log(image, current, 'Inshad')
        console.log(image)
        this.setState({
            images: image
        })
    }
    onDone(image, current) {
        let message = {}
        if (image.length == 0) {
            message.message = 'Please Select Image'
            message.type = 'info'
            this.sharedClass.ShowSnakBar(message)
            return
        } else {
            this.props.navigation.navigate('AddFilterScreen', { images: image })
        }
    }
    onNextScreen() {
        let message = {}
        if (this.state.selectedImages.length == 0) {
            message.message = 'Please Select Image'
            message.type = 'info'
            this.sharedClass.ShowSnakBar(message)
            return
        } else {
            var imageArr = []
            this.state.selectedImage && this.state.selectedImage.forEach(element => {
                imageArr.push({uri:element.path})
            });
            console.log('images arr',imageArr)
            this.props.navigation.navigate('AddFilterScreen', { images: this.state.selectedImages })
        }
    }

    handlePress = async () => {
        console.log('handle pressedd')
      const { cropperParams } = this.state;

      this.setState({
          preview:false
      })
   
      const cropAreaSize = {
        width: width, 
       
        height: width*1.5,
      };
   
      const cropSize = {
        width: width,
        height: (cropperParams.fittedSize.width > width) ? width*1.5 : width*1.52 ,
      };
      var originalImageArray = this.state.selectedImages;
      var index = this.state.indexVal ? this.state.indexVal : 0
      console.log('index>>>>',index)

      try {
          console.log('cropper params',cropperParams)
        var precrop = this.state.precropImages;
       
        precrop[index] = originalImageArray[index].path;
        const result = await ImageCropper.crop({
          ...cropperParams,
          imageUri: this.state.cropReq,
          cropSize,
          cropAreaSize,
        });
        console.log('result>>>>',result)

        originalImageArray[index].croppedPath = result;
        if (cropperParams.fittedSize.width > width)
        {
            originalImageArray[index].setHeight = Dimensions.get('screen').width*1.5
        }
        else originalImageArray[index].setHeight = Dimensions.get('screen').height
        console.log('original array',originalImageArray[index].path)
        console.log('new array',originalImageArray[index].croppedPath)
        // this.setState(prevState => ({
         
        // }));
        this.setState({selectedImages:originalImageArray,precropImages:precrop,edit:false},()=>console.log('precrop',this.state.selectedImages))
      } catch (error) {
        console.log('error----',error);
      }
    };

    resize(uri) {
        var originalImageArray = this.state.selectedImages;

        console.log('uri>>',uri)
        ImageResizer.createResizedImage(uri, width, width*1.7, 'JPEG', 100)
          .then(({uri}) => {
            originalImageArray[this.state.indexVal].croppedPath = uri;
            this.setState({
             selectedImages:originalImageArray
            });
          })
          .catch(err => {
            console.log(err);
          
          });
      }

     getImageScale = (uri) =>
     {
         //this.resize(uri)
        var originalImageArray = this.state.selectedImages;
        var index = this.state.indexVal ? this.state.indexVal : 0
        console.log('index>>>>',index)

        try{
            var precrop = this.state.precropImages;
           
            precrop[index] = originalImageArray[index].path;

            ImagePicker.openCropper({
                path: uri,
                width: height/1.7,
                height: height
              }).then(image => {
            originalImageArray[index].croppedPath = image.path;
            console.log('original array',originalImageArray[index].path)
        console.log('new array',originalImageArray[index].croppedPath)
        // this.setState(prevState => ({
         
        // }));
        this.setState({selectedImages:originalImageArray,precropImages:precrop,edit:false},()=>console.log('precrop',this.state.selectedImages))

                console.log(image);
              });
        }catch (error) {
            console.log('error----',error);
          }

       

        Image.getSize(uri, (width, height) => {this.setState({ImageWidth:width, ImageHeight:height,scaleToFit : !this.state.scaleToFit},()=>console.log('width',this.state.ImageWidth))});
        this.setState({
            cropReq : uri,
            edit : true
        })
         
     }

     reset = () =>
     {  
         var imageArr = this.state.selectedImages
         imageArr[this.state.indexVal].resize = null
         imageArr[this.state.indexVal].croppedPath = null
        //Image.getSize(uri, (width, height) => {this.setState({ImageWidth:width, ImageHeight:height,scaleToFit : !this.state.scaleToFit},()=>console.log('width',this.state.ImageWidth))});
        // this.state.selectedImages[this.state.indexVal].resize = null

        this.setState({
            selectedImages : imageArr
        })
         
     }
     getImageSize = ()=> {
        console.log("Get Image size");
        console.log(this.state);
        console.log(this.state.selectedImages);
        var index = this.state.indexVal;
        uri  = this.state.selectedImages[index].path
        Image.getSize(uri, (width, height) => {
            this.setState({
                ImageWidth:width, 
                ImageHeight:height
            },()=>console.log('State width',this.state.ImageWidth))
        });

     }

     handleDelete = () => {
         selectedImages = this.state.selectedImages
         selectedImages.splice(this.state.indexVal,1)
         this.setState({
            selectedImages : selectedImages
         })
     }
    render() {
        const { width, height } = Dimensions.get('screen');

        const Overlay = (
            <Image
              style={{
                height: width,
                width: width*1.5,
              }}
              source={overlayPng}
              resizeMode="contain"
            />
          );
        
        // @ts-ignore
        const { isModalOpen } = this.state;
                
        console.log(width);
        console.log(height);
        return (
            // <SafeAreaView>
            <View style={{ flex: 1,backgroundColor:'black' }}>

    { this.state.selectedImages &&this.state.selectedImages.length > 0 && 
        
        <View style={{zIndex:-2,flex:1,width:'100%',height:'100%'}}>

            {!this.state.edit ? 
                <Swiper ref='swiper' 
                        showsButtons={true} 
                        scrollEnabled={true} 
                        autoplay ={false} 
                        index = {this.state.indexVal ? this.state.indexVal : 0}
                        loop={false}  
                        onIndexChanged={(index) => { 
                            console.log("Index changed", index)
                            this.setState({indexVal:index},()=> {
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
                                height: '100%',
                                    }}
                                />
                                :
                         
                                 
                    <View style={{flex:1,justifyContent:'center',alignSelf:'center',width:'100%',height:'100%'}}> 
                    {/* {this.getImageSize(post.path)  } */}

                   
                    {console.log('booleon',post)}
                    {/* <ImageBackground source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}} resizeMode={'cover'} style ={{width:'100%',height:post.height,position:'absolute',zIndex:-2}} /> */}
                    <ImageBackground
                            source={{uri:post.croppedPath && post.croppedPath !== null ? post.croppedPath : post.path}}
                          
                            resizeMode=  'cover' 
                           
                            style={{
                                width: '100%',
                                height :'100%',
                                    }}
                                />  
                    
                    <Button transparent style={{left:25, top:30, zIndex:12,position:'absolute'}} onPress={()=>{
                        this.setState({selectedImages:[],pickerOpen:false},()=>this.props.navigation.goBack())
                    }}>
                         <Text style={{fontSize:20, color:"white",fontWeight:"bold"}}>Cancel</Text>
                    </Button>
                        <Text style={{alignSelf:'center',left:60, top:30,fontSize:20, color:"white",fontWeight:"500",position:'absolute'}}>Preview</Text>                    
                    <Button onPress={()=>this.onNextScreen()} transparent style={{right:30, top:30, zIndex:12,position:"absolute"}}>
                         <Text style={{fontSize:20, color:"white",fontWeight:"bold"}}>Save</Text>
                    </Button>
                   
                    </View>
                          
                            
                            }    
                        {post.path.toString().split('.').pop() !== 'mp4' && <Ionicon onPress={()=>this.getImageScale(post.path) }name='ios-code' size = {40} style={{ color:'white',marginLeft:wp('5'),bottom:hp('5'),
                             alignSelf:'flex-start',position:'absolute',
                                            transform: [{ rotate: '150deg'}] ,marginRight: 5,zIndex:14 }} />}
                        
                        {post.path.toString().split('.').pop() !== 'mp4' &&
                        post.croppedPath && post.croppedPath !== null
                        && <FontAwesome onPress={()=>this.reset() }name='undo' size = {25} style={{ color:'white',marginLeft:wp('22'),bottom:hp('6'),
                             alignSelf:'flex-start',position:'absolute',
                                             marginRight: 5,zIndex:14 }} />}


                    <Ionicon onPress={()=>this.openPicker()}name='ios-add-circle-outline' size = {40} style={{ color:'white',right:30,marginRight:wp('10'),bottom:hp('4'),
                             alignSelf:'flex-end',position:'absolute',zIndex:14 }} />
                             
                    <Ionicon onPress={()=>this.handleDelete()}name='trash-outline' size = {40} style={{ color:'white',marginRight:wp('5'),bottom:hp('4'),
                             alignSelf:'flex-end',position:'absolute',zIndex:14 }} />

                      </View>
                  );
                })}
            </Swiper>  : 
                <View style={{flex:1,width:'100%',height:'100%'}}>
                <ImageCropper
                        //imageUri={'https://picsum.photos/id/48/900/500'}
                        imageUri={this.state.cropReq}
                        // style={{paddingTop:0,paddingBottom:0}}
                        cropAreaWidth={width}
                        cropAreaHeight={width*1.5}
                        containerColor="grey"
                        areaColor="white"
                        setCropperParams={this.setCropperParams}
                    />
                       <Button transparent style={{left:25, top:30, zIndex:12}} onPress={()=>this.setState({edit:false})}>
                         <Text style={{fontSize:20, color:"white",fontWeight:"bold"}}>Cancel</Text>
                    </Button>
                        <Text style={{alignSelf:'center',left:8, top:30,fontSize:20, color:"white",fontWeight:"500"}}>Scale Image</Text>                    
                    <Button onPress={()=>this.handlePress()} transparent style={{right:30, top:30, zIndex:12,position:"absolute"}}>
                         <Text style={{fontSize:20, color:"white",fontWeight:"bold"}}>Done</Text>
                    </Button>
                

                    </View>
        }
        
         </View>
        
            }
             


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
