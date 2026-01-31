import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
	RadialBarChart,
	RadialBar,
	PolarAngleAxis,
	ResponsiveContainer,
} from "recharts";
import { BsThreeDotsVertical } from "react-icons/bs";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import getTimeRange from "../../utils/dateUtils";
import ContextMenu from "../ContextMenu/ContextMenu";
import "./Card.css";
import { HabitContext } from "../../contexts/HabitContext";

const Card = ({ id, name, type, icon, setHabitToEdit, setIsDialogOpen }) => {
	const [days, setDays] = useState(null);
	const [completedDates, setCompletedDates] = useState(null);
	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
	const [streak, setStreak] = useState(0);

	const debounceRef = useRef(null);
	const contextMenuRef = useRef(null);

	const { habits, setHabits } = useContext(HabitContext);

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
			setStreak(response.data.streak);

			//This is needed to update the progress chart instantly
			setHabits((prev) =>
				prev.map((habit) => {
					if (habit._id === id) {
						return { ...habit, completedDates: response.data.completedDates };
					}
					return habit;
				}),
			);
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
			updateCompletedDates(newCompletedDates);
		}, 800);
	}

	async function updateCompletedDates(updatedCompletedDates) {
		try {
			const response = await axios.post(
				import.meta.env.VITE_BACKEND_URL +
					"/api/habit/" +
					id +
					"/updateCompletedDates",
				{
					completedDates: updatedCompletedDates,
					habitId: id,
				},
				{
					withCredentials: true,
				},
			);

			setStreak(response.data.streak);

			//This is needed to update the progress chart instantly
			setHabits((prev) =>
				prev.map((habit) => {
					if (habit._id == id) {
						return { ...habit, completedDates: updatedCompletedDates };
					}
					return { habit };
				}),
			);
		} catch (e) {
			toast.error(e?.response?.data?.message || e.message);
		}
	}

	function handleMouseDown(e) {
		if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
			setIsContextMenuOpen(false);
		}
	}

	useEffect(() => {
		setDays(getTimeRange("weekly"));
		getCompletedDates();
	}, []);

	useEffect(() => {
		if (isContextMenuOpen) {
			document.addEventListener("mousedown", handleMouseDown);
		}

		return () => {
			document.removeEventListener("mousedown", handleMouseDown);
		};
	}, [isContextMenuOpen]);

	useGSAP(() => {
		if (!contextMenuRef.current) {
			return;
		}

		if (isContextMenuOpen) {
			gsap.fromTo(
				contextMenuRef.current,
				{
					yPercent: 25,
					opacity: 0,
				},
				{
					yPercent: 0,
					opacity: 1,
					duration: 0.2,
				},
			);
		} else {
			gsap.to(contextMenuRef.current, {
				opacity: 0,
			});
		}
	}, [isContextMenuOpen]);

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
				<div className="streak-wrapper">
					<span className="streak">{streak}</span>
					{streak > 0 ? (
						<span className="img">
							<img
								src="/images/fire.svg"
								alt="fire-icon"
								height={24}
								width={24}
							/>
						</span>
					) : (
						<span className="img">
							<img
								src="/images/fire-not-lit.svg"
								alt="fire-icon"
								height={24}
								width={24}
							/>
						</span>
					)}
				</div>
				<div className="icon-and-name">
					<div className="icon">{icon}</div>
					<div className="habit-name">{name}</div>
				</div>
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
						/>
					))}
					<div className="card-actions">
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
						<div
							className="three-dots"
							onClick={(e) => {
								e.stopPropagation();
								setIsContextMenuOpen(!isContextMenuOpen);
							}}
						>
							<BsThreeDotsVertical />
							{isContextMenuOpen && (
								<ContextMenu
									ref={contextMenuRef}
									id={id}
									setHabitToEdit={setHabitToEdit}
									setIsDialogOpen={setIsDialogOpen}
								/>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Card;
