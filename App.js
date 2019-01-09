import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {fromLeft , fromTop} from 'react-navigation-transitions';
import  {createSwitchNavigator,createStackNavigator,createDrawerNavigator,createBottomTabNavigator} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import SignUpFacial  from './screens/SignUpFacial';
import LoginFacial from './screens/LoginFacial';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
let AppScenes = {
   LoginScreen : {
     screen : LoginScreen
   },
   SignUpFacial : {
     screen: SignUpFacial
   },
   LoginFacial : {
    screen: LoginFacial
  },
 
 }
 const AuthStackNavigator = createStackNavigator(AppScenes,  {
   transitionConfig: () => fromTop(700),
   
   navigationOptions: {
     headerVisible: true,
     headerStyle: {
       position: 'absolute', 
       backgroundColor: 'transparent',
       borderBottomColor:'transparent', 
       zIndex: 100, 
       top: 0,
        left: 0, 
        right: 0 ,
        elevation: 0, 
       shadowOpacity: 0,
     },
     headerTintColor: '#ffffff',
    
     headerTitleStyle: {
       fontWeight: 'bold',
     },
   },
 });
 export default createSwitchNavigator({
  AuthLoading : AuthLoadingScreen,
  Auth : AuthStackNavigator,

}); 

