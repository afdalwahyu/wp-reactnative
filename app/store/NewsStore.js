import { observable } from 'mobx';
import Api from './Api';

class NewsStore {
  @observable feed;
  @observable comments;
  @observable page;

  constructor() {
    this.feed = null;
    this.comments = null;
    this.page = 1;
  }

  async fetchFeed() {
    const data = new Api();
    this.feed = await data.getPost();
  }

  async fetchFeedPage(page) {
    const data = new Api();
    const tmp = await data.getFeedPage(page);
    this.feed = this.feed.concat(tmp);
  }

  async fetchComment(id) {
    const data = new Api();
    this.comments = await data.getCommentPost(id);
  }

}

const newsStore = new NewsStore();

export default newsStore;
