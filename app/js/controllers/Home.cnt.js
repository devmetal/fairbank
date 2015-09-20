'use strict';

class HomeController {
  constructor($scope, userService) {
    this.scope = $scope;
    this.scope.user = userService.getUser();
  }
}

HomeController.$inject = ['$scope', 'UserService'];

module.exports = HomeController;
