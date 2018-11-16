import getLocationFromZip from './get-location-from-zip';
import getTimeString from './get-time-string';

export default function getSummaryFromZip(zip) {
	const promise = summaryByZip[zip] = summaryByZip[zip] || getLocationFromZip(zip).then(
		location => Promise.all([
			fetch('https://api.weather.gov/points/' + location.latitude + ',' + location.longitude)
			.then(response => response.json()),
			fetch('https://api.teleport.org/api/locations/' + location.latitude + ',' + location.longitude + '/?embed=location:nearest-urban-areas/location:nearest-urban-area/ua:images')
			.then(response => response.json())
		]).then(
			json => {
				const forecastURL = json[0].properties.forecast;
				const imageURL = getImageURLFromJSON(json[1]);

				return getForecastFromURL(forecastURL).then(
					forecast => Object.assign(location, {
						imageURL,
						forecast
					})
				);
			}
		)
	);

	return promise.then(
		summary => Object.assign(summary, { time: getTimeString() })
	);
}

const summaryByZip = {};

function getImageURLFromJSON(json) {
	return json._embedded['location:nearest-urban-areas'][0]._embedded['location:nearest-urban-area']._embedded['ua:images'].photos[0].image.web;
}

function getForecastFromURL(forecastURL) {
	return fetch(forecastURL).then(
		response => response.json()
	).then(
		json => json.properties.periods.reduce(reducePeriods, [])
	);
}

function reducePeriods(periods, period) {
	const date = new Date(period.startTime);
	const dayOfTheMonth = new Date(period.startTime).getDate();
	const lastPeriod = periods[periods.length - 1];

	if (lastPeriod && lastPeriod.dayOfTheMonth === dayOfTheMonth) {
		lastPeriod.temperatures.push(period.temperature);
	} else {
		periods.push({
			dayOfTheMonth,
			description: period.shortForecast,
			sprite: getSpriteFromIconURL(period.icon),
			temperatures: [period.temperature],
			weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
		});
	}

	return periods;
}

function getSpriteFromIconURL(iconURL) {
	const regexp = /^https:\/\/api\.weather\.gov\/icons\/land\/(?:day|night)\/([a-z]+)/;
	const parsedIconURL = iconURL.match(regexp);
	const map = {
		bkn: 'cloudy',
		blizzard: 'snowy',
		cold: 'snowy',
		dust: 'tornado',
		few: 'cloudy',
		fog: 'sunny',
		fzra: 'snowy',
		haze: 'sunny',
		hot: 'sunny',
		hurricane: 'tornado',
		ovc: 'cloudy',
		rain: 'rainy',
		rain_fzra: 'snowy',
		rain_showers: 'rainy',
		rain_showers_hi: 'rainy',
		rain_snow: 'snowy',
		rain_sleet: 'snowy',
		sct: 'cloudy',
		skc: 'sunny',
		sleet: 'snowy',
		smoke: 'tornado',
		snow: 'snowy',
		snow_fzra: 'snowy',
		snow_sleet: 'snowy',
		tornado: 'tornado',
		tropical_storm: 'stormy',
		tsra: 'stormy',
		tsra_sct: 'stormy',
		tsra_hi: 'stormy',
		wind_bkn: 'cloudy',
		wind_ovc: 'cloudy',
		wind_sct: 'cloudy',
		wind_skc: 'sunny',
		wind_few: 'cloudy'
	};

	return map[Object(parsedIconURL)[1]] || 'sunny';
}
