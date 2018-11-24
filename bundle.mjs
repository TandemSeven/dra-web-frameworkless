import getFragmentHTMLFromSummary from './lib/get-fragment-html-from-summary';
import getSummaryFromZip from './lib/get-summary-from-zip';
import htmldiff from './lib/htmldiff';

export default function bundle(initialZIP) {
	let currentZIP = initialZIP;

	window.addEventListener('popstate', onStateChange);
	window.addEventListener('click', onClick);
	window.addEventListener('input', onInput);
	window.addEventListener('submit', onSubmit);

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
		// detect toggle
		if (event.target.classList.contains('dra-nav-toggle')) {
			document.querySelector('.dra-nav').classList.toggle('is-open');
		} else if (event.target.pathname) {
			const nextZIP = event.target.pathname.slice(1);

			if (nextZIP) {
				event.preventDefault();

				window.history.pushState(nextZIP, null, nextZIP);

				onStateChange({ state: nextZIP });
			}
		}
	}

	function onInput(event) {
		if (event.target.labels) {
			event.target.labels[0].classList.toggle('not-blank', event.target.value);
		}
	}

	function onSubmit(event) {
		event.preventDefault();

		const nextZIP = event.target.elements.zip.value;

		if (currentZIP) {
			document.querySelector('.dra-nav').classList.remove('is-open');

			window.history.pushState(nextZIP, null, nextZIP);

			onStateChange({ state: nextZIP });
		}
	}
}
