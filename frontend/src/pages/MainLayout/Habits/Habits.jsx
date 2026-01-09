import { FaPlus } from "react-icons/fa";

import { Card } from "../../../components/index.js";
import "./Habits.css";

const habits = [
	{
		id: 1,
		name: "Read Book",
		type: "good",
		progress: [false, false, false, false, false, false, false],
	},
	{
		id: 2,
		name: "Make bed",
		type: "good",
		progress: [false, false, false, false, false, false, false],
	},
	{
		id: 3,
		name: "Scrolling Reels",
		type: "bad",
		progress: [false, false, false, false, false, false, false],
	},
];

const Habits = () => {
	return (
		<div className="habits-page">
			<header>
				<span>My habits</span>
				<button className="create-habit">
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
										key={habit.id}
										name={habit.name}
										type={habit.type}
										progress={habit.progress}
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
										key={habit.id}
										name={habit.name}
										type={habit.type}
										progress={habit.progress}
									/>
								)
						)}
					</div>
				</section>
				<section className="top-priorities">Top Priorities</section>
				<section className="mood-board">Mood board</section>
			</main>
		</div>
	);
};

export default Habits;
