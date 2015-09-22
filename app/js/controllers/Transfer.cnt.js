'use strict';

class TransferController {
  constructor(pageService, userService, transferService, $location) {
    pageService.setTitle('Átutalás megerősítése');
    this.pageService = pageService;

    if (!transferService.hasTransfer()) {
      $location.path('/transfer');
    } else {
      this.location = $location;
      this.transferService = transferService;
      this.userService = userService;
      this.state = 'confirm';
      this.transfer = this.transferService.getTransferDatas();
    }
  }

  startTransfer() {
    this.state = 'transfering';
    this.transferService.doTransfer()
      .then((result) => {
        this.state = 'transfered';
        this.pageService.setTitle('Kész');
      });
  }

  back() {
    this.location.path('/home/transfer');
  }

  isConfirm() {
    return this.state === 'confirm';
  }

  isTransfering() {
    return this.state === 'transfering';
  }

  isTransfered() {
    return this.state === 'transfered';
  }
}

TransferController.$inject = ['PageService', 'UserService', 'TransferService', '$location'];

module.exports = TransferController;
