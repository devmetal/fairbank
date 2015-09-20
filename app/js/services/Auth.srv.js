'use strict';


class AuthService {
  constructor($http, $q) {
    this.http = $http;
    this.q = $q;
  }

  auth(login, pass) {
    let authFilter = (user) =>
      user.login === login && user.pass === pass

    return this.q((resolve, reject) => {
      this.http.get('/datas/db.json')
        .then((db) => {
          let users = db.data.users;
          let user = users.filter(authFilter);

          if (user.length) {
            if (user[0].enabled === true) {
              resolve(user[0]);
            } else {
              reject('Disabled user');
            }
          } else {
            reject('User not found');
          }
        }, (err) => {
          reject(err);
        });
    });
  }
}

AuthService.$inject = ['$http', '$q'];

module.exports = AuthService;
