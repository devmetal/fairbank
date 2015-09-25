'use strict';

class StorageService {
	
	constructor($storageProvider, $q) {
		this.storage = $storageProvider;
		this.encode = $storageProvider.encode;
		this.decode = $storageProvider.decode;
		this.promise = $q;
	}
	
	itemSync(key) {
		let datas = this.storage.itemSync(key);
		if (datas !== null) {
			return this.decode(datas);
		} else {
			return null;
		}
	}
	
	itemAsync(key) {
		return this.promise((resolve, reject) => {
			this.storage.itemAsync(key)
				.then((result) => this.decode(result))
				.then((decoded) => resolve(decoded))
				.catch((error) => reject(error));
		});
	}
	
	setItemSync(key, value) {
		let encoded = this.encode(value);
		return this.storage.setItem(key, encoded);
	}
	
	setItemAsync(key, value) {
		let setItemAsync = (key, encoded) => 
			this.storage.setItemAsync(key, encoded);
		
		return this.promise((resolve, reject) => {
			this.encode(value)
				.then((encoded) => setItemAsync(key, encoded))
				.then((res) => resolve(res))
				.catch((error) => reject(error))
		});
	}
	
	keyExistsSync(key) {
		return this.storage.keyExistsSync(key);
	}
	
	keyExistsAsync(key) {
		return this.promise((resolve, reject) => {
			this.storage.keyExistsAsync(key)
				.then(resolve)
				.catch(reject);
		});
	}
}

StorageService.$inject = ['$storageProvider', '$q'];

module.exports = StorageService;