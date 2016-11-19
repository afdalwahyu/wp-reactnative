import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Button,
} from 'react-native-elements';

const Height = Dimensions.get('window').height - 125;

export default class Notification extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Login to see your latest notifications!</Text>
        <Button small color={'#5e5e5e'} buttonStyle={styles.button} title={'Login'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: Height,
  },
  text: {
    fontSize: 18,
  },
  button: {
    margin: 20,
    padding: 7,
    paddingLeft: 30,
    paddingRight: 30,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
});
