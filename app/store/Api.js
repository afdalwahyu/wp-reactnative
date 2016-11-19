class Api {
  constructor() {
    this.baseURL = 'https://www.techinasia.com/wp-json/techinasia/2.0/';
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
    const url = `${this.baseURL}posts/${id}/comments?context=state`;
    return fetch(url, { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));
  }

}

export default Api;
