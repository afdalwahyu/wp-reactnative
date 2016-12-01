import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { observer } from 'mobx-react/native';
import ActionBar from '../components/ActionBar';
import MiniLists from '../components/MiniLists';

@observer(['news'])
export default class Search extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      init: false,
      buffering: false,
      page: 1,
      tmpData: [],
      text: null,
    };
  }

  async handleSubmit() {
    this.setState({ init: true });
    this.props.news.searched = await this.props.news.searchPosts(this.state.text, this.state.page);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.news.searched.toJS()),
      init: false,
    });
  }

  renderRow(rowData) {
    return <MiniLists posts={rowData} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <ActionBar
          search
          onChangeText={text => this.setState({ text })}
          handleSubmit={() => this.handleSubmit()}
        />
        <ActivityIndicator style={styles.animate} animating={this.state.init} size={'small'} />
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
