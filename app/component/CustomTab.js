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
import { View, Text, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
// import { Header } from 'react-navigation-stack';
// import { SkyBlue } from '../Style/color';
import Icon from 'react-native-vector-icons/Ionicons'
// import { Images } from '../../styles/AppStyles';


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const colo1 = '#4e8df2'

export default class CustomTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            Route: '', Home: false, Heart: false, add: false, rcc: false, Profile: false
        }
    }
    componentDidUpdate() {
        const { routes } = this.props.navigation.state;
        routes.forEach((route) => {
            console.log("sadsdd", route.routeName)
        })
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("CustomTab", nextProps.navigation.state.routeName)
    }
    renderTabBarButton = (route, idx) => {
        const {
            activeTintColor,
            inactiveTintColor,
            navigation,
            getLabelText,
            renderIcon
        } = this.props;

        console.log('inshad 2', route)
        // const label = getLabelText({ route });
        // console.log(label)
        const focused = this.props.navigation.state.index == idx;
        const { Home, Heart, Profile, add, rcc } = this.state;
        const routeNameLocal=route.routeName
        return (
            <View>
               {routeNameLocal=='Home'? <View style={{ width: width / 5, height: 50, borderTopWidth: focused ? 1 : 0, borderTopColor: colo1, alignItems: 'center', justifyContent: 'center' }} >
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate(routeNameLocal) }} >
                        <Image style={{ width: width / 13, height: height / 27, resizeMode: 'contain' }} source={focused ? Images.HomeTint : Images.Home} />
                    </TouchableOpacity>
                </View>:null}
                {routeNameLocal=='Fav'? <View style={{ width: width / 5, height: 50, borderTopWidth: focused ? 1 : 0, borderTopColor: colo1, alignItems: 'center', justifyContent: 'center' }} >
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate(routeNameLocal) }} >
                    <Image style={{width:width/13.70,height:height/29,resizeMode:'contain'}} source={focused ? Images.HeartTint : Images.Heart } />
                    </TouchableOpacity>
                </View>:null}
                {routeNameLocal=='AddRec'? <View style={{ width: width / 5, height: 50, borderTopWidth: focused ? 1 : 0, borderTopColor: colo1, alignItems: 'center', justifyContent: 'center' }} >
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate(routeNameLocal) }} >
                    <Image style={{width:width/13,height:height/27,resizeMode:'contain'}} source={focused ? Images.AddTint : Images.Add } />
                    </TouchableOpacity>
                </View>:null}
                {routeNameLocal=='Test'? <View style={{ width: width / 5, height: 50, borderTopWidth: focused ? 1 : 0, borderTopColor: colo1, alignItems: 'center', justifyContent: 'center' }} >
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate(routeNameLocal) }} >
                    <Image style={{width:width/14,height:height/26,resizeMode:'contain'}} source={focused ? Images.RssTint : Images.Rss} />
                    </TouchableOpacity>
                </View>:null}
                {routeNameLocal=='Profile'? <View style={{ width: width / 5, height: 50, borderTopWidth: focused ? 1 : 0, borderTopColor: colo1, alignItems: 'center', justifyContent: 'center' }} >
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate(routeNameLocal) }} >
                    <Image style={{width:40,height:40,borderRadius:20}} source={Images.userDummy} />
                    </TouchableOpacity>
                </View>:null}
            </View>
        );
    };
    render() {
        const { Home, Heart, Profile, add, rcc } = this.state;
        console.log('inshad', this.props.navigation.state, this.props.currentRouteName)
        console.log("dewd", this.state.Home, this.state.Heart)
        const { navigation } = this.props;
        const tabBarButtons = navigation.state.routes.map(this.renderTabBarButton);
        return (
            <View style={{ width: width, borderTopColor: '#eee', borderTopWidth: 0.5, borderRightWidth: 0.5, borderRightColor: '#333', borderLeftWidth: 0.5, borderLeftColor: '#333', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }} >
                {tabBarButtons}
            </View>
        )

    }
}