import React from "react";
import {
	Line,
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";

import "./Progress.css";

const progress = [
	{
		day: "Mon",
		date: "2026-01-03",
		count: 2,
	},
	{
		day: "Tue",
		date: "2026-01-04",
		count: 0,
	},
	{
		day: "Wed",
		date: "2026-01-05",
		count: 2,
	},
	{
		day: "Thu",
		date: "2026-01-06",
		count: 5,
	},
	{
		day: "Fri",
		date: "2026-01-07",
		count: 4,
	},
	{
		day: "Sat",
		date: "2026-01-08",
		count: 5,
	},
	{
		day: "Sun",
		date: "2026-01-09",
		count: 2,
	},
];

const Progress = () => {
	return (
		<div className="progress-page">
			<header>
				<span>My Progress</span>
			</header>
			<main>
				<div className="chart-wrapper">
					<ResponsiveContainer>
						<LineChart data={progress} width={100} height={200}>
							<Line dataKey={"count"} />
							<XAxis dataKey={"day"} />
							<YAxis />
							<CartesianGrid stroke="#ccc" />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</main>
		</div>
	);
};

export default Progress;
