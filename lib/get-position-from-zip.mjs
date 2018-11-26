// promise the position from a zip code
export default function getPositionFromZip(zip) {
	const promise = positionByZip[zip] = positionByZip[zip] || fetch('http://api.zippopotam.us/us/' + zip).then(
		response => response.json()
	).then(
		json => {
			const place = Object(Object(json.places)[0]);
			const position = {
				latitude: Number(place.latitude),
				longitude: Number(place.longitude),
				address: {
					postalCode: zip
				}
			};

			return position;
		}
	);

	return promise;
}

const positionByZip = {};
