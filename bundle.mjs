import getFragmentHTMLFromSummary from './lib/get-fragment-html-from-summary';
import getPositionFromZip from './lib/get-position-from-zip';
import getSummaryFromPosition from './lib/get-summary-from-position';
import htmldiff from './lib/htmldiff';

export default function bundle(initialLocation) {
	let currentLocation = initialLocation;

	window.addEventListener('popstate', onStateChange);
	window.addEventListener('click', onClick);
	window.addEventListener('input', onInput);
	window.addEventListener('submit', onSubmit);

	setInterval(() => {
		updateForecast();
	}, 1000);

	function updateForecast() {
		if (currentLocation.zip) {
			getPositionFromZip(currentLocation.zip).then(position2forecast);
		} else {
			position2forecast(currentLocation)
		}
	}

	function position2forecast(position) {
		const root = document.getElementById('root');

		if (root) {
			getSummaryFromPosition(position).then(
				summary => {
					const fragmentHTML = getFragmentHTMLFromSummary(summary);

					htmldiff(root, fragmentHTML);
				}
			);
		}
	}

	function onStateChange(event) {
		currentLocation = event.state
			? /^\d+$/.test(event.state)
				? { zip: Number(event.state) }
			: {
				latitude: event.state.split(/[^-+0-9.]+/)[0],
				longitude: event.state.split(/[^-+0-9.]+/)[1]
			}
		: initialLocation;

		updateForecast();
	}

	function onClick(event) {
		// detect toggle
		if (event.target.closest('.dra-current_location')) {
			navigator.geolocation.getCurrentPosition(
				function onPass(position) {
					const nextLocation = position.coords.latitude + ',' + position.coords.longitude;

					window.history.pushState(nextLocation, null, nextLocation);

					onStateChange({ state: nextLocation });

					document.querySelector('.dra-nav').classList.remove('is-open');
				},
				function onFail(error) {
					console.error(error);
				},
				{
					timeout: 6000
				}
			)
		} else if (event.target.closest('.dra-nav-toggle')) {
			document.querySelector('.dra-nav').classList.toggle('is-open');
		} else if (event.target.pathname) {
			const nextLocation = event.target.pathname.slice(1);

			if (nextLocation) {
				event.preventDefault();

				window.history.pushState(nextLocation, null, nextLocation);

				onStateChange({ state: nextLocation });
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

		const nextLocation = event.target.elements.loc.value;

		window.history.pushState(nextLocation, null, nextLocation);

		onStateChange({ state: nextLocation });

		document.querySelector('.dra-nav').classList.remove('is-open');
	}
}
