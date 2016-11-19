import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ActionBar from '../components/ActionBar';

export default class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActionBar search />
        <Text>Show search here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
