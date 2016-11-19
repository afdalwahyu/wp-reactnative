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
            <Text style={styles.titletext}>{post.title}</Text>
          </View>
          <View style={[styles.scrollBg, styles.author]}>
            <Image source={{ uri: post.author.avatar_url }} style={styles.avatar} />
            <View style={styles.authorcontent}>
              <Text style={styles.name}>{post.author.first_name} {post.author.last_name}</Text>
              <Text>{date}</Text>
            </View>
          </View>
          <WebRender content={post.content} />
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
