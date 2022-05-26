import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
var { height, width } = Dimensions.get('window');
import { colors, fonts, localImages } from '../utils/constant'

const Button = (props) => {
    let { onAction } = props
    useEffect(() => {
        console.log('props', props)
    }, [])
    const showDatePicker = () => {
        // setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        // setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        // console.log('A date has been picked: ', new Date(date).toISOString());
        // var data=new Date(date).toISOString()
        // var dateLocal=moment(date).format('LT').split(' ')
        // var time=dateLocal[0].split(':')
        // setSelectedHourse(time[0])
        // setSelectedMin(time[1])
        // setSelectedAMPM(dateLocal[1])
        // console.log(dateLocal)
        hideDatePicker();
    };
    let style={

    }
    return (

        <TouchableOpacity onPress={() => props.onAction()} style={[styles.button, { height: props.height, backgroundColor: props.backgroundColor, width: props.width, borderRadius: props.borderRadius, marginTop: props.marginTop }]}>
            <Text style={[styles.buttonText, { color: props.labelColor, fontSize: props.fontSize ? props.fontSize : 19, fontFamily: props.fontFamily ? props.fontFamily : fonts.regular ,fontStyle:props.fontStyle?props.fontStyle:null, fontWeight:props.fontWeight?props.fontWeight:null}]}>{props.label}</Text>
        </TouchableOpacity>
    )
}

export const ButtonWithoutShadow = (props) => {
    let { onAction } = props
    useEffect(() => {
        console.log('props', props)
    }, [])
    return (

        <TouchableOpacity disabled={props.disabled ? props.disabled : false} onPress={() => props.onAction()} style={[styles.buttonWithoutshadow, { height: props.height, backgroundColor: props.backgroundColor, width: props.width, borderRadius: props.borderRadius, marginTop: props.marginTop, marginBottom: props.marginBottom ? props.marginBottom : 0,marginLeft:props.marginLeft ? props.marginLeft : 0 }]}>
            <Text style={[styles.buttonText, { color: props.labelColor, fontFamily: props.fontFamily, fontSize: props.fontSize , borderBottomWidth:props.borderBottomWidth?props.borderBottomWidth:0, borderBottomColor:props.borderBottomColor?props.borderBottomColor:'#fff',fontStyle:props.fontStyle?props.fontStyle:null, fontWeight:props.fontWeight?props.fontWeight:null}]}>{props.label}</Text>
        </TouchableOpacity>
    )
}


export const ButtonWithBorder = (props) => {
    let { onAction } = props
    useEffect(() => {
        console.log('props', props)
    }, [])
    return (

        <TouchableOpacity onPress={() => props.onAction()} style={[styles.buttonWithoutshadow, { height: props.height, borderColor: props.borderColor, borderWidth: props.borderWidth, width: props.width, borderRadius: props.borderRadius, marginTop: props.marginTop, marginBottom: props.marginBottom ? props.marginBottom : 0 }]}>
            <Text style={[styles.buttonText, { color: props.labelColor, fontFamily: props.fontFamily, fontSize: props.fontSize }]}>{props.label}</Text>
        </TouchableOpacity>
    )
}


export const ReturnButton = (props) => {
    let { onAction } = props
    useEffect(() => {
        console.log('props', props)
    }, [])
    return (

        <TouchableOpacity onPress={() => props.onAction()} style={[styles.returnButton, { height: props.height, backgroundColor: props.backgroundColor, width: props.width, borderRadius: props.borderRadius, marginTop: props.marginTop }]}>
            <Text style={[styles.buttonText, { color: props.labelColor, fontFamily: props.fontFamily, fontSize: props.fontSize, position: props.position, top: props.top, left: props.left }]}>{props.label}</Text>
        </TouchableOpacity>
    )
}

export const ButtonCalender = (props) => {
    let { onAction } = props
    useEffect(() => {
        console.log('props', props)
    }, [])
    return (
        <View style={[ { width: props.width, marginTop: props.marginTop }]}>
        <Text style={[styles.robotoRegularText,{fontSize:12, color:props.labelColor, marginLeft:20,marginBottom:10}]}>{props.label}</Text>
        <TouchableOpacity onPress={props.onAction} style={[styles.ButtonDropDown, { height: props.height, backgroundColor: props.backgroundColor, width: props.width, borderRadius: props.borderRadius, marginBottom: props.marginBottom ? props.marginBottom : 0 }]}>
            <Text style={[styles.buttonText, { color: props.palceholderColor, fontFamily: props.fontFamily, fontSize: props.fontSize, marginLeft: props.marginLeftText, marginRight: props.marginRightText }]}>{props.palceholder}</Text>
            {/* <FontAwesomeIcon style={{ position: 'absolute', right: 20 }} icon={faCalendarDay} color={props.iconColor?props.iconColor:props.palceholderColor?props.palceholderColor:colors.titleText} Size={25} /> */}
            {/* <DateTimePickerModal
                isVisible={props.isDatePickerVisible}
                mode="date"
                onConfirm={props.handleConfirm}
                onCancel={props.hideDatePicker}
                maximumDate={props.maxDate?props.maxDate:null}
                minimumDate={props.minDate}
                
                date={props.selectedDate ? props.selectedDate : new Date()}
            /> */}
        </TouchableOpacity>
    </View>
        
    )
}

export const ButtonDropDown = (props) => {
    let { onAction } = props
    useEffect(() => {
        console.log('props', props)
    }, [])
    return (


        <View style={[{ width: props.width, marginTop: props.marginTop }]}>
            <Text style={[styles.robotoRegularText, { fontSize: 12, color: props.labelColor, marginLeft: 20, marginBottom: 10 }]}>{props.label}</Text>
            <TouchableOpacity onPress={() => props.onAction()} style={[styles.ButtonDropDown, { height: props.height, backgroundColor: props.backgroundColor, width: props.width, borderRadius: props.borderRadius,  marginBottom: props.marginBottom ? props.marginBottom : 0 }]}>
                <Text style={[styles.buttonText, { color: props.palceholderColor, fontFamily: props.fontFamily, fontSize: props.fontSize, marginLeft: props.marginLeftText, marginRight: props.marginRightText }]}>{props.palceholder}</Text>
                {/* <FontAwesomeIcon style={{ position: 'absolute', right: 20 }} icon={faCaretDown} color={props.palceholderColor} Size={25} /> */}
            </TouchableOpacity>
        </View>
    )
}

export const ButtonRightIcon = (props) => {
    let { onAction } = props
    useEffect(() => {
        console.log('props', props)
    }, [])
    return (

        <TouchableOpacity onPress={props.onAction} style={[styles.ButtonDropDown, { height: props.height, backgroundColor: props.backgroundColor, width: props.width, borderRadius: props.borderRadius, marginTop: props.marginTop, marginBottom: props.marginBottom ? props.marginBottom : 0, marginLeft: props.marginLeft ? props.marginLeft : 0 }]}>
            {/* <FontAwesomeIcon style={{ position: 'absolute', left: 20 }} icon={props.type == 'event' ? faCalendarDay : faBookmark} color={colors.grayColor} size={25} /> */}
            <View style={{ borderBottomColor: props.palceholderColor, borderBottomWidth: .5, marginLeft: 50 }}><Text style={[styles.buttonText, { color: props.palceholderColor, fontFamily: props.fontFamily, fontSize: props.fontSize, marginLeft: props.marginLeftText, marginRight: props.marginRightText, fontStyle:'italic'}]}>{props.palceholder}</Text></View>
        </TouchableOpacity>
    )
}
export default Button

var styles = StyleSheet.create({
    button: {
        // shadowColor: colors.greenText1,
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.30,
        // shadowRadius: 4.65,
        // elevation: 8,
        // justifyContent: 'center',
        // alignItems: 'center'


        shadowColor: colors.loginshadow,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.27,
        shadowRadius: 6,

        elevation: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonWithoutshadow: {
        // shadowColor: colors.greenText1,
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.30,
        // shadowRadius: 4.65,
        // elevation: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonDropDown: {
        // alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        //justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
        //marginLeft:10
    },
    buttonText: {
        // fontFamily:fonts.robotoRegular,
        //  fontSize:19
    },
    returnButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },

});