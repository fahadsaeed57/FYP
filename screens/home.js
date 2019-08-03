import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity,AsyncStorage } from 'react-native'

import { Card, Badge, Button, Block, Text } from '../components/HomeComponentsFromPlantApp';
import { theme, mocks } from '../constants/constantsFromPlantApp';
import { baseUrl } from '../ApiUrl';
import Header from  '../components/header'
import {LinearGradient} from 'expo';
import  {Fonts} from '../constants/AndroidSizes/Index';




// import console = require('console');

const { width } = Dimensions.get('window');

class Home extends Component {
  state = {
    active: 'Products',
    categories: [],
    student:""
  }

  componentDidMount() {
    this.setState({ categories: this.props.categories });
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
      console.log(this.state.student);
      
     } catch (error) {
       alert(error);
     }
  } 

  
  render() {
    const { profile, navigation } = this.props;
    const { categories } = this.state;

    return (
 
                
      <Block style = {{marginVertical:10}}>
      <Header  student = {this.state.student}/>
        {/* <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>{this.state.student.student_name} </Text>
          <Button color onPress={() => navigation.navigate('Profile')}>
            <Image
              source={{uri:baseUrl+"/"+this.state.student.encoded_face_img}}
              style={styles.avatar}
            />
          </Button>
        </Block> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2}}
        >
          <Block flex={false} row space="between" style={styles.categories}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.name}
                onPress={() => navigation.navigate(category.screen)}
              >
              


                <Card center middle shadow style={styles.category}>
                  <Badge margin={[0, 0, 15]} size={50} color="#494871">
                    <Image style = {{height:40,width:40}}source={category.image} />
                  </Badge>
                  <Text medium style = {{fontSize:Fonts.moderateScale(10)}}>{category.name}</Text>
                  {/* <Text gray caption>{category.count} products</Text> */}
                </Card>

              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
      </Block>

    )
  }
}

Home.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories,
}

export default Home;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  container:{
    flex :1,
    alignItems:'center',
    justifyContent : 'center',
    backgroundColor:'#5E7A7C'
},
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
    borderRadius:(theme.sizes.base * 2.2)/2
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
  }
})

