/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from 'react-native';
import { Button } from 'react-native-elements';
import { observer } from 'mobx-react/native';
import ActionBar from '../components/ActionBar';
import Api from '../store/Api';

@observer(['nav'])
export default class WriteComment extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      content: '',
    };
  }

  _handleName() {
    if (this.state.name) {
      return this._email.focus();
    }
    return ToastAndroid.show('name field cannot be empty', ToastAndroid.SHORT);
  }

  _handleEmail() {
    if (this.validateEmail(this.state.email)) {
      return this._content.focus();
    }
    return ToastAndroid.show('email not valid', ToastAndroid.SHORT);
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  async _handleSubmit() {
    const api = new Api();
    const form = {
      post: this.props.postId,
      author_name: this.state.name,
      author_email: this.state.email,
      content: this.state.content,
    };
    const final = Object.keys(form).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(form[k])}`).join('&');
    await api.sendComment(final);
    this._content.blur();
    this._email.blur();
    this._name.blur();
    return this.props.nav.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <ActionBar comment title={'Write Comment'} />
        <TextInput
          style={styles.input}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
          returnKeyType={'next'}
          placeholder={'Name'}
          onSubmitEditing={() => this._handleName()}
          ref={(name) => { this._name = name; }}
          autoFocus
        />
        <TextInput
          style={styles.input}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          keyboardType={'email-address'}
          returnKeyType={'next'}
          placeholder={'Email Address'}
          ref={(email) => { this._email = email; }}
          onSubmitEditing={() => this._handleEmail()}
        />
        <TextInput
          style={styles.input}
          onChangeText={content => this.setState({ content })}
          value={this.state.content}
          returnKeyType={'done'}
          placeholder={'Write your comment here'}
          numberOfLines={4}
          ref={(content) => { this._content = content; }}
          multiline
        />
        <Button onPress={() => this._handleSubmit()} color={'#5e5e5e'} buttonStyle={styles.button} small iconRight icon={{ name: 'ios-chatboxes', type: 'ionicon', color: '#5e5e5e' }} title={'SUBMIT COMMENT'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 50,
    backgroundColor: 'rgba(52,52,52,0)',
    borderWidth: 1,
    borderColor: '#5e5e5e',
    marginBottom: 20,
  },
});
