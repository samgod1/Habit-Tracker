function getTimeRange(dateRange) {
	let i;

	const dates = [];
	if (dateRange === "weekly") {
		const today = new Date();

		// Find the Monday of this week
		const dayOfTheWeek = today.getDay();
		const daysToMonday = dayOfTheWeek == 0 ? -6 : 1 - dayOfTheWeek;
		const start = new Date(today.setDate(today.getDate() + daysToMonday));

		for (i = 0; i < 7; i++) {
			const weekDay = new Date(start);
			weekDay.setDate(start.getDate() + i);
			dates.push(weekDay.toISOString().split("T")[0]);
		}
	} else if (dateRange === "monthly") {
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth();
		const monthLength = new Date(year, month + 1, 0).getDate();

		for (i = 1; i <= monthLength; i++) {
			const monthDay = new Date(year, month, i);
			dates.push(monthDay.toISOString().split("T")[0]);
		}
	}

	return dates;
}

export default getTimeRange;
