// return the current date as a string (dddd, hh:mm tt)
export default function getDateString() {
	return new Date().toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: '2-digit' }).replace(' ', ', ');
};
