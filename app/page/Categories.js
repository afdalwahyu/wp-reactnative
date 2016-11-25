import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer } from 'mobx-react/native';

@observer(['storage', 'nav'])
export default class Categories extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      init: true,
      refreshing: false,
    };
  }

  async componentWillMount() {
    // await this.props.storage.getCategories();
    const offlinedata = await this.props.storage.getOfflineCategories();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(offlinedata),
      init: false,
    });
  }

  async _onRefresh() {
    this.setState({ refreshing: true });
    const newdata = await this.props.storage.getCategories();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newdata),
      refreshing: false,
    });
  }

  _onPress(id, title) {
    this.props.nav.navigator.push({
      name: 'ShowListCat',
      passProps: {
        id,
        title,
      },
    });
  }

  renderRow(rowData) {
    return (
      <TouchableOpacity style={styles.list} onPress={() => this._onPress(rowData.id, rowData.name)}>
        <Text style={styles.text}>{rowData.name}</Text>
        <Icon name={'chevron-right'} color={'#000'} backgroundColor={'#fff'} size={10} />
      </TouchableOpacity>
    );
  }

  render() {
    const refreshControl = (
      <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()} />
    );
    return (
      <View style={styles.container}>
        {this.state.init && <ActivityIndicator style={styles.activityIndicator} animating={this.state.init} size={'small'} />}
        <ListView
          refreshControl={refreshControl}
          enableEmptySections
          initialListSize={2}
          dataSource={this.state.dataSource}
          renderRow={rowData => this.renderRow(rowData)}
          pageSize={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    marginBottom: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  list: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#2c3e50',
  },
  activityIndicator: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
