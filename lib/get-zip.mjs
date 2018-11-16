import publicIp from 'public-ip';

// promise the ZIP for the current IP address of the server
export default publicIp.v4().then(
	ip => fetch('http://ip-api.com/json/' + ip)
).then(
	response => response.json()
).then(
	json => json.zip
);
