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
import { observer } from 'mobx-react/native';
import _ from 'lodash';
import ActionBar from '../components/ActionBar';
import UserHead from '../components/UserHead';

@observer(['nav', 'news'])
export default class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      data: null,
      length: 0,
    };
  }

  async componentWillMount() {
    this.setState({ fetchingData: true });
    await this.props.news.fetchComment(this.props.postId);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const parent = [];
    const child = [];
    const tmp = _.sortBy(this.props.news.comments.toJS(), o => o.id);
    tmp.forEach((val) => {
      if (val.parent === 0) {
        parent[val.id] = val;
        parent[val.id].child = [];
      } else {
        child[val.id] = val;
      }
    });
    const pivot = [];
    child.forEach((val) => {
      if (parent[val.parent]) {
        parent[val.parent].child[val.id] = val;
      } else {
        parent[pivot[val.parent]].child[val.id] = val;
      }
      pivot[val.id] = val.parent;
    });
    const dataSource = ds.cloneWithRows(parent);
    this.setState({
      fetchingData: false,
      length: tmp.length,
      dataSource,
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
    const child = comment.child.map(val => (
      <View key={val.id} style={[styles.comment, styles.child]}>
        <UserHead
          avatar_url={val.author_avatar_urls[96]}
          name={val.author_name}
          date={moment(val.date_gmt).fromNow()}
        />
        <HTMLView value={val.content.rendered} />
      </View>
    ));
    return (
      <View key={comment.id} style={styles.comment}>
        <UserHead
          avatar_url={comment.author_avatar_urls[96]}
          name={comment.author_name}
          date={moment(comment.date_gmt).fromNow()}
        />
        <HTMLView value={comment.content.rendered} />
        {child}
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
    return (
      <View style={styles.container}>
        <ActionBar comment title={`Comments (${this.state.length})`} />
        <ScrollView style={styles.commentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{this.props.title.rendered}</Text>
            <Button onPress={() => this._handleWriteComment()} color={'#5e5e5e'} buttonStyle={styles.button} small iconRight icon={{ name: 'ios-chatboxes', type: 'ionicon', color: '#5e5e5e' }} title={'WRITE COMMENT'} />
          </View>
          <ListView
            enableEmptySections
            dataSource={this.state.dataSource}
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
  child: {
    borderBottomWidth: 0,
    marginLeft: 10,
  },
});
