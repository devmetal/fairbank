'use strict';

class HistoryController {
  constructor(pageService, $state, $stateParams, userService) {
    pageService.setTitle('Számlatörténet');

    this.accounts = userService.getAccounts();
    this.account = this.accounts[0].no;
    this.state = $state;
  }

  getAccountHistory() {
    this.state.go('home.history.details', {no:this.account});
  }
}

HistoryController.$inject = ['PageService', '$state', '$stateParams', 'UserService'];

module.exports = HistoryController;
