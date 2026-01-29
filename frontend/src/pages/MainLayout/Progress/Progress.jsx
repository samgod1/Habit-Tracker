import React, { useContext, useEffect, useState } from "react";
import {
	Line,
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";
import Tooltip from "@uiw/react-tooltip";
import HeatMap from "@uiw/react-heat-map";
import { HabitContext } from "../../../contexts/HabitContext";

import "./Progress.css";
import getDayFromDate from "../../../utils/getDayFromDate";
import getWeekDays from "../../../utils/dateUtils";

const Progress = () => {
	const [completeData, setCompleteData] = useState([]);
	const [weeklyData, setWeeklyData] = useState([]);
	// weekly data format
	// {
	// 	day: "Sun",
	// 	date: "2082-01-21",
	// 	count: "5",
	// }

	const { habits } = useContext(HabitContext);

	function convertDataforChart() {
		const weekDays = getWeekDays();
		const allHabitsCompletedDates = habits.flatMap(
			(habit) => habit.completedDates,
		);

		const counts = {};

		for (const date of allHabitsCompletedDates) {
			if (counts[date]) {
				counts[date] += 1;
			} else {
				counts[date] = 1;
			}
		}

		const weeklyData = weekDays.map((date) => {
			return {
				day: getDayFromDate(date),
				date,
				count: counts[date] || 0,
			};
		});

		setWeeklyData(weeklyData);
	}

	useEffect(() => {
		if (habits.length != 0) {
			convertDataforChart();
		}
	}, [habits]);

	const data = [
		{ date: "2016/01/11", count: 2 },
		{ date: "2016/04/12", count: 2 },
		{ date: "2016/05/01", count: 17 },
		{ date: "2016/05/02", count: 5 },
		{ date: "2016/05/03", count: 27 },
		{ date: "2016/05/04", count: 11 },
		{ date: "2016/05/08", count: 32 },
	];

	console.log(weeklyData);
	useEffect(() => {
		const allCompletedDates = habits.flatMap((habit) => habit.completedDates);

		const count = {};

		for (const date of allCompletedDates) {
			if (count[date]) {
				count[date] += 1;
			} else {
				count[date] = 1;
			}
		}

		const allCompletedData = Object.keys(count).map((date) => ({
			date: date,
			count: count[date],
			day: getDayFromDate(date),
		}));

		setCompleteData(allCompletedData);
	}, [habits]);

	return (
		<div className="progress-page">
			<header>
				<span>My Progress</span>
			</header>
			<main>
				<div className="github-calendar-container">
					<HeatMap
						value={completeData}
						width={"100%"}
						rectSize={14}
						startDate={new Date("2026/01/01")}
						style={{
							color: "var(--color-primary-text)",
							paddingBottom: "2rem",
						}}
						rectRender={(props, data) => {
							// if (!data.count) return <rect {...props} />;
							return (
								<Tooltip placement="top" content={`count: ${data.count || 0}`}>
									<rect {...props} />
								</Tooltip>
							);
						}}
					/>
				</div>
				<div className="chart-wrapper">
					<ResponsiveContainer>
						<LineChart data={weeklyData}>
							<Line dataKey={"count"} />
							<XAxis dataKey={"day"} />
							<YAxis
								domain={[0, habits.length]}
								ticks={Array.from({ length: habits.length + 1 }, (_, i) => i)}
							/>
							<CartesianGrid stroke="#ccc" />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</main>
		</div>
	);
};

export default Progress;
