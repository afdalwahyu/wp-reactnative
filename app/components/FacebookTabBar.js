import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionBar from './ActionBar';

class FacebookTabBar extends Component {

  constructor() {
    super();
    this.tabIcons = [];
    this.activeColor = '#C01820';
    this.unactiveColor = '#CCCCCC';
  }

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(value => this.setAnimationValue(value));
  }

  setAnimationValue({ value }) {
    const i = Math.floor(value);
    const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
    this.tabIcons[i].setNativeProps({
      style: {
        color: this.iconColor(progress),
      },
    });
  }

  iconColor(progress) {
    const bigint = parseInt(this.activeColor.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    const red = r + ((204 - r) * progress);
    const green = g + ((204 - g) * progress);
    const blue = b + ((204 - b) * progress);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  render() {
    return (
      <View>
        <ActionBar title={this.props.title[this.props.activeTab]} />
        <View style={[styles.tabs, this.props.style]}>
          {this.props.tabs.map((tab, i) =>
            <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
              <Icon
                name={tab}
                size={25}
                color={this.props.activeTab === i ? this.activeColor : this.unactiveColor}
                ref={(icon) => { this.tabIcons[i] = icon; }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

FacebookTabBar.propTypes = {
  goToPage: React.PropTypes.func,
  activeTab: React.PropTypes.number,
  tabs: React.PropTypes.array,
};

export default FacebookTabBar;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});
