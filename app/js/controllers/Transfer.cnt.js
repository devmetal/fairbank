'use strict';

class TransferController {
  constructor(userService, transferService, $location) {
    console.log('fuck');
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

TransferController.$inject = ['UserService', 'TransferService', '$location'];

module.exports = TransferController;
