function getWeekDays() {
	const week = [];
	const today = new Date();

	// Find the Monday of this week
	const start = new Date(today.setDate(today.getDate() - today.getDay() + 1));

	for (let i = 0; i < 7; i++) {
		const day = new Date(start);
		day.setDate(start.getDate() + i);
		week.push(day.toISOString().split("T")[0]);
	}

	return week;
}

export default getWeekDays;
