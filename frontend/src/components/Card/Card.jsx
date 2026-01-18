import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
	RadialBarChart,
	RadialBar,
	PolarAngleAxis,
	ResponsiveContainer,
} from "recharts";

import getWeekDays from "../../utils/dateUtils";
import "./Card.css";

const Card = ({ id, name, type, icon }) => {
	const [days, setDays] = useState(null);
	const [completedDates, setCompletedDates] = useState(null);

	const debounceRef = useRef(null);

	//Getting the completed date for this habit
	async function getCompletedDates() {
		try {
			const response = await axios.get(
				import.meta.env.VITE_BACKEND_URL +
					"/api/habit/" +
					id +
					"/completedDates",
				{
					withCredentials: true,
				},
			);

			setCompletedDates(response.data.completedDates);
		} catch (e) {
			console.log(e);
			toast.error(e?.response?.data?.message || e.message);
		}
	}

	async function handleChange(e, day) {
		const checked = e.target.checked;

		let newCompletedDates = [];

		if (checked) {
			newCompletedDates = [...completedDates, day];
		} else {
			newCompletedDates = completedDates.filter((d) => d !== day);
		}
		setCompletedDates(newCompletedDates);

		clearTimeout(debounceRef.current);

		debounceRef.current = setTimeout(() => {
			updateCompletedDates();
		}, 800);
	}

	async function updateCompletedDates() {
		try {
			const response = await axios.post(
				import.meta.env.VITE_BACKEND_URL +
					"/api/habit/" +
					id +
					"/updateCompletedDates",
				{
					completedDates: completedDates,
					habitId: id,
				},
				{
					withCredentials: true,
				},
			);
		} catch (e) {
			toast.error(e?.response?.data?.message || e.message);
		}
	}

	useEffect(() => {
		setDays(getWeekDays());
		getCompletedDates();
	}, []);

	const currentWeekCount = completedDates
		? completedDates.filter((date) => days?.includes(date)).length
		: 0;

	const data = [
		{
			value: currentWeekCount,
		},
	];

	return (
		<div className="card">
			<div className="wrapper">
				<div className="icon">{icon}</div>
				<div className="habit-name">{name}</div>
			</div>
			{days && (
				<div className="checkboxes-container">
					{days.map((day) => (
						<input
							type="checkbox"
							className={type}
							key={day}
							onChange={(e) => handleChange(e, day)}
							checked={completedDates?.includes(day) || false}
							day={day}
						/>
					))}
					<RadialBarChart
						width={24}
						height={24}
						data={data}
						innerRadius="40%"
						outerRadius="100%"
						startAngle={90}
						endAngle={-270}
						margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
					>
						<PolarAngleAxis type="number" domain={[0, 7]} tick={false} />
						<RadialBar
							dataKey={"value"}
							background={{ fill: "#e5e7eb" }}
							fill={type == "good" ? "#238636" : "#b91c1c"}
						/>
					</RadialBarChart>
				</div>
			)}
		</div>
	);
};

export default Card;
