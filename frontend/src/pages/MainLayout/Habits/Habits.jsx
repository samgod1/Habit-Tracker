import { useState, useRef, useEffect, useContext } from "react";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

import { Card, Dialog, NoHabit } from "../../../components/index.js";
import "./Habits.css";
import { HabitContext } from "../../../contexts/HabitContext.jsx";

const Habits = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [priorities, setPriorities] = useState({
		1: { text: "", checked: false },
		2: { text: "", checked: false },
		3: { text: "", checked: false },
	});
	const [habitToEdit, setHabitToEdit] = useState(null);

	const debounceRef = useRef(null);

	const { habits, setHabits, loading } = useContext(HabitContext);

	function handlePriorityChange(e) {
		const value = e.target.value;
		const id = e.target.id;

		const updated = { ...priorities, [id]: { ...priorities[id], text: value } };

		setPriorities(updated);

		clearTimeout(debounceRef.current);

		debounceRef.current = setTimeout(() => {
			updatePriorities(updated);
		}, 800);
	}

	function handleCheckboxChange(e) {
		const checked = e.target.checked;
		const id = e.target.id;

		const updated = { ...priorities, [id]: { ...priorities[id], checked } };
		setPriorities(updated);

		clearTimeout(debounceRef.current);

		debounceRef.current = setTimeout(() => {
			updatePriorities(updated);
		});
	}

	async function getPriorities() {
		try {
			const response = await axios.get(
				import.meta.env.VITE_BACKEND_URL + "/api/priorities/",
				{ withCredentials: true },
			);

			setPriorities(response.data.priorities);
		} catch (e) {
			toast.error(e?.response?.data?.message || e.message);
		}
	}

	async function updatePriorities(updated) {
		try {
			await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/api/priorities/update",
				{ priorities: updated },
				{ withCredentials: true },
			);
		} catch (e) {
			toast.error(e?.response?.data?.message || e.message);
		}
	}

	useEffect(() => {
		getPriorities();
	}, []);

	if (loading) {
		return <div>Loading</div>;
	}

	return (
		<div className="habits-page">
			<header>
				<span>My habits</span>
				<button
					className="create-habit"
					onClick={() => {
						setIsDialogOpen(!isDialogOpen);
					}}
				>
					<FaPlus />
					New
				</button>
			</header>
			<main>
				<section className="habits">
					{habits.length == 0 ? (
						<NoHabit />
					) : (
						<>
							{habits.some((habit) => habit.type == "good") && (
								<>
									<div className="habits-section-header">
										<div className="type">Good Habits😇</div>
										<div className="days-container">
											{[
												"Mon",
												"Tue",
												"Wed",
												"Thu",
												"Fri",
												"Sat",
												"Sun",
												"",
											].map((day) => (
												<span key={day}>{day}</span>
											))}
										</div>
									</div>
									<div className="cards-container">
										{habits.map(
											(habit) =>
												habit.type == "good" && (
													<>
														<Card
															id={habit._id}
															key={habit._id}
															name={habit.name}
															type={habit.type}
															icon={habit.icon}
															setHabitToEdit={setHabitToEdit}
															setIsDialogOpen={setIsDialogOpen}
														/>
														<hr
															style={{
																border: "none",
																height: "2px",
																backgroundColor: "var(--color-sidebar-border)",
															}}
														/>
													</>
												),
										)}
									</div>
								</>
							)}
							{habits.some((habit) => habit.type == "bad") && (
								<>
									<div className="habits-section-header">
										<div className="type">Bad Habits😈</div>
										<div className="days-container">
											{[
												"Mon",
												"Tue",
												"Wed",
												"Thu",
												"Fri",
												"Sat",
												"Sun",
												"",
											].map((day) => (
												<span>{day}</span>
											))}
										</div>
									</div>
									<div className="cards-container">
										{habits.map(
											(habit) =>
												habit.type == "bad" && (
													<>
														<Card
															id={habit._id}
															key={habit._id}
															name={habit.name}
															type={habit.type}
															icon={habit.icon}
															setHabitToEdit={setHabitToEdit}
															setIsDialogOpen={setIsDialogOpen}
														/>
														<hr
															style={{
																border: "none",
																height: "2px",
																backgroundColor: "var(--color-sidebar-border)",
															}}
														/>
													</>
												),
										)}
									</div>
								</>
							)}
						</>
					)}
				</section>
				<section className="top-priorities">
					<div className="wrapper">
						<div className="title"> Top 3 Priorites</div>
						{[1, 2, 3].map((num) => (
							<div className="input-group" key={num}>
								<input
									type="checkbox"
									onChange={handleCheckboxChange}
									id={num}
									checked={priorities[num].checked}
								/>
								<input
									type="text"
									id={num}
									value={priorities[num].text}
									onChange={handlePriorityChange}
								/>
							</div>
						))}
					</div>
				</section>
			</main>
			{isDialogOpen && (
				<Dialog
					setIsDialogOpen={setIsDialogOpen}
					habitToEdit={habitToEdit}
					setHabitToEdit={setHabitToEdit}
				/>
			)}
		</div>
	);
};

export default Habits;
