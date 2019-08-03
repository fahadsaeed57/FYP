import React from 'react';
import { Button, StyleSheet, View ,Dimensions,ScrollView} from 'react-native';
import { DangerZone , MapView} from 'expo';
const { Lottie } = DangerZone;
import { Block, Text } from "../components/CoursesComponentsfromIBLOODapp";


const { width,height } = Dimensions.get('window');

export default class AttendanceMarked extends React.Component {
    static navigationOptions = {
        title: 'Attendance Marked',
      };
  state = {
    animation: null,
  };
  
  componentWillMount() {
    this._playAnimation();
  
  }
   distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  render() {
      const {navigation} = this.props;
      const data=navigation.getParam('data', 'NO-ID');
      console.log(data);
    return (
      <ScrollView style={styles.animationContainer}>
        
   
        {/* <Button
          title="Restart Animation"
          onPress={this._playAnimation}
        /> */}
        <Block row card shadow  color="#494871"  style={styles.request}>
        {/* <Block
          flex={0.25}
          card
          column
          color="secondary"
          style={styles.requestStatus}
          
        >
          <Block flex={0.25} middle center color="#494871">
            <Text small white style={{ textTransform: "uppercase" }}>
              3creditHours
            </Text>
          </Block>
          <Block flex={0.7} center middle>
            <Text h2 white>
              1
            </Text>
          </Block>
        </Block> */}
        {this.state.animation &&
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: width*0.4,
              height: height * 0.3,
              justifyContent:'center',
              alignItems:'center'

            }}
            source={this.state.animation}
          />}
        <Block flex={1} column middle>
          <Text white h3 style={{ paddingVertical: 8, }}>{data.attendance_details.course_name}</Text>
          <Text white caption semibold>
           50 mins •  {data.attendance_details.teacher_name}  •  {this.distance(data.student_cords.lat,data.student_cords.long,data.attendance_details.latitude,data.attendance_details.longitude,"K").toFixed(2)} / {(data.attendance_details.distance/1000).toFixed(1)}km  •  {data.attendance_details.attendance_time}
           {"\n"}
          </Text>
        </Block>
      </Block>
       
        {/* <Text> {JSON.stringify(navigation.getParam('data', 'NO-ID'))}</Text> */}
        <MapView
        style={{
       
          width:width,
          height:height / 2,
          alignContent:'center',
        justifyContent:'center',
        margin:10,
        borderRadius:10
        }}
        initialRegion={{
          latitude:  data.attendance_details.latitude,
          longitude: data.attendance_details.longitude,
          latitudeDelta:data.attendance_details.latitude-data.student_cords.lat,
          longitudeDelta: data.attendance_details.longitude-data.student_cords.long
        }}
      >
         <MapView.Marker
            key={1}
            coordinate={{latitude:data.student_cords.lat,longitude:data.student_cords.long}}
            title={"Student"}
            description={"you"}
         />
          <MapView.Marker
            key={2}
            coordinate={{latitude: data.attendance_details.latitude ,
              longitude: data.attendance_details.longitude}}
            title={"Teacher"}
            description={data.attendance_details.teacher_name}
         />

      </MapView>
          
        </ScrollView>
 
    );
  }
  
  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _loadAnimationAsync = async () => {
    let result = await fetch(
      'https://assets2.lottiefiles.com/packages/lf20_g8SKoA.json'
    );

    this.setState(
      { animation: JSON.parse(result._bodyText) },
      this._playAnimation
    );
  };
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
   
   
    flex: 1,
  },
  
  request: {
    padding: 20,
    marginBottom: 15,
    margin:10
  },
  requestStatus: {
    marginRight: 20,
    
    height: 90
  }
});