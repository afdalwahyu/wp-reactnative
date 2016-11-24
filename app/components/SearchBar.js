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
import { observer } from 'mobx-react/native';

@observer(['nav'])
export default class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: null,
    };
  }

  _pressBack() {
    this.textInput.blur();
    return this.props.nav.navigator.pop();
  }

  _findContent() {
    console.log(this.state.text);
    this.textInput.blur();
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
            onChangeText={text => this.setState({ text })}
            onSubmitEditing={() => this._findContent()}
            ref={(input) => { this.textInput = input; }}
          />
        </View>
        <Button
          onPress={() => this._findContent()}
          icon={{ name: 'search', type: 'font-awesome' }}
          small
          backgroundColor={'#C01820'}
          buttonStyle={styles.searchButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#C01820',
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
