import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar,ImageBackground, ScrollView,RefreshControl, FlatList ,BackHandler,TouchableHighlight,Alert,AsyncStorage} from 'react-native';

import { Button ,Container, Header, Content} from 'native-base';
import axios from 'axios';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { Bubbles } from 'react-native-loader';
import Loader from '../components/Loader';
export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true,student:''}
    }
    componentWillMount(){
        // this.subs = [
        //     this.props.navigation.addListener('didFocus', this._retrieveData),
            
        //   ];
           this._retrieveData();
         
    }
    // componentWillUnmount(){
    //     this.subs.forEach(sub => sub.remove());
    // }

    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('userData');
        this.setState({student:JSON.parse(value)});
        
        
       } catch (error) {
         alert(error);
       }
    } 
  
  
  
     

    render() {
        // if(this.state.loading){
        //     return(
        //         <Loader
        //                     modalVisible={this.state.loading}
        //                     animationType="slide"/>
        //     )
        // }
        // else{
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>



            <ScrollView style={{height:hp('100%')}}>
            <TouchableHighlight onPress={()=>{alert("Home")}} >
             <ImageBackground style={{height:hp('30%'),margin:10,alignItems:'center',alignContent:'center',justifyContent:'center'}} imageStyle={{ borderRadius: 10}}source={require('../assets/bg.jpg')}>
                        
                        <Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>Mark Attendance{this.state.student.id}</Text>
                        
                    </ImageBackground>
                </TouchableHighlight>
               
                   
                   
                  
                
                    
            </ScrollView>
  
          </View>
           
        )
    }
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:10
    }

})