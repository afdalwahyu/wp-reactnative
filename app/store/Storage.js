import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import Api from './Api';

class Storage {
  @observable saved;
  @observable key;
  @observable categories;

  constructor() {
    this.key = AsyncStorage.getItem('listKey')
      .then((value) => {
        if (value !== null) {
          return JSON.parse(value);
        }
        return [];
      });
    AsyncStorage.getItem('categories')
      .then((data) => {
        if (data !== null) {
          return JSON.parse(data);
        }
        return [];
      });
  }

  async getCategories() {
    const data = new Api();
    const tmp = await data.getCategories();
    await AsyncStorage.setItem('categories', JSON.stringify(tmp));
    return tmp;
  }

  async getOfflineCategories() {
    const data = await AsyncStorage.getItem('categories');
    if (data !== null) {
      return JSON.parse(data);
    }
    const api = new Api();
    const tmp = await api.getCategories();
    await AsyncStorage.setItem('categories', JSON.stringify(tmp));
    return tmp;
  }

  async getSaved() {
    const data = JSON.parse(await AsyncStorage.getItem('listKey'));
    if (data === null) {
      return [];
    }
    const all = await AsyncStorage.multiGet(data.map(String));
    this.saved = all;
    return this.saved;
  }

  async setSaved(item) {
    try {
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
      await AsyncStorage.multiSet([['listKey', JSON.stringify(key)], [JSON.stringify(item.id), JSON.stringify(item)]]);
      return true;
    } catch (e) {
      return console.log(e);
    }
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
      await AsyncStorage.removeItem(JSON.stringify(id));
      await AsyncStorage.setItem('listKey', JSON.stringify(key));
      this.key = key;
    }
    return true;
  }

}

const storage = new Storage();

export default storage;
