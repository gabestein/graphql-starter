const withSass = require('@zeit/next-sass');
require('dotenv').config({ path: '.env' });

module.exports = withSass({
	serverRuntimeConfig: {
	},
	publicRuntimeConfig: {
		SITE_URL: process.env.SITE_URL,
		API_URL: process.env.API_URL,
		AUTH_DOMAIN: process.env.AUTH_DOMAIN,
		AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID
	},
	exportPathMap: (() => {
		return {
			'/': {
				page: '/'
			},
			'/items': {
				page: '/items'
			},
			'/callback': {
				page: '/callback'
			},
			'/about': {
				page: '/about'
			}
			/*	'/item': {
				page: '/item', query: { id: 0 }
			} */
		};
	})
});
