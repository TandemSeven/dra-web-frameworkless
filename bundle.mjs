import getFragmentHTMLFromSummary from './lib/get-fragment-html-from-summary';
import getSummaryFromZip from './lib/get-summary-from-zip';
import htmldiff from './lib/htmldiff';

export default function zip2forecast(zip) {
	const root = document.getElementById('root');

	getSummaryFromZip(zip).then(
		summary => {
			const fragmentHTML = getFragmentHTMLFromSummary(summary);

			htmldiff(root, fragmentHTML);
		}
	);
}
