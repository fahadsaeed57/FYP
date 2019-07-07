
import React , {Component} from 'react';
import {View,Text,StyleSheet,AsyncStorage,Platform,TouchableOpacity,Image,Alert} from 'react-native';
import {LinearGradient,ImagePicker,Permissions,FaceDetector,Constants} from 'expo';
import { heightPercentageToDP as hp, widthPercentageToDP as dp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loader from '../components/Loader';
import GradientButton from 'react-native-gradient-buttons';
import axios from 'axios';
import {baseUrl} from '../ApiUrl';
export default class SignUpFacial extends Component{
    state = {
        image: null,
        hasCameraPermission: null,
        isLoading:false,
        imagecropped : null,
        normalimg:null
    
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
          quality:0.1,

        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };
      detectFaces = async (imageUri) => {
        const options = { mode: FaceDetector.Constants.Mode.fast ,detectLandmarks : FaceDetector.Constants.Mode.all ,runClassifications:FaceDetector.Constants.Mode.all};
        
        if(Platform.OS==='ios'){
            this.setState({isLoading:false})
        }
        if(Platform.OS==='android'){
            this.setState({isLoading:true})
        }
        return await FaceDetector.detectFacesAsync(imageUri, options);
      }
       uploadImageAsync = async (uri,faceobject)=> {
        
        let apiUrl = `${baseUrl}/upload`;
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
      
        let formData = new FormData();
        formData.append('image', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
           const data = {
                width : faceobject.bounds.size.width,
                height: faceobject.bounds.size.height,
                x: faceobject.bounds.origin.x,
                y: faceobject.bounds.origin.y,
    
            }
         formData.append('data',JSON.stringify(data));
         console.log(JSON.stringify(data))
        let options = {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
            "Content-Type": "multipart/form-data",
             
         
          },
        };
      
        return fetch(apiUrl, options);
      }
      onDetect = async () => {
        
        let detected = await this.detectFaces(this.state.image)
        
    
        if(detected.faces.length === 0){
            
            Alert.alert('Error','sorry unable to detect face. Try Again');
            this.setState({isLoading:false})
        }
        else if(detected.faces.length >1){
            
            Alert.alert('Error','more than one face detected. Please Try Again with one face');
            this.setState({isLoading:false})
        }
        else{
            try {
               
                if(Platform.OS==='ios'){
                    this.setState({isLoading:true})
                }
                
                 let uploadResponse = await this.uploadImageAsync(this.state.image,detected.faces[0]);
                let uploadResult = await uploadResponse.json();
                if(uploadResult.isSpoofed=="False"){
                    this.setState({
                        imagecropped: `${baseUrl}/${uploadResult.base64img.data}`,
                        
                        normalimg:`${uploadResult.base64img.data}`
                      });
                    // alert(JSON.stringify(uploadResult.base64img.data));
                }
                else{
                    Alert.alert('Error','Looks like you are trying to fake me , eh?');
                }
                  
              } catch (e) {
                
                console.log({ e });
                Alert.alert('Error','Upload failed, Check your Internet Connection');
              } finally {
                this.setState({
                  isLoading: false
                });

              }
            // Alert.alert( 'Face Position',''+ JSON.stringify(detected.faces[0]))
        }
      }
      completeRegistration(){
        const { navigation } = this.props;
        
        let datatopost2 = {
        encoded_base64img: this.state.normalimg,
        enrollment_num: navigation.getParam('enrollment_num', 'NO-ID'),
        password: navigation.getParam('password', 'NO-ID')
        }
    //   alert(JSON.stringify(datatopost2))
        
        this.setState({ isLoading: true });
        axios.post(`${baseUrl}:5000/student/update/image`, datatopost2).then(res => {
          const data = res.data;
            if(data.message){
                this.setState({  isLoading: false })
                try {
                    AsyncStorage.setItem('userData', JSON.stringify(datatopost2));
                    this.props.navigation.navigate('App');
                 } catch (error) {
                   // Error saving data
                 }
                 
               
            }
          
          // alert(JSON.stringify(data));
    
    
    
    
        }).catch(error => {
            console.log(error)
            this.setState({ isLoading: false },Alert.alert(" Error ","Some Thing went wrong please check your internet connection"));
          // ToastAndroid.show('Some thing went wrong', ToastAndroid.LONG);
        })
      }
     
    render(){
        let { image ,hasCameraPermission,imagecropped} = this.state;
        if (hasCameraPermission === null) {
            return <View />;
          } else if (hasCameraPermission === false) {

          return (
            <LinearGradient
            colors={['#413661', '#413661']}  style={styles.container}> <Text>No access to camera</Text> </LinearGradient>);
          } else {
        if(image !=null && imagecropped == null){
            return (
                <LinearGradient
                colors={['#413661', '#413661']}  style={styles.container}>
                    <View style={{backgroundColor:'white',borderRadius:20,width: dp('90%'), height: hp('70%'),alignItems:'center'}}>
                    <Image source={{ uri: image }} style={{ width: dp('90%'), height: hp('40%'),borderTopLeftRadius:20,borderTopRightRadius:20 }}/>
                    <GradientButton
                                    style={{ marginVertical: 8,marginTop:20 }}
                                    textSyle={{ fontSize:5 }}
                                    gradientBegin="#494871"
                                    gradientEnd="#494871"
                                    gradientDirection="diagonal"
                                    height={50}
                                    width={200}
                                    radius={30}
                                    onPressAction={() => {  this.onDetect() ;}}
                                >
                                   <Text style={{fontSize:10}}> DETECT FACE </Text>
                                </GradientButton>
                                <GradientButton
                                    style={{ marginVertical: 8,marginTop:20 }}
                                    textSyle={{ fontSize:5 }}
                                    gradientBegin="#494871"
                                    gradientEnd="#494871"
                                    gradientDirection="diagonal"
                                    height={50}
                                    width={200}
                                    radius={30}
                                    onPressAction={() => {  this._pickImage() ;}}
                                >
                                   <Text style={{fontSize:10}}> CHANGE PICTURE </Text>
                                </GradientButton>
                    </View>
                    { this.state.isLoading && <Loader
                            modalVisible={this.state.isLoading}
                            animationType="slide"
                        /> }
                </LinearGradient>
            )
        }
        if(imagecropped!=null){
            return (
                <LinearGradient
                colors={['#494871', '#494871']}  style={styles.container}>
                <View style={{backgroundColor:'white',borderRadius:20,width: dp('90%'), height: hp('30%'),alignItems:'center',position:'relative'}}>
                <Image source={{ uri: imagecropped }} style={{ width: 100, height:100,borderRadius:50,position:'absolute',zIndex:100,marginTop:-50 }}/>
                <GradientButton
                                    style={{ marginVertical: 8,marginTop:70 }}
                                    textSyle={{ fontSize:5 }}
                                    gradientBegin="#494871"
                                    gradientEnd="#494871"
                                    gradientDirection="diagonal"
                                    height={50}
                                    width={200}
                                    radius={30}
                                    onPressAction={() => {  this.completeRegistration()}}
                                >
                                   <Text style={{fontSize:10}}> Complete Registration </Text>
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
                colors={['#494871', '#494871']}  style={styles.container}>
                    <View style={{backgroundColor:'white',borderRadius:20,width: dp('90%'), height: hp('70%'),alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity transparent onPress={this._pickImage} >
                            <Icon active size={hp('30%')} name='photo-camera' />
                            <Text style={{color:'#494871',textAlign:'center',fontSize:hp('3%')}}> Take Your Picture ! </Text>
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