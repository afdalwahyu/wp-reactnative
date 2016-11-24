/* @flow */

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import moment from 'moment';
import { observer } from 'mobx-react/native';
import ActionBar from '../components/ActionBar';
import WebRender from '../components/WebRender';
import UserHead from '../components/UserHead';

@observer(['nav'])
export default class Content extends Component {

  render() {
    const post = this.props.nav.content;
    const date = moment(post.date_gmt).format('ll');
    return (
      <View style={styles.container}>
        <ActionBar content />
        <ScrollView>
          <View style={[styles.scrollBg, styles.title]}>
            <Text style={styles.titletext}>{post.title.rendered}</Text>
          </View>
          <UserHead
            avatar_url={'http://www.phpclasses.org/browse/view/flash/file/64364/name/noavatar.jpg'}
            name={post.x_author}
            date={date}
          />
          <WebRender content={post.content.rendered} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollBg: {
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    padding: 0,
    marginTop: 10,
    marginBottom: 10,
  },
  titletext: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#000',
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
});
