import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';

class Storage {
  @observable saved;
  @observable key;

  constructor() {
    this.key = AsyncStorage.getItem('listKey')
      .then((value) => {
        if (value !== null) {
          return JSON.parse(value);
        }
        return [];
      });
  }

  async getSaved() {
    const data = await AsyncStorage.getItem('listKey');
    if (data === null) {
      return [];
    }
    const all = await AsyncStorage.multiGet(JSON.parse(data));
    this.saved = all;
    return this.saved;
  }

  async setSaved(item) {
    // await AsyncStorage.clear();
    let key = JSON.parse(await AsyncStorage.getItem('listKey'));
    if (key === null) {
      key = [];
    }
    if (_.includes(key, item.id)) {
      await this.removeItem(item.id);
      return true;
    }
    key.push(item.id);
    this.key = key;
    await AsyncStorage.multiSet([['listKey', JSON.stringify(key)], [item.id, JSON.stringify(item)]]);
    return true;
  }

  async checkSaved(id) {
    const key = await this.key;
    if (key === null) {
      return false;
    }
    if (_.includes(key, id)) {
      return true;
    }
    return false;
  }

  async removeItem(id) {
    const key = JSON.parse(await AsyncStorage.getItem('listKey'));
    if (key !== null) {
      _.pull(key, id);
      await AsyncStorage.removeItem(id);
      await AsyncStorage.setItem('listKey', JSON.stringify(key));
      this.key = key;
    }
    return true;
  }

}

const storage = new Storage();

export default storage;