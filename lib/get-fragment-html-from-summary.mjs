// return a fragment of html representing the current weather summary
export default function getDocumentFragmentHTML(summary) {
	const forecast = summary.forecast[0];

	return `<header style="background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.75)), url(${summary.imageURL})">
		<span>
			<h1>${summary.place}, <strong>${summary.state}</strong></h1>
			<h2>${forecast.description}</h2>
			<h3>
				<span>${forecast.temperatures[0]}</span>
				<sup>&deg;F</sup>
			</h3>
		</span>
		<span>${summary.time}</span>
		<svg viewBox="0 0 100 17"><use href="#wave"></svg>
	</header>
	<section>${summary.forecast.map(
		current => `<article>
			<h2>${current.weekday}</h2>
			<p><svg><use href="#${forecast.symbolId}"></svg></p>
			<p>
				<span>${current.temperatures.slice().sort().slice(-1)} &deg;F</span>
				<span>${current.temperatures.slice().sort().slice(0, 1)} &deg;F</span>
			</p>
		</article>`
	).join('')}</section>`
}
