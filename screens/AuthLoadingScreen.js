import React , {Component} from 'react';
import {View,Text,StyleSheet,AsyncStorage,ActivityIndicator,StatusBar,ToastAndroid,Platform} from 'react-native';
import { LinearGradient } from 'expo';

export default class AuthLoadingScreen extends Component{
    static navigationOptions = {
        header : null
    }
    constructor(props){
        super(props)
        setTimeout(()=>this.loadApp(),100);
        // this._isMounted = false;
    }
    componentDidMount(){
        // this._isMounted = true;
        // if (Platform.Version === 26) {
        //     ToastAndroid.show('Running marshmallow', ToastAndroid.SHORT);
        //   }
    }
    componentWillUnmount(){
        // this.isCancelled = true;
    }
    loadApp = async() =>{
        const userToken =  await AsyncStorage.getItem("userToken");
        this.props.navigation.navigate(userToken ? 'Auth' : 'Auth')
    }
    render(){
        return(
            <LinearGradient
                colors={['#6666ff', '#9966ff']} style={styles.container}>
               <ActivityIndicator color="white"></ActivityIndicator>
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