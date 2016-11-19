import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button } from 'react-native-elements';
import { observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from './SearchBar';

@observer(['nav'])
export default class MyComponent extends Component {

  _pressBack() {
    return this.props.nav.navigator.pop();
  }

  _pressSearch() {
    return this.props.nav.navigator.push({
      name: 'Search',
    });
  }

  _pressShare() {
    return 1;
  }

  _pressSave() {
    return 1;
  }

  _pressComment() {
    return 1;
  }

  render() {
    const content = (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this._pressBack()} >
          <Icon size={30} style={styles.contentButton} color={'#fff'} name="md-arrow-round-back" backgroundColor="#3b5998" />
        </TouchableWithoutFeedback>
        <View style={styles.rightContainer}>
          <Icon size={25} style={styles.contentButton} color={'#fff'} name="md-share" backgroundColor="#3b5998" onPress={() => this._pressShare()} />
          <Icon size={25} style={styles.contentButton} color={'#fff'} name="ios-star" backgroundColor="#3b5998" onPress={() => this._pressSave()} />
          <Icon size={25} style={styles.contentButton} color={'#fff'} name="ios-chatboxes" backgroundColor="#3b5998" onPress={() => this._pressComment()} />
        </View>
      </View>
    );

    const home = (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Button
          onPress={() => this._pressSearch()}
          icon={{ name: 'search', type: 'font-awesome' }}
          small
          backgroundColor={'#C01820'}
          buttonStyle={styles.searchButton}
        />
      </View>
    );

    const comment = (
      <View style={styles.container}>
        <View style={styles.comment}>
          <TouchableWithoutFeedback onPress={() => this._pressBack()} >
            <Icon size={30} style={styles.contentButton} color={'#fff'} name="md-arrow-round-back" backgroundColor="#3b5998" />
          </TouchableWithoutFeedback>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </View>
    );

    const search = <SearchBar />;

    if (this.props.content) {
      return content;
    } else if (this.props.comment) {
      return comment;
    } else if (this.props.search) {
      return search;
    }
    return home;
  }
}

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
  },
  container: {
    height: 50,
    backgroundColor: '#C01820',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  searchButton: {
    marginRight: 0,
    paddingRight: 10,
  },
  contentButton: {
    margin: 10,
  },
  rightContainer: {
    flexDirection: 'row',
  },
});
