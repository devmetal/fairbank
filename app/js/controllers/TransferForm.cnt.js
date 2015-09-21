'use strict';

class TransferFormController {
	constructor(userService, transferService, $location) {
		this.transferService = transferService;
		this.userService = userService;
		this.location = $location;
		
		this.accounts = userService.getAccounts();
		this.user = userService.getUser();
		
		this.datas = {
			source:this.accounts[0].no,
			destination:null,
			amount:null
		};
	}
	
	sendForm(isValid) {
		if (isValid === true) {
			this.transferService.initTransfer(this.datas);
			this.location.path('/transfer/confirm');
		}
	}
}

TransferFormController.$inject = ['UserService','TransferService','$location'];

module.exports = TransferFormController;