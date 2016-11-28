import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  View,
  RefreshControl,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { AdMobInterstitial } from 'react-native-admob';
import { observer } from 'mobx-react/native';
import Card from '../components/Card';
import env from '../env';

AdMobInterstitial.setAdUnitID(env.ads.interstitial.adUnitID);
AdMobInterstitial.setTestDeviceID('32081ee5595461cf');

@observer(['news', 'storage', 'nav'])
export default class MyComponent extends Component {

  constructor(props) {
    super(props);
    AdMobInterstitial.addEventListener('interstitialDidClose', () => AdMobInterstitial.requestAd());
    AdMobInterstitial.requestAd();
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
    this.props.storage.key = JSON.parse(await AsyncStorage.getItem('listKey'));
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.news.feed.toJS()),
      init: false,
    });
  }

  componentWillReceiveProps() {
    if (this.props.nav.ads === 4) {
      AdMobInterstitial.requestAd();
      AdMobInterstitial.showAd();
      this.props.nav.ads = 0;
    }
    this.props.nav.ads += 1;
  }

  async _onRefresh() {
    this.setState({ refreshing: true });
    await this.props.news.fetchFeed();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.news.feed.toJS()),
      refreshing: false,
    });
  }

  async _loadMore() {
    if (this.state.buffering === false) {
      this.setState({ buffering: true });
      this.props.news.page += 1;
      await this.props.news.fetchFeedPage(this.props.news.page);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.news.feed.toJS()),
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
      <View
        style={styles.container}
      >
        {this.state.init && <ActivityIndicator style={styles.animate} animating={this.state.init} size={'small'} />}
        <ListView
          refreshControl={refreshControl}
          enableEmptySections
          initialListSize={2}
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
    position: 'absolute',
    left: 0,
    right: 0,
    marginTop: 5,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  bottom: {
    bottom: 0,
  },
});
