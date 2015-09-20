'use strict';

class TransferController {
  constructor($scope, userService) {
    $scope.user = userService.getUser();
    $scope.accounts = userService.getAccounts();
    $scope.form = {
      selectedAccount: $scope.accounts[0].no,
      destination: null,
      amount:null
    }
    this.scope = $scope;
  }

  confirm(isValid) {

  }
}

TransferController.$inject = ['$scope', 'UserService'];

module.exports = TransferController;
