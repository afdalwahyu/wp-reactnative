import env from '../env';

class Api {
  constructor() {
    this.baseURL = `${env.url}/wp-json/wp/v2/`;
    this.per_page = 7;
  }

  getPost() {
    const url = `${this.baseURL}posts?page=1&per_page=${this.per_page}`;
    return fetch(url, { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getFeedPage(page) {
    const url = `${this.baseURL}posts?page=${page}&per_page=${this.per_page}`;
    return fetch(url, { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  // there are parent field to match with parent id comment
  getCommentPost(id) {
    const url = `${this.baseURL}comments?post=${id}`;
    return fetch(url, { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getCategories() {
    const url = `${this.baseURL}categories`;
    return fetch(url, { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  getItemCategories(id, page) {
    const url = `${this.baseURL}posts?categories=${id}&per_page=${this.per_page}&page=${page}`;
    return fetch(url, { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  searchPosts(text, page) {
    const encoded = encodeURI(text);
    const url = `${this.baseURL}posts?search=${encoded}&per_page=${this.per_page}&page=${page}`;
    return fetch(url, { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  sendComment(obj) {
    const url = `${this.baseURL}comments`;
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: obj,
    };
    return fetch(url, init)
      .then(response => response.json())
      .catch(err => console.log(err));
  }

}

export default Api;
