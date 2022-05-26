import React, { useState, Fragment } from 'react';
import {
    StyleSheet,Text,Image,SafeAreaView,
    View, RefreshControl, ScrollView, TextInput,Platform, Dimensions,TouchableHighlight,TouchableOpacity,ImageBackground, ImageBackgroundBase
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors, fonts, localImages, ApiUrl } from '../../utils/constant'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Animatable from 'react-native-animatable'
import styles from './Styles'
import DoubleTap from 'react-native-double-tap'
import {  Thumbnail } from 'native-base';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp,  
  } from 'react-native-responsive-screen';
import Modal from 'react-native-modal'
import { SliderBox } from "react-native-image-slider-box";




  const SCREEN_WIDTH = Dimensions.get('window').width //414
  const SCREEN_HEIGHT = Dimensions.get('window').height //896


const  RenderHorizontalCarouselItems = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [lastPress, setLastPress] = useState(null);
    const [tapCount, setTapCount] = useState(0);
    const {item} = props
    const{state} = props
    const multiTapCount = 4
    const multiTapDelay = 300
    {console.log('item sar',item)}
    const {width, height} =  Image.resolveAssetSource(item.post_all_image[0]);
    {console.log('wXH', width + " " + height)}

   

    var windowWidth = Dimensions.get('window').width
    var windowHeight = Dimensions.get('window').height

    {console.log('iam here',item.post_all_image)}

    const imageArr = item.post_all_image.map(item => {
      return (ApiUrl.PostImage + item.image)
    })
    console.log('image Arr',imageArr)
    return (
       
        <View style ={{alignItems:'center',justifyContent:'center'}}>
       <DoubleTap  singleTap={() => {
                    //console.log(SCREEN_WIDTH+" "+SCREEN_HEIGHT);
                   // this.hideStuff()
                   
                }}
                doubleTap={() => {
                    this.animateIcon(item)
                }}
                delay={200}>
       <SliderBox
       ImageComponent = {ImageBackground}
        images={imageArr}
        sliderBoxHeight={'100%'}
        onCurrentImagePressed={() => props.onDoubleTap(item)}
        dotColor="black"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={10}
        resizeMode={ height > width ?'cover':'contain'}
        paginationBoxStyle={{
            position: "absolute",
            width:100,
            bottom: 0,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingVertical: 0
        }}
        dotStyle={{
            width: 10,
            height: 10,
            borderWidth: 3,
            borderColor:'white',
            borderRadius: 10,
            marginHorizontal: 0,
            padding: 6,
            marginTop: hp('-88'),
            backgroundColor: "black"
        }}
        ImageComponentStyle={{borderRadius: 15, width: '100%', marginTop: 5}}
        imageLoadingColor="#2196F3"
        >
        {state.doubleTap && 
           <Animatable.Image animation = {"zoomInUp"} source={require('../../assets/images/yummyGif.gif')} 
           style={styles.AnimatableImage} />}
         
       
                 { !props.hideView &&
                        <TouchableOpacity onPress={()=>props.hideStuff()}>
                           <View style={styles.hideIconView}>
                             <Image  source={require('../../assets/images/hide.png')} style={styles.hideIcon }/>
                             
                           </View>
                         </TouchableOpacity>
                   
                       }
       
                       {!props.hideView && 
                       <View style={{justifyContent:'space-between',alignItems:'flex-start',paddingLeft:wp('75%'),marginTop:hp('50%')}}>
                             <View style={{flexDirection:'row',flex:1,paddingLeft:wp('2%'),marginTop:hp('-3%')}}>
                                 <Thumbnail medium source={require('../../assets/images/post10.jpg')} style={[styles.rightSideIcons]} />
                                 <Ionicons name="person-add" size={18} style={styles.addFriend}/>
                             </View>
       
                       </View>}
        
               <View style={{alignItems:'center',justifyContent:'space-between',alignItems:'flex-start',position:'absolute',paddingLeft:wp('79%'),paddingTop:hp('56%')}}>
       
                 {item.iCookedIt && !props.hideView  &&
                 
                       <TouchableOpacity onPress={()=>props.hideStuff()}>
                         <View style={{alignItems:'flex-end',flex:1,paddingLeft:wp('-2.5%')}}>
                         <Thumbnail  medium source={require('../../assets/images/kitchen.png')} style={[styles.rightSideIcons] }/>
                         </View>
                       </TouchableOpacity>
               
                   }
               </View>
       
           
       
       
             { !props.hideView && <View style={{position: 'absolute', left: 0, right: 0, bottom: Platform.OS === 'android'? hp('5.4%') : hp('2.4%'),height:props.TextScrollable?hp('52%'):hp('30%'), alignItems: 'center',backgroundColor:'rgba(0,0,0,.6)',paddingTop:hp('1.8%')}}>
             <View style={{flexDirection:'row',marginLeft:hp('1.5%'),marginBottom:hp('1%')}}>
                 
                 <Text style={{color:'#F1B828',fontWeight:'bold',fontSize:14}}>2 days ago at </Text>
       
                 <Text onPress={()=>alert('pressed loc')} style={{color: "#fff",fontWeight:'800',fontSize:14,flex: 1,marginRight:windowWidth*0.028, flexWrap: 'wrap'}} numberOfLines={1}> 
                {item && item.location}
                 </Text>
       
             </View>  
             <View style={{flexDirection:'row',marginTop:hp(0.7),marginLeft:wp('-1%'),padding:hp('2%'),justifyContent:'space-between',alignItems:'flex-start'}}>
             <Text onPress={()=>alert('pressed userName')} style={{color:'#F1B828',fontWeight:'bold',fontSize:15}}>{item && item.author_details.name}</Text>
                  <Text style={{marginLeft:wp('3%'),color:'white',fontWeight:'600',fontSize:16,flex:1,textAlign:'justify'}} numberOfLines={2}>{item && item.description}</Text>
                     <Text onPress={() =>setModalVisible(!modalVisible)} style = {{color:"#F0F8FF",alignSelf:'flex-end'}}>More</Text>    
                 
             </View>  
           <View style={styles.bottomIconsView}>
       
             <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
               
             <TouchableHighlight  onPress={()=>props.likePressed(item)} >
                   { item && !item.iLiked ?
                       <Image  style={{width:SCREEN_WIDTH*0.067,height:SCREEN_WIDTH*0.067}} 
                     source={require('../../assets/images/great.png')}/> :
                   <Animatable.Image style={{width:SCREEN_WIDTH*0.067,height:SCREEN_WIDTH*0.067}}  
                   animation={'bounceIn'} source={require('../../assets/images/greatColor.png')}/>
                   }
               </TouchableHighlight>
               
               <Text onPress={()=>alert('clicked')} style={{marginTop:hp('1%'),color:'white',fontWeight:'bold'}}>400+ Likes</Text>
               
             </View> 
       
             <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginLeft:wp(2)}}>
                   <Ionicons onPress={()=>alert('clicked')} name="chatbubble-outline" size={SCREEN_WIDTH*0.057} style={{color:"white",fontWeight:'bold'}}/>
                   <Text onPress={()=>alert('clicked')} style={{marginTop:hp('1%'),color:'white',fontWeight:'bold'}}>400+</Text>
             </View> 
       
               <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}> 
                     {item.iCookedIt  &&<TouchableHighlight style={{}} onPress={()=>props.wannaCookitPressed(item)}>
                     { item && !item.wannaCookit ?
                       <Image  style={{width:SCREEN_WIDTH*0.067,height:SCREEN_WIDTH*0.067}} 
                       source={require('../../assets/images/wannaCookit.png')}/> :
                       <Animatable.Image style={{width:SCREEN_WIDTH*0.067,height:SCREEN_WIDTH*0.067}}  
                       animation={'bounceIn'} source={require('../../assets/images/cookColor.png')}/>
                   }
           
       
                     </TouchableHighlight>}
                   {  item.iCookedIt  &&
                    <Text onPress={()=>alert('clicked')} style={{marginTop:hp('1%'),color:'white',fontWeight:'bold'}}>400+ wanna cook it</Text>}
       
               </View>
               <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginLeft:wp(-10)}}> 
                     {!item.iCookedIt  &&<TouchableOpacity onPress={()=>props.wannaVisitPressed(item)}>
                     {  !item.wannaVisit ?
                       <Image  style={{marginTop:hp('-0.1%'),width:SCREEN_WIDTH*0.067,height:SCREEN_WIDTH*0.067}} 
                       source={require('../../assets/images/visit.png')}/> :
                     <Animatable.Image style={{width:SCREEN_WIDTH*0.067,height:SCREEN_WIDTH*0.067}}  
                     animation={'bounceIn'} source={require('../../assets/images/visitColor.png')}/>
                   }
       
                     </TouchableOpacity>}
                     { !item.iCookedIt  && <Text onPress={()=>alert('clicked')} style={{marginTop:hp('1%'),color:'white',fontWeight:'bold'}}>400+ wanna visit</Text>}
                   </View>
                     { 
                       <MaterialCommunityIcons onPress={()=>props.wannaVisitPressed(item)} style={{color:'#fcfbf9',marginTop:hp('-0.8%')}} size={SCREEN_WIDTH*0.081} name='share-outline' /> 
                   }
       
                     
           </View> 
           {modalVisible &&   <Modal
               style = {styles.modalView}
               isVisible={modalVisible}
               onBackdropPress={()=>setModalVisible(!modalVisible)}
               >
               <View style={{marginTop:hp(0.7),marginLeft:wp('-1%'),padding:hp('2%')}}>
             <Text onPress={()=>alert('pressed userName')} style={{color:'#F1B828',fontWeight:'bold',fontSize:15}}>{item && item.author_details.name}</Text>
                     <ScrollView contentContainerStyle={{paddingBottom:hp('75')}}>
                     <Text style={{marginLeft:wp('3%'),color:'white',fontWeight:'600',fontSize:16,flex:1,textAlign:'justify'}}>{item && item.description}</Text>
                     <Text onPress={() => setModalVisible(!modalVisible)} style = {{fontSize:20,fontWeight:'bold',color:"#F0F8FF",alignSelf:'flex-end'}}>Hide</Text>    
       
                     </ScrollView>
                 
             </View>  
             </Modal>}
             
       </View>}
        </SliderBox>   
        </DoubleTap> 
        </View>
           );
    
}

export default RenderHorizontalCarouselItems; 