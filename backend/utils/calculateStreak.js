function getToday() {
	const date = new Date();

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	const today = `${year}-${month}-${day}`;

	return today;
}

//This returns yesterday date
function getYesterday() {
	const date = new Date();
	date.setDate(date.getDate() - 1);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	const yesterday = `${year}-${month}-${day}`;
	return yesterday;
}

//This returns yesterday date of the date provided to the function
function getPreviousDay(today) {
	const date = new Date(today);
	date.setDate(date.getDate() - 1);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	const previousDay = `${year}-${month}-${day}`;
	return previousDay;
}

function calculateStreak(completedDates) {
	let streak = 0;

	const today = getToday();
	const yesterday = getYesterday();

	completedDates.sort();

	const length = completedDates.length;

	if (length == 0) {
		return streak;
	}

	const lastCompletedDay = completedDates[length - 1];

	if (today != lastCompletedDay && yesterday != lastCompletedDay) {
		return streak;
	}

	let currentDay = today == lastCompletedDay ? today : yesterday;

	while (completedDates.includes(currentDay)) {
		streak++;
		currentDay = getPreviousDay(currentDay);
	}
	return streak;
}

export default calculateStreak;
