'use strict';

class PageService {
  constructor() {
    this.pageTitle = '';
    this.userName = '';

  }

  setTitle(title) {
    this.pageTitle = title;
  }

  setUserName(name) {
    this.userName = name;
  }
}

module.exports = PageService;
