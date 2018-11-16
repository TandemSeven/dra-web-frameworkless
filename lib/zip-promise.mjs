import publicIp from 'public-ip';

export default publicIp.v4().then(
	ip => fetch('http://ip-api.com/json/' + ip)
).then(
	response => response.json()
).then(
	json => json.zip
);
