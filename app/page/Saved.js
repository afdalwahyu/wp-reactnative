/* @flow */

import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ListView,
} from 'react-native';
import { observer } from 'mobx-react/native';
import _ from 'lodash';
import ActionBar from '../components/ActionBar';
import MiniLists from '../components/MiniLists';

@observer(['storage'])
export default class Saved extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      buffering: true,
    };
  }

  componentWillMount() {
    this.props.storage.getSaved()
      .then((data) => {
        const tmp = [];
        _.forEach(data, (val) => {
          tmp.push(JSON.parse(val[1]));
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(_.reverse(tmp)),
          buffering: false,
        });
      });
  }

  renderRow(rowData) {
    return <MiniLists posts={rowData} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <ActionBar comment title={'Saved List'} />
        <ActivityIndicator style={{ marginTop: 5 }} animating={this.state.buffering} size={'small'} />
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={rowData => this.renderRow(rowData)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
