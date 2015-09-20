'use strict';

class AccountsDirective {
  constructor() {
    this.templateUrl = 'user-accounts.html';
    this.restrict = 'AEC';
    this.scope = {
      user: '=user'
    };
    this.controller = ($scope) => {
      $scope.haveAccount = () => {
        return !!$scope.user.datas.accounts.length;
      }
    }
  }
}

module.exports = AccountsDirective;
