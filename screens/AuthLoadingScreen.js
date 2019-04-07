import React , {Component} from 'react';
import {View,Text,StyleSheet,AsyncStorage,ActivityIndicator,StatusBar,Dimensions,Image,Animated,ToastAndroid,Platform} from 'react-native';
import { LinearGradient } from 'expo';

export default class AuthLoadingScreen extends Component{
    static navigationOptions = {
        header : null
    }
    constructor(props){
        super(props)
        setTimeout(()=>this.loadApp(),4000);
        this.animatedValue = new Animated.Value(0.5);
        this.animatedValue2 = new Animated.Value(0);
        // this._isMounted = false;
    }
    componentDidMount(){
        Animated.spring(this.animatedValue, {
            toValue: 1,
            friction: 4,
            delay: 2500,
           useNativeDriver: true,
          }).start();
      
          Animated.timing(this.animatedValue2, {
            toValue: 1,
            delay: 200,
            duration: 3000,
           useNativeDriver: true,
          }).start();
    }
    componentWillUnmount(){
        // this.isCancelled = true;
    }
    loadApp = async() =>{
        const userToken =  await AsyncStorage.getItem("userToken");
        this.props.navigation.navigate(userToken ? 'Auth' : 'Auth')
    }
    render(){
        const truckStyle = {
            transform: [{ scale: this.animatedValue }]
          };
      
      const scaleText = {
            transform: [{ scale: this.animatedValue2 }]
          };
        return(
            <LinearGradient
                colors={['#a27ff8', '#a989fb']} style={styles.container}>
               <Animated.View style={[styles.ring, truckStyle]}>
          <Animated.Image
            source={require('../assets/FYPLOGO.png')}
            style={[
              {
                resizeMode: "contain",
                width: 100,
                height: 100
              }
            ]}
          />
</Animated.View>

<Animated.View
     style={[
            {
              position: "absolute",
              bottom: 20,
              width: Dimensions.get('window').width / 2,
              height: 4,
              backgroundColor: "#fff",
              borderRadius: 2
            },
            scaleText
        ]}
/>
            
            </LinearGradient>
            
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex :1,
        alignItems:'center',
        justifyContent : 'center',
        backgroundColor:'#5E7A7C'
    }

})