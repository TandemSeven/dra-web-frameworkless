// promise location data from a zip code
export default function getLocationFromZip(zip) {
	const promise = fetch('http://api.zippopotam.us/us/' + zip).then(
		response => response.json()
	).then(
		json => {
			const place = Object(Object(json.places)[0]);

			return {
				place: place['place name'],
				state: place['state abbreviation'],
				latitude: Number(place.latitude),
				longitude: Number(place.longitude),
				zip
			};
		}
	);

	return promise;
}
