/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Button } from 'react-native-elements';
import { observer } from 'mobx-react/native';
import _ from 'lodash';

@observer(['nav', 'storage'])
export default class MiniLists extends Component {

  constructor() {
    super();
    this.state = {
      saved: true,
    };
  }

  showContent(data) {
    console.log(data);
    this.props.nav.content = data;
    this.props.nav.navigator.push({
      name: 'Content',
    });
  }

  async saveContent(posts) {
    await this.props.storage.setSaved(posts);
    this.setState({ saved: !this.state.saved });
  }

  render() {
    const { posts } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Image
            style={styles.image}
            source={{ uri: posts.featured_image.source }}
            resizeMethod={'resize'}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>{posts.title}</Text>
            <HTMLView value={posts.excerpt} />
          </View>
        </View>
        <View style={{borderTopWidth: 1, marginBottom: 10,borderColor: '#ccc',}} />
        <View style={styles.buttonContainer}>
          {_.includes(this.props.storage.key, posts.id) && <Button onPress={() => this.saveContent(posts)} color={'#fff'} buttonStyle={[styles.button, styles.savedButton]} small iconRight icon={{ name: 'ios-bookmark', type: 'ionicon', color: '#fff' }} title={'SAVED'} /> }
          {!_.includes(this.props.storage.key, posts.id) && <Button onPress={() => this.saveContent(posts)} color={'#5e5e5e'} buttonStyle={styles.button} small iconRight icon={{ name: 'ios-bookmark', type: 'ionicon', color: '#5e5e5e' }} title={'UNDO'} /> }
          <Button onPress={() => this.showContent(posts)} color={'#5e5e5e'} buttonStyle={styles.button} small iconRight icon={{ name: 'ios-chatboxes', type: 'ionicon', color: '#5e5e5e' }} title={'READ MORE'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    marginBottom: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  top: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 3,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  contentTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
  },
  buttonContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: 'rgba(52,52,52,0)',
    borderWidth: 1,
    borderColor: '#5e5e5e',
    paddingTop: 7,
    paddingBottom: 7,
  },
  savedButton: {
    backgroundColor: '#3498db',
    borderColor: '#fff',
  },
});
