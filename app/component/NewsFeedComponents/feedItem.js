import React, { useState, Fragment, Component } from 'react';
import {
    StyleSheet,Text,Image,SafeAreaView,
    View, RefreshControl, ScrollView, TextInput, Dimensions,TouchableHighlight,TouchableOpacity,ImageBackground
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors, fonts, localImages, ApiUrl } from '../../utils/constant'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Animatable from 'react-native-animatable'
import styles from './Styles'
import { Thumbnail } from 'native-base';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp,  
  } from 'react-native-responsive-screen';
  import Carousel from 'react-native-snap-carousel';
import Modal from 'react-native-modal'


  const SCREEN_WIDTH = Dimensions.get('window').width //414
  const SCREEN_HEIGHT = Dimensions.get('window').height //896



const  RenderVerticalCarouselItems = (props) => {
        
    const [modalVisible, setModalVisible] = useState(false);
    const {item} = props
    const{state} = props
    const {width, height} = Image.resolveAssetSource(item.post_all_image[0]);
    var windowWidth = Dimensions.get('window').width
    var windowHeight = Dimensions.get('window').height
    {console.log('wXH---singleImage', width + " " + height)}

   
      return (
       
        <View style ={{alignItems:'center',justifyContent:'center'}}>
       {console.log('image mama',ApiUrl.PostImage+item.post_all_image[0].image)}
       <ImageBackground source={{uri:ApiUrl.PostImage+item.post_all_image[0].image}} resizeMode={ height > width ?'cover':'contain'} style={{width: '100%', height: '100%'}}>
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
       
           
       
       
             { !props.hideView && <View style={{position: 'absolute', left: 0, right: 0, bottom:hp('2.4%'),height:props.TextScrollable?hp('52%'):hp('30%'), alignItems: 'center',backgroundColor:'rgba(0,0,0,.6)',paddingTop:hp('1.8%')}}>
             <View style={{flexDirection:'row',marginLeft:hp('1.5%'),marginBottom:hp('1%')}}>
                 
                 <Text style={{color:'#F1B828',fontWeight:'bold',fontSize:14}}>2 days ago at </Text>
       
                 <Text onPress={()=>alert('pressed loc')} style={{color: "#fff",fontWeight:'800',fontSize:14,flex: 1,marginRight:windowWidth*0.028, flexWrap: 'wrap'}} numberOfLines={1}> 
                 {item.location}
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
               
                  <Text onPress={()=>alert('clicked')} style={{marginTop:hp('1%'),color:'white',fontWeight:'bold'}}>{item.total_like } Likes</Text>
               
             </View> 
       
             <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginLeft:wp(2)}}>
                   <Ionicons onPress={()=>alert('clicked')} name="chatbubble-outline" size={SCREEN_WIDTH*0.057} style={{color:"white",fontWeight:'bold'}}/>
                  <Text onPress={()=>alert('clicked')} style={{marginTop:hp('1%'),color:'white',fontWeight:'bold'}}>{item.total_comments}</Text>
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
       </ImageBackground>
           
        </View>
           );

    


 
    

    
}

export default RenderVerticalCarouselItems; 