import React, { useState, useEffect, Component } from 'react'
import { TouchableOpacity, ScrollView, StatusBar, Image, View, Text, StyleSheet, SafeAreaView, Dimensions, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { actions } from "../../reduxActionAndReducer/reducer";
import { colors, fonts, localImages } from '../../utils/constant'
import SharedClass from '../../utils/SharedClass'
import InputBox from '../../component/InputBox'
import AppIntroSlider from 'react-native-app-intro-slider';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
import Button, { ButtonWithoutShadow } from '../../component/Button'
var { height, width } = Dimensions.get('window');



const slides = [
    {
        key: 'somethun',
        title: 'Rewards',
        text: 'Create tasks to reward your kids',
        backgroundColor: '#59b2ab',
        index: 0
    },
    {
        key: 'somethun-dos',
        title: 'Title 2',
        text: 'Other cool stuff',
        backgroundColor: '#febe29',
        index: 1
    },
    {
        key: 'somethun1',
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\nLorem ipsum bla bla bla',
        backgroundColor: '#22bcb5',
        index: 2
    }
];
class CreateProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.sharedClass = new SharedClass();
        this.state = {
            screenHeight: height,
            countryCode: 'IN',
            callingCode: '+91',
            withCountryNameButton: false,
            withFlag: true,
            withEmoji: false,
            withFilter: true,
            withAlphaFilter: false,
            withCallingCode: false,
            name: '',
            email: '',
            password: '',
            address: '',
            password: '',
            confirmPassword: '',
            secureTextEntry: true,
            secureTextEntry2: true
        }


    }
    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight });
    };


    _onDone = () => {
        // User finished the LoginScreen. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
    }

    onSelect = (country) => {
        console.log(country)
        // setCountryCode(country.cca2)
        // setCallingCode("+" + country.callingCode[0])
        this.setState({
            callingCode: '+' + country.callingCode[0],
            countryCode: country.cca2
        })
    }
    render() {
        //alert()
        const scrollEnabled = Platform.OS == 'ios' ? true : this.state.screenHeight > height;
        return (
            <View style={styles.container}>

                <SafeAreaView style={styles.mainContainer}>
                    <StatusBar barStyle="dark-content" backgroundColor={colors.statusBarColor} />
                    <View style={{ flex: 1 }}>
                        <ScrollView
                            style={{ flex: 1 }}
                            contentContainerStyle={styles.scrollview}
                            scrollEnabled={scrollEnabled}
                            onContentSizeChange={this.onContentSizeChange}
                        >
                            <View style={[styles.mainContent, { alignItems: 'center' }]}>

                                <View style={{ alignItems: 'center', marginBottom: 30 }}>
                                    <View style={[styles.card, { marginVertical: 30 }]}>
                                        <Image source={localImages.logo} style={{ height: 150, width: 150 * 1.15 }} />
                                        {/* <Text style={[styles.robotoRegularText, { marginLeft: 20, fontSize: 19, color: colors.blubutton }]}>Money Parenting Made Zimble</Text> */}
                                    </View>

                                    <InputBox
                                        height={60}
                                        backgroundColor={colors.inputBox}
                                        width={(width - 60)}
                                        borderRadius={30}
                                        marginTop={20}
                                        placeholder="Name"
                                        label="Name"
                                        labelColor={colors.labelColor}
                                        placeholderColor={colors.placeHolderColor}

                                        inputTextColor={colors.inputTextColor}
                                        secureTextEntry={false}
                                        // keyboardType={'numeric'}
                                        editable={true}
                                        value={this.state.name}
                                        maxLength={400}
                                        onIconClick={() => {

                                        }}
                                        iconName="ser_a"
                                        onChangeText={(text) => {
                                            this.setState({
                                                name: text
                                            })
                                        }}
                                    ></InputBox>
                                    <InputBox
                                        height={60}
                                        backgroundColor={colors.inputBox}
                                        width={(width - 60)}
                                        borderRadius={30}
                                        marginTop={15}
                                        placeholder="Email Id"
                                        label="Email Id"
                                        labelColor={colors.labelColor}
                                        placeholderColor={colors.placeHolderColor}

                                        inputTextColor={colors.inputTextColor}
                                        secureTextEntry={false}
                                        // keyboardType={'numeric'}
                                        editable={true}
                                        value={this.state.email}
                                        maxLength={400}
                                        onIconClick={() => {

                                        }}
                                        iconName="mail"
                                        onChangeText={(text) => {
                                            this.setState({
                                                email: text
                                            })
                                        }}
                                    ></InputBox>

                                    <InputBox
                                        height={60}
                                        backgroundColor={colors.inputBox}
                                        width={(width - 60)}
                                        borderRadius={30}
                                        marginTop={15}
                                        placeholder="Address"
                                        label="Address"
                                        labelColor={colors.labelColor}
                                        placeholderColor={colors.placeHolderColor}

                                        inputTextColor={colors.inputTextColor}
                                        secureTextEntry={false}
                                        // keyboardType={'numeric'}
                                        editable={true}
                                        value={this.state.address}
                                        maxLength={400}
                                        onIconClick={() => {

                                        }}
                                        iconName="location"
                                        onChangeText={(text) => {
                                            this.setState({
                                                address: text
                                            })
                                        }}
                                    ></InputBox>

                                    <InputBox
                                        height={60}
                                        backgroundColor={colors.inputBox}
                                        width={(width - 60)}
                                        borderRadius={30}
                                        marginTop={15}
                                        placeholder="Password"
                                        label="Password"
                                        labelColor={colors.labelColor}
                                        placeholderColor={colors.placeHolderColor}

                                        inputTextColor={colors.inputTextColor}
                                        secureTextEntry={this.state.secureTextEntry}
                                        // keyboardType={'numeric'}
                                        editable={true}
                                        value={this.state.password}
                                        maxLength={400}
                                        onIconClick={() => {
                                            this.setState({
                                                secureTextEntry: !this.state.secureTextEntry
                                            })
                                        }}
                                        iconName="eye"
                                        onChangeText={(text) => {
                                            this.setState({
                                                password: text
                                            })
                                            
                                        }}
                                    ></InputBox>

                                    <InputBox
                                        height={60}
                                        backgroundColor={colors.inputBox}
                                        width={(width - 60)}
                                        borderRadius={30}
                                        marginTop={15}
                                        placeholder="Confirm Password"
                                        label="Confirm Password"
                                        labelColor={colors.labelColor}
                                        placeholderColor={colors.placeHolderColor}

                                        inputTextColor={colors.inputTextColor}
                                        secureTextEntry={this.state.secureTextEntry2}
                                        // keyboardType={'numeric'}
                                        editable={true}
                                        value={this.state.confirmPassword}
                                        maxLength={400}
                                        onIconClick={() => {
                                            this.setState({
                                                secureTextEntry2: !this.state.secureTextEntry2
                                            })
                                        }}
                                        iconName="eye"
                                        onChangeText={(text) => {
                                            this.setState({
                                                confirmPassword: text
                                            })
                                        }}
                                    ></InputBox>



                                    <View style={{ width: width, alignItems: 'center' }}>
                                        <Button
                                            height={60}
                                            backgroundColor={colors.ornageButton}
                                            width={width - 130}
                                            borderRadius={8}
                                            marginTop={40}
                                            label="CREATE PROFILE"
                                            labelColor={colors.inputBox}
                                            onAction={() => { }}
                                            fontSize={17}
                                            fontFamily={Platform.OS == 'ios' ? fonts.regular : fonts.semiBold}

                                            fontStyle={Platform.OS == 'ios' ? 'normal' : null}
                                            fontWeight={Platform.OS == 'ios' ? '700' : null}
                                        ></Button>

                                    </View>



                                </View>
                            </View>

                        </ScrollView>

                    </View>

                </SafeAreaView>

            </View>


        );
    }

}

const mapStateToProps = (state) => {
    console.log("check store data", state.localStates);
    return {
        loginStatus: state.localStates.loginStatus,
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateProfileScreen)

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors.authBackGroud,
    },
    scrollview: {
        flexGrow: 1,
        ///  marginBottom:90
    },
    mainContent: {
        flexGrow: 1,
        justifyContent: "space-between",
        padding: 10,
    },
    inputBoxStyle: {
        // backgroundColor: 'transparent',
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
    textLine: {
        marginTop: 20,
        color: colors.blueText,
        fontSize: 17,
        fontFamily: Platform.OS == 'ios' ? fonts.regular : fonts.regular,
        fontStyle: Platform.OS == 'ios' ? 'normal' : null,
        fontWeight: Platform.OS == 'ios' ? 'normal' : null
    }
});