import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    View,
    RefreshControl,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Keyboard,
    Platform,
    Dimensions
} from "react-native";
// import Separator from "~/components/separator";
import CommentItem from './commentItem/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {
    Button,
    Text,
    Container,
    Icon,
    Header,
    Body,
    Content,
    Footer,
    Left,
    Right,
    Title,
    Spinner,Thumbnail,Image
} from "native-base";
import {colors} from "../../utils/theme";
// import {Avatar, Image} from "react-native-elements";
import CommentsEmojis from "../../utils/emojis";
import styles from "./styles";
import { FlatList } from 'react-native-gesture-handler';
//import PostComments from "~/utils/datas/postComments";
const height = Dimensions.get("window").height;
export default class Comments extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            setRefreshing: false,
            loading: false,
            isModalOpen: false,
            orderedStories: null,
            selectedStory: null
        };
    }

    componentDidMount() {
        this.wait(2000).then(() => {
            this.setState({loading: false,comments:this.props.route.params.comment});
        });
        console.log('comment component did mount called')
        //this.flatListRef.scrollToIndex({animated: true,index:8});
        // setTimeout(() => this.refs.flatList.scrollToEnd(), 0)
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };

    onRefresh = () => {
        this.setState({setRefreshing: true});
        this.wait(2000).then(() => {
            this.setState({setRefreshing: false});
        });
    };

    goBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        const {refreshing} = this.state;
        var commentsArray = this.props.comments && this.props.comments
        return (
            <Container style={{backgroundColor:'rgba(0,0,0,.7)'}} >
               <TouchableOpacity onPress={()=>this.props.modalClose()} style={{top:0,width:'100%',paddingBottom:height*0.33}}>

               </TouchableOpacity>
                <View style={{height:40,padding:0,borderRadius:4,backgroundColor:'#F1B828',flexDirection:'row',alignItems:'center',justifyContent:'center',zIndex:8}}>
                    <Text style={{fontSize:20,color:'white',fontWeight:'900'}}>Comments</Text>
                    <MaterialCommunityIcons onPress={()=>this.props.modalClose()} style={{alignSelf:'center',right:-130}} color="white" size={25} name='close-thick'/>
                    </View>
                <Content style={{height:'50%',flex:1}}>
                    {/* <ScrollView
                        // ref={ref => {this.scrollView = ref}}
                        ref={(scrollView) => {this.scrollView = scrollView}}

                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={() => this.onRefresh}/>
                        }
                        contentInsetAdjustmentBehavior="automatic"
                        style={{paddingBottom:300}} >
                        <View style={styles.commentContainer}>
                            <CommentItem canReply={false} linesType="multilines" context="Comments" NumberOfLines={4}
                                         author="setoo9"
                                         message="❤️❤️❤️ Awesome work. keep up✨❤️ Awesome work. keep up✨❤️ Awesome work. keep up✨❤️ Awesome work. keep up✨"
                                         avatar={true}/>
                        </View>
                        <Separator/>
                        <Spinner color={colors.dark_gray}
                                 style={[styles.spinner, {display: this.state.loading ? 'flex' : 'none'}]}/>
                        <Content padder style={{display: this.state.loading ? 'none' : 'flex'}}>
                            {commentsArray && commentsArray.reverse().map((comment) => (
                                <CommentItem key={comment.id} canReply={comment.canReply} linesType="multilines"
                                             context="Comments" NumberOfLines={1}
                                             author={comment.name}
                                             message={comment.comment} avatar={true}/>
                            ))}
                        </Content>
                    </ScrollView> */}
                    <FlatList  ref='flatList'

                         getItemLayout={(data, index) => { return {length: 33, index, offset: 33 * index} }}

                            refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={() => this.onRefresh}/>
                        }
                        contentInsetAdjustmentBehavior="automatic"
                        style={{paddingBottom:300}}
                        data={this.props.comments.slice().reverse()}
              renderItem={({ item, index }) => {
                console.log('item', item.first_name)
                return (
                    <Content padder style={{display: this.state.loading ? 'none' : 'flex'}}>
                    <CommentItem key={item.id}  linesType="multilines"
                                    context="Comments" NumberOfLines={1}
                                    author={item.name}
                                    message={item.comment} avatar={true}/></Content>
                )
              }}
                                />
                </Content>
                

               
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : 'height'} style={styles.container,{backgroundColor:'black',position:'absolute',bottom:0}}>
                <Footer style={styles.footer,{backgroundColor:'rgba(0,0,0,.94)',borderWidth:3,borderColor:'black'}}>
                        <View style={styles.inputZone,{flexDirection:'row',justifyContent:'space-between', width:"100%",margin:0}}>
                            
                            
                                <TextInput underlineColorAndroid='transparent' style={styles.inputStyle, {paddingLeft:20,left:10,color : "#F1B828",width:"80%",height:45,borderRadius:10, borderWidth:2, borderColor:"#F1B828"}}
                                           placeholder='Add a comment...' placeholderTextColor={'#F1B828'} value={this.props.commentValue} onChangeText={(text)=>this.props.commentSet(text)}
                                />
                             <MaterialCommunityIcons onPress={()=>this.props.onSendPressed()} name="send-circle" size={55} style={{color:"#F1B828",top:-5,right:5,position:'absolute',zIndex:2}}/>
                        </View>
                        </Footer>
                        </KeyboardAvoidingView> 



            </Container>
        );
    }
}

