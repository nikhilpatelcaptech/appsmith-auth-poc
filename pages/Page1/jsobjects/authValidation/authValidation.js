export default {
	listenIframeCommunication: async() => {
		console.log(appsmith.URL.protocol+'//'+appsmith.URL.host);
		windowMessageListener(
			// 'https://appsmith.devenv-crm.cc.capillarytech.com',
			appsmith.URL.protocol+'//'+ appsmith.URL.host,
			(message) => {
				if (message.type === 'userData') {
					storeValue('userContext', message.userData);
					console.log('NIKHIL authToken: ', this.sanitizeAuthToken(message.authToken));
					storeValue('authToken', this.sanitizeAuthToken(message.authToken), false);
				}
				if (message.type === 'clearState') {
					clearStore();
					unlistenWindowMessage(appsmith.URL.protocol+'//'+ appsmith.URL.host);
				}
			});
	},
	sanitizeAuthToken: (token = '') => {
		return token.substring(1, token.length-1)
	},
	removeAuthToken: () => {
		removeValue("authToken");
	}
}