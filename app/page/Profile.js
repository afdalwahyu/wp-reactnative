import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { observer } from 'mobx-react/native';
import List from '../components/ProfileListMenu';

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
        <List icon={'ios-send'} title={'Feedback'} />
        <List icon={'ios-flask'} title={'About'} />
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
  separator: {
    padding: 5,
    borderTopWidth: 3,
    borderTopColor: 'rgba(254,254,254,.6)',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    color: '#fff',
    fontSize: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 10,
  },
});
