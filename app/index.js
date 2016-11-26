/* @flow */

import React, { Component } from 'react';
import {
  Navigator,
  BackAndroid,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Provider } from 'mobx-react/native';
import { AdMobBanner, AdMobInterstitial, PublisherBanner} from 'react-native-admob';

import Main from './Main';
import Content from './page/Content';
import Comment from './page/Comment';
import Saved from './page/Saved';
import Search from './page/Search';
import ShowListCat from './page/ShowListCat';
import WriteComment from './page/WriteComment';

import news from './store/NewsStore';
import nav from './store/Nav';
import storage from './store/Storage';

import env from './env';

export default class Index extends Component {

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
        this.navigator.pop();
        return true;
      }
      return false;
    });
  }

  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottomAndroid;
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'Home':
        return <Main navigator={navigator} {...route.passProps} />;
      case 'Content':
        return <Content {...route.passProps} />;
      case 'Comment':
        return <Comment {...route.passProps} />;
      case 'Saved' :
        return <Saved {...route.passProps} />;
      case 'Search':
        return <Search {...route.passProps} />;
      case 'ShowListCat':
        return <ShowListCat {...route.passProps} />;
      case 'WriteComment':
        return <WriteComment {...route.passProps} />;
      default:
        return <Main {...route.passProps} />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={env.color.statusBar}
          barStyle="light-content"
        />
        <Provider news={news} nav={nav} storage={storage}>
          <Navigator
            ref={(ref) => { this.navigator = ref; }}
            initialRoute={{ name: 'Home' }}
            renderScene={(route, navigator) => this.renderScene(route, navigator)}
            configureScene={() => this.configureScene()}
          />
        </Provider>
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID="ca-app-pub-4240060703306921/5322871897"
          testDeviceID="32081ee5595461cf"
          didFailToReceiveAdWithError={err => console.log(err)}
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
