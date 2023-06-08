export default {
	pageLoad: async () => {
		Api1.run().then(res => console.log('ARYA AUTH RES: ', res)).catch(err => console.log('ARYA ERR: ', err))
	},
	listenIframeCommunication: async() => {
		windowMessageListener(
			'https://devenv-crm.cc.capillarytech.com', //  appsmith.URL.protocol+'//'+ appsmith.URL.host
			(message) => {
				console.log('NIKHIL message: ',message);
				if (message.type === 'userData') {
					storeValue('userContext', message.userData);
					storeValue('authToken', this.sanitizeAuthToken(message.authToken), false);
				}
				if (message.type === 'clearState') {
					clearStore();
					unlistenWindowMessage('https://devenv-crm.cc.capillarytech.com'); //appsmith.URL.protocol+'//'+ appsmith.URL.host
				}
			});
	},
	sanitizeAuthToken: (token = '') => {
		return token?.substring(1, token.length-1)
	},
	removeAuthToken: () => {
		removeValue("authToken");
	}
}