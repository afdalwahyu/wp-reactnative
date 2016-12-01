import React, { Component } from 'react';
import moment from 'moment';
import HTMLView from 'react-native-htmlview';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import { Button } from 'react-native-elements';
import { observer } from 'mobx-react/native';
import _ from 'lodash';

import ImageAuto from './ImageAuto';
import UserHead from './UserHead';

import env from '../env';

@observer(['nav', 'storage'])
export default class Card extends Component {

  constructor() {
    super();
    this.state = {
      saved: false,
    };
  }

  async componentWillMount() {
    if (await this.props.storage.checkSaved(this.props.post.id)) {
      return this.setState({ saved: true });
    }
    return this.setState({ saved: false });

    // this.props.storage.checkSaved(this.props.post.id)
    //   .then((val) => {
    //     val ? this.setState({ saved: true }) : this.setState({ saved: false });
    //   });
  }

  showContent(data) {
    this.props.nav.content = data;
    this.props.nav.navigator.push({
      name: 'Content',
    });
  }

  showComment(id) {
    this.props.nav.navigator.push({
      name: 'Comment',
      passProps: {
        postId: id,
        title: this.props.post.title,
      },
    });
  }

  async saveContent(post) {
    await this.props.storage.setSaved(post);
    this.setState({ saved: !this.state.saved });
  }

  render() {
    const { post } = this.props;
    const relative = moment(post.date_gmt).fromNow();
    return (
      <View style={styles.container}>
        <UserHead
          avatar_url={'http://www.phpclasses.org/browse/view/flash/file/64364/name/noavatar.jpg'}
          name={post.x_author}
          date={relative}
        />
        <TouchableNativeFeedback onPress={() => this.showContent(post)}>
          <View style={styles.flexed}>
            <ImageAuto source={post.x_featured_media_original} />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => this.showContent(post)}>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>{post.title.rendered}</Text>
            <HTMLView
              value={post.excerpt.rendered}
              onLinkPress={() => this.showContent(post)}
            />
          </View>
        </TouchableNativeFeedback>
        <View style={styles.buttonContainer}>
          {
            (_.includes(this.props.storage.key, post.id))
            ? <Button onPress={() => this.saveContent(post)} color={'#fff'} buttonStyle={[styles.button, styles.savedButton]} small iconRight icon={{ name: 'ios-bookmark', type: 'ionicon', color: '#fff' }} title={'SAVED'} />
            : <Button onPress={() => this.saveContent(post)} color={'#5e5e5e'} buttonStyle={styles.button} small iconRight icon={{ name: 'ios-bookmark', type: 'ionicon', color: '#5e5e5e' }} title={'SAVE'} />
          }
          <Button onPress={() => this.showComment(post.id)} color={'#5e5e5e'} buttonStyle={styles.button} small iconRight icon={{ name: 'ios-chatboxes', type: 'ionicon', color: '#5e5e5e' }} title={'COMMENT'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
  flexed: {
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
  },
  content: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  contentTitle: {
    fontWeight: 'bold',
    fontSize: 20,
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
  },
  savedButton: {
    backgroundColor: env.color.selectedButton,
    borderColor: '#fff',
  },
});
