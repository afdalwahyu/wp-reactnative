/* @flow */

import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ListView,
} from 'react-native';
import { observer } from 'mobx-react/native';
import ActionBar from '../components/ActionBar';
import MiniLists from '../components/MiniLists';

@observer(['news'])
export default class ShowListCat extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      init: true,
      title: 'Categories',
      buffering: false,
      page: 1,
    };
  }

  async componentWillMount() {
    const id = this.props.id;
    const data = await this.props.news.fetchItemCategory(id, 1);
    this.setState({
      tmpdata: data,
      dataSource: this.state.dataSource.cloneWithRows(data),
      init: false,
    });
  }

  async _loadMore() {
    if (this.state.buffering === false) {
      this.setState({ buffering: true });
      this.state.page += 1;
      const tmp = await this.props.news.fetchItemCategory(this.props.id, this.state.page);
      this.state.tmpdata = this.state.tmpdata.concat(tmp);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.tmpdata),
        buffering: false,
      });
    }
  }

  renderRow(rowData) {
    return <MiniLists posts={rowData} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <ActionBar comment title={this.props.title} />
        {this.state.init && <ActivityIndicator style={styles.animate} animating={this.state.init} size={'small'} />}
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={rowData => this.renderRow(rowData)}
          onEndReached={() => this._loadMore()}
        />
        {this.state.buffering && <ActivityIndicator style={[styles.animate, styles.bottom]} animating={this.state.buffering} size={'small'} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animate: {
    marginTop: 5,
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  bottom: {
    bottom: 0,
  },
});
