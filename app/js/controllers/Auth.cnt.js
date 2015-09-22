'use strict';

class AuthController {
  constructor($location, UserService) {
    this.userService = UserService;
    this.location = $location;
    this.name = "";
    this.pass = "";
    this.error = "";
  }

  login() {
    let name = this.name;
    let pass = this.pass;
    this.userService.login(name, pass)
      .then(
        () => {
          this.location.path('/');
        },
        (err) => {
          this.error = error;
        }
      );
  }
}

AuthController.$inject = ['$location', 'UserService'];

module.exports = AuthController;
