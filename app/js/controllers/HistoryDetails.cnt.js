'use strict';

class HistoryDetailsController {
  constructor($stateParams, userService) {
    let no = $stateParams.no;
    let transactions = userService.getTransactions(no);

    if (!transactions || !transactions.length) {
      this.flash = 'No history';
    } else {
      this.transactions = transactions;
    }
  }
}

HistoryDetailsController.$inject = ['$stateParams', 'UserService'];

module.exports = HistoryDetailsController;
