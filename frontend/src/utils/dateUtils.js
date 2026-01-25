function getWeekDays() {
	const week = [];
	const today = new Date();

	// Find the Monday of this week
	const dayOfTheWeek = today.getDay();
	const daysToMonday = dayOfTheWeek == 0 ? -6 : 1 - dayOfTheWeek;
	const start = new Date(today.setDate(today.getDate() + daysToMonday));

	for (let i = 0; i < 7; i++) {
		const day = new Date(start);
		day.setDate(start.getDate() + i);
		week.push(day.toISOString().split("T")[0]);
	}

	return week;
}

export default getWeekDays;
