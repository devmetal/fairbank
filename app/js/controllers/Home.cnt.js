'use strict';

class HomeController {
  constructor($scope, pageService, userService) {
    let user = userService.getUser();
    this.hasAccount = userService.hasAccount();
    this.user = user;

    pageService.setTitle('Fairbank főlap');
    pageService.setUserName(user.datas.name);
    $scope.Page = pageService;
  }
}

HomeController.$inject = ['$scope', 'PageService', 'UserService'];

module.exports = HomeController;
