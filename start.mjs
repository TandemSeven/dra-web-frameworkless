import fetch from 'node-fetch'; global.fetch = fetch;
import express from 'express';
import getZIP from './lib/get-zip';
import getSummaryFromZip from './lib/get-summary-from-zip';
import getDocumentHTMLFromSummary from './lib/get-document-html-from-summary';

const app = express();

app.use(express.static('public'));

app.get('/', (request, response) => {
	const userAgent = request.headers['user-agent'];

	response.set('Content-Type', 'text/html');

	getZIP.then(
		zip => getSummaryFromZip(request.query.zip || zip)
	).then(
		summary => {
			const documentHTML = getDocumentHTMLFromSummary(summary, userAgent)

			response.send(documentHTML);
		}
	)
});

const pathRegExp = /^\/(\d+)$/;

app.get(pathRegExp, (request, response) => {
	const userAgent = request.headers['user-agent'];

	response.set('Content-Type', 'text/html');

	const [, zip] = request.path.match(pathRegExp);

	getSummaryFromZip(zip).then(
		summary => {
			const documentHTML = getDocumentHTMLFromSummary(summary, userAgent)

			response.send(documentHTML);
		}
	);
});

app.listen(3000);

console.log('Server started: http://localhost:3000/');
