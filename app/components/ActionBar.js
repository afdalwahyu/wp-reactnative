import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';
import { observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from './SearchBar';

import env from '../env';

@observer(['nav'])
export default class MyComponent extends Component {

  _pressBack() {
    return this.props.nav.navigator.pop();
  }

  _pressSearch() {
    return this.props.nav.navigator.push({
      name: 'Search',
    });
  }

  _pressComment() {
    this.props.nav.navigator.push({
      name: 'Comment',
      passProps: {
        postId: this.props.nav.content.id,
        title: this.props.nav.content.title.rendered,
      },
    });
  }

  render() {
    const content = (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this._pressBack()} >
          <Icon size={30} style={styles.contentButton} color={'#fff'} name="md-arrow-round-back" backgroundColor="#3b5998" />
        </TouchableOpacity>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={this.props.handleShare}>
            <Icon size={25} style={styles.contentButton} color={'#fff'} name="md-share" backgroundColor="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._pressComment()}>
            <Icon size={25} style={styles.contentButton} color={'#fff'} name="ios-chatboxes" backgroundColor="#3b5998" />
          </TouchableOpacity>
        </View>
      </View>
    );

    const home = (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Button
          onPress={() => this._pressSearch()}
          icon={{ name: 'search', type: 'font-awesome' }}
          small
          backgroundColor={env.color.navigationBar}
          buttonStyle={styles.searchButton}
        />
      </View>
    );

    const comment = (
      <View style={styles.container}>
        <View style={styles.comment}>
          <TouchableOpacity onPress={() => this._pressBack()} >
            <Icon size={30} style={styles.contentButton} color={'#fff'} name="md-arrow-round-back" backgroundColor="#3b5998" />
          </TouchableOpacity>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </View>
    );

    const search = <SearchBar {...this.props} handleSubmit={this.props.handleSubmit} />;

    if (this.props.content) {
      return content;
    } else if (this.props.comment) {
      return comment;
    } else if (this.props.search) {
      return search;
    }
    return home;
  }
}

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
  },
  container: {
    height: 50,
    backgroundColor: env.color.navigationBar,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  searchButton: {
    marginRight: 0,
    paddingRight: 10,
  },
  contentButton: {
    margin: 10,
  },
  rightContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
});
