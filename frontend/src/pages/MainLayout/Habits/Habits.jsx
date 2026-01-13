import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { Card, Dialog } from "../../../components/index.js";
import "./Habits.css";

// const habits = [
// 	{
// 		id: 1,
// 		name: "Read Book",
// 		type: "good",
// 		icon: "📕",
// 	},
// 	{
// 		id: 2,
// 		name: "Make bed",
// 		type: "good",
// 		icon: "🛌",
// 	},
// 	{
// 		id: 3,
// 		name: "Scrolling Reels",
// 		type: "bad",
// 		icon: "📱",
// 	},
// ];

const Habits = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [habits, setHabits] = useState([]);

	async function getAllHabits() {
		try {
			const response = await axios.get(
				import.meta.env.VITE_BACKEND_URL + "/api/habit/",
				{
					withCredentials: true,
				}
			);
			setHabits(response.data);
		} catch (e) {
			toast.error(e?.response?.data?.message || e.message);
		}
	}

	useEffect(() => {
		getAllHabits();
	}, []);

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
					<div className="type">Good Habits😇</div>
					<div className="cards-container">
						{habits.map(
							(habit) =>
								habit.type == "good" && (
									<Card
										id={habit._id}
										key={habit._id}
										name={habit.name}
										type={habit.type}
										icon={habit.icon}
									/>
								)
						)}
					</div>
					<div className="type">Bad Habits😈</div>
					<div className="cards-container">
						{habits.map(
							(habit) =>
								habit.type == "bad" && (
									<Card
										id={habit._id}
										key={uuidv4()}
										name={habit.name}
										type={habit.type}
										icon={habit.icon}
									/>
								)
						)}
					</div>
				</section>
				<section className="top-priorities">
					<div className="wrapper">
						<div className="title"> Top 3 Priorites</div>
						<div className="input-group">
							<input type="checkbox" />
							<input type="text" />
						</div>
						<div className="input-group">
							<input type="checkbox" />
							<input type="text" />
						</div>
						<div className="input-group">
							<input type="checkbox" />
							<input type="text" />
						</div>
					</div>
				</section>
			</main>
			{isDialogOpen && (
				<Dialog setIsDialogOpen={setIsDialogOpen} setHabits={setHabits} />
			)}
		</div>
	);
};

export default Habits;
