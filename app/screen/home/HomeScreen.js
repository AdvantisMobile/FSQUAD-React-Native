
import React from 'react';
import { View,Keyboard, StyleSheet, PermissionsAndroid, Alert, Share, Dimensions, Image, TouchableOpacity,latform } from 'react-native';
import { connect } from 'react-redux';
import { colors, fonts, localImages, ApiUrl } from '../../utils/constant'
import OptionsMenu from "react-native-options-menu";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { API_BASE_URL, put_like_api, get_post_home_api, put_comment_api, send_friend_req_api, delete_post_api,user_pending_requests_api } from '../../api';
import Swiper from 'react-native-swiper'
import moment from "moment";
const { WIDTH, height } = Dimensions.get('window');
import Modal from 'react-native-modal';
import ViewPager from '@react-native-community/viewpager';
import NewsFeed from '../../component/NewsFeedComponents/NewsFeed'
import { Container, Header, Text, Tab, Separator } from '../../utils/ScreenStyles/HomeStyled' 
import Comments from '../../component/Comments/index'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ manish: "mansh" }],
      active:0,
      tab :1,
      doubleTap:false,
      activeIndex :0,
      lastTap : null,
      hideView:false,
      fetchingBottom:false,
      noMoreData : false,
      errorMessage : false,
      currentLongitude: '',//Initial Longitude
      currentLatitude: '',//Initial Latitude,
      MoreVi: false,
      comment: "",
      token: 'qsqs',
      viewIndex: -1,
      offset: 0,
      limit: 10,
      loadMoreDataStatus: false,
      postList: [],
      postLoading: false,
      TagPeopleModal: false,
      commentModal: false,
      selectedPostId: null,
      selectedComment: [],
      seletedTagg: [],

    }

  }
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      alert('ghj')
      // Use the `this.props.isFocused` boolean
      // Call any action
    }
  }
  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      ],
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
        this.setState({ PickerModalVisible: true })
        console.log('Camera permission denied');

        // LocationServicesDialogBox.checkLocationServicesIsEnabled({
        //   message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
        //   ok: "YES",
        //   cancel: "NO",
        //   enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        //   showDialog: true, // false => Opens the Location access page directly
        //   openLocationServices: true, // false => Directly catch method is called if location services are turned off
        //   preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
        //   preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
        //   providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
        // }).then((success) => {
        //   this.callLocation(this); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
        // }).catch((error) => {
        //   console.log(error.message); // error.message => "disabled"
        // });


      }
    } catch (err) {
      console.warn(err);
    }
  }
  componentDidMount() {
    // this.requestCameraPermission();
    // this.GetPost()
    console.log("token____", this.props.loginuserToken)
    // console.log("posts from redux", this.props.Posts)
    const { navigation } = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.setState({
        offset: 0,
        loadMoreDataStatus: true,
      }, () => {
        this.GetPost()
      })
    });
    const tabBarPressed =  this.props.navigation&&this.props.navigation.addListener('tabPress', e => {
                
      this.props.navigation.isFocused() && this.state.active == 0 ? this.onRefresh() :  this.viewPager.setPage(0);

  });

  }

  componentDidUpdate() {
    if (this.props.fetch_home) {
      this.GetPost();
    }
  }

  multiImageSetUp = () => {
    console.log('setup method called')
    
    this.setState({
        multiImage : !this.state.multiImage
    })
}

animateIcon = (item) => {
  const {doubleTap} = this.state;


  this.setState({doubleTap:true},()=> setTimeout(() => 
  {this.setState({doubleTap: false,hideView:false})}, Platform.OS === 'android'? 300 :1200))

  {item && item.is_liked_by_me == "N" && this.PutLike(item.id)}
  
    }

  hideStuff = () => {
    this.setState({
        hideView : !this.state.hideView
    })
}

handleDoubleTap =  (item) => {
  console.log('item ra',item)
  var delta = new Date().getTime() - this.state.lastTap;

  if(delta < 200) {
   
    this.animateIcon(item.id)
    

  }
  else {
     this.hideStuff()
  }

  this.setState({
      lastTap: new Date().getTime()
  })
}

  selectedPostId = (item) => {
    // debugger
    console.log('comment pressed')
    this.setState({
      selectedPostId: item.id,
      commentModal: true,
      selectedComment: item.comments


    },()=>console.log('comment list',this.state.selectedPostId))
  }

  handleMoreOrders = async () => {
    console.log('handle more called')
    let message = {}

    if (!this.state.loadMoreDataStatus) {
      return
    }
    this.setState({
      postLoading: true,
      fetchingBottom:true
    })
    const data = {
      token: this.props.loginuserToken,
      offset: this.state.offset == 0 ? this.state.offset.toString() : this.state.offset * this.state.limit,
      limit: this.state.limit
    }
    console.log("token in home page ", data)
    try {
      const result = await get_post_home_api(data);
      const frndRequests =  await user_pending_requests_api(data);

      console.log('get post handle more',result)
      this.setState({
        postLoading: false,
        loadMoreDataStatus : false
      })
      
      if ( result && result.status == "SUCCESS") {

        if (result.result.length > 0) {

          if(frndRequests && frndRequests.status == "SUCCESS")
          {
            console.log("friend request succes is achieved",frndRequests)
            frndRequests.result.forEach(frndrqs => {
                result.result.forEach(posts => {
                  if(frndrqs.user_details.id === posts.user_id)
                  {
                    
                    posts.viewer_is_friend = "A"
                  }
                })
            });

          }

          this.setState({
            postList: [...this.state.postList, ...result.result],
            offset: this.state.offset + 1,
            fetchingBottom : false,
            errorMessage:false

          },()=>console.log('post list',this.state.postList))
        } else {
          this.setState({
            loadMoreDataStatus: false,
            fetchingBottom:false,
            noMoreData : true,
            errorMessage:false
          })
        }
      }
      else {
        this.setState({
          postLoading: false,
          fetchingBottom:false,
          errorMessage:true
        })
         console.log("error in load more data",responseJson)
      }
    } catch (error) {
      this.setState({
        postLoading: false,
        fetchingBottom:false,
        errorMessage:true
      })
      console.log("ERROR IN OFFER FETCH API", error);
    }
    //props.navigation.navigate('CreateProfilePage')
  }
  GetPost = async (postId) => {
    console.log('get post is called-----------')
    console.log('hy', postId)
    let message = {}

    const data = {
      token: this.props.loginuserToken,
      offset: this.state.offset == 0 ? this.state.offset.toString() : this.state.offset * this.state.limit,
      limit: this.state.limit

    }
    this.setState({
      postLoading: true,
      fetchingTop : true
    })
    console.log("token in home page ", data)
    try {
      const result = await get_post_home_api(data);

      const frndRequests =  await user_pending_requests_api(data);

     

      this.setState({
        postLoading: false,
        fetchingTop :false
      })
      if (result.status == "SUCCESS") {

      console.log('posts result>>>',result)
      
      
  /***************************************************This is not being used now***************************************/
      // result.result.forEach(element => {
      //   element.post_all_image.forEach(ele => {
      //     Image.getSize( ApiUrl.PostImage + ele.image,(width,height) => {
      //       ele.width = width;
      //       ele.height = height;
      //       if (Dimensions.get('window').width*1.5 == height)
      //       {
      //         ele.height = Dimensions.get('window').width*1.5
      //       }
      //       else ele.height = '100%';
      //     })
      //   })
      // });
    /******************************************************************************************************************/

    if(frndRequests && frndRequests.length > 0 &&  frndRequests.status == "SUCCESS")
    {
      console.log("friend request succes is achieved",frndRequests)
      frndRequests.result.forEach(frndrqs => {
          result.result.forEach(posts => {
            if(frndrqs.user_details.id === posts.user_id)
            {
              console.log('heloo hello hello---------------------------')
              posts.viewer_is_friend = "A"
            }
          })
      });

    }
        else {
          console.log('frnd req error',frndRequests)
        }

        this.setState({
          postList: result.result,
          offset: this.state.offset + 1,
          fetchingTop:false
        },()=>console.log('post list from get post',this.state.postList))
        //  dispatch({
        //      type:Home_get_post_suc,
        //      payload:result.result
        //  })
      }
      else {
        console.log("error occur in get post", result)
        this.setState({
          postLoading: false,
          fetchingTop:false,
          errorMessage:true
        })
      }
    } catch (error) {
      this.setState({
        postLoading: false,
        fetchingTop:false,
        errorMessage:true
      })
      console.log("ERROR IN OFFER FETCH API", error);
    }
    //props.navigation.navigate('CreateProfilePage')
  }
  HideShow(index) {
    // alert(index)
    if (this.state.MoreVi) {
      this.setState({ MoreVi: false, viewIndex: index })
    }
    else {
      this.setState({ MoreVi: true, viewIndex: -1 })
    }
  }

  PutLike = async (postId) => {
    console.log('hy', postId)
    let message = {}

    const data = {
      token: this.props.loginuserToken,
      post_id: postId
    }
    let dataValue = this.state.postList
    try {
      const result = await put_like_api(data);
      console.log(result)
      if (result && result.status == 'SUCCESS') {
        let index = dataValue.map(it => { return it.id }).indexOf(postId)
        console.log(index)
        //debugger

        if (index > -1) {
          dataValue[index].is_liked_by_me = dataValue[index].is_liked_by_me == 'Y' ? dataValue[index].is_liked_by_me = 'N' : dataValue[index].is_liked_by_me = 'Y'
          dataValue[index].total_like = dataValue[index].is_liked_by_me == 'Y' ? dataValue[index].total_like + 1 : dataValue[index].total_like - 1
          this.setState({
            postList: dataValue
          })
        } else {

        }
        console.log(dataValue[index].is_liked_by_me)

      } else {

      }
    } catch (error) {
      console.log("ERROR IN OFFER FETCH API", error);
    }
  }

  onSendComment = async () => {
    console.log('send comment pressed')

    const data = {
      token: this.props.loginuserToken,
      post_id: this.state.selectedPostId,
      post_comment: this.state.comment
    }
    let dataValue = this.state.postList
    console.log(dataValue, this.props.userDetails)
    try {
      const result = await put_comment_api(data);
      console.log(result)
      if (result && result.status == 'SUCCESS') {
        let index = dataValue.map(it => { return it.id }).indexOf(this.state.selectedPostId)
        console.log(index)
        //debugger

        if (index !== -1) {
          dataValue[index].total_comments = dataValue[index].total_comments + 1
          let selectedComment = this.state.selectedComment
          selectedComment.push({
            comment: this.state.comment,
            name: this.props.userDetails.first_name + ' ' + this.props.userDetails.last_name
          })
          this.setState({
            postList: dataValue,
            comment: '',
            selectedComment: selectedComment
          },()=>Keyboard.dismiss())
        } else {

        }
        console.log(dataValue[index].total_comments)

      } else {

      }
    } catch (error) {
      console.log("ERROR IN OFFER FETCH API", error);
    }
  }


  send_friend_req = async (friend_id, postId) => {
    console.log('hy', friend_id, postId)
    let message = {}
    const data = {
      token: this.props.loginuserToken,
      friend_id: friend_id
    }
    let dataValue = this.state.postList
    try {
      const result = await send_friend_req_api(data);
      console.log('frnd request response',result)
      if (result && result.status == 'SUCCESS') {
        let index = dataValue.map(it => { return it.id }).indexOf(postId)
        console.log(index)
        //debugger

        if (index > -1) {
          dataValue[index].viewer_is_friend = 'W'
          this.setState({
            postList: dataValue
          })
        } else {

        }
        console.log(dataValue[index].is_liked_by_me)

      } else {

      }
    } catch (error) {
      console.log("ERROR IN OFFER FETCH API", error);
    }
    //props.navigation.navigate('CreateProfilePage')
  }
  cancel_friend_req() {
    alert("Cancel Friend Request")
  }
  unfriend() {
    alert("Unfriend")

  }
  Delete_Post = (postId) => {
    Alert.alert(
      'Delete',
      'Are you sure want to delete post ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: async () => {

            const data = {
              token: this.props.loginuserToken,
              post_id: postId
            }
            this.onDeleteApi(data)
            // this.props.delete_post(data)
          }
        },
      ],
      { cancelable: false },
    );
  }

  onDeleteApi = async (data) => {

    let message = {}

    try {
      const result = await delete_post_api(data);
      console.log(result)
      if (result && result.status == 'SUCCESS') {
        let postList = this.state.postList
        var ddata = postList.filter(it => it.id != data.post_id)
        this.setState({
          postList: ddata
        })


      } else {

      }
    } catch (error) {
      console.log("ERROR IN OFFER FETCH API", error);
    }
  }
  async onShare(postId) {
    try {
      const result = await Share.share({

        message:
          'Food Squad ',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Error on Share", result)
        } else {
          const data = JSON.stringify({
            token: this.props.loginuserToken,
            post_id: postId
          })
          this.props.share_post(data);

        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  PostComponent = (props) => {
    console.log("_Home_Page_props", props)
    const imageArr = props.PostImage.map(item => {
      return (ApiUrl.PostImage + item)
    })

    let description
    if (props.description.length > 150) {
      description = props.description.substring(0, 150) + '...'
    } else {
      description = props.description
    }

    if (this.state.viewIndex == props.index) {
      description = props.description
    }
    return (

      <View style={{ width: wp('100%'), alignSelf: 'center', backgroundColor: '#fff', marginBottom: 10, borderRadius: 20 }} >
        <View style={{ marginHorizontal: 5, paddingVertical: 10 }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              {!props.authorImage ?

                <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={localImages.person} />

                :
                <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{ uri: ApiUrl.prfile_img + props.authorImage }} />

              }

              <View>
                <Text style={{ color: colors.blue, fontSize: 18, marginBottom: 5, marginHorizontal: 10, fontWeight: '700' }} >{props.AuthorName}</Text>
                {props.tags.length > 0 ?

                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: colors.blue, fontSize: 15, marginLeft: 10 }} >with {props.tags[0].name}</Text>
                    {props.tags.length > 1 ? <TouchableOpacity onPress={() => { this.setState({ TagPeopleModal: true, seletedTagg: props.tags }) }}>
                      <Text style={{ color: colors.blue, fontSize: 15, }} > and {props.tags.length - 1} Others</Text>
                    </TouchableOpacity> : null}

                  </View>

                  : null}

              </View>

            </View>

            {props.is_my_post == "Y" ? null : props.account_type == "PRO" ?
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} >
                <Image style={{ width: 20, height: 20, marginHorizontal: 5, resizeMode: 'contain' }} source={localImages.addFriend} />
                <Text style={{ color: colors.yellow, fontSize: 16 }} >Follow</Text>
              </View>
              :
              <TouchableOpacity onPress={props.viewer_is_friend == "Y" ? () => this.unfriend() : props.viewer_is_friend == "W" ? () => this.cancel_friend_req() : () => this.send_friend_req(props.AuthorId, props.postId)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} >
                <Image style={{ width: wp('7%'), height: hp('7%'), marginHorizontal: 5, resizeMode: 'contain', }} source={localImages.addFriend} />
                <Text style={{ color: colors.blue, fontSize: 16 }} >{props.viewer_is_friend == "Y" ? "Friend" : props.viewer_is_friend == "W" ? "Requested" : "Squad"}</Text>
              </TouchableOpacity>
            }
          </View>
          <Text style={{ color: colors.blue, fontSize: 15, marginBottom: 10, marginLeft: 10 }} >{this.timing(props.createdAt)} </Text>

          {imageArr.length > 0 ? <View style={{ height: WIDTH - 30, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

            <Swiper
              index={0}

              buttonWrapperStyle={{ backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute', top: -90, left: 70, right: 20, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center', width: width - 140, }}

              onIndexChanged={(index) => {

              }}
              showsPagination={true}
              loop={false}
            >
              {
                imageArr.length > 0 &&
                imageArr.map((item, key) => {
                  return (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("PostDetailsScreen", { id: props.postId })} activeOpacity={1} >
                      <Image
                        // resizeMode={'contain'}
                        source={{ uri: item }}
                        style={styles.imageCard}
                        key={key} />
                    </TouchableOpacity>
                  );
                })}
            </Swiper>
          </View> : null}



          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between', paddingHorizontal: 20 }} >
            <View style={{ flexDirection: 'row' }} >
              <Image style={{ width: 25, height: 17.5, resizeMode: 'contain' }} source={localImages.dish} />
              <Text style={{ color: colors.blue }} >  Wanna Cook it</Text>
            </View>

            {props.is_my_post == "Y" ? <View>
              <OptionsMenu
                button={localImages.more}
                buttonStyle={{ width: 20, height: 20, margin: 7.5, resizeMode: "contain" }}
                destructiveIndex={1}
                options={["Delete"]}
                actions={[() => this.Delete_Post(props.postId)]} />

            </View> : null}
          </View>

          <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center', marginTop: 10, justifyContent: 'space-between', paddingHorizontal: 20 }} >

            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <TouchableOpacity onPress={() => this.PutLike(props.postId)} >
                <Image style={{ width: 23, height: 23, resizeMode: 'contain', marginHorizontal: 10, borderWidth: 0.3 }} source={props.is_liked_by_me == "Y" ? localImages.like_active : localImages.Heart} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.selectedPostId(props.postId, props.comments)} >
                <Image style={{ width: 25, height: 25, resizeMode: 'contain', marginHorizontal: 10 }} source={localImages.comment} />
              </TouchableOpacity>
              <Image style={{ width: props.is_i_cooked_it == "Y" ? 40 : 23, height: props.is_i_cooked_it == "Y" ? 40 : 23, resizeMode: 'contain', marginHorizontal: 8 }} source={props.is_i_cooked_it == "Y" ? localImages.fry : localImages.Star} />
            </View>

            <TouchableOpacity onPress={() => this.onShare(props.postId)} style={{ flexDirection: 'row', alignItems: 'center' }} >
              <Text style={{ marginHorizontal: 5, color: colors.blue }} >{props.total_share}</Text>
              <Image style={{ width: width / 18, height: height / 40, resizeMode: 'contain' }} source={localImages.share} />
            </TouchableOpacity>

          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between', paddingHorizontal: 20 }} >

            <View style={{ flexDirection: 'row' }} >
              <Text style={{ color: colors.blue }} >{props.Likes} Likes</Text>
              <Text style={{ color: colors.blue }} >  </Text>
              <Text style={{ color: colors.blue }} > Wanna Cook it </Text>
              <Text style={{ color: colors.blue }} >  </Text>


            </View>

          </View>

          {description ? <View style={{ flexDirection: 'row' }} >
            <Text style={{ color: colors.blue, fontSize: 14, marginTop: 10, marginLeft: 20, fontWeight: '700' }}>{props.AuthorUser} <Text style={{ fontWeight: 'normal', color: colors.blue, fontSize: 14, marginTop: 10, marginLeft: 5 }} >{description}</Text>  {description ? <Text>
              {this.state.viewIndex == props.index && props.description.length > 150 ? <Text onPress={() => this.HideShow(props.index)} style={{ color: colors.blue }}> View less</Text> : props.description.length > 150 ? <Text onPress={() => this.HideShow(props.index)} style={{ color: colors.blue, }}>  More</Text> : null}
            </Text> : null} </Text>


          </View> : null}

          {props.total_comments>0?<Text onPress={() => this.selectedPostId(props.postId, props.comments)} style={{ color: colors.blue, paddingHorizontal: 20, marginTop: 5 }} >View all {props.total_comments} Comments</Text>:null}

        </View>
      </View>
    )
  }
  onRefresh() {
    this.setState({
      offset: 0,
      loadMoreDataStatus: true,
      fetchingTop:true
    }, () => {
      this.GetPost()
    },() => this.viewPager.setPage(0))
  }
  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }
  }
  timing = (time) => {
    return moment.utc(time).local().startOf('seconds').fromNow()
    return moment(time).fromNow()
  }
  render() {
    const Manish = ["red", "orange", "green"]
    return (
      <Container>
      {!this.state.errorMessage&&this.state.active == 0 &&<Text style={{fontSize:18,color:'#fff',alignSelf:'center',top:90,zIndex:-1,position:'absolute'}}> Press home for quick refresh </Text>}
      
           {this.state.fetchingTop &&   <Modal
               style = {styles.topModal}
               isVisible={this.state.fetchingTop}
               animationIn ="slideInDown"
               onBackdropPress={()=>this.setState({fetchingTop:!this.state.fetchingTop})}
               >
               <View style={{marginTop:hp(0.7),marginLeft:wp('-1%'),padding:hp('2%'),justifyContent:'center',alignItems:"center"}}>
             <Text style={{color:'#ffffff',fontWeight:'bold',fontSize:15}}>Loading Data ....</Text>
                   
             </View>  
             </Modal>}
                
          {  !this.state.hideView && <Header>
              <Tab onPress={() => this.setState({tab:1})}>
                <Text active={this.state.tab === 1}>À la carte</Text>
              </Tab> 
              <Separator>|</Separator>
              <Tab onPress={() => this.setState({tab:2})}>
                <Text active={this.state.tab === 2}>Buffet</Text>
              </Tab>
            </Header>}
            <ViewPager
              onPageSelected={e => {
                this.setState({active :(e.nativeEvent.position),hideView:false},()=>{
 
                 if((this.state.active+1) % 10 == 0 && (this.state.offset !== this.state.lastOffset)) {
                    this.setState({loadMoreDataStatus:true,lastOffset:this.state.offset*this.state.limit})
                  this.handleMoreOrders()
                  
                 }
                    
                    })
              }}

              orientation="vertical"
              ref={(viewPager) => {this.viewPager = viewPager}}

              style={{ flex: 1 }}
              initialPage={0}
            >
              {this.state.postList.length > 0 &&this.state.postList.map((item,key) => (
               
               item && item.author_details && item.author_details.name &&
                <View key={key}>
                         
                 <NewsFeed item={item} play={this.state.postList.indexOf(item) === this.state.active}
                 item ={item} 
                 multiImageItem = {this.state.multiImageItem}
                 state={this.state} 
                 animateIcon ={()=>this.animateIcon(item)} 
                 likePressed ={()=>this.PutLike(item.id)} 
                 wannaVisitPressed = {()=> this.wannaVisitPressed(item)}
                 userDetails = {this.props.userDetails && this.props.userDetails}
                 hideView = {this.state.hideView}
                 closeModal = {()=> this.multiImageSetUp()}
                 multiImage = {this.state.multiImage}
                 commentPressed = {()=>this.selectedPostId(item)}
                 wannaCookitPressed = {() => this.wannaCookitPressed(item)}   
                 hideStuff = {()=>this.hideStuff()}
                 sendFrndReq = {()=>this.send_friend_req(item.author_details.id,item.id)}
                 cancelFrndReq = {()=> this.cancel_friend_req()}
                 unfriend = {()=>this.unfriend()}
                 />

                </View>
                
              ))}
            </ViewPager>
            {this.state.fetchingBottom &&   <Modal
               style = {styles.bottomModal}
               isVisible={this.state.fetchingBottom}
               onBackdropPress={()=>this.setState({fetchingBottom:!this.state.fetchingBottom})}
               >
               <View style={{marginTop:hp(0.7),marginLeft:wp('-1%'),padding:hp('2%'),justifyContent:'center',alignItems:"center"}}>
             <Text style={{color:'#ffffff',fontWeight:'bold',fontSize:15}}>Loading Data ....</Text>
                   
             </View>  
             </Modal>}
             <Modal  onBackdropPress={() => alert('back press')} style={styles.bottomModal,{margin:0}}
    isVisible={this.state.commentModal}
              
            >
              <View style={{ flex: 1 }}>
                <Comments commentSet ={(text)=>this.setState({comment:text},()=>console.log('comment set',this.state.comment))} 
                modalClose = {()=>this.setState({commentModal:false})} onSendPressed = {()=>this.onSendComment()}
                commentValue ={this.state.comment}
                comments ={this.state.selectedComment}/>
              </View>
            </Modal>
          </Container>
    );

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
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: colors.white,
  },
  scrollview: {
    flexGrow: 1,
    ///  marginBottom:90
  },
  imageCard: {
    height: WIDTH - 40,
    width: WIDTH - 30,
    marginLeft: 10,
    borderRadius: 10,
    marginBottom: 10
    // alignSelf: "center",
  },
  bottomModal: {
    justifyContent: "flex-end",
    bottom: 20,

  },
  topModal: {
    justifyContent: "flex-start",
    top: 130,
    zIndex:12
  },
  modalContent: {
    backgroundColor: '#f6f8f9',
    paddingTop: 22,
    // justifyContent: "center",

    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    maxHeight: height-60,
    minHeight: height-60,
  },


});
