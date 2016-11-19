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
    console.log(this.feed);
  }

  async fetchFeedPage(page) {
    const data = new Api();
    const tmp = await data.getFeedPage(page);
    const tmp2 = tmp.posts;
    tmp2.map(val => this.feed.posts.push(val));
  }

  async fetchComment(id) {
    const data = new Api();
    this.comments = await data.getCommentPost(id);
  }

}

const newsStore = new NewsStore();

export default newsStore;
