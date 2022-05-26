import React, {useState} from 'react';
import { Image, Animated, Easing,Dimensions,TouchableOpacity,ScrollView,TouchableHighlight, ImageBackground } from 'react-native';
import Modal from 'react-native-modal'
import * as Animatable from 'react-native-animatable'
//import { FontAwesome, AntDesign, MaterialCommunityIcons } from 'react-native-vector-icons';
//import { Video } from 'expo-av';
import Video from 'react-native-video'
import { colors, fonts, localImages, ApiUrl } from '../../utils/constant'
import LinearGradient  from 'react-native-linear-gradient';
import VideoSample from '../../assets/images/sampleVideo.mp4'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from "moment";
const { width, height } = Dimensions.get('window');

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Thumbnail} from 'native-base'
import DoubleTap from 'react-native-double-tap'
import styles from './Styles'
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp,  
  } from 'react-native-responsive-screen';
AntDesign.loadFont();
FontAwesome.loadFont();
Entypo.loadFont();


import {Container,
    Details,
    Actions,
    User,
    Tags,
    Music,
    MusicBox,
    BoxAction,
    ICookedIt,
    TextAction,ProfilePic } from './FeedStyles';

import { View, Text } from 'native-base';
import ViewPager from '@react-native-community/viewpager';
import Swiper from 'react-native-swiper';
import { Platform } from 'react-native';
//MaterialCommunityIcons.loadFont();
Ionicons.loadFont();

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height



const  NewsFeed = (props) => {
        
    const spinValue = new Animated.Value(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [indexVal, setIndexVal] = useState(0)
    const [loadImg, setLoadImg] = useState(false)
    const [mresizeMode, setResizeMode] = useState("cover")
    const [Width, setWidth] = useState(SCREEN_WIDTH);
    const [Height,setHeight] = useState(SCREEN_HEIGHT);
    const {item} = props;
    // const {is_post_private} = item
    const{state} = props

    // var windowWidth = Dimensions.get('window').width
    // var windowHeight = Dimensions.get('window').height
    // {console.log('wXH---singleImage', width + " " + height)}
    var timing = (time) => {
      return moment.utc(time).local().startOf('seconds').fromNow()
      return moment(time).fromNow()
    }
    const imageArr = item.post_all_image.map(item => {
      
      return({uri:ApiUrl.PostImage + item.image , height: item.height})
      return (ApiUrl.PostImage + item.image)
    })



    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  
    const rotateProp = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

//     const getResizeMode = (post) => {
//       // Image.getSize(post, (width, height) => {console.log('width',width)})
//       console.log('post',post)
//       if(pos)
//      { const {width ,height } = Image.resolveAssetSource(post)
//       if(height > width ) {
//         return "cover"
//       }
//       else "contain"
// }
//     }
      return (

      
        
      <>
      {
        loadImg &&   <Text style={{alignSelf:'center',top:'50%',fontSize:16,zIndex:11,color:'#fff'}}>Loading image....</Text>
      }
   
     <LinearGradient
        colors={['rgba(0,0,0,.8)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '70%',
        }}
      />
       {state.doubleTap && 
           <Animatable.Image animation = {"zoomInUp"} source={require('../../assets/images/yummyGif.gif')} 
           style={{position:'absolute', 
           width: 200,
           top:'40%',
           height:200,
           marginLeft:'26%',zIndex:11}} />}
           { props.userDetails && item.author_details.id !== props.userDetails.id && 
           (item.is_post_private == "Y" && item.viewer_is_friend !== "Y") &&<View style={{backgroundColor:'rgba(0,0,0,.93)',alignContent:'center',alignItems:'center',position:'absolute',zIndex:12,width:'100%',height:'100%',justifyContent:'center'}}>
      {   
      item.author_details.account_type==="PER" ?  <TextAction style={{color:'white',fontSize:18,fontWeight:'bold',textAlign:'center',width:'70%',bottom:80}}>This is a private account, add the user to your squad to view posts</TextAction> 
      
      : <TextAction style={{color:'white',fontSize:18,fontWeight:'bold',textAlign:'center',width:'70%',bottom:80}}>This is a private account, follow this account to view posts</TextAction>
        
        }
           <MusicBox style={{justifyContent:'center',flexDirection:'column'}}>
            {item.author_details.profile_pic ? <Thumbnail large style={{backgroundColor:'rgba(0,0,0,.4)',backgroundColor:'grey',top:14,borderColor:'white',borderWidth:4}}
             source={{uri:ApiUrl.prfile_img + item.author_details.profile_pic}}/> : <Thumbnail medium style={{backgroundColor:'rgba(0,0,0,.4)',backgroundColor:'grey',top:14,borderColor:'white',borderWidth:4,paddingTop:0}}
             source={require('../../assets/images/person.png')}/>  }
   
            {/* <Ionicons name="add-circle-sharp" size={30} style={{top:2,right:-1}} color="white" /> */}
            { item.author_details.id !== props.userDetails.id && item.viewer_is_friend == "N" && <Ionicons name="add-circle-sharp" size={30} style={{top:2,right:-1}} color="white" onPress={item.viewer_is_friend == "Y" ? () => props.unfriend() : item.viewer_is_friend == "W" ? () => this.cancelFrndReq() : () => props.sendFrndReq(item.author_details.id, item.id)} />
            }
             { item.author_details.id !== props.userDetails.id && item.viewer_is_friend == "W" && <Ionicons name="ios-watch" size={30} style={{top:2,right:-1}} color="white" onPress={item.viewer_is_friend == "Y" ? () => props.unfriend() : item.viewer_is_friend == "W" ? () => this.cancelFrndReq() : () => props.sendFrndReq(item.author_details.id, item.id)} />
            }

        </MusicBox>
           <User style={{alignSelf:'center',left:10,top:10}} onPress={()=>alert('click')}>{item.author_details.name}</User>

        
           </View>}
          
             { imageArr.length > 0 &&  <Swiper index={0} onIndexChanged={(index) => setIndexVal(index)} 
             activeDot={<View style={{backgroundColor:'black', width: 15, height: 15, borderWidth: 3,
             borderRadius: 8, borderColor:'white', marginLeft: 3, marginRight: 3,bottom:hp(Platform.OS=='android'? '71':'75')}} />} 
             dot={<View style={{backgroundColor:'grey', width: 8, height: 8,borderRadius: 4, 
             marginLeft: 3, marginRight: 3,bottom:hp(Platform.OS=='android'? '71':'75')}} />} 
             showsPagination={true}loop={false} >
              {
               imageArr.length > 0 &&
                imageArr.map((post, key) => {
                  return (
                    post.uri  && <DoubleTap key={key}  singleTap={() => {
                        //console.log(SCREEN_WIDTH+" "+SCREEN_HEIGHT);
                        props.hideStuff(item)
                       
                    }}
                    doubleTap={() => {
                        props.animateIcon(item)
                    }}
                    delay={200}>
                    <Container style={{backgroundColor:'black'}}>
                       { 
                       //console.log('post index',item.image.indexOf(post)),
                       //console.log('post index :'+item.image.indexOf(post)+' index value : '+indexVal),

                       post.uri.toString().split('.').pop() === 'mp4' ?
            
                       <Video
                            source={{uri:post.uri}}
                            rate={1.0}
                            onLoadStart = {()=>setLoadImg(true)}
                            onLoadEnd = {()=> setLoadImg(false)}
                            volume={1.0}
                            paused={!props.play ===false ?  !(imageArr.indexOf(post) == indexVal):true}
                            muted={!props.play ===false ?  !(imageArr.indexOf(post) == indexVal):true}
                            resizeMode="cover"
                            repeat ={true}
                            style={{
                                width: '100%',
                                height: '100%',
                                    }}
                                />
                                :
                             // this is a tweak to show image exactly that was shown in Addnewpost screen
                     <ImageBackground
                            source={{uri:post.uri}}
                            onLoadStart = {()=>setLoadImg(true)}
                            onLoadEnd = {()=> setLoadImg(false)}
                            resizeMode=  {mresizeMode}
                           
                            style={{
                                width: '100%',
                                height:  '100%',
                                    }}
                                />  
                            //     :
                            //     <ImageBackground
                            // source={{uri:post.uri}}
                            // onLoadStart = {()=>setLoadImg(true)}
                            // onLoadEnd = {()=> setLoadImg(false)}
                            // resizeMode=  'cover' 
                           
                            // style={{
                            //     width: '100%',
                            //     height: width*1.5,
                            //         }}
                            //     /> 
                                }    
                      
                      </Container>
                      </DoubleTap>
                  );
                })}
            </Swiper> }
           
         
        {!props.hideView&&<Actions>
        <BoxAction style={{top :'35%'}}>
          <Ionicons
            onPress={()=>props.hideStuff(item)}
            style={{ alignSelf: 'center'}}
            name="md-chatbubbles"
            size={35}
            color="#fff"
          />
        </BoxAction>

        {/* <BoxAction style={{bottom :hp('-55')}}>
          <Entypo
            onPress={()=>{
              if(mresizeMode == "cover")
              {
                setResizeMode("contain")
              }else setResizeMode("cover")
            }}
            style={{ alignSelf: 'center'}}
            name='resize-full-screen'
            size={35}
            color="#fff"
          />
        </BoxAction> */}
       
    
      </Actions>
      }

    

      
    
   { props.userDetails && !props.hideView && !(item.author_details.id !== props.userDetails.id &&  item.is_post_private == "Y" && item.viewer_is_friend !== "Y") && <Details style={{paddingTop:0}}>

        <View style={{flexDirection:'row',top:20,width:"80%",justifyContent:'space-between',paddingBottom:8}}>
        <User onPress={()=>alert('click')}  >{timing(item.created_at)}</User>
        <Text style={{color:'white',lineHeight:22,padding:(10,0),fontWeight:'500',fontSize:16,flex:1,textAlign:'justify'}} numberOfLines={1}>{item.location}</Text>
        </View>
        
        <View style={{flexDirection:'row',width:"80%",top:20,justifyContent:'space-between'}}>
            <User onPress={()=>alert('click')}>{item.author_details.name}</User>
        <Text style={{color:'white',lineHeight:22,padding:(10,0),fontWeight:'500',fontSize:16,flex:1,textAlign:'justify'}} numberOfLines={2}>{item.description}</Text>
        {item.description.length>40 && <Text onPress={() =>setModalVisible(!modalVisible)} style = {{color:"#F0F8FF",alignSelf:'flex-end'}}>More</Text>}    
        </View>
        
        <View style={{justifyContent:'space-between',flexDirection:'column'}}>
        {item.iCookedIt&&
        <ICookedIt style={{bottom:1,right:2}}>
            <BoxAction>
            <MusicBox>
                 <Thumbnail small style ={{ backgroundColor:'rgba(0,0,0,.4)',backgroundColor:'grey',borderColor:'white',borderWidth:4}} medium source={require('../../assets/images/kitchen.png')}/>
            </MusicBox>
        </BoxAction>
        </ICookedIt>}
        {<ICookedIt style={{bottom:-45,right:2}}>
        <BoxAction>
            <MusicBox>
            <MaterialCommunityIcons onPress={()=>props.wannaVisitPressed(item)} style={{color:'#fcfbf9',marginTop:2}} size={SCREEN_WIDTH*0.081} name='share' /> 
            </MusicBox>
        </BoxAction></ICookedIt>}
        </View>
       
        <View style={{flexDirection:'row',justifyContent:'space-between',top:12}}>
            <View style={{flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
              
                    <MaterialCommunityIcons onPress={()=>props.likePressed(item.id)} name="hand-okay" size={SCREEN_WIDTH*0.078} style={{color:item.is_liked_by_me === "Y" ? "#F1B828" :"white",top:30,fontWeight:'bold',transform:[{rotate:'45deg'}]}}/>

        {item.total_like>1? <TextAction onPress={()=>alert('clicked')} style={{color:'white',fontWeight:'bold'}}>{item.total_like} Likes</TextAction> : <TextAction onPress={()=>alert('clicked')} style={{color:'white',fontWeight:'bold'}}>{item.total_like} Like</TextAction>}
                    
            </View>

            <View style={{flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
                
                <FontAwesome onPress={()=>props.commentPressed(item)} name="comment" size={SCREEN_WIDTH*0.062}  style={{color:"white",fontWeight:'bold',top:30}}/>
        <TextAction onPress={()=>alert('clicked')} style={{color:'white',fontWeight:'bold'}}>{item.total_comments}</TextAction>
                    
            </View>

            <View style={{flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
                
                    {item.iCookedIt  &&<TouchableHighlight style={{top:30}} onPress={()=>props.wannaCookitPressed(item)}>
                     { item && !item.wannaCookit ?
                       <Image  style={{width:SCREEN_WIDTH*0.072,height:SCREEN_WIDTH*0.067}} 
                       source={require('../../assets/images/wannaCookit.png')}/> :
                       <Animatable.Image style={{width:SCREEN_WIDTH*0.072,height:SCREEN_WIDTH*0.067}}  
                       animation={'bounceIn'} source={require('../../assets/images/cookColor.png')}/>
                   }
           
       
                     </TouchableHighlight>}
                     {!item.iCookedIt  && 
                       
                     <Ionicons onPress={()=>props.wannaVisitPressed(item)} name="location-sharp" size={SCREEN_WIDTH*0.072}  style={{color:item.wannaVisit?"#F1B828":"white",fontWeight:'bold',top:30}}/>
                    
                   }
                    
                <TextAction onPress={()=>alert('clicked')} style={{color:'white',fontWeight:'bold'}}>{item.iCookedIt? '400+ wanna cook it':`${item.total_wanna_visit}  wanna visit`}</TextAction>
                    
            </View>
        

            {/* <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                
            <MaterialCommunityIcons onPress={()=>props.wannaVisitPressed(item)} style={{color:'#fcfbf9',marginTop:2}} size={SCREEN_WIDTH*0.081} name='share' /> 

                    
            </View> */}
        <View>
       {!props.hideView && 
        
        <MusicBox style={{justifyContent:'center',flexDirection:'column'}}>
            {item.author_details.profile_pic ? <Thumbnail medium style={{backgroundColor:'rgba(0,0,0,.4)',backgroundColor:'grey',top:item.author_details.id !== props.userDetails.id?14:24,borderColor:'white',borderWidth:4}}
             source={{uri:ApiUrl.prfile_img + item.author_details.profile_pic}}/> : <Thumbnail medium style={{backgroundColor:'rgba(0,0,0,.4)',backgroundColor:'grey',top:14,borderColor:'white',borderWidth:4,paddingTop:0}}
             source={require('../../assets/images/person.png')}/>  }
   
            { item.author_details.id !== props.userDetails.id && item.viewer_is_friend == "W" && <Ionicons name="ios-watch" onPress={item.viewer_is_friend == "Y" ? () => props.unfriend() : item.viewer_is_friend == "W" ? () => this.cancelFrndReq() : () => props.sendFrndReq(item.author_details.id, item.id)} size={30} style={{top:2,right:-1}} color="white" />}

           { item.author_details.id !== props.userDetails.id && item.viewer_is_friend == "N"? <Ionicons name="add-circle-sharp" onPress={item.viewer_is_friend == "Y" ? () => props.unfriend() : item.viewer_is_friend == "W" ? () => this.cancelFrndReq() : () => props.sendFrndReq(item.author_details.id, item.id)} size={30} style={{top:2,right:-1}} color="white" />:<View style={{paddingTop:37}}></View>}
        </MusicBox>
        }

        </View>


     </View>

         {modalVisible &&   <Modal
               style = {styles.modalView}
               isVisible={modalVisible}
               onBackdropPress={()=>setModalVisible(!modalVisible)}
               >
               <View style={{marginTop:hp(0.7),marginLeft:wp('-1%'),padding:hp('2%')}}>
         <Text onPress={()=>alert('pressed userName')} style={{color:'#F1B828',fontWeight:'bold',fontSize:15}}>{item.author_details.name}</Text>
                     <ScrollView contentContainerStyle={{paddingBottom:hp('75')}}>
         <Text style={{marginLeft:wp('3%'),color:'white',fontWeight:'600',fontSize:16,flex:1,textAlign:'justify'}}>{item.description}</Text>
                     <Text onPress={() => setModalVisible(!modalVisible)} style = {{fontSize:20,fontWeight:'bold',color:"#F0F8FF",alignSelf:'flex-end'}}>Hide</Text>    
       
                     </ScrollView>
                 
             </View>  
             </Modal>}
       
    </Details>}
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '50%',
        }}
      />
      
      </>
    );
  
      
  }

export default NewsFeed;
