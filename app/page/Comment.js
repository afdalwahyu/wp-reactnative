/* @flow */

import React, { Component } from 'react';
import moment from 'moment';
import HTMLView from 'react-native-htmlview';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ListView,
  ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-elements';
import _ from 'lodash';
import { observer } from 'mobx-react/native';
import ActionBar from '../components/ActionBar';
import UserHead from '../components/UserHead';
import WebRender from '../components/WebRender';

@observer(['nav', 'news'])
export default class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      data: null,
    };
  }

  async componentWillMount() {
    this.setState({ fetchingData: true });
    await this.props.news.fetchComment(this.props.postId);
    console.log(this.props.news.comments);
    this.setState({
      fetchingData: false,
      data: this.props.news.comments,
    });
  }

  _handleWriteComment() {
    this.props.nav.navigator.push({
      name: 'WriteComment',
      passProps: {
        postId: this.props.postId,
      },
    });
  }

  renderRow(comment) {
    return (
      <View key={comment.id} style={styles.comment}>
        <UserHead
          avatar_url={comment.author_avatar_urls[96]}
          name={comment.author_name}
          date={moment(comment.date_gmt).fromNow()}
        />
        <HTMLView value={comment.content.rendered} />
      </View>
    );
  }

  render() {
    if (this.state.fetchingData) {
      return (
        <View style={styles.container}>
          <ActionBar comment title={'Comments (0)'} />
          <ActivityIndicator animating={this.state.fetchingData} size={'small'} />
        </View>
      );
    }
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(this.state.data.toJS());
    return (
      <View style={styles.container}>
        <ActionBar comment title={`Comments (${this.state.data.length || 0})`} />
        <ScrollView style={styles.commentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{this.props.title.rendered}</Text>
            <Button onPress={() => this._handleWriteComment()} color={'#5e5e5e'} buttonStyle={styles.button} small iconRight icon={{ name: 'ios-chatboxes', type: 'ionicon', color: '#5e5e5e' }} title={'WRITE COMMENT'} />
          </View>
          <ListView
            enableEmptySections
            dataSource={dataSource}
            renderRow={rowData => this.renderRow(rowData)}
          />
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
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    padding: 10,
  },
  header: {
    borderBottomWidth: 1,
  },
  button: {
    borderRadius: 50,
    backgroundColor: 'rgba(52,52,52,0)',
    borderWidth: 1,
    borderColor: '#5e5e5e',
    marginBottom: 20,
  },
  commentContainer: {
    flex: 1,
  },
  comment: {
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
  },
});
