import auth0 from 'auth0-js';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { SITE_URL, AUTH_DOMAIN, AUTH_CLIENT_ID } = publicRuntimeConfig;

class Auth {
	constructor() {
		if (SITE_URL === undefined) {
			this.url = 'http://localhost:3000';
		} else {
			this.url = SITE_URL;
		}

		this.auth0 = new auth0.WebAuth({
			domain: AUTH_DOMAIN,
			clientID: AUTH_CLIENT_ID,
			redirectUri: `${this.url}/callback/`,
			responseType: 'token id_token',
			scope: 'openid email'
		});

		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
		this.isLoggedIn = this.isLoggedIn.bind(this);
	}

	login() {
		this.auth0.authorize();
	}

	getIdToken() {
		return this.idToken;
	}

	getAccessToken() {
		return this.accessToken;
	}

	handleAuthentication() {
		return new Promise((resolve, reject) => {
			this.auth0.parseHash((err, authResult) => {
				if (err) return reject(err);
				if (!authResult || !authResult.idToken) {
					return reject(err);
				}
				this.setSession(authResult);
				return resolve();
			});
		});
	}

	setSession(authResult) {
		localStorage.setItem('isLoggedIn', true);
		this.idToken = authResult.idToken;
		this.accessToken = authResult.accessToken;
		// set the time that the id token will expire at
		this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
	}

	logout() {
		localStorage.removeItem('isLoggedIn');
		this.accessToken = null;
		this.idToken = null;
		this.expiresAt = 0;
		this.auth0.logout({
			clientID: 're91PxRwpGCvWyjWhxhxt4bkF8maubXB',
			returnTo: this.url
		});
	}

	renewSession() {
		return new Promise((resolve, reject) => {
			this.auth0.checkSession({}, (err, authResult) => {
				if (authResult && authResult.accessToken && authResult.idToken) {
					this.setSession(authResult);
					resolve();
				} else if (err) {
					this.logout();
					reject(err);
				}
			});
		});
	}

	isAuthenticated() {
		// Check whether the current time is past the token's expiry time
		return new Date().getTime() < this.expiresAt;
	}

	isLoggedIn() {
		if (process.browser) {
			return Boolean(localStorage.getItem('isLoggedIn'));
		}
		return false;
	}
}

const auth = new Auth();

export default auth;
