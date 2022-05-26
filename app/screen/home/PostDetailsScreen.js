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
import { View, SafeAreaView, Text, TextInput, TouchableOpacity, ImageBackground, Image, RefreshControl, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { colors, fonts, localImages, ApiUrl } from '../../utils/constant'
import { API_BASE_URL, put_like_api, post_details_api, put_comment_api, send_friend_req_api } from '../../api';

// import {post_details} from '../../redux/action/action_creater';
// import { Images , color, ApiUrl } from '../../styles/AppStyles';
import moment from 'moment';
const { width, height } = Dimensions.get('screen')
class PostDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            postData: ''
        }

    }
    componentDidMount() {
        const { navigation, route } = this.props;
        console.log(navigation, route.params)
        //  var data = JSON.parse(route.params.phonedata)
        const post_id = route.params.id;
        console.log(post_id)
        const data = JSON.stringify({
            token: this.props.loginuserToken,
            post_id: post_id
        })
        // this.state.postData(data)
        this.GetPost(data)
    }

    GetPost = async (data) => {
        // console.log('hy', postId)
        let message = {}



        //setLoader(true)
        //console.log(loder)


        this.setState({
            isLoading: true
        })
        console.log("token in home page ", data)
        try {
            const result = await post_details_api(data);
            console.log(result)
            this.setState({
                isLoading: false
            })
            if (result.status == "SUCCESS") {
                this.setState({
                    postData: result.result,
                })

            }
            else {
                console.log("wdfwdfefd", result)
            }
        } catch (error) {
            this.setState({
                isLoading: false
            })
            console.log("ERROR IN OFFER FETCH API", error);
        }
        //props.navigation.navigate('CreateProfilePage')
    }
    render() {
        console.log("Posts de", this.state.postData)
        const manish = ''
        // moment.utc(this.state.postData.updated_at).local().startOf('seconds').fromNow()
        if (this.state.isLoading && !this.state.postData) {

            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <ActivityIndicator size={25} color={colors.blue} />
                </View>
            )
        }
        else {
            return (
                <SafeAreaView style={{ flex: 1 }} >
                    {!this.state.postData ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <ActivityIndicator size={25} color={colors.blue} />
                </View> :
                        <View>
                            <View style={{ width: width, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: colors.black, borderBottomWidth: 0.5 }} >
                                <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <Image style={{ width: 25, height: 15, marginHorizontal: 10 }} source={localImages.backArrow} />
                                    <Text style={{ fontSize: 18 }} >Post</Text>
                                </TouchableOpacity>
                                <View>
                                    {this.state.postData.author_details && this.state.postData.author_details.profile_pic ?
                                        <Image style={{ width: 30, height: 30,  marginHorizontal: 10, borderRadius: 15 }} source={{ uri: ApiUrl.prfile_img + this.state.postData.author_details.profile_pic }} />
                                        : <Image style={{ width: 25, height: 25, resizeMode: 'contain', marginHorizontal: 10 }} source={localImages.person} />}
                                </View>
                            </View>
                            <View>
                                <ImageBackground style={{ width: width, height: height / 3, resizeMode: 'contain' }} source={{ uri: ApiUrl.PostImage +  this.state.postData.post_deafult_image.image }} >
                                    <View style={{ width: width, height: 50, backgroundColor: '#fff', flexDirection: 'row', marginTop: height / 3 - 50, borderTopLeftRadius: 40, borderTopRightRadius: 40 }} >
                                        <View style={{ flexDirection: 'row', alignItems: "center", margin: 15 }} >
                                            <Text style={{ color: colors.blue, marginHorizontal: 5 }} >{this.state.postData.total_like}</Text>
                                            <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={this.state.postData.is_liked_by_me == "N" ? localImages.Heart : localImages.like_active} />
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 15 }} >
                                            <Text style={{ color: colors.blue, marginHorizontal: 5 }} >{this.state.postData.total_comments}</Text>
                                            <Image style={{ width: 28, height: 28, resizeMode: 'contain' }} source={localImages.comment} />
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>

                            <View style={{ paddingHorizontal: 20 }} >

                                <Text style={{ textAlign: 'left', fontSize: 16, color: colors.blue }} >{this.state.postData.description}</Text>
                                <Text style={{ color: colors.blue }}>{manish}</Text>
                            </View>

                            <View>
                                <FlatList data={this.state.postData.post_all_comments} renderItem={({ item, index }) => {
                                    const Time = moment.utc(item.updated_at).local().startOf('seconds').fromNow()
                                    return (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }} >
                                            {
                                                item.commenter_details && item.commenter_details.profile_pic ?
                                                    <Image style={{ width: 30, height: 30, borderRadius: 100, borderColor: colors.blue }} source={{ uri: ApiUrl.prfile_img + item.commenter_details.profile_pic }} />
                                                    : <Image style={{ width: 30, height: 30, borderRadius: 100, borderColor: colors.blue }} source={localImages.person} />}
                                            <View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                                    <Text style={{ color: colors.black, fontWeight: 'bold', marginHorizontal: 10 }} >{item.commenter_details.first_name + " " + item.commenter_details.last_name}</Text>
                                                    <Text style={{ color: "#888", fontSize: 12 }} >{Time}</Text>
                                                </View>
                                                <Text style={{ marginHorizontal: 10 }} >{item.comment}</Text>
                                            </View>
                                        </View>
                                    )
                                }} />
                            </View>
                        </View>

                    }
                </SafeAreaView>
            )


        }
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


export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsScreen);