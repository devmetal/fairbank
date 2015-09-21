'use strict';

class AuthController {
  constructor($scope, $rootScope, $location, UserService) {
    this.scope = $scope;
    this.rootScope = $rootScope;
    this.location = $location;
    this.name = "";
    this.pass = "";
    this.userService = UserService;
  }

  login() {
    let name = this.name;
    let pass = this.pass;
    this.userService.login(name, pass)
      .then(
        () => {
          this.rootScope.rootUser = this.userService.getUser();
          this.location.path('/');
        },
        (err) => {
          this.scope.error = err;
        }
      );
  }
}

AuthController.$inject = ['$scope', '$rootScope', '$location', 'UserService'];

module.exports = AuthController;
