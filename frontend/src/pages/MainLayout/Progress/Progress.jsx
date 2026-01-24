import React, { useContext, useEffect, useState } from "react";
import {
	Line,
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";
import { HabitContext } from "../../../contexts/HabitContext";

import "./Progress.css";
import getDayFromDate from "../../../utils/getDayFromDate";
import getWeekDays from "../../../utils/dateUtils";

const Progress = () => {
	const [weeklyData, setWeeklyData] = useState([]);

	const { habits } = useContext(HabitContext);

	const weekDays = getWeekDays();

	function convertDataforChart() {
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
			console.log("hello");
			convertDataforChart();
		}
	}, [habits]);

	return (
		<div className="progress-page">
			<header>
				<span>My Progress</span>
			</header>
			<main>
				<div className="chart-wrapper">
					<ResponsiveContainer>
						<LineChart data={weeklyData} width={100} height={200}>
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
