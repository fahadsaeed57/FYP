import React from 'react';

import { Vibration,StyleSheet, Text, View ,Alert,Platform} from 'react-native';

import { BarCodeScanner, Permissions,Constants,Location } from 'expo';
import Loader from '../components/Loader';
import axios from 'axios';
import {baseUrl} from '../ApiUrl';

export default class QRcode extends React.Component {
    static navigationOptions = {
        title: 'Scan QR Code',
      };
  state = {

     hasCameraPermission:null,
     data:null,
     location: null,
    errorMessage: null,
    isLoading:false

  }
  componentWillMount = async()=> {
    const { status } =await Permissions.askAsync(Permissions.CAMERA);

    this.setState({hasCameraPermission:status==='granted'});
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let providerStatus = await Location.getProviderStatusAsync();
    if (!providerStatus.locationServicesEnabled) {
      this.setState({
          errorMessage: 'Location Services Disabled'
      })
      return;
    }

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
      return
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    console.log(this.state.location)
  };
 

  render() {

    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {

    return <Text>Requesting for camera permission</Text>;

    } else if (hasCameraPermission === false) {

    return <Text>No access to camera</Text>;

    } else {

        return (

            <View style={styles.container}>

              <BarCodeScanner

                  onBarCodeRead={this._handleBarCodeRead}

                  style={{ height: 250, width: 350 }}

              />
            { this.state.isLoading && <Loader
                            modalVisible={this.state.isLoading}
                            animationType="slide"
                        /> }
            </View>

            );

    }

  }

  _handleBarCodeRead = ( { type, data }) => {
    const { navigation } = this.props;
    if(this.state.data==null){
      this.setState({data:data});
    //   Alert.alert(`Bar code type : ${type} and data : ${data}`); 
      
      Vibration.vibrate(100);
    console.log(this.state)
        let datatopost2={
            attendance_id : Number(data),
            student_id:navigation.getParam('student_id', 'NO-ID'),
            lat:this.state.location.coords.latitude,
            log:this.state.location.coords.longitude

        }
        console.log(datatopost2)
        
      this.setState({ isLoading: true });
        axios.post(`${baseUrl}:5000/student/markattendance`, datatopost2).then(res => {
          const data = res.data;
            if(data.message){
                this.setState({  isLoading: false })
                if(data.attendance_details==null){
                    Alert.alert("Error",data.message,
                    [
                        
                        {text: 'OK', onPress: () => this.props.navigation.navigate('FacialRecogntion')},
                      ]);
                }
                else{
                    Alert.alert("Success",data.message,[
                        
                        {text: 'OK', onPress: () => this.props.navigation.navigate('AttendanceMarked',{data:data})},
                      ]);
                }
                 
               
            }
        }).catch((error)=>{
            alert(error)
            this.setState({  isLoading: false })
        });
          
          // alert(JSON.stringify(data));
      

    }
    if(this.state.location==null){
        alert("Looks like your location is not fetched correctly try again!")
    }



  }

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: '#fff',

    alignItems: 'center',

    justifyContent: 'center',

  },

});
