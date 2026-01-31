import React, { useContext, useEffect, useRef, useState } from "react";
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
	//USE_STATES
	const [data, setData] = useState([]);
	const [weeklyData, setWeeklyData] = useState([]);
	const [monthlyData, setMonthlyData] = useState([]);
	const [yearlyData, setYearlyData] = useState([]);

	const { habits } = useContext(HabitContext);

	//FUNCTIONS
	function convertToData() {
		const allCompletedDates = habits.flatMap((habit) => habit.completedDates);

		const count = {};

		for (const date of allCompletedDates) {
			if (count[date]) {
				count[date] += 1;
			} else {
				count[date] = 1;
			}
		}

		const convertedData = Object.keys(count).map((date) => {
			return {
				date: date,
				count: count[date],
				day: getDayFromDate(date),
			};
		});

		setData(convertedData);
	}

	function convertToWeeklyData() {
		const weekDays = getWeekDays();

		if (data.length === 0) {
			return;
		}

		const convertedWeeklyData = [];

		weekDays.map((date) => {
			data.map((d) => {
				if (date == d.date) {
					convertedWeeklyData.push(d);
				}
			});
		});

		setWeeklyData(convertedWeeklyData);
	}

	function convertToMonthlyData() {}

	function convertToYearlyData() {}

	function handleSelectChange(e) {
		const value = e.target.value;

		if (value == "weekly-progress") {
			convertToWeeklyData();
		} else if (value == "monthly-progress") {
			console.log("hello world");

			convertToMonthlyData();
		} else if (value == "yearly-progress") {
			convertToMonthlyData();
		}
	}

	//USE_EFFECTS
	useEffect(() => {
		if (habits.length != 0) {
			convertToData();
		}
	}, [habits]);

	useEffect(() => {
		if (data.length == 0) {
			return;
		}
		convertToWeeklyData();
	}, [data]);

	return (
		<div className="progress-page">
			<header>
				<span>My Progress</span>
			</header>
			<main>
				<div className="github-calendar-container">
					<HeatMap
						value={data.map((d) => ({ ...d }))}
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
				<select className="progress-select" onChange={handleSelectChange}>
					<option value="weekly-progress">Weekly Progress</option>
					<option value="monthly-progress">Monthly Progress</option>
					<option value="yearly-progress">Yearly Progress</option>
				</select>
			</main>
		</div>
	);
};

export default Progress;
