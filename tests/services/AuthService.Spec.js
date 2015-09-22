'use strict';

let mockRespond = {
  users:[
    {login:'demo', pass:'demo', enabled: false},
    {login:'demo1', pass:'demo1', enabled: true}
  ]
}

describe('AuthService', () => {
  let authSvr, httpBackend, rootScp;

  beforeEach(() => {
    angular.mock.module('Bank');
    angular.mock.inject((_AuthService_, $httpBackend, _$rootScope_) => {
      authSvr = _AuthService_;
      httpBackend = $httpBackend;
      rootScp = _$rootScope_;

      $httpBackend.when('GET', '/datas/db.json')
        .respond(mockRespond);
    });
  });

  it('Login enabled user', (done) => {
    authSvr.auth('demo1', 'demo1')
      .then((data) => {
        let user = data;
        expect(user).to.deep.equal({
          login:'demo1', pass:'demo1', enabled: true
        });
        done();
      });

    httpBackend.flush();
  });

  it('Login disabled user', (done) => {
    authSvr.auth('demo', 'demo')
      .catch((err) => {
        expect(err).not.to.be.null;
        done();
      });

    httpBackend.flush();
  });
});
