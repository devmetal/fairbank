'use strict';

let session = new Map();

class UserService {
  constructor(auth, $q) {
    this.authsrv = auth;
    this.q = $q;

    let user = localStorage.getItem('user');
    if (user) {
      session.set('user', JSON.parse(user));
    }
  }

  login(login, pass) {
    return this.q((resolve, reject) => {
      this.authsrv.auth(login, pass)
        .then((result) => {
          session.set('user', result);
          localStorage.setItem('user', JSON.stringify(result));
          resolve(true);
        }, (err) => {
          reject(err);
        });
    });
  }

  logout() {
    session.delete('user');
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return session.has('user');
  }

  getUser() {
    return session.get('user');
  }

  getTransactions(no) {
    let user = session.get('user');
    if (user.datas.transactions) {
      return user.datas.transactions[no];
    } else {
      return null;
    }
  }

  getAccounts() {
    return session.get('user').datas.accounts;
  }
}

UserService.$inject = ['AuthService', '$q'];

module.exports = UserService;
