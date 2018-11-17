import getFragmentHTMLFromSummary from './lib/get-fragment-html-from-summary';
import getSummaryFromZip from './lib/get-summary-from-zip';
import htmldiff from './lib/htmldiff';

export default function bundle(initialZIP) {
	let currentZIP = initialZIP;

	window.addEventListener('popstate', onStateChange);
	window.addEventListener('click', onClick);

	setInterval(() => {
		zip2forecast();
	}, 1000);

	function zip2forecast() {
		const root = document.getElementById('root');

		if (root) {
			getSummaryFromZip(currentZIP).then(
				summary => {
					const fragmentHTML = getFragmentHTMLFromSummary(summary);

					htmldiff(root, fragmentHTML);
				}
			);
		}
	}

	function onStateChange(event) {
		currentZIP = event.state || initialZIP;

		zip2forecast();
	}

	function onClick(event) {
		const nextZIP = Number(event.target.pathname.slice(1));

		if (nextZIP) {
			event.preventDefault();

			window.history.pushState(nextZIP, null, nextZIP);

			onStateChange({ state: nextZIP });
		}
	}
}
