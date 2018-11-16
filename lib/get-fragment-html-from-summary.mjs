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
		<svg viewBox="0 0 100 17"><path d="M0 30V15q30-12 60 0v15z" fill="#00adcf"/><path d="M0 30V12q30 5 55 0t45-1v19z" fill="#fff"/></svg>
	</header>
	<section>${summary.forecast.map(
		current => `<article>
			<h2>${current.weekday}</h2>
			<p><svg><use href="#${forecast.sprite}"></svg></p>
			<p>
				<span>${current.temperatures.slice().sort().slice(-1)} &deg;F</span>
				<span>${current.temperatures.slice().sort().slice(0, 1)} &deg;F</span>
			</p>
		</article>`
	).join('')}</section>`
}
