import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import Login from '../screen/login'
// import ParentStack from './ParentStack'
// import ChildStack from './ChildStack'
// import AuthenticationStack from './AuthenticationStack'
import Introstack from './Introsatck'
import HomeStack from './HomeStack'
const Stack = createStackNavigator();
import { connect } from 'react-redux';
import {actions} from "../reduxActionAndReducer/reducer";
const RootNavigator=(props)=>{
    return (
        <Stack.Navigator screenOptions={{
           headerShown: false
          }}>
            {/* <Stack.Screen name="Introstack" component={Introstack} /> */}
            {props.loginStatus=='home'?<Stack.Screen name="HomeStack" component={HomeStack} />:<Stack.Screen name="Introstack" component={Introstack} />}
            
        </Stack.Navigator>
      );

}
const mapStateToProps = (state) => {
    console.log("check store data", state);
    return {
      loginStatus: state.localStates.loginStatus,
      introstatus: state.localStates.introstatus,
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      setLoggedInUserAuthToken: token => {
        dispatch(actions.setLoggedInUserAuthToken(token));
      },
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator)