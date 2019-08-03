import React,{Component} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";


import { Block, Text } from "../components/CoursesComponentsfromIBLOODapp";
import baseUrl from '../ApiUrl';
import * as theme from "../constants/constantsfromIBLOODAPP/theme";
import * as mocks from "../constants/constantsfromIBLOODAPP/mocks";
import Header from  '../components/header'


 class Courses extends Component {
  
  state = {
    active: 'Products',
    categories: [],
    student:""
  }
  componentWillMount(){
    // this.subs = [
    //     this.props.navigation.addListener('didFocus', this._retrieveData),
        
    //   ];
       this._retrieveData();
     
}

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      this.setState({student:JSON.parse(value)});
      
     } catch (error) {
       alert(error);
     }
  } 
  
  renderHeader() {
    const { user } = this.props;

  
    return (
      <Block flex={0.42} column style={{ paddingHorizontal: 15 }}>
        <Block flex={false} row style={{ paddingVertical: 15 }}>
          <Block center>
            <Text h3 white style={{ marginRight: -(25 + 5) }}>
              COURSES
            </Text>
          </Block>
          <Image source={{uri:baseUrl+"/"+this.state.student.encoded_face_img}}
              style={styles.avatar} />
        </Block>
        <Block card shadow color="white" style={styles.headerChart}>
          <Block row space="between" style={{ paddingHorizontal: 30 }}>
            <Block flex={false} row center>
              <Text h1>20</Text>
              <Text caption bold tertiary style={{ paddingHorizontal: 10 }}>
                -12%
              </Text>
            </Block>
            <Block flex={false} row center>
              <Text caption bold primary style={{ paddingHorizontal: 10 }}>
                +49%
              </Text>
              <Text h1>25</Text>
            </Block>
          </Block>
          <Block
            flex={0.5}
            row
            space="between"
            style={{ paddingHorizontal: 30 }}
          >
            <Text caption light>
              Available
            </Text>
            <Text caption light>
              Done
            </Text>
          </Block>
          {/* <Block flex={1}>
            {this.renderChart()}
          </Block> */}
        </Block>
      </Block>
    );
  }

  renderRequest(request) {
    return (
      <Block row card shadow  color="#494871"  style={styles.request}>
        <Block
          flex={0.25}
          card
          column
          color="secondary"
          style={styles.requestStatus}
        >
          <Block flex={0.25} middle center color="#494871">
            <Text small white style={{ textTransform: "uppercase" }}>
              {request.creditHours} creditHours
            </Text>
          </Block>
          <Block flex={0.7} center middle>
            <Text h2 white>
              {request.CourseID}
            </Text>
          </Block>
        </Block>
        <Block flex={0.75} column middle>
          <Text white h3 style={{ paddingVertical: 8, }}>{request.name}</Text>
          <Text white caption semibold>
            {request.creditHours} hrs •  {request.TeacherName}  •  {request.distance}km  •  {request.time}  
          </Text>
        </Block>
      </Block>
    );
  }

  renderRequests() {
    const { requests } = this.props;

    return (
      <Block flex={0.8} column color="gray2" style={styles.requests}>
        <Block flex={false} row space="between" style={styles.requestsHeader}>
          <Text  light>Recent Updates</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text  semibold>View All</Text>
          </TouchableOpacity>
        </Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          {requests.map(request => (
            <TouchableOpacity activeOpacity={0.8} key={`request-${request.id}`}>
              {this.renderRequest(request)}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Block>
    );
  }

  render() {

        const { profile, navigation } = this.props;



    return (
      <Block style={styles.safe}>
        {this.renderHeader()}
        {this.renderRequests()}
      </Block>
    );
  }
}
export default Courses;

Courses.defaultProps = {
  user: mocks.user,
  requests: mocks.requests,
  chart: mocks.chart,
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#494871"
  },
  headerChart: {
    paddingTop: 30,
    paddingBottom: 30,
    zIndex: 1
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    marginRight: 5,
  },
  requests: {
    marginTop: -55,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1,
    
  },
  requestsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15
  },
  request: {
    padding: 20,
    marginBottom: 15
  },
  requestStatus: {
    marginRight: 20,
    overflow: "hidden",
    height: 90
  }
});