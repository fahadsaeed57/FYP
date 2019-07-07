import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar,ImageBackground, ScrollView,RefreshControl, FlatList ,BackHandler,TouchableHighlight,Alert,AsyncStorage} from 'react-native';

import { Button ,Container, Header, Content} from 'native-base';
import axios from 'axios';
import {
    widthPercentageToDP as dp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { Bubbles } from 'react-native-loader';
import Loader from '../components/Loader';
import GradientButton from 'react-native-gradient-buttons';
export default class AccountInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true,student:''}
    }
    componentWillMount(){
        
         
    }
    signOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth')
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
            <GradientButton
                                    style={{ marginVertical: 8,marginTop:70 }}
                                    textSyle={{ fontSize:5 }}
                                    gradientBegin="#413661"
                                    gradientEnd="#413661"
                                    gradientDirection="diagonal"
                                    height={50}
                                    width={dp('95%')}
                                    radius={30}
                                    onPressAction={() => this.signOut() }
                                >
                                   <Text style={{fontSize:10}}> LOGOUT </Text>
                                </GradientButton>
               
                   
                   
                  
                
                    
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