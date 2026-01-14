export default function getDayFromDate(dateString) {
	return new Intl.DateTimeFormat("en-US", {
		weekday: "short",
	}).format(new Date(dateString));
}
