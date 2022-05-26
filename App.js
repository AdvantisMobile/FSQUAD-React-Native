/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect}  from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider, connect } from "react-redux";

import SplashScreen from 'react-native-splash-screen'
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from "./app/utils/store";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import  RootNavigator from './app/navigation/RootNavigator'
const App: () => React$Node = () => {
  console.disableYellowBox = true;
  useEffect(()=>{
    SplashScreen.hide()
  })
  return (
    <>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
      
      <StatusBar barStyle="light-content" backgroundColor={Colors.gradientGreenThree} />
      <RootNavigator></RootNavigator>
      {/* <FlashMessage position="bottom" duration={2000} /> */}
      </NavigationContainer>
      </PersistGate>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
