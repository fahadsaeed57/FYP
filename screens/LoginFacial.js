import React , {Component} from 'react';
import {View,Text,StyleSheet,AsyncStorage,TouchableOpacity,Image,ImageBackground,StatusBar,ToastAndroid,Platform} from 'react-native';
import {LinearGradient,ImagePicker,Permissions,FaceDetector} from 'expo';
import { heightPercentageToDP as hp, widthPercentageToDP as dp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loader from '../components/Loader';
import GradientButton from 'react-native-gradient-buttons';
export default class LoginFacial extends Component{
    state = {
        image: null,
        hasCameraPermission: null,
        isLoading:false,
      };
    constructor(props){
        super(props);
       
    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL);
        this.setState({ hasCameraPermission: status === 'granted' });
      }
    
    
    _pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 4],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };
      detectFaces = async (imageUri) => {
        const options = { mode: FaceDetector.Constants.Mode.fast ,detectLandmarks : FaceDetector.Constants.Mode.all ,runClassifications:FaceDetector.Constants.Mode.all};
        return await FaceDetector.detectFacesAsync(imageUri, options);
      };
      onDetect = async () => {
        this.setState({isLoading:true})
        let detected = await this.detectFaces(this.state.image);
        this.setState({isLoading:false})

        if(detected.faces.length === 0){
            ToastAndroid.show('Sorry Unable to detect face. Try Again', ToastAndroid.LONG);
        }
        else if(detected.faces.length >1){
            ToastAndroid.show('More than One face detected. Please Try Again with one face' , ToastAndroid.LONG);
        }
        else{
            alert( 'face position '+ JSON.stringify(detected.faces[0]))
        }
      }
    render(){
        let { image ,hasCameraPermission} = this.state;
        if (hasCameraPermission === null) {
            return <View />;
          } else if (hasCameraPermission === false) {

          return (
            <LinearGradient
            colors={['#6666ff', '#9966ff']} style={styles.container}> <Text>No access to camera</Text> </LinearGradient>);
          } else {
        if(image){
            return (
                <LinearGradient
                    colors={['#6666ff', '#9966ff']} style={styles.container}>
                    <View style={{backgroundColor:'white',borderRadius:20,width: dp('90%'), height: hp('70%'),alignItems:'center'}}>
                    <Image source={{ uri: image }} style={{ width: dp('90%'), height: hp('50%'),borderTopLeftRadius:20,borderTopRightRadius:20 }}/>
                    <GradientButton
                                    style={{ marginVertical: 8,marginTop:20 }}
                                    textSyle={{ fontSize:5 }}
                                    gradientBegin="#9966ff"
                                    gradientEnd="#99BDFD"
                                    gradientDirection="diagonal"
                                    height={60}
                                    width={200}
                                    radius={30}
                                    onPressAction={() => {  this.onDetect() ;}}
                                >
                                   <Text style={{fontSize:17}}> DETECT FACE </Text>
                                </GradientButton>
                    </View>
                    { this.state.isLoading && <Loader
                            modalVisible={this.state.isLoading}
                            animationType="slide"
                        /> }
                </LinearGradient>
            )
        }
        else{
            return(
                <LinearGradient
                    colors={['#6666ff', '#9966ff']} style={styles.container}>
                    <View style={{backgroundColor:'white',borderRadius:20,width: dp('90%'), height: hp('70%'),alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity transparent onPress={this._pickImage} >
                            <Icon active size={hp('30%')} name='photo-camera' />
                            <Text style={{color:'#6666ff',textAlign:'center',fontSize:hp('3%')}}> Take Your Picture ! </Text>
                    </TouchableOpacity>
                    </View>
                </LinearGradient>
                
            )
        }
    } 
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