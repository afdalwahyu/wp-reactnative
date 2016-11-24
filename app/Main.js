/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { observer } from 'mobx-react/native';
import FacebookTabBar from './components/FacebookTabBar';

// import page file
import Home from './page/Home';
import Categories from './page/Categories';
import Notification from './page/Notification';
import Profile from './page/Profile';

@observer(['news', 'nav'])
export default class Main extends Component {

  constructor(props) {
    super(props);
    this.props.nav.navigator = this.props.navigator;
  }

  render() {
    const title = ['Home', 'Categories', 'News', 'Profile'];
    return (
      <ScrollableTabView
        style={styles.scroll}
        initialPage={0}
        renderTabBar={() => <FacebookTabBar title={title} />}
      >
        <Home style={styles.tabView} tabLabel="ios-home" />
        <Categories style={styles.tabView} tabLabel="md-list-box" />
        <ScrollView tabLabel="ios-notifications" style={styles.tabView}>
          <Notification />
        </ScrollView>
        <ScrollView tabLabel="ios-contact" style={styles.tabView}>
          <Profile />
        </ScrollView>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  scroll: {
    marginTop: 0,
  },
});
