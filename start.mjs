import fetch from 'node-fetch'; global.fetch = fetch;
import express from 'express';
import zipPromise from './lib/zip-promise';
import getSummaryFromZip from './lib/get-summary-from-zip';
import getDocumentHTMLFromSummary from './lib/get-document-html-from-summary';

const app = express();

app.use(express.static('public'));

app.get('/', (request, response) => {
	response.set('Content-Type', 'text/html');

	zipPromise.then(
		zip => getSummaryFromZip(zip)
	).then(
		summary => {
			const documentHTML = getDocumentHTMLFromSummary(summary)

			response.send(documentHTML);
		}
	)
});

app.listen(3000);

console.log('http://localhost:3000/');
