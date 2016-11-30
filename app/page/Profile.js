import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import { observer } from 'mobx-react/native';
import List from '../components/ProfileListMenu';
import env from '../env';

@observer(['nav'])
export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
    };
  }

  calculateWH(event) {
    const { width } = event.nativeEvent.layout;
    this.setState({
      width,
    });
  }

  showSaved() {
    this.props.nav.navigator.push({
      name: 'Saved',
    });
  }

  showFeedback() {
    Communications.email(['afdalwahyu@gmail'], null, null, 'Feedback for Android Apps', 'My feedback:');
  }

  showAbout() {
    Communications.web(env.aboutURL);
  }

  render() {
    return (
      <View style={styles.container} onLayout={event => this.calculateWH(event)}>
        <Image source={require('../dumpfile/userbg.jpg')} style={[styles.image, { width: this.state.width }]} >
          <View style={styles.opacity}>
            <Icon name={'ios-contact'} color={'#fff'} size={100} />
            <Text style={styles.nameuser}>Hi There!</Text>
          </View>
        </Image>
        <List onPress={() => this.showSaved()} icon={'ios-bookmark'} title={'My Saved Items'} />
        <List onPress={() => this.showFeedback()} icon={'ios-send'} title={'Feedback'} />
        <List onPress={() => this.showAbout()} icon={'ios-flask'} title={'About'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 250,
  },
  nameuser: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  opacity: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.7)',
  },
});
