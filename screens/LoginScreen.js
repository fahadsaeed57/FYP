import React, { Component } from 'react';
import { View, Text, ImageBackground, Animated, Dimensions,ScrollView, Image,Alert,TextInput,StyleSheet, Platform, Keyboard, KeyboardAvoidingView,AsyncStorage } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as dp } from 'react-native-responsive-screen';
const SCREEN_HEIGHT = Dimensions.get('window').height;
import Icon2 from 'react-native-vector-icons/Entypo';
import GradientButton from 'react-native-gradient-buttons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Iconant from 'react-native-vector-icons/AntDesign';
import Loader from '../components/Loader';
import { LinearGradient } from 'expo';
import { Container, Header, Button, Content, Form, Item, Input, Label, Icon } from 'native-base';
import { baseUrl } from '../ApiUrl';
export default class LoginScreen extends Component {
    static navigationOptions = {
        header : null
    }

    state = {
        margin: new Animated.Value(200),
        marginLeft: new Animated.Value(dp('8%')),
        enrollment_num:'',
        password:'',
        isLoading:false,
        student:''

    }
    componentWillMount() {
        this.loginHeight = new Animated.Value(50)
        this.scrollviewHeight = new Animated.Value(0)
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)

        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)

        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)

    }
    keyboardWillShow = (event) => {
        Animated.timing(this.scrollviewHeight,{
            toValue:event.endCoordinates.height-100,
            duration:200 
        }).start();
    }

    keyboardWillHide = (event) => {
        Animated.timing(this.scrollviewHeight,{
            toValue:0,
            duration:200
        }).start();
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
    componentWillUnmount(){
        Keyboard.removeAllListeners();
    }
    _focusNextField(nextField) {
        this.refs[nextField]._root.focus()
        }

        loginStudent = async ()=>{
            Keyboard.dismiss();
         const datatopost = {
                enrollment_num:this.state.enrollment_num,
                password:this.state.password
            
            }
            if(this.state.enrollment_num!="" && this.state.password!=""){
                this.setState({isLoading:true});
                axios.post(`${baseUrl}:5000/student/login`,datatopost).then(res => {
                    const data = res.data.student;
                    if(data!=null){
                        this.setState({student: data[0] , isLoading:false});
                        // alert(JSON.stringify(data[0]));
                        if(data[0].encoded_face_img==null || data[0].encoded_face_img==""){
                            this.props.navigation.navigate('LoginFacial',this.state.student)
                        }
                        else{
                            try {
                            AsyncStorage.setItem('userData', JSON.stringify(data[0]));
                            this.props.navigation.navigate('App');
                         } catch (error) {
                           // Error saving data
                         }
                        }
                        
                        
                       
                    }
                    else{
                        this.setState({isLoading:false},Alert.alert(" Error ","Incorrect password or enrollment number"));
                        
                    }
                   
                    
                }).catch(error => {
                   this.setState({ isLoading: false })
                    Alert.alert(" Error ","Some Thing went wrong please check your internet connection")
                    
                  })
            }
            else{
                Alert.alert(" Error ","Fill Empty Details");
            }
           
                
    
          }
        
    increaseHeightOfLogin = () => {
        this.refs['enrollmentnumber']._root.focus()
        Animated.timing(                  // Animate over time
            this.state.marginLeft,            // The animated value to drive
            {
                toValue: dp('10%'),                   // Animate to opacity: 1 (opaque)
                duration: 100,              // Make it take a while
            }
        ).start();
        Animated.timing(this.loginHeight, {
            toValue: SCREEN_HEIGHT / 1.8,
            duration: 100,
        }).start(() => {

            // this.refs.textInputMobile.focus()
        })
    }
    increaseHeightOfSignUp = () => {

        Animated.timing(                  // Animate over time
            this.state.marginLeft,            // The animated value to drive
            {
                toValue: Platform.OS === 'ios' ? dp('64%') : dp('65%'),                   // Animate to opacity: 1 (opaque)
                duration: 100,
                // Make it take a while
            }
        ).start();
        Animated.timing(this.loginHeight, {
            toValue: SCREEN_HEIGHT / 1.5,
            duration: 100,
        }).start(() => {


        })
    }
    
    render() {
        const marginTop = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [0, 10]
        })
        const barOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT / 1.75],
            outputRange: [0, 1]
        })
        const highLightMargin = this.loginHeight.interpolate({
            inputRange: [SCREEN_HEIGHT / 1.75, SCREEN_HEIGHT / 1.5],
            outputRange: [hp('48%'), (SCREEN_HEIGHT / 1.75)]
        })
        const signUpOpacity = this.loginHeight.interpolate({
            inputRange: [SCREEN_HEIGHT / 1.75, SCREEN_HEIGHT / 1.5],
            outputRange: [0, 1]
        })
        const signInOpacity = this.loginHeight.interpolate({
            inputRange: [SCREEN_HEIGHT / 1.75, SCREEN_HEIGHT / 1.5],
            outputRange: [1, 0]
        })
       

        return (
            
            
            <LinearGradient
                colors={['#413661', '#413661']} style={styles.container}>
                {/* <ImageBackground source={require('../assets/bg.jpg')}  style={{height:hp('100%'),width:dp('100%'),opacity:0.8}}> */}
                <Animated.View style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: this.state.margin,
                }}>
                <Image
            source={require("../assets/fyplogo.png")}
            style={[
              {
                resizeMode: "contain",
                width: 150,
                height: 150
              }
            ]}
          />
                    {/* <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }} >ATTENDEE</Text> */}
                </Animated.View>
                


                    <Animated.View
                        style={{
                            height: this.loginHeight,//animated
                           
                            marginBottom:this.scrollviewHeight,
                            opacity:1,
                        }}>

                        <Animated.View style={{ marginTop: marginTop, paddingHorizontal: Platform.OS === 'ios' ? 20 : 0, flex: 1, flexDirection: 'row',opacity:1, }}>
                            <Button transparent onPress={() => { this.increaseHeightOfLogin() }} style={{ marginLeft: dp('8.5%') }} >
                                <Animatable.Text animation="slideInLeft" iterationCount={1} style={{ color: 'white', fontSize: hp('3.5%') }}>LOGIN</Animatable.Text>



                            </Button>
                            <Animatable.Text animation="zoomIn" iterationCount={1} style={{ marginTop: hp('2%'), color: 'white', marginLeft: dp('15%') }}> OR </Animatable.Text>

                            <Button transparent onPress={() => { this.increaseHeightOfSignUp() }} style={{ paddingHorizontal: dp('15%') }}>
                                <Animatable.Text animation="slideInRight" iterationCount={1} style={{ color: 'white', fontSize: hp('3.5%') }}>SIGN UP</Animatable.Text>



                            </Button>

                        </Animated.View>

                        <Animated.View style={{ height: this.loginHeight - 100, margin: 5, backgroundColor: 'white', opacity: barOpacity,borderRadius:20 }}>


                            <Animated.View style={{ marginBottom: highLightMargin, alignItems: 'center', height: 2, width: dp('20%'), marginLeft: this.state.marginLeft, opacity: barOpacity }}>
                                <Iconant style={{ color: 'white', marginTop: -hp('1%') ,opacity:1}} name='caretup' />

                            </Animated.View>
                            
                            <Animated.View style={{ margin: 10, alignItems: 'center', justifyContent:'center',opacity: barOpacity, width: dp('90%'), position: 'absolute' }}>
                            
                            <Item>
                                    <Icon active name='person' />
                                    <Input
              placeholder='Enrollment Number'
              onSubmitEditing={() => this._focusNextField('password')}
              returnKeyType = {"next"}
              ref="enrollmentnumber"
              blurOnSubmit={false}
              onChangeText={enrollment_num => this.setState({enrollment_num: enrollment_num})}
              
            />


                                
                               
                                </Item>
                                    <Item>
                                    <Icon active name='key' />
                                    <Input placeholder='password'  
                                
                                
                                ref="password"
                                onChangeText={password=> this.setState({password: password})}
              />
                                </Item>
                                  
                        
                                
                                <Animated.View  style={{opacity:signUpOpacity,width:dp('90%'),zIndex:signUpOpacity,alignItems:'center'}}>
                                <Item>
                                    <Icon active name='person' />
                                    <Input placeholder='university ID' />
                                </Item>
                               
                                <GradientButton
                                    style={{ marginVertical: 8,marginTop:30 }}
                                    textSyle={{ fontSize:5 }}
                                    gradientBegin="#413661"
                                    gradientEnd="#413661"
                                    gradientDirection="diagonal"
                                    height={60}
                                    width={200}
                                    radius={30}
                                    onPressAction={() => { Keyboard.dismiss(); this.props.navigation.navigate('SignUpFacial') ;}}
                                >
                                   <Text style={{fontSize:17}}> SIGN UP</Text>
                                </GradientButton>

                                </Animated.View>
                                <Animated.View style={{opacity:signInOpacity,position:'absolute',zIndex:signInOpacity,paddingTop:50}}>
                                <Text> {"\n\n\n"}</Text>
                                <GradientButton
                                    style={{ marginVertical: 8 ,marginTop:10}}
                                    textSyle={{ fontSize:5 }}
                                    gradientBegin="#413661"
                                    gradientEnd="#413661"
                                    gradientDirection="diagonal"
                                    height={60}
                                    width={200}
                                    radius={30}
                                    onPressAction={() => {this.loginStudent()}}
                                >
                                   <Text style={{fontSize:17}}> LOGIN</Text>
                                </GradientButton>
                                
                                
                                <Button transparent onPress={() => { this.increaseHeightOfSignUp() }} >
                                <Text style={{ color: '#494871', fontSize: hp('3%') }}>Already a member ? Sign Up</Text>



                            </Button>
                                </Animated.View>
                                
                            </Animated.View>




                        </Animated.View>











                    </Animated.View>


                { this.state.isLoading && <Loader
                            modalVisible={this.state.isLoading}
                            animationType="slide"
                        /> }

                   
            </LinearGradient>
           

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