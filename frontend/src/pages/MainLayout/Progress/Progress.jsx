import { useContext, useEffect, useMemo, useState } from "react";
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
import getTimeRange from "../../../utils/dateUtils";

const Progress = () => {
	//USE_STATES
	const [data, setData] = useState([]);
	const [dateRange, setTimeRange] = useState("weekly");
	const [filteredData, setFilteredData] = useState([]);

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

	function handleSelectChange(e) {
		const value = e.target.value;

		if (value == "weekly-progress") {
			setTimeRange("weekly");
		} else if (value == "monthly-progress") {
			setTimeRange("monthly");
		}
	}

	//USE_MEMOS
	useMemo(() => {
		const timeRange = getTimeRange(dateRange);

		const completeData = timeRange.map((date) => {
			const existingData = data.find((item) => date == item.date);

			return {
				date: date,
				count: existingData ? existingData.count : 0,
				day: getDayFromDate(date),
			};
		});

		setFilteredData(completeData);
	}, [data, dateRange]);

	//USE_EFFECTS
	useEffect(() => {
		if (habits.length != 0) {
			convertToData();
		}
	}, [habits]);

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
						<LineChart data={filteredData}>
							<Line dataKey={"count"} />
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
				</select>
			</main>
		</div>
	);
};

export default Progress;
