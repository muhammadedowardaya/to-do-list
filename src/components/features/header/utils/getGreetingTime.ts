export function getGreetingTime(): string {
	const currentHour = new Date().getHours();

	if (currentHour >= 5 && currentHour < 12) {
		return 'Selamat pagi';
	} else if (currentHour >= 12 && currentHour < 15) {
		return 'Selamat siang';
	} else if (currentHour >= 15 && currentHour < 18) {
		return 'Selamat sore';
	} else {
		return 'Selamat malam';
	}
}
