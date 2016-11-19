import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const cat = require('../dumpfile/categories.json');

export default class Categories extends Component {

  render() {
    return (
      <View style={styles.container}>
        {
          cat.categories.map((content, i) => (
            <View style={styles.list} key={i} >
              <Text style={styles.text}>{content.name}</Text>
              <Icon name={'chevron-right'} color={'#000'} backgroundColor={'#fff'} size={10} />
            </View>

          ))
        }
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
});
