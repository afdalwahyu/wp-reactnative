/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import env from '../env';

export default class SearchBar extends Component {

  _pressBack() {
    this.textInput.blur();
    return this.props.nav.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.comment}>
          <TouchableWithoutFeedback onPress={() => this._pressBack()} >
            <Icon size={30} style={styles.contentButton} color={'#fff'} name="md-arrow-round-back" backgroundColor="#3b5998" />
          </TouchableWithoutFeedback>
          <TextInput
            autoFocus
            blurOnSubmit
            placeholder={'Search Here'}
            placeholderTextColor={'#fff'}
            underlineColorAndroid={'#fff'}
            style={styles.title}
            onSubmitEditing={this.props.handleSubmit}
            {...this.props}
          />
        </View>
        <Button
          onPress={this.props.handleSubmit}
          icon={{ name: 'search', type: 'font-awesome' }}
          small
          backgroundColor={env.color.navigationBar}
          buttonStyle={styles.searchButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: env.color.navigationBar,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comment: {
    flexDirection: 'row',
    flex: 1,
  },
  contentButton: {
    margin: 10,
  },
  title: {
    color: '#fff',
    fontSize: 17,
    paddingLeft: 5,
    paddingTop: 10,
    flex: 1,
  },
  searchButton: {
    marginRight: 0,
    paddingRight: 10,
  },
});
