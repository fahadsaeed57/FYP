import React, { Component } from 'react';
import { View, Text, ImageBackground, Animated, Dimensions, StyleSheet, Platform, Keyboard, KeyboardAvoidingView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as dp } from 'react-native-responsive-screen';
const SCREEN_HEIGHT = Dimensions.get('window').height
import Icon2 from 'react-native-vector-icons/AntDesign';
import { Icon, Button } from 'native-base';
import * as Animatable from 'react-native-animatable';
import Iconant from 'react-native-vector-icons/AntDesign';
export default class LoginScreen extends Component {

    state = {
        margin: new Animated.Value(200),
        marginLeft:new Animated.Value(dp('8%'))
    }
    componentWillMount() {
        this.loginHeight = new Animated.Value(70)
        
    }
    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.margin,            // The animated value to drive
            {
                toValue: -50,                   // Animate to opacity: 1 (opaque)
                duration: 2000,              // Make it take a while
            }
        ).start();                        // Starts the animation
    }
    increaseHeightOfLogin = () => {

        Animated.timing(                  // Animate over time
            this.state.marginLeft,            // The animated value to drive
            {
                toValue: dp('8%'),                   // Animate to opacity: 1 (opaque)
                duration: 200,              // Make it take a while
            }
        ).start(); 
        Animated.timing(this.loginHeight, {
            toValue: SCREEN_HEIGHT/1.75,
            duration: 400,
        }).start(() => {
            
            // this.refs.textInputMobile.focus()
        })
    }
    increaseHeightOfSignUp = () => {

        Animated.timing(                  // Animate over time
            this.state.marginLeft,            // The animated value to drive
            {
                toValue: dp('68%'),                   // Animate to opacity: 1 (opaque)
                duration: 200, 
                             // Make it take a while
            }
        ).start(); 
        Animated.timing(this.loginHeight, {
            toValue: SCREEN_HEIGHT/1.5,
            duration: 400,
        }).start(() => {

           
        })
    }
    render() {
        const marginTop = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [0, 10]
        })
        const barOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT/1.75],
            outputRange: [0, 1]
        })
        const highLightMargin = this.loginHeight.interpolate({
            inputRange: [SCREEN_HEIGHT/1.75, SCREEN_HEIGHT/1.5],
            outputRange: [hp('46%'), (SCREEN_HEIGHT/1.8)]
        })
        const textOpacity = this.loginHeight.interpolate({
            inputRange: [SCREEN_HEIGHT/1.75, SCREEN_HEIGHT/1.5],
            outputRange: [0.7,1]
        })
       
        return (

            <ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>

                <Animated.View style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: this.state.margin,
                }}>
                    <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }} >ATTENDEE</Text>
                </Animated.View>
                <Animatable.View animation="slideInUp" iterationCount={1}>

                    <Animated.View
                        style={{
                            height: this.loginHeight,//animated
                            backgroundColor: '#527478',



                        }}>

                        <Animated.View style={{ marginTop: marginTop ,padding:10,flex:1,flexDirection:'row'}}>
                            <Button transparent onPress={() => { this.increaseHeightOfLogin() }} style={{marginLeft:dp('7%')}} >
                                <Animated.Text style={{color: '#DDEBEC', fontSize: hp('3.5%') }}>LOGIN</Animated.Text>

                                
                                
                            </Button>
                            <Text style={{marginTop:hp('2%'),marginLeft:dp('15%')}}> OR </Text>
                            
                            <Button transparent onPress={() => { this.increaseHeightOfSignUp() }} style={{paddingHorizontal:dp('15%')}}>
                                <Animated.Text style={{  color: '#DDEBEC', fontSize: hp('3.5%') }}>SIGN UP</Animated.Text>

                                

                            </Button>
                            
                        </Animated.View>
                        <Animated.View style={{justifyContent:'flex-end'}} >
                        </Animated.View>
                        <Animated.View style={{justifyContent:'flex-start',alignItems:'center',marginBottom:highLightMargin,backgroundColor:'white',height:5,width:dp('25%'),marginLeft:this.state.marginLeft,opacity:barOpacity}}>
                            <Iconant active style={{color:'white'}} name='caretdown' />
                        </Animated.View>

                       
                        
                       
                       

                    </Animated.View>


                </Animatable.View>

            </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 0,



    }
})