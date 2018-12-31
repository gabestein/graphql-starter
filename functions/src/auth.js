const fetch = require('node-fetch');

const auth0Domain = `https://${process.env.AUTH_DOMAIN}`;

exports.handler = function(event, context, callback) {
	const token = event.headers.authorization;

	if (!token) {
		callback(null,
			{
				statusCode: 200,
				body: JSON.stringify({ 'x-hasura-role': 'anonymous' }),
				headers: {
					'content-type': 'application/json'
				}
			});
	} else {
		// Fetch information about this user from
		// auth0 to validate this token
		// NOTE: Replace the URL with your own auth0 app url
		const options = {
			headers: {
				Authorization: token,
				'Content-Type': 'application/json'
			}
		};

		fetch(`${auth0Domain}/userinfo`, options)
		.then(r => r.json())
		.then(data => {
			callback(null, {
				statusCode: 200,
				body: JSON.stringify({
					'X-HASURA-USER-ID': data.sub,
					'X-HASURA-ROLE': 'user',
				}),
				headers: {
					'content-type': 'application/json'
				}
			});
		})
		.catch((err) => {
			console.warn(err);
			callback(null, {
				statusCode: 200,
				body: JSON.stringify({
					'X-HASURA-ROLE': 'anonymous',
				}),
				headers: {
					'content-type': 'application/json'
				}
			});
		});
	}
};
