import React from 'react';
import { View, Text, ImagePickerIOS, Alert, SafeAreaView, Image,Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Introduction from '../screen/Login/Introduction'
import HomeScreen from '../screen/home/HomeScreen'
import FavScreen from '../screen/home/FavScreen'
import ProfileScreen from '../screen/home/ProfileScreen'
import PostDetailsScreen from '../screen/home/PostDetailsScreen'
import EditProfileScreen from '../screen/home/EditProfileScreen'
import FriendRequest from '../screen/home/Friend_request'



import AddRecipeNew from '../screen/home/AddRecipeNew'
import AddFilterScreen from '../screen/home/AddFilterScreen'
import AddRecipePost from '../screen/home/AddRecipePost'
import Testing from '../screen/home/Testing'
import { colors, fonts, localImages } from '../utils/constant'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



import DarwerCom from '../component/DrawerComponent'
// import SignupScreen from '../screen/Login/SignupScreen'
// import CreateProfileScreen from '../screen/Login/CreateProfileScreen'
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const Drawer = createDrawerNavigator();


const HomeTab = (props) => {
  return (
    <Tab.Navigator
    
    activeColor="white"
    labelStyle={{ fontSize: 12 }}
    labeled={false}
    barStyle= {{ backgroundColor: '#F1B828',marginBottom:  -2  }}
      screenOptions={({ route }) => ({
        showLabel: false,
       
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: colors.childblue,
        inactiveTintColor: 'gray',
      }}


    >

      <Tab.Screen name="Home" component={HomeScreen}  options={{
            tabBarLabel: 'Home',
            tabBarButton : () => {
                alert('hello mike')
            },
            tabBarIcon: ({ color }) => (
                
                <MaterialCommunityIcons  name="home" color={color} size={28} />
                
            ),
          }}/>
           <Tab.Screen name="Testing" component={Testing} options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="search" color={color} size={28} />
            ),
          }}/>
      
      <Tab.Screen name="AddRecipeNew" component={AddRecipeNew}  options={{
            tabBarLabel: 'Add Post',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="plus-circle-outline" color={color} size={26} />
            ),
          }}/>

<Tab.Screen name="Fav" component={FavScreen} options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="notifications" color={color} size={25} />
            ),
          }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={28} />
            ),
          }}/>

      {/* <Tab.Screen name="Tasks" component={TaskListPage} />
          <Tab.Screen name="Chat" component={ChatListPage} />
          <Tab.Screen name="Accounts" component={AccountPage} /> */}
    </Tab.Navigator>
  );

}

const HomeDrawer = (props) => {
  return(
    <Drawer.Navigator initialRouteName="HomeTab" drawerContent={props => <DarwerCom {...props} />}>
    <Drawer.Screen name="HomeTab" component={HomeTab} />
   
  </Drawer.Navigator>
  )
}
const HomeStack = (props) => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>

      <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
      <Stack.Screen name="PostDetailsScreen" component={PostDetailsScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="AddFilterScreen" component={AddFilterScreen} />
      <Stack.Screen name="AddRecipePost" component={AddRecipePost} />
      <Stack.Screen name="FriendReq" component={FriendRequest} />
      {/* <Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} />
       <Stack.Screen name="LoginScreen" component={LoginScreen} />
       <Stack.Screen name="SignupScreen" component={SignupScreen} /> */}
      {/* <Stack.Screen name="Introduction" component={Introduction} /> */}



    </Stack.Navigator>
  );

}

export default HomeStack