import React from 'react';
import { Button, StyleSheet, View ,Text} from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

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

  render() {
      const {navigation} = this.props;
    return (
      <View style={styles.animationContainer}>
        {this.state.animation &&
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 300,
              height: 300,
              backgroundColor: 'white',
            }}
            source={this.state.animation}
          />}
        <View style={styles.buttonContainer}>
        {/* <Button
          title="Restart Animation"
          onPress={this._playAnimation}
        /> */}
        <Text> {JSON.stringify(navigation.getParam('data', 'NO-ID'))}</Text>
        </View>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
    margin:10
  },
});