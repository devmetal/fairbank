'use strict';

class TransferService {
	constructor($q) {
		this.transferDatas = null;
		this.lastTransferDatas = null;
		this.q = $q;
	}
	
	initTransfer(datas) {
		this.transferDatas = datas;
	}
	
	hasTransfer() {
		return this.transferDatas !== null;
	}
	
	getTransferDatas() {
		return this.transferDatas;
	}
	
	getLastTransferDatas() {
		return this.lastTransferDatas;
	}
	
	reset() {
		this.transferDatas = null;
		this.lastTransferDatas = null;
	}
	
	doTransfer() {
		return this.q((resolve, reject) => {
			setTimeout(() => {
				this.lastTransferDatas = Object.assign({},this.transferDatas);
				resolve(true)
			}, 2000);
		});
	}
}


TransferService.$inject = ['$q'];

module.exports = TransferService;