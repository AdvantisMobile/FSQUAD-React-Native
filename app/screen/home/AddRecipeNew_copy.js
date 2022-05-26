import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text, Dimensions, Image, SafeAreaView
} from "react-native";

import GalleryView from "../../component/GalleryView/GalleryView";
import CameraView from "../../component/cameraView/CameraView";
import SharedClass from '../../utils/SharedClass'
import { colors, fonts, localImages ,ApiUrl} from '../../utils/constant'
import ImagePicker from 'react-native-image-crop-picker';
const colorYellow = "#FDBA12";

const { width, height } = Dimensions.get('window');
export default class AddRecipeNew extends React.Component {
    swiper;

    constructor(props) {
        super(props);
        this.sharedClass = new SharedClass();
        this.state = {
            isModalOpen: false,
            activeIndex: 0,
            images: []
        };
    }
    componentDidMount() {
   
        console.log("token____", this.props.user_token)
        console.log("posts from redux", this.props.Posts)
        this.didFocusSubscription = this.props.navigation.addListener(
          "focus",
          () => {
            //   this.child.onCall()
            //   alert(this.state.defaultAddress)
            this.setState({
                activeIndex: 0,
                images: []

            },()=>{
            //   this.GetPost()
            })
           
    
    
            // this.checkNoSeller();
          }
        );
    
    
      }
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
        if (this.state.images.length == 0) {
            message.message = 'Please Select Image'
            message.type = 'info'
            this.sharedClass.ShowSnakBar(message)
            return
        } else {
            this.props.navigation.navigate('AddFilterScreen', { images: this.state.images })
        }
    }
    render() {
        // @ts-ignore
        const { isModalOpen } = this.state;

        return (
            // <SafeAreaView>
            <View style={{ flex: 1 }}>

                <View style={{ flexDirection: 'row', backgroundColor: '#fff', width: width, height: 50, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 , marginTop:30}} >
                    <TouchableOpacity>
                        {/* <Image style={{ width: 25, height: 15, color: 'blue' }} source={Images.backArrow} /> */}
                    </TouchableOpacity>

                    <Text style={{ color: colorYellow, fontSize: 18, marginLeft: 15 }} >New Post</Text>
                    <TouchableOpacity onPress={() => this.onNextScreen()}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >Next</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 50, backgroundColor: colors.black, borderTopWidth: 0, }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        // marginBottom:30,
                        // paddingBottom:40,
                        flex: 1
                    }}>
                        <TouchableOpacity
                            onPress={() => this.segmentClicked(0)}
                        >
                            <Text
                                style={{ color: this.state.activeIndex === 0 ? colors.white : colors.dark_gray }}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.segmentClicked(1)}
                        >
                            <Text
                                style={{ color: this.state.activeIndex === 1 ? colors.white : colors.dark_gray }}>Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.segmentClicked(2)}
                        >
                            <Text
                                style={{ color: this.state.activeIndex === 2 ? colors.white : colors.dark_gray }}>Video</Text>
                        </TouchableOpacity>
                    </View>
                </View>




                {this.state.activeIndex == 0 && <GalleryView 
                 selectedImages={this.state.images}
                 ref={child => {this.child = child}}
                callback={this.getSelectedImages.bind(this)}
                />}
                {this.state.activeIndex == 1 && <View style={styles.slide2}>
                    <CameraView 
                    // selectedImages={this.state.images}
                    callback={this.onDone.bind(this)}
                    />
                </View>}
                {this.state.activeIndex == 2 && <View style={styles.slide2}>
                    {/* <CameraView 
                    // selectedImages={this.state.images}
                    callback={this.getSelectedImages.bind(this)}
                    /> */}
                </View>}





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
