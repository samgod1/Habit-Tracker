import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import toast from "react-hot-toast";

import getWeekDays from "../../utils/dateUtils";
import "./Card.css";

const Card = ({ id, name, type, icon }) => {
	const [days, setDays] = useState(null);
	const [completedDates, setCompletedDates] = useState(null);

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
				}
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
		try {
			const response = await axios.post(
				import.meta.env.VITE_BACKEND_URL +
					"/api/habit/" +
					id +
					"/updateCompletedDates",
				{
					completedDates: newCompletedDates,
					habitId: id,
				},
				{
					withCredentials: true,
				}
			);

			console.log(response.data.message);
		} catch (e) {
			toast.error(e?.response?.data?.message || e.message);
		}
	}

	useEffect(() => {
		setDays(getWeekDays());
		getCompletedDates();
	}, []);
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
				</div>
			)}
		</div>
	);
};

export default Card;
