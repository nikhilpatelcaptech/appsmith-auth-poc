export default {
	listenIframeCommunication: async() => {
		windowMessageListener(
			appsmith.URL.protocol+'//'+ appsmith.URL.host, // 'https://appsmith.devenv-crm.cc.capillarytech.com'
			(message) => {
				if (message.type === 'userData') {
					storeValue('userContext', message.userData);
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