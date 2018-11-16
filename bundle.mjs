import getFragmentHTMLFromSummary from './lib/get-fragment-html-from-summary';
import getSummaryFromZip from './lib/get-summary-from-zip';
import htmldiff from './lib/htmldiff';

export default function zip2forecast(zip) {
	getSummaryFromZip(zip).then(
		summary => {
			const fragmentHTML = getFragmentHTMLFromSummary(summary);
			const root = document.getElementById('root');

			htmldiff(root, fragmentHTML);
		}
	);
}
