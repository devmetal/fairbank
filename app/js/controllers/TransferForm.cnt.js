'use strict';

class TransferFormController {
	constructor(pageService, userService, transferService, $state) {
		pageService.setTitle('Átutalás kezdeményezése')
		this.transferService = transferService;
		this.userService = userService;
		this.state = $state;

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
			this.state.go('home.transfer-confirm');
		}
	}
}

TransferFormController.$inject = ['PageService', 'UserService', 'TransferService', '$state'];

module.exports = TransferFormController;
