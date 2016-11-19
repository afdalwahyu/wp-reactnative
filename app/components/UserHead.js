/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

export default class UserHead extends Component {
  render() {
    return (
      <View style={styles.author}>
        <Image source={{ uri: this.props.avatar_url }} style={styles.avatar} resizeMethod={'resize'} />
        <View style={styles.authorcontent}>
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.time}>{this.props.date}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  author: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  authorcontent: {
    padding: 5,
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  time: {
    fontSize: 12,
  },
});
