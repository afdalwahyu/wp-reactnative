import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { observer } from 'mobx-react/native';
import Card from '../components/Card';

@observer(['news'])
export default class MyComponent extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      init: true,
      refreshing: false,
      buffering: false,
    };
  }

  async componentWillMount() {
    await this.props.news.fetchFeed();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.news.feed.posts.toJS()),
      init: false,
    });
  }

  async _onRefresh() {
    this.setState({ refreshing: true });
    await this.props.news.fetchFeed();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.news.feed.posts.toJS()),
      refreshing: false,
    });
  }

  async _loadMore(event) {
    const { nativeEvent } = event;
    const differ = nativeEvent.contentSize.height - nativeEvent.contentOffset.y;
    if ((differ <= 1000) && (this.state.buffering === false)) {
      this.props.news.page += 1;
      this.setState({ buffering: true });
      await this.props.news.fetchFeedPage(this.props.news.page);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.news.feed.posts.toJS()),
        buffering: false,
      });
    }
  }

  renderRow(rowData) {
    return <Card post={rowData} />;
  }

  render() {
    const refreshControl = (
      <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()} />
    );
    return (
      <ScrollView
        style={styles.container}
        refreshControl={refreshControl}
        onScroll={event => this._loadMore(event)}
      >
        <ActivityIndicator style={{marginTop: 5}} animating={this.state.init} size={'small'} />
        <ListView
          enableEmptySections
          initialListSize={2}
          dataSource={this.state.dataSource}
          renderRow={rowData => this.renderRow(rowData)}
          pageSize={2}
        />
        <ActivityIndicator style={{marginTop: 5}} animating={this.state.buffering} size={'small'} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
