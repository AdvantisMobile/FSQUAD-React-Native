import React, { useState, useEffect } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
var { height, width } = Dimensions.get('window');
import { colors, fonts,localImages} from '../utils/constant'

const InputBox = (props) => {
    let { onAction } = props
    useEffect(() => {
        console.log('props', props)
    }, [])
    return (



        <View style={[styles.card,{ width: props.width, marginTop: props.marginTop, flexDirection:'row',backgroundColor: props.backgroundColor,alignItems:'center' }]}>
            {/* <Text style={[styles.robotoRegularText, { fontSize: 12, color: props.labelColor, marginLeft: 20, marginBottom: 10 }]}>{props.label}</Text> */}
            <TextInput
                placeholder={props.placeholder}
                placeholderTextColor={props.placeholderColor}
                secureTextEntry={props.secureTextEntry}
                editable={props.editable}
                value={props.value}
                multiline={props.multiline ? props.multiline : false}
                maxLength={props.maxLength}
                onChangeText={(text) => props.onChangeText(text)}
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={[ styles.button, { width:props.width-30 , borderRadius: 8, color: props.inputTextColor, height: props.height,  }]}>

            </TextInput>
            {props.iconName?<TouchableOpacity onPress={()=>props.onIconClick()}>
                <Image source={localImages[props.iconName]} style={{height:20,width:20, marginRight:5}} />
            </TouchableOpacity>:null}

           
        </View>
    )
}



export const InputBoxmultiline = (props) => {
    let { onAction } = props
    useEffect(() => {
        console.log('props ', props)
    }, [])
    return (



        <View style={[{ width: props.width, marginTop: props.marginTop }]}>
            {/* <Text style={[styles.robotoRegularText, { fontSize: 12, color: props.labelColor, marginLeft: 20, marginBottom: 10 }]}>{props.label}</Text> */}
            <TextInput
                placeholder={props.placeholder}
                placeholderTextColor={props.placeholderColor}
                secureTextEntry={props.secureTextEntry}
                editable={props.editable}
                value={props.value}
                multiline={props.multiline ? props.multiline : false}
                maxLength={props.maxLength}
                onChangeText={(text) => props.onChangeText(text)}
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={[styles.card, styles.button, { width: '100%', borderRadius: 8, color: props.inputTextColor, height: props.height, backgroundColor: props.backgroundColor, }]}>

            </TextInput>
        </View>
    )
}

export default InputBox

var styles = StyleSheet.create({
    robotoRegularText: {
        fontFamily: fonts.robotoRegular,
        color: colors.subTitleColor
    },
    robotoBoldText: {
        fontFamily: fonts.robotoBold,
        color: colors.grayColor
    },
    card: {
        backgroundColor: 'transparent',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        justifyContent: 'center',
        //alignItems: 'center',
        borderRadius: 8

    },
    button: {

        paddingHorizontal: 15,
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowColor: colors.greenText1,
        // shadowOpacity: 0.30,
        // shadowRadius: 4.65,
        // elevation: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: fonts.robotoRegular,
        fontSize: 19
    },
    underlineStyleBase: {
        width: 50,
        height: 50,
        backgroundColor: colors.inputBoxBackground,
        borderRadius: 25,
        borderWidth: 1,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: colors.greenText1,
        backgroundColor: colors.greenText1,
        color: colors.white
    },

});