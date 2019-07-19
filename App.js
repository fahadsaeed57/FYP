import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import {fromLeft , fromTop} from 'react-navigation-transitions';
import  {createSwitchNavigator,createStackNavigator,createDrawerNavigator,createBottomTabNavigator} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import SignUpFacial  from './screens/SignUpFacial';
import LoginFacial from './screens/LoginFacial';
import Icon from 'react-native-vector-icons/AntDesign';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import HomeScreen from './screens/HomeScreen';
import AccountInfo  from './screens/AccountInfo';
import Home from './screens/home'
import FacialRecogntion from './screens/FaceRecogntion'
import Courses from './screens/courses'
import QRcode from './screens/QrCode';
import AttendanceMarked from './screens/AttendanceMarked';
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
 const AppTabNavigator = createBottomTabNavigator(
  {
    // Home: HomeScreen,
    Home: Home,

    Profile: AccountInfo,

  },
  {
    transitionConfig: () => fromLeft(300),
    navigationOptions: ({ navigation }) => ({
      
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `infocirlce${focused ? '' : 'o'}`;
        } if (routeName === 'Profile') {
          iconName = `user`;
        } 
       
         
       
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    lazy:false,
    tabBarOptions: {
      activeTintColor: '#413661',
      inactiveTintColor: 'gray',
    },
    
  });
 const AppStackNavigator = createStackNavigator({
  AppTabNavigator:{
    screen:AppTabNavigator,
    
    transitionConfig: () => fromLeft(300),
    
    navigationOptions:({ navigation }) =>({
      title : 'Look and Attend',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#413661'
      },
      // headerRight: (
      //   <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
      //   <View style={{paddingHorizontal : 10 }}>
      //     <Icon name="" size={25} color={'#ffffff'}/>
      //   </View>
      // </TouchableOpacity> 
      // ),
      headerLeft : (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{paddingHorizontal : 10 }}>
            <Icon name="bars" size={25} color={'#ffffff'}/>
          </View>
        </TouchableOpacity> 
      )
      ,
    })
    ,
  },
   FacialRecogntion:FacialRecogntion,
  Courses:Courses,
  QRcode : QRcode,
  "AttendanceMarked":AttendanceMarked


},{
  transitionConfig: () => fromLeft(300),
});
 const AppDrawerNavigator = createDrawerNavigator({
  Home : AppStackNavigator
})
 export default createSwitchNavigator({
  AuthLoading : AuthLoadingScreen,
  Auth : AuthStackNavigator,
  App: AppDrawerNavigator

}); 

