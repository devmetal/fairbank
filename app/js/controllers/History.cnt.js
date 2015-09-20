'use strict';

class HistoryController {
  constructor($scope, $location, $routeParams, userService) {
    this.scope = $scope;
    this.location = $location;

    let user = userService.getUser();
    this.scope.user = user;
    this.scope.accounts = user.datas.accounts;

    if ($routeParams.no) {
      this.scope.current = $routeParams.no;

      let transactions = userService.getTransactions($routeParams.no);
      if (!transactions || !transactions.length) {
        this.scope.flash = 'No history';
      } else {
        this.scope.transactions = transactions;
      }

      this.scope.selected = user.datas.accounts.find((acc) => {
        return acc.no === $routeParams.no
      });
    } else {
      this.scope.selected = user.datas.accounts[0];
    }
  }

  getAccountHistory() {
    this.location.path('/history/' + this.scope.selected.no);
  }
}

HistoryController.$inject = ['$scope', '$location', '$routeParams', 'UserService'];

module.exports = HistoryController;
