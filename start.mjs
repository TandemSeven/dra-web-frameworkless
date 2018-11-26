import fetch from 'node-fetch'; global.fetch = fetch;
import express from 'express';
import compression from 'shrink-ray-current';
import getPositionFromZip from './lib/get-position-from-zip';
import getSummaryFromPosition from './lib/get-summary-from-position';
import getDocumentHTMLFromSummary from './lib/get-document-html-from-summary';

const app = express();

app.use(compression());
app.use(express.static('public'));

app.get('/', (request, response) => {
	const userAgent = request.headers['user-agent'];

	response.set('Content-Type', 'text/html');

	const loc = request.query.loc
		? /^\d+$/.test(request.query.loc)
			? { zip: Number(request.query.loc) }
		: {
			latitude: request.query.loc.split(/[^-+0-9.]+/)[0],
			longitude: request.query.loc.split(/[^-+0-9.]+/)[1]
		}
	: { zip: 92802 };

	(
		loc.zip
			? getPositionFromZip(loc.zip).then(getSummaryFromPosition)
		: getSummaryFromPosition(loc)
	).then(
		summary => {
			const documentHTML = getDocumentHTMLFromSummary(summary, loc, userAgent)

			response.send(documentHTML);
		}
	)
});

const pathRegExp = /^\/(?:(\d+)|([-+]?[0-9]*\.?[0-9]+)(?:,|%20)([-+]?[0-9]*\.?[0-9]+))$/;

app.get(pathRegExp, (request, response) => {
	const userAgent = request.headers['user-agent'];

	response.set('Content-Type', 'text/html');

	const [, zip, latitude, longitude] = request.path.match(pathRegExp);
	const loc = { zip, latitude, longitude };

	(
		loc.zip
			? getPositionFromZip(loc.zip).then(getSummaryFromPosition)
		: getSummaryFromPosition(loc)
	).then(
		summary => {
			const documentHTML = getDocumentHTMLFromSummary(summary, loc, userAgent)

			response.send(documentHTML);
		}
	);
});

app.listen(3000);

console.log('Server started: http://localhost:3000/');
