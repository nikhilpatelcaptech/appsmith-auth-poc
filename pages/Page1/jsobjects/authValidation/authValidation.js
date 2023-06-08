export default {
	listenIframeCommunication: async() => {
		windowMessageListener(
			'http://localhost:8000',
			(message) => {
				if (message.type === 'userData') {
					storeValue('userContext', message.userData);
					console.log('NIKHIL authToken: ', this.sanitizeAuthToken(message.authToken));
					storeValue('authToken', this.sanitizeAuthToken(message.authToken), false);
				}
				if (message.type === 'clearState') {
					clearStore();
					unlistenWindowMessage('http://localhost:8000');
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