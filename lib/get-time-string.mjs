export default function getDateString() {
	const currentDate = new Date();
	const dayOfTheWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
	const dateString = `${dayOfTheWeek}, ${currentDate.getHours() % 12}:${('0' + currentDate.getMinutes()).slice(-2)} ${currentDate.getHours() < 12 ? 'AM' : 'PM'}`;

	return dateString;
};
