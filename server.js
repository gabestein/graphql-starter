const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
	const server = express();

	/** **** CUSTOM APP ROUTES ***** */
	server.get('/item', (req, res) =>{
		const actualPage = '/item';
		const queryParams = { id: req.params.id };
		app.render(req, res, actualPage, queryParams);
	});

	/** **** CUSTOM SERVER-ONLY ROUTES ***** */
	server.get('/item/:id', (req, res) =>{
		const actualPage = '/item';
		const queryParams = { id: req.params.id };
		app.render(req, res, actualPage, queryParams);
	});

	/** **** WILDCARD HANDLERS ***** */
	server.get('*', (req, res) => {
		return handle(req, res);
	});

	server.listen(3000, (err) => {
		if (err) throw err;
		// eslint-disable-next-line no-console
		console.log('> Ready on http://localhost:3000');
	});
})
.catch((ex) => {
	console.error(ex.stack);
	process.exit(1);
});
