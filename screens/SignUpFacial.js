import React , {Component} from 'react';
import {View,Text,StyleSheet,AsyncStorage,StatusBar,ToastAndroid,Platform} from 'react-native';
import {LinearGradient} from 'expo';
export default class LoginFacial extends Component{
    constructor(props){
        super(props);
       
    }
    componentDidMount(){
        // this._isMounted = true;
        // if (Platform.Version === 26) {
        //     ToastAndroid.show('Running marshmallow', ToastAndroid.SHORT);
        //   }
    }
    
    loadApp = async() =>{
        // const userToken =  await AsyncStorage.getItem("userToken");
        // this.props.navigation.navigate(userToken ? 'App' : 'Auth')
    }
    render(){
        return(
            <LinearGradient
            colors={['#a27ff8', '#a989fb']} style={styles.container}>
                <Text style={{color:'white'}}> SignUp FACIAL </Text>
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