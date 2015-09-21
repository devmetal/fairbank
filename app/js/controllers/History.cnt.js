'use strict';

class HistoryController {
  constructor($scope, $state, $stateParams, userService) {
    this.scope = $scope;
    this.state = $state;

    let user = userService.getUser();
    this.scope.user = user;
    this.scope.accounts = user.datas.accounts;

    if ($stateParams.no) {
      this.scope.current = $stateParams.no;

      let transactions = userService.getTransactions($stateParams.no);
      if (!transactions || !transactions.length) {
        this.scope.flash = 'No history';
      } else {
        this.scope.transactions = transactions;
      }

      this.scope.selected = user.datas.accounts.find((acc) => {
        return acc.no === $stateParams.no
      });
    } else {
      this.scope.selected = user.datas.accounts[0];
    }
  }

  getAccountHistory() {
    this.state.go('home.history-no', {no:this.scope.selected.no});
  }
}

HistoryController.$inject = ['$scope', '$state', '$stateParams', 'UserService'];

module.exports = HistoryController;
