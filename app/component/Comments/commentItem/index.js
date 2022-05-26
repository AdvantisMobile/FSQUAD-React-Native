import React from "react";
import {View, StyleSheet, TouchableOpacity,Text} from "react-native";
import {Thumbnail} from 'native-base'
// import {Avatar, Text} from "react-native-elements";
import {colors} from '../../../utils/theme';
import styles from './styles';

const CommentItem = (props) => {
    return (
        <View>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                marginTop:10,
                marginLeft: props.context !== 'Home' ? 20 : 4,
                marginRight: props.context !== 'Home' ? 20 : 4
            }}>
               
                <Text 
                      style={Object.assign({}, styles.commentRow, {marginLeft: props.context !== 'Home' ? 23 : 0})}><Text
                    style={styles.author}>@{props.author}</Text>{` ${props.message}`}</Text>
            </View>
        
            {

                props.context != 'Home' ?(
                    <View>
                        {/* <View style={styles.replyContainer}>
                            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{
                                    width: 25,
                                    height: 2,
                                    backgroundColor: colors.dark_gray,
                                    alignSelf: 'center'
                                }}/>
                                
                            </TouchableOpacity>
                        </View> */}
                        <View style={{marginLeft: 30}}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                marginLeft: props.context !== 'Home' ? 20 : 4,
                                marginRight: props.context !== 'Home' ? 20 : 4
                            }}>
                                {props.context !== 'Home' ? <TouchableOpacity style={{justifyContent: 'center'}}>
                                    {/* <Thumbnail
                                        small
                                        containerStyle={styles.avatarStyle}
                                        
                                        //source={}
                                    /> */}
                                </TouchableOpacity> : null}
                        
                            </View>
                            <View style={styles.cardStatsCounter}>
                                <View style={Object.assign({}, styles.flexStartAligned, {flex: 7})}>
                                    <Text style={styles.hour}>7h</Text>
                                    <Text style={styles.likes}>12 Likes</Text>
                                   
                                </View>
                            </View>
                        </View>
                    </View>
                ) : null
            }

        </View>

    );
};

export default CommentItem;
