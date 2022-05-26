import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import Introduction from '../screen/Login/Introduction'
import LoginScreen from '../screen/Login/LoginScreen'
import SignupScreen from '../screen/Login/SignupScreen'
import OtpScreen from '../screen/Login/OtpScreen'
import SignUpScreen1 from '../screen/Login/SignUpScreen1'
import SignUpScreen2 from '../screen/Login/SignUpScreen2'
import SignUpScreen3 from '../screen/Login/SignUpScreen3'
import SelectBusinessHours from '../screen/Login/SelectBusinessHours'
// import CreateProfileScreen from '../screen/Login/CreateProfileScreen'
const Stack = createStackNavigator();
const Introstack = (props) => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      
       
       <Stack.Screen name="LoginScreen" component={LoginScreen} />
       <Stack.Screen name="OtpScreen" component={OtpScreen} />
       <Stack.Screen name="SignUpScreen3" component={SignUpScreen3} />
      <Stack.Screen name="SignUpScreen2" component={SignUpScreen2} />
      <Stack.Screen name="SignUpScreen1" component={SignUpScreen1} />
       <Stack.Screen name="SignupScreen" component={SignupScreen} />
       <Stack.Screen name="SelectBusinessHours" component={SelectBusinessHours} />

       {/* <Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} />
       <Stack.Screen name="LoginScreen" component={LoginScreen} />
        */}
      {/* <Stack.Screen name="Introduction" component={Introduction} /> */}
      
      

    </Stack.Navigator>
  );

}

export default Introstack