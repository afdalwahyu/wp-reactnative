/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ProfileListMenu extends Component {
  render() {
    return (
      <TouchableOpacity {...this.props}>
        <View style={styles.list}>
          <Icon style={styles.text} name={this.props.icon} color={'#ccc'} backgroundColor={'#fff'} size={15} />
          <Text style={[styles.text, styles.title]}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    paddingLeft: 10,
    fontSize: 17,
  },
  title: {
    color: '#2c3e50',
    paddingLeft: 30,
  },
});
