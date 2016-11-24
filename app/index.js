/* @flow */

import React, { Component } from 'react';
import {
  Navigator,
  BackAndroid,
} from 'react-native';
import { Provider } from 'mobx-react/native';

import Main from './Main';
import Content from './page/Content';
import Comment from './page/Comment';
import Saved from './page/Saved';
import Search from './page/Search';
import ShowListCat from './page/ShowListCat';

import news from './store/NewsStore';
import nav from './store/Nav';
import storage from './store/Storage';

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
      default:
        return <Main {...route.passProps} />;
    }
  }

  render() {
    return (
      <Provider news={news} nav={nav} storage={storage}>
        <Navigator
          ref={(ref) => { this.navigator = ref; }}
          initialRoute={{ name: 'Home' }}
          renderScene={(route, navigator) => this.renderScene(route, navigator)}
          configureScene={() => this.configureScene()}
        />
      </Provider>
    );
  }
}
