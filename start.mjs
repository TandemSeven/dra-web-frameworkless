import fetch from 'node-fetch'; global.fetch = fetch;
import express from 'express';
import getZIP from './lib/get-zip';
import getSummaryFromZip from './lib/get-summary-from-zip';
import getDocumentHTMLFromSummary from './lib/get-document-html-from-summary';

const app = express();

app.use(express.static('public'));

app.get('/', (request, response) => {
	response.set('Content-Type', 'text/html');

	getZIP.then(
		zip => getSummaryFromZip(zip)
	).then(
		summary => {
			const documentHTML = getDocumentHTMLFromSummary(summary)

			response.send(documentHTML);
		}
	)
});

const pathRegExp = /^\/(\d+)$/;

app.get(pathRegExp, (request, response) => {
	response.set('Content-Type', 'text/html');

	const [, zipString] = request.path.match(pathRegExp);
	const zip = Number(zipString);

	getSummaryFromZip(zip).then(
		summary => {
			const documentHTML = getDocumentHTMLFromSummary(summary)

			response.send(documentHTML);
		}
	);
});

app.listen(3000);

console.log('Server started: http://localhost:3000/');
