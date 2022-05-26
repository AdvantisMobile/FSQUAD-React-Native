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
import {View,Text, ImagePickerIOS , Alert,SafeAreaView} from 'react-native';
// import {_Logout} from '../../redux/action/action_creater';
import {connect} from 'react-redux';
import { actions } from "../reduxActionAndReducer/reducer";






class DarwerCom extends React.Component{

    

    Logout(){

        Alert.alert(
          'Logout',
          'Are you sure want to logout ?',
          [
              {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
              },
              {
                  text: 'OK', onPress: async () => {
                    this.props.setLoggedInUserDetails(null)
                    this.props.setLoggedInUserAuthToken(null)
                    this.props.setLoggedInUserStatus(null)
                  }
              },
          ],
          { cancelable: false },
      );
      }

      

    render(){
      // this.props.user_id == null ? this.props.nav.navigate("Login") : null
      return(
        <SafeAreaView>
        <View>
          <Text onPress={() => this.Logout()} style={{marginHorizontal:20,marginVertical:20}} >Logout</Text>
          <Text onPress={() => {this.props.navigation.navigate("EditProfileScreen"),this.props.navigation.closeDrawer()} } style={{marginHorizontal:20,marginVertical:20}} >Edit Profile</Text>

        </View>
        </SafeAreaView>
      )
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
          setLoggedInUserDetails: userDetails => {
            dispatch(actions.setLoggedInUserDetails(userDetails));
          },
          setLoggedInUserStatus: loginStatus => {
            dispatch(actions.setLoggedInUserStatus(loginStatus));
          },
          setLoggedInUserType: loginType => {
            dispatch(actions.setLoggedInUserType(loginType));
          },
    };
};
  
  export default connect(mapStateToProps, mapDispatchToProps)(DarwerCom);

